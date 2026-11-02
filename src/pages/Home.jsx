import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowRight, Camera } from 'lucide-react';
import './Home.css';

const featured = [
  { title: 'The Gentle Giant', category: 'Children’s illustration', image: '/artworks/gentle-giant.jpg', shape: 'feature-tall' },
  { title: 'A Song for My Cat', category: 'Picture book cover', image: '/artworks/song-for-my-cat.jpg', shape: 'feature-wide' },
  { title: 'Bridge at Dusk', category: 'Worlds & scenes', image: '/artworks/bridge-at-dusk.jpg', shape: 'feature-short' },
];

const instagramPreview = [
  { image: '/artworks/little-explorer.jpg', alt: 'Little Explorer character illustration' },
  { image: '/artworks/gentle-giant.jpg', alt: 'A girl reading beside a gentle elephant' },
  { image: '/artworks/portrait-in-olive.jpg', alt: 'Portrait study in olive tones' },
  { image: '/artworks/song-for-my-cat.jpg', alt: 'A colourful picture-book illustration' },
  { image: '/artworks/first-haircut.jpg', alt: 'A child’s first haircut, illustrated' },
  { image: '/artworks/street-style.jpg', alt: 'Character design in a bright street style' },
  { image: '/artworks/spring-crush.jpg', alt: 'Spring Crush illustration' },
  { image: '/artworks/firefly-path.jpg', alt: 'A firefly-lit path through an imagined forest' },
  { image: '/artworks/bridge-at-dusk.jpg', alt: 'Bridge at Dusk, an illustrated landscape' },
  { image: '/artworks/orange-thief.jpg', alt: 'The Orange Thief illustration' },
  { image: '/artworks/breakfast-table.jpg', alt: 'A warm breakfast-table illustration' },
  { image: '/artworks/gone-fishing.jpg', alt: 'An illustrated fishing scene' },
];

