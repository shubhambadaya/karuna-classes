import CoreGraphics
import CoreText
import Foundation
import ImageIO

let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let originals = root.appendingPathComponent("artwork-originals/artworks", isDirectory: true)
let output = root.appendingPathComponent("public/artwork-optimized", isDirectory: true)
let galleryOutput = root.appendingPathComponent("public/artwork-gallery", isDirectory: true)
let manifestURL = root.appendingPathComponent("src/data/artwork-images.json")
// Keep small variants for mobile, with a 2.4K ceiling for sharp desktop / retina displays.
let sizes = [480, 960, 1600, 2400]
let fileManager = FileManager.default

func makeDirectory(_ url: URL) throws {
    try fileManager.createDirectory(at: url, withIntermediateDirectories: true)
}

func watermark(_ context: CGContext, width: Int, height: Int) {
    let font = CTFontCreateWithName("HelveticaNeue-Medium" as CFString, max(18, CGFloat(max(width, height)) * 0.022), nil)
    let message = "KARUNA ARTWORK"
    let diagonal = hypot(CGFloat(width), CGFloat(height))
    let stepX = max(270, CGFloat(max(width, height)) * 0.34)
    let stepY = max(175, CGFloat(max(width, height)) * 0.23)
    context.saveGState()
    context.translateBy(x: CGFloat(width) / 2, y: CGFloat(height) / 2)
    context.rotate(by: -.pi / 7)
    for row in stride(from: -diagonal, through: diagonal, by: stepY) {
        let rowIndex = Int((row + diagonal) / stepY)
        let offset = rowIndex.isMultiple(of: 2) ? 0 : stepX / 2
        for column in stride(from: -diagonal - stepX, through: diagonal, by: stepX) {
            let color = (rowIndex + Int((column + diagonal) / stepX)).isMultiple(of: 2)
                ? CGColor(gray: 1, alpha: 0.14)
                : CGColor(gray: 0, alpha: 0.12)
            let attributes: [NSAttributedString.Key: Any] = [
                NSAttributedString.Key(kCTFontAttributeName as String): font,
                NSAttributedString.Key(kCTForegroundColorAttributeName as String): color,
                NSAttributedString.Key(kCTKernAttributeName as String): 1.5,
            ]
            let line = CTLineCreateWithAttributedString(NSAttributedString(string: message, attributes: attributes))
            context.textPosition = CGPoint(x: column + offset, y: row)
            CTLineDraw(line, context)
        }
    }
    context.restoreGState()
}

func optimizedImage(source: URL, destination: URL, maxPixelSize: Int, quality: Double, addWatermark: Bool) throws -> (Int, Int) {
    guard let source = CGImageSourceCreateWithURL(source as CFURL, nil),
          let image = CGImageSourceCreateThumbnailAtIndex(source, 0, [
            kCGImageSourceCreateThumbnailFromImageAlways: true,
            kCGImageSourceCreateThumbnailWithTransform: true,
            kCGImageSourceThumbnailMaxPixelSize: maxPixelSize,
            kCGImageSourceShouldCacheImmediately: true,
          ] as CFDictionary) else {
        throw NSError(domain: "ArtworkOptimizer", code: 1, userInfo: [NSLocalizedDescriptionKey: "Could not decode image at \(source)"])
    }
    let width = image.width
    let height = image.height
    guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB),
          let context = CGContext(data: nil, width: width, height: height, bitsPerComponent: 8, bytesPerRow: 0, space: colorSpace, bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue) else {
        throw NSError(domain: "ArtworkOptimizer", code: 2, userInfo: [NSLocalizedDescriptionKey: "Could not prepare image context"])
    }
    context.interpolationQuality = .high
    context.draw(image, in: CGRect(x: 0, y: 0, width: width, height: height))
    if addWatermark { watermark(context, width: width, height: height) }
    guard let rendered = context.makeImage(),
          let destinationRef = CGImageDestinationCreateWithURL(destination as CFURL, "public.jpeg" as CFString, 1, nil) else {
        throw NSError(domain: "ArtworkOptimizer", code: 3, userInfo: [NSLocalizedDescriptionKey: "Could not encode image at \(destination)"])
    }
    CGImageDestinationAddImage(destinationRef, rendered, [kCGImageDestinationLossyCompressionQuality: quality] as CFDictionary)
    guard CGImageDestinationFinalize(destinationRef) else {
        throw NSError(domain: "ArtworkOptimizer", code: 4, userInfo: [NSLocalizedDescriptionKey: "Could not finish image at \(destination)"])
    }
    return (width, height)
}

