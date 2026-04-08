import { Link } from 'react-router-dom';
import { Palette, Users, MapPin, Image as ImageIcon, BookOpen, Star } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-image-wrapper">
            <div className="hero-blob-bg"></div>
            <img 
              src="/artist_portrait.png" 
              alt="Karuna teaching art in her studio" 
              className="hero-image"
            />
            <div className="floating-badge">
              <Star className="badge-icon" size={20} />
              <span>Over 100+ Students</span>
            </div>
          </div>
          
          <div className="hero-content">
            <h1 className="hero-title">
              Hi, I'm Karuna. <br/>
              <span className="text-accent">Let's create something beautiful together.</span>
            </h1>
            <p className="hero-bio">
              Welcome to my digital studio. I'm a freelance artist specializing in contemporary paintings and illustrations. Whether you're here to explore my latest artworks or join one of my interactive classes, you've found a place to let your creativity bloom.
            </p>
            <div className="hero-actions">
              <Link to="/artworks" className="btn btn-outline">Explore my art</Link>
              <Link to="/classes" className="btn btn-primary">Book a Class</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="features-section texture-overlay">
        <div className="container features-container">
          <Link to="/classes" className="feature-card class-card">
            <div className="card-content">
              <Users size={32} className="card-icon" />
              <h2>Classes & Students</h2>
              <p>Join tailored sessions for kids and adults. Express yourself with guided tutorials.</p>
              <span className="card-link">View Schedule &rarr;</span>
            </div>
            <div className="card-bg class-bg"></div>
          </Link>
          
          <Link to="/artworks" className="feature-card art-card">
            <div className="card-content">
              <Palette size={32} className="card-icon" />
              <h2>Original Artworks</h2>
              <p>Discover my gallery of illustrations, paintings, and bespoke custom commissions.</p>
              <span className="card-link">Explore Gallery &rarr;</span>
            </div>
            <div className="card-bg art-bg"></div>
          </Link>
        </div>
      </section>

      {/* Quick Access Grid Section */}
      <section className="quick-access-section">
        <div className="container">
          <h2 className="section-title">Discover</h2>
          <div className="quick-grid">
            <Link to="/lessons" className="grid-tile">
              <BookOpen size={24} />
              <span>Story Gallery</span>
            </Link>
            <Link to="/classes" className="grid-tile">
              <Users size={24} />
              <span>Book Classes</span>
            </Link>
            <Link to="/artworks" className="grid-tile">
              <ImageIcon size={24} />
              <span>Illustration</span>
            </Link>
            <Link to="/artworks" className="grid-tile">
              <Palette size={24} />
              <span>Paintings</span>
            </Link>
            <Link to="/collaboration" className="grid-tile">
              <Star size={24} />
              <span>Custom Work</span>
            </Link>
            <Link to="/classes" className="grid-tile">
              <MapPin size={24} />
              <span>Workshop</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
