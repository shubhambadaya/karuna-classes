import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer texture-overlay" data-component="src/components/Footer.jsx">
      <div className="container footer-content">
        <div className="footer-brand">
          <h2>Karuna Gupta</h2>
          <p className="footer-tagline">Illustrator & visual artist telling stories through pictures.</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-col">
            <h3>Explore</h3>
            <Link to="/about">About</Link>
            <Link to="/artworks">Artwork</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/classes">Classes</Link>
          </div>
          <div className="footer-col">
            <h3>Connect</h3>
            <Link to="/contact">Contact</Link>
            <a href={import.meta.env.VITE_WHATSAPP_NUMBER ? `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}` : '/contact'} target={import.meta.env.VITE_WHATSAPP_NUMBER ? '_blank' : undefined} rel={import.meta.env.VITE_WHATSAPP_NUMBER ? 'noopener noreferrer' : undefined}>WhatsApp</a>
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
