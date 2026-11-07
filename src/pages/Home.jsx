import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowRight, Camera } from 'lucide-react';
import ResponsiveArtworkImage from '../components/ResponsiveArtworkImage';
import './Home.css';

const workCategories = [
  { title: 'Children’s Book Illustration', image: '/artworks/gentle-giant.jpg', alt: 'A young reader shares a story beside a gentle elephant', filter: 'Children’s illustration' },
  { title: 'Digital Illustrations', image: '/artworks/digital-makeup-illustration.jpg', alt: 'A warm-toned digital illustration of a woman applying lipstick while looking in a mirror', filter: 'Character design' },
  { title: 'Urban Sketches', image: '/artworks/Urban%20Sketchers/SKM_C251i26101423410.jpg', alt: 'Urban Sketch 05, an urban sketch from Karuna Gupta’s sketchbook', filter: 'Urban Sketches' },
  { title: 'Custom Artwork', image: '/artworks/gone-fishing.jpg', alt: 'Gone Fishing, a peaceful illustrated scene by the water', filter: 'Portraits' },
];

const instagramPreview = [
  { reel: 'https://www.instagram.com/karuna.artwork/reel/DfYg4nuScVn/', image: '/artworks/little-explorer.jpg', alt: 'Little Explorer character illustration' },
  { reel: 'https://www.instagram.com/karuna.artwork/reel/DeWqYAoNv9J/', image: '/artworks/gentle-giant.jpg', alt: 'A girl reading beside a gentle elephant' },
  { reel: 'https://www.instagram.com/karuna.artwork/reel/De6mQGXSV0s/', image: '/artworks/portrait-in-olive.jpg', alt: 'Portrait study in olive tones' },
  { reel: 'https://www.instagram.com/karuna.artwork/reel/DcFphVWSQjx/', image: '/artworks/song-for-my-cat.jpg', alt: 'A colourful picture-book illustration' },
  { reel: 'https://www.instagram.com/karuna.artwork/reel/DaaD-hcSsVt/', image: '/artworks/first-haircut.jpg', alt: 'A child’s first haircut, illustrated' },
  { reel: 'https://www.instagram.com/karuna.artwork/reel/DY_i7XJyEmf/', image: '/artworks/street-style.jpg', alt: 'Character design in a bright street style' },
];