func webPath(_ url: URL, relativeTo base: URL) -> String {
    "/" + url.path.replacingOccurrences(of: base.path + "/", with: "")
}

do {
    guard fileManager.fileExists(atPath: originals.path) else {
        throw NSError(domain: "ArtworkOptimizer", code: 5, userInfo: [NSLocalizedDescriptionKey: "Original artwork folder not found: \(originals.path)"])
    }
    try makeDirectory(output)
    try makeDirectory(galleryOutput)
    try makeDirectory(manifestURL.deletingLastPathComponent())
    var manifest: [String: [String: Any]] = [:]
    let enumerator = fileManager.enumerator(at: originals, includingPropertiesForKeys: [.isRegularFileKey], options: [.skipsHiddenFiles])
    let sourceFiles = (enumerator?.allObjects as? [URL] ?? []).filter { ["jpg", "jpeg", "png"].contains($0.pathExtension.lowercased()) }
    for source in sourceFiles {
        let relative = source.path.replacingOccurrences(of: originals.path + "/", with: "")
        let stem = (relative as NSString).deletingPathExtension
        var variants: [(path: String, width: Int, height: Int)] = []
        for size in sizes {
            let destination = output.appendingPathComponent("\(stem)-\(size).jpg")
            try makeDirectory(destination.deletingLastPathComponent())
            let dimensions = try optimizedImage(source: source, destination: destination, maxPixelSize: size, quality: size >= 1600 ? 0.92 : 0.88, addWatermark: true)
            let encodedStem = stem.replacingOccurrences(of: " ", with: "%20")
            variants.append(("/artwork-optimized/\(encodedStem)-\(size).jpg", dimensions.0, dimensions.1))
        }
        // The artwork gallery uses a lighter, 900px, metadata-free copy per artwork.
        let galleryDestination = galleryOutput.appendingPathComponent("\(stem).jpg")
        try makeDirectory(galleryDestination.deletingLastPathComponent())
        let galleryDimensions = try optimizedImage(source: source, destination: galleryDestination, maxPixelSize: 900, quality: 0.78, addWatermark: true)
        let galleryPath = "/artwork-gallery/" + stem.replacingOccurrences(of: " ", with: "%20") + ".jpg"
        let sourcePath = "/artworks/" + relative
        let srcSet = variants.map { "\($0.path) \($0.width)w" }.joined(separator: ", ")
        if let largest = variants.last {
            manifest[sourcePath] = ["src": largest.path, "srcSet": srcSet, "width": largest.width, "height": largest.height, "gallerySrc": galleryPath, "galleryWidth": galleryDimensions.0, "galleryHeight": galleryDimensions.1]
        }
        print("Optimized \(relative)")
    }

    // Keep the already-small artist portrait unwatermarked and unchanged.
    let portraitSource = root.appendingPathComponent("artwork-originals/artist_portrait.jpg")
    if fileManager.fileExists(atPath: portraitSource.path) {
        let portraitDestination = root.appendingPathComponent("public/artist_portrait.jpg")
        try Data(contentsOf: portraitSource).write(to: portraitDestination, options: .atomic)
    }

    let json = try JSONSerialization.data(withJSONObject: manifest, options: [.prettyPrinted, .sortedKeys])
    try json.write(to: manifestURL, options: .atomic)
    print("Wrote \(manifest.count) responsive image records to \(manifestURL.path)")
} catch {
    fputs("Image optimization failed: \(error.localizedDescription)\n", stderr)
    exit(1)
}
