import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer texture-overlay">
      <div className="container footer-content">
        <div className="footer-brand">
          <h2>Karuna Artwork</h2>
          <p className="footer-tagline">Explore my art. Have a great time.</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-col">
            <h3>Explore</h3>
            <Link to="/classes">Classes</Link>
            <Link to="/artworks">Artworks</Link>
            <Link to="/lessons">Lessons</Link>
          </div>
          <div className="footer-col">
            <h3>Connect</h3>
            <Link to="/collaboration">Collaboration</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/signin">Sign In</Link>
          </div>
          <div className="footer-col">
            <h3>Social</h3>
            <div className="social-links">
              <a href="https://www.instagram.com/karuna.artwork" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
              <a href="https://www.linkedin.com/in/karunaartwork/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LN</a>
              <a href="https://www.youtube.com/@karunaartwork4996" target="_blank" rel="noopener noreferrer" aria-label="YouTube">YT</a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} Karuna Artwork. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
