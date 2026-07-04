import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
            {user ? (
              <>
                <span className="user-greet" style={{ display: 'block', marginBottom: '1rem', color: 'var(--color-terracotta)', fontWeight: '500' }}>
                  Hi, {user.user_metadata?.full_name || user.email.split('@')[0]}
                </span>
                <button onClick={() => { handleSignOut(); toggleMenu(); }} className="btn btn-outline" style={{ width: '100%' }}>Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/signin" className="btn btn-outline" onClick={toggleMenu}>Sign In</Link>
                <Link to="/classes" className="btn btn-primary" onClick={toggleMenu}>Subscribe</Link>
              </>
            )}
          </div>
        </nav>

        <div className="nav-actions desktop-only">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="user-greet" style={{ marginRight: '1rem', color: 'var(--color-terracotta)', fontWeight: '500' }}>
                Hi, {user.user_metadata?.full_name || user.email.split('@')[0]}
              </span>
              <button onClick={handleSignOut} className="btn btn-outline">Sign Out</button>
            </div>
          ) : (
            <>
              <Link to="/signin" className="btn btn-outline" style={{ marginRight: '1rem' }}>Sign In</Link>
              <Link to="/classes" className="btn btn-primary">Subscribe</Link>
            </>
          )}
        </div>

        <button className="mobile-toggle" onClick={toggleMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
