import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`} data-component="src/components/Navbar.jsx">
      <div className="container nav-container">
        <Link to="/" className="brand-logo">
          <span>Karuna Gupta</span><small>Illustrator · Visual Artist</small>
        </Link>
        
        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/about" onClick={toggleMenu}>About</NavLink>
          <NavLink to="/artworks" onClick={toggleMenu}>Artwork</NavLink>
          <NavLink to="/shop" onClick={toggleMenu}>Shop</NavLink>
          <NavLink to="/classes" onClick={toggleMenu}>Classes</NavLink>
          {/* Projects and Collaboration tabs hidden for now — routes still work */}
          <NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink>
          
          <div className="nav-actions mobile-only">
            <Link to="/classes" className="btn btn-primary" onClick={toggleMenu}>Explore Classes</Link>
          </div>
        </nav>

        <div className="nav-actions desktop-only">
          <Link to="/classes" className="btn btn-primary">Explore Classes</Link>
        </div>

        <button className="mobile-toggle" onClick={toggleMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
