import { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './Artworks.css';

const ART_DATA = [
  { id: 1, title: 'Autumn Whisper', category: 'Paintings', medium: 'Oil on Canvas', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80', price: '$850' },
  { id: 2, title: 'Urban Jungle', category: 'Illustration', medium: 'Digital', img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=80', price: '$150' },
  { id: 3, title: 'Serenity', category: 'Paintings', medium: 'Watercolor', img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80', price: 'Sold' },
  { id: 4, title: 'Geometric Dreams', category: 'Illustration', medium: 'Mixed Media', img: 'https://images.unsplash.com/photo-1580136608079-72029d0de130?w=600&q=80', price: '$200' },
  { id: 5, title: 'Family Portrait', category: 'Custom Work', medium: 'Charcoal', img: 'https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?w=600&q=80', price: 'Enquire' },
  { id: 6, title: 'Ocean Breeze', category: 'Paintings', medium: 'Acrylic', img: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=600&q=80', price: '$450' },
];

const Artworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);

  const categories = ['All', 'Illustration', 'Paintings', 'Custom Work'];

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const { data, error } = await supabase
          .from('artworks')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          setArtworks(data);
        } else {
          setArtworks(ART_DATA);
        }
      } catch (err) {
        console.error('Error fetching artworks:', err);
        setArtworks(ART_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const filteredArts = activeTab === 'All' 
    ? artworks 
    : artworks.filter(art => art.category === activeTab);

  if (loading) {
    return (
      <div className="artworks-page page-transition-enter-active">
        <div className="page-header pattern-bg" data-component="src/pages/Artworks.jsx (Header)">
          <div className="container">
            <h1>My Gallery</h1>
            <p>A curated collection of my recent works and commissions.</p>
          </div>
        </div>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8rem 2rem' }}>
          <div className="loading-spinner" style={{ fontSize: '1.25rem', color: 'var(--color-sage)' }}>Loading gallery...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="artworks-page page-transition-enter-active">
      <div className="page-header pattern-bg" data-component="src/pages/Artworks.jsx (Header)">
        <div className="container">
          <h1>My Gallery</h1>
          <p>A curated collection of my recent works and commissions.</p>
        </div>
      </div>

      <div className="container">
        <div className="portfolio-tabs" data-component="src/pages/Artworks.jsx (Portfolio Tabs)">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`tab-btn ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="masonry-grid" data-component="src/pages/Artworks.jsx (Gallery Grid)">
          {filteredArts.map(art => (
            <div key={art.id} className="masonry-item" onClick={() => setLightboxImg(art)}>
              <img src={art.img} alt={art.title} loading="lazy" />
              <div className="masonry-overlay">
                <div className="overlay-content">
                  <h3>{art.title}</h3>
                  <p>{art.medium}</p>
                  <span className="price-tag">{art.price}</span>
                </div>
                <button className="btn-icon"><ExternalLink size={20}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxImg && (
        <div className="lightbox" onClick={() => setLightboxImg(null)}>
          <button className="close-lightbox"><X size={32} /></button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={lightboxImg.img} alt={lightboxImg.title} />
            <div className="lightbox-info">
              <h2>{lightboxImg.title}</h2>
              <p className="artist-meta">{lightboxImg.medium} &mdash; {lightboxImg.category}</p>
              <div className="lightbox-actions">
                <span className="lightbox-price">{lightboxImg.price}</span>
                <button className="btn btn-primary">Enquire about this piece</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Artworks;
