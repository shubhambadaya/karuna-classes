import imageManifest from '../data/artwork-images.json';

function ResponsiveArtworkImage({ src, sizes = '100vw', responsive = true, variant = 'default', alt = '', ...props }) {
  let normalizedSrc = src;
  try {
    normalizedSrc = decodeURIComponent(src);
  } catch {
    // Keep the original URL if it contains an invalid escape sequence.
  }
  const image = imageManifest[normalizedSrc];

  if (!image) return <img src={src} alt={alt} sizes={sizes} {...props} />;

  if (variant === 'gallery' && image.gallerySrc) {
    return <img src={image.gallerySrc} width={image.galleryWidth} height={image.galleryHeight} alt={alt} {...props} />;
  }

  return (
    <img
      src={image.src}
      srcSet={responsive ? image.srcSet : undefined}
      sizes={responsive ? sizes : undefined}
      width={image.width}
      height={image.height}
      alt={alt}
      {...props}
    />
  );
}

export default ResponsiveArtworkImage;