function Home() {
  return (
    <div className="home-page portfolio-home">
      <section className="portfolio-hero">
        <div className="portfolio-hero-copy">
          <p className="eyebrow">Online art lessons in English · Worldwide</p>
          <h1>Stories made<br />to <em>stay with you.</em></h1>
          <p className="hero-intro">I’m Karuna Gupta, an art educator and illustrator teaching learners around the world. I’ve helped hundreds of learners—from children to adults, beginners to advanced artists—build their illustration and watercolour skills online, with thoughtful one-to-one feedback.</p>
          <div className="hero-actions">
            <Link to="/classes" className="text-link">Ask about online lessons <ArrowRight size={17} /></Link>
            <Link to="/artworks" className="text-link text-link-muted">Explore the artwork <ArrowDownRight size={17} /></Link>
          </div>
          <div className="hero-note"><span className="note-mark">✳</span><span>Digital & traditional<br />Illustration · Storytelling · Character design</span></div>
        </div>
        <Link to="/artworks" className="portfolio-hero-art" aria-label="Explore the Bath Time Buddies illustration">
          <ResponsiveArtworkImage src="/artworks/boy-and-dog.jpg" alt="A smiling child washes a brown dog in a tub of foamy water in a sunlit garden, illustrated by Karuna Gupta" sizes="(max-width: 900px) 92vw, 52vw" fetchPriority="high" />
          <span className="art-caption"><b>Bath Time Buddies</b><span>Picture-book illustration · 2024</span></span>
          <span className="hero-sticker">A little<br />wonder<br /><i>in every story</i></span>
        </Link>
      </section>

      <section className="educator-intro portfolio-section" aria-labelledby="educator-heading">
        <div>
          <p className="eyebrow">One-to-one guidance · All experience levels</p>
          <h2 id="educator-heading">Build skills with feedback shaped around <em>your way of seeing.</em></h2>
        </div>
        <div className="educator-intro-copy">
          <p>Karuna teaches learners around the world in English. Her online illustration and watercolour lessons welcome children and adults, whether they are just starting or developing advanced skills. Each learner can receive personal feedback and ask about a lesson that fits their goals.</p>
          <Link to="/classes" className="text-link">Tell Karuna what you’d like to learn <ArrowRight size={17} /></Link>
        </div>
      </section>

      <section className="portfolio-section featured-section">
        <div className="section-heading-row"><div><p className="eyebrow">A few ways into my practice</p><h2>Explore by <em>category</em></h2></div><Link className="text-link" to="/artworks">View the gallery <ArrowRight size={17} /></Link></div>
        <div className="work-category-grid">
          {workCategories.map((category, index) => <Link to={`/artworks?category=${encodeURIComponent(category.filter)}`} className="work-category-card" key={category.title}>
            <div className="work-category-image"><ResponsiveArtworkImage src={category.image} alt={category.alt} sizes="(max-width: 620px) 92vw, (max-width: 900px) 44vw, 23vw" loading="lazy" /></div>
            <div className="work-category-copy"><span className="work-category-number">0{index + 1} / Explore</span><h3>{category.title}</h3><span className="work-category-link">See the work <ArrowRight size={17} /></span></div>
          </Link>)}
        </div>
      </section>

      <section className="artist-intro-section">
        <div className="artist-intro-image"><ResponsiveArtworkImage src="/artist_portrait.jpg" alt="Karuna Gupta, illustrator and visual artist" sizes="(max-width: 620px) 100vw, 50vw" loading="lazy" /></div>
        <div className="artist-intro-copy"><p className="eyebrow">A little about me</p><h2>Drawing from<br /><em>the everyday.</em></h2><p>I’m an illustrator and visual artist with a soft spot for expressive characters, quiet moments and the small details that make a story feel real. My work moves between children’s books, character design, portraits and imagined worlds.</p><p>From the first loose sketch to the final colour, I love finding the feeling at the heart of an idea and giving it a life on the page.</p><Link to="/about" className="text-link">More about Karuna <ArrowRight size={17} /></Link></div>
      </section>

      <section className="instagram-feed portfolio-section" aria-labelledby="instagram-heading">
        <div className="section-heading-row"><div><p className="eyebrow">Sketches, stories & new work</p><h2 id="instagram-heading">A little more from <em>my world.</em></h2></div><a className="text-link" href="https://www.instagram.com/karuna.artwork/" target="_blank" rel="noopener noreferrer"><Camera size={18} /> @karuna.artwork <ArrowRight size={17} /></a></div>
        <div className="instagram-grid">
          {instagramPreview.map((post, index) => <a key={post.reel} className="instagram-tile" href={post.reel} target="_blank" rel="noopener noreferrer" aria-label={`Watch Instagram Reel ${index + 1}: ${post.alt}`}>
            <ResponsiveArtworkImage src={post.image} alt={post.alt} sizes="(max-width: 620px) 48vw, (max-width: 900px) 30vw, 16vw" loading="lazy" />
            <span className="instagram-tile-overlay"><Camera size={22} aria-hidden="true" /><span>Watch Reel</span></span>
          </a>)}
        </div>
        <div className="instagram-actions">
          <a className="instagram-follow" href="https://www.instagram.com/karuna.artwork/" target="_blank" rel="noopener noreferrer"><Camera size={18} /> Follow on Instagram</a>
        </div>
      </section>

      <section className="portfolio-social"><p className="eyebrow">Have a project in mind?</p><h2>Come say <em>hello.</em><br />Or better, share your artwork with me.</h2><Link className="text-link" to="/classes">Share your artwork <ArrowRight size={17} /></Link></section>
    </div>
  );
}

export default Home;
