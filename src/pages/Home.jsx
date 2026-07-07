import { Link } from 'react-router-dom';
import { Users, MapPin, BookOpen, Star, MessageCircle } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" data-component="src/pages/Home.jsx (Hero Section)">
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
              Art teacher and freelance artist with 10 years of experience. I conduct online classes and workshops
              for all age groups in watercolour painting, acrylics, sketching and more — with students across
              Bangalore, Mumbai, Gurgaon, Jaipur and worldwide, and top-rated profiles on Fiverr and Preply.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-outline">Get in Touch</Link>
              <Link to="/classes" className="btn btn-primary">Book a Class</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="features-section texture-overlay" data-component="src/pages/Home.jsx (Features Section)">
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
          
          <Link to="/contact" className="feature-card art-card">
            <div className="card-content">
              <MessageCircle size={32} className="card-icon" />
              <h2>Talk to Karuna</h2>
              <p>Questions about classes or want to try one first? Send a message and get a reply within 24 hours.</p>
              <span className="card-link">Get in Touch &rarr;</span>
            </div>
            <div className="card-bg art-bg"></div>
          </Link>
        </div>
      </section>

      {/* Quick Access Grid Section */}
      <section className="quick-access-section" data-component="src/pages/Home.jsx (Discover Grid)">
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
            <Link to="/classes" className="grid-tile">
              <MapPin size={24} />
              <span>Workshop</span>
            </Link>
            <Link to="/contact" className="grid-tile">
              <MessageCircle size={24} />
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
