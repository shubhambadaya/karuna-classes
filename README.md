# Karuna Artwork

A complete, production-ready website for **Karuna Artwork**, a freelance artist offering online art classes for all age groups and selling original artworks.

## Features
- **Modern SPA:** Built with React and Vite for blisteringly fast navigation.
- **Dynamic Design System:** Handcrafted aesthetic using a warm earthy color palette (warm cream, soft sage, terracotta) with glassmorphic UI elements and micro-animations.
- **Expressive Typography:** Seamlessly pairs Google Fonts **Playfair Display** (headings) with **DM Sans** (body) for a premium, artistic feel.
- **Fully Responsive:** Mobile-first design that adapts beautifully to any screen size.
- **Course Library:** A comprehensive class grid populated with a filtering system to quickly organize classes by age groups or types.
- **Masonry Art Gallery:** A lightweight CSS masonry grid highlighting paintings, illustrations, and unique commissions, complete with an interactive lightbox.
- **Direct inquiries:** Contact, collaboration and class booking inquiries open WhatsApp with a prefilled message; the visitor confirms and sends it in WhatsApp.

## Tech Stack
- Frontend Framework: **React**
- Build Tool: **Vite**
- Routing: **React Router DOM**
- Icons: **Lucide React**
- Styling: **Vanilla CSS**

## Getting Started

To run the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shubhambadaya/karuna-classes.git
   cd karuna-classes
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Artwork image workflow

- Keep print-resolution originals in the local-only `artwork-originals/artworks/` folder. The original artist portrait belongs at `artwork-originals/artist_portrait.jpg`.
- The originals folder is excluded from Git and Vercel. Do not force-add it; the public site should only contain generated previews for artwork.
- After adding or replacing artwork originals, run `npm run optimize:images` on macOS. This generates 480px, 960px and 1600px watermarked JPEG previews in `public/artwork-optimized/` and refreshes `src/data/artwork-images.json`.
- The small artist portrait is copied as-is without an artwork watermark. Generated artwork previews are the files included in the site deployment.

## License
&copy; Karuna Artwork. All rights reserved.
