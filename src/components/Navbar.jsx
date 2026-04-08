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
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="brand-logo">
          Karuna Artwork
        </Link>
        
        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/lessons" onClick={toggleMenu}>Lessons</NavLink>
          <NavLink to="/classes" onClick={toggleMenu}>Classes</NavLink>
          <NavLink to="/artworks" onClick={toggleMenu}>Projects</NavLink>
          <NavLink to="/collaboration" onClick={toggleMenu}>Collaboration</NavLink>
          <NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink>
          
          <div className="nav-actions mobile-only">
            <Link to="/signin" className="btn btn-outline" onClick={toggleMenu}>Sign In</Link>
            <Link to="/classes" className="btn btn-primary" onClick={toggleMenu}>Subscribe</Link>
          </div>
        </nav>

        <div className="nav-actions desktop-only">
          <Link to="/signin" className="btn btn-outline" style={{ marginRight: '1rem' }}>Sign In</Link>
          <Link to="/classes" className="btn btn-primary">Subscribe</Link>
        </div>

        <button className="mobile-toggle" onClick={toggleMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