function Home() {
  const [visibleInstagramPosts, setVisibleInstagramPosts] = useState(6);

  return (
    <div className="home-page portfolio-home">
      <section className="portfolio-hero">
        <div className="portfolio-hero-copy">
          <p className="eyebrow">Illustrator & visual artist · Jaipur, India</p>
          <h1>Stories made<br />to <em>stay with you.</em></h1>
          <p className="hero-intro">I’m Karuna, an illustrator creating warm, character-led artwork for picture books, people and the places they imagine.</p>
          <div className="hero-actions">
            <Link to="/artworks" className="text-link">Explore the artwork <ArrowRight size={17} /></Link>
            <Link to="/about" className="text-link text-link-muted">Meet the artist <ArrowDownRight size={17} /></Link>
          </div>
          <div className="hero-note"><span className="note-mark">✳</span><span>Digital & traditional<br />Illustration · Storytelling · Character design</span></div>
        </div>
        <Link to="/artworks" className="portfolio-hero-art" aria-label="Explore The Gentle Giant illustration">
          <img src="/artworks/gentle-giant.jpg" alt="A girl reading beside a gentle elephant in a meadow, illustrated by Karuna Gupta" fetchPriority="high" />
          <span className="art-caption"><b>The Gentle Giant</b><span>Picture-book illustration · 2024</span></span>
          <span className="hero-sticker">A little<br />wonder<br /><i>in every story</i></span>
        </Link>
      </section>

      <section className="portfolio-section featured-section">
        <div className="section-heading-row"><div><p className="eyebrow">A few favourites</p><h2>Selected <em>work</em></h2></div><Link className="text-link" to="/artworks">View the gallery <ArrowRight size={17} /></Link></div>
        <div className="featured-grid">
          {featured.map((art, index) => <Link to="/artworks" className={`featured-piece ${art.shape}`} key={art.title}>
            <div className="featured-image"><img src={art.image} alt={`${art.title}, ${art.category} by Karuna Gupta`} loading="lazy" /></div>
            <div className="piece-caption"><span className="piece-number">0{index + 1}</span><div><h3>{art.title}</h3><p>{art.category}</p></div><ArrowDownRight size={19} /></div>
          </Link>)}
        </div>
      </section>

      <section className="artist-intro-section">
        <div className="artist-intro-image"><img src="/artist_portrait.png" alt="Karuna Gupta, illustrator and visual artist" loading="lazy" /></div>
        <div className="artist-intro-copy"><p className="eyebrow">A little about me</p><h2>Drawing from<br /><em>the everyday.</em></h2><p>I’m an illustrator and visual artist with a soft spot for expressive characters, quiet moments and the small details that make a story feel real. My work moves between children’s books, character design, portraits and imagined worlds.</p><p>From the first loose sketch to the final colour, I love finding the feeling at the heart of an idea and giving it a life on the page.</p><Link to="/about" className="text-link">More about Karuna <ArrowRight size={17} /></Link></div>
      </section>

      <section className="portfolio-section category-section"><div className="section-heading-row"><div><p className="eyebrow">Follow a feeling</p><h2>Ways into my <em>world</em></h2></div><p className="section-aside">Different subjects, one shared love of colour, character and a good story.</p></div>
        <div className="category-grid">
          <Link to="/artworks?category=Character+design" className="category-card"><img src="/artworks/little-explorer.jpg" alt="Little Explorer character illustration" loading="lazy" /><span>01 / Characters</span></Link>
          <Link to="/artworks?category=Children’s+illustration" className="category-card"><img src="/artworks/first-haircut.jpg" alt="A child getting their first haircut, picture-book illustration" loading="lazy" /><span>02 / Children’s stories</span></Link>
          <Link to="/artworks?category=Worlds+%26+scenes" className="category-card"><img src="/artworks/firefly-path.jpg" alt="A firefly-lit path through an imagined forest" loading="lazy" /><span>03 / Worlds & scenes</span></Link>
          <Link to="/artworks?category=Portraits" className="category-card"><img src="/artworks/portrait-in-olive.jpg" alt="Expressive portrait study in olive tones" loading="lazy" /><span>04 / Portraits</span></Link>
        </div>
      </section>

      <section className="instagram-feed portfolio-section" aria-labelledby="instagram-heading">
        <div className="section-heading-row"><div><p className="eyebrow">Sketches, stories & new work</p><h2 id="instagram-heading">A little more from <em>my world.</em></h2></div><a className="text-link" href="https://www.instagram.com/karuna.artwork/" target="_blank" rel="noopener noreferrer"><Camera size={18} /> @karuna.artwork <ArrowRight size={17} /></a></div>
        <div className="instagram-grid">
          {instagramPreview.slice(0, visibleInstagramPosts).map((post) => <a key={post.image} className="instagram-tile" href="https://www.instagram.com/karuna.artwork/" target="_blank" rel="noopener noreferrer" aria-label={`${post.alt} — visit Karuna on Instagram`}>
            <img src={post.image} alt={post.alt} loading="lazy" />
            <span className="instagram-tile-overlay"><Camera size={22} aria-hidden="true" /><span>View on Instagram</span></span>
          </a>)}
        </div>
        <div className="instagram-actions">
          {visibleInstagramPosts < instagramPreview.length && <button className="instagram-load-more" type="button" onClick={() => setVisibleInstagramPosts((count) => Math.min(count + 6, instagramPreview.length))}>Load More</button>}
          <a className="instagram-follow" href="https://www.instagram.com/karuna.artwork/" target="_blank" rel="noopener noreferrer"><Camera size={18} /> Follow on Instagram</a>
        </div>
      </section>

      <section className="learning-note"><div><p className="eyebrow">Make something of your own</p><h2>There’s always room<br />for <em>one more story.</em></h2><p>Curious about drawing or illustration? I teach relaxed, thoughtful art sessions for children and adults, online and in Jaipur.</p><Link to="/classes" className="text-link">Explore art classes <ArrowRight size={17} /></Link></div><img src="/artworks/street-style.jpg" alt="Colourful character design created by Karuna" loading="lazy" /></section>

      <section className="home-testimonials"><p className="eyebrow">From the classroom</p><h2>Student <em>stories.</em></h2><div className="home-quote-grid"><blockquote><span>“</span><p>Karuna’s classes are a breath of fresh air. She doesn’t just teach you how to paint; she teaches you how to feel what you're painting. I've found my passion again.</p><cite>Elena R. <small>Online Classes</small></cite></blockquote><blockquote><span>“</span><p>My 10-year-old looks forward to Saturday classes all week. Karuna is incredibly patient and knows exactly how to make art fun and accessible for kids.</p><cite>Marcus T. <small>Kids Book Classes</small></cite></blockquote><blockquote><span>“</span><p>The abstract workshop completely shifted my perspective. The space she creates is completely free of judgment, which allowed me to truly experiment.</p><cite>Sarah J. <small>Weekend Workshop</small></cite></blockquote></div></section>

      <section className="portfolio-social"><p className="eyebrow">Have a project in mind?</p><h2>Come say <em>hello.</em></h2><Link className="text-link" to="/contact">Get in touch <ArrowRight size={17} /></Link></section>
    </div>
  );
}

export default Home;
