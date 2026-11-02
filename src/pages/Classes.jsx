import { useState, useEffect } from 'react';
import { Clock, Users, Filter } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './Classes.css';

const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/[^0-9]/g, '');
const CLASS_ARTWORKS = [
  '/artworks/little-explorer.jpg',
  '/artworks/gentle-giant.jpg',
  '/artworks/bridge-at-dusk.jpg',
  '/artworks/song-for-my-cat.jpg',
  '/artworks/first-haircut.jpg',
  '/artworks/street-style.jpg',
];

function getClassArtwork(title = '', index = 0) {
  const name = title.toLowerCase();
  if (/story|children|kids|picture/.test(name)) return '/artworks/gentle-giant.jpg';
  if (/drawing|sketch|figure/.test(name)) return '/artworks/little-explorer.jpg';
  if (/water|paint|oil|acrylic/.test(name)) return '/artworks/bridge-at-dusk.jpg';
  if (/character|illustrat/.test(name)) return '/artworks/street-style.jpg';
  return CLASS_ARTWORKS[index % CLASS_ARTWORKS.length];
}

function getBookingHref(classTitle) {
  const message = `Hi Karuna, I am interested in the ${classTitle} class.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const MOCK_CLASSES = [
  { id: 1, title: 'Watercolor Basics', type: 'Online Classes', ageGroup: 'All ages', duration: '4 weeks' },
  { id: 2, title: 'Acrylic Pouring Workshop', type: 'Workshop', ageGroup: 'Adults', duration: '1 day' },
  { id: 3, title: 'Kids Intro to Sketching', type: 'Book Classes', ageGroup: 'Kids', duration: '6 weeks' },
  { id: 4, title: 'Advanced Oil Painting', type: 'Online Classes', ageGroup: 'Adults', duration: '8 weeks' },
  { id: 5, title: 'Abstract Art for Teens', type: 'Book Classes', ageGroup: 'Kids', duration: '4 weeks' },
  { id: 6, title: 'Creative Illustration Workshop', type: 'Workshop', ageGroup: 'All ages', duration: '2 days' },
].map((classItem, index) => ({
  ...classItem,
  img: getClassArtwork(classItem.title, index),
  fallbackImg: getClassArtwork(classItem.title, index),
}));

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterAge, setFilterAge] = useState('All');
  const [filterType, setFilterType] = useState('All');
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data, error } = await supabase
          .from('classes')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          const mapped = data.map(c => ({
            id: c.id,
            title: c.title,
            type: c.type,
            ageGroup: c.age_group,
            duration: c.duration,
            img: c.img || getClassArtwork(c.title),
            fallbackImg: getClassArtwork(c.title),
          }));
          setClasses(mapped);
        } else {
          setClasses(MOCK_CLASSES);
        }
      } catch (err) {
        console.error('Error fetching classes:', err);
        setClasses(MOCK_CLASSES);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const filteredClasses = classes.filter(c => {
    if (filterAge !== 'All' && c.ageGroup !== filterAge && c.ageGroup !== 'All ages') return false;
    if (filterType !== 'All' && c.type !== filterType) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="classes-page page-transition-enter-active">
        <div className="page-header pattern-bg" data-component="src/pages/Classes.jsx (Header)">
          <div className="container">
            <h1>Learning with Karuna</h1>
            <p>Discover classes designed to ignite your creativity, regardless of your skill level.</p>
          </div>
        </div>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8rem 2rem' }}>
          <div className="loading-spinner" style={{ fontSize: '1.25rem', color: 'var(--color-sage)' }}>Loading classes...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="classes-page page-transition-enter-active">
      <div className="page-header pattern-bg" data-component="src/pages/Classes.jsx (Header)">
        <div className="container">
          <h1>Learning with Karuna</h1>
          <p>Discover classes designed to ignite your creativity, regardless of your skill level.</p>
        </div>
      </div>

      <div className="container">
        <div className="filter-bar glass-panel" data-component="src/pages/Classes.jsx (Filter Bar)">
          <div className="filter-group">
            <Filter size={20} className="filter-icon" />
            <span className="filter-label">Filter by:</span>
          </div>
          
          <div className="filter-controls">
            <select value={filterAge} onChange={(e) => setFilterAge(e.target.value)} className="filter-select">
              <option value="All">All Ages</option>
              <option value="Kids">Kids</option>
              <option value="Adults">Adults</option>
            </select>

            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
              <option value="All">All Types</option>
              <option value="Book Classes">Book Classes</option>
              <option value="Online Classes">Online Classes</option>
              <option value="Workshop">Workshops</option>
            </select>
          </div>
        </div>

        <div className="classes-grid" data-component="src/pages/Classes.jsx (Classes Grid)">
          {filteredClasses.length > 0 ? (
            filteredClasses.map((cls) => (
              <div key={cls.id} className="class-card-item">
                <div className="class-img-wrapper">
                  <img
                    src={cls.img}
                    alt={`Artwork for ${cls.title}`}
                    loading="lazy"
                    onError={(event) => {
                      if (event.currentTarget.dataset.fallbackApplied) return;
                      event.currentTarget.dataset.fallbackApplied = 'true';
                      event.currentTarget.src = cls.fallbackImg || getClassArtwork(cls.title);
                    }}
                  />
                  <span className="class-badge type-badge">{cls.type}</span>
                </div>
                <div className="class-details">
                  <h3>{cls.title}</h3>
                  
                  <div className="class-meta">
                    <span className="meta-item"><Users size={16} /> {cls.ageGroup}</span>
                    <span className="meta-item"><Clock size={16} /> {cls.duration}</span>
                  </div>
                  
                  <div className="class-footer">
                    <span className="class-price">₹999 <small>/ hour</small></span>
                    <a className="btn btn-primary btn-sm" href={getBookingHref(cls.title)} target="_blank" rel="noopener noreferrer" aria-label={`Ask about booking ${cls.title} on WhatsApp`}>Book Now</a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No classes found matching your criteria. Try adjusting the filters.</p>
              <button className="btn btn-outline" onClick={() => {setFilterAge('All'); setFilterType('All');}}>Reset Filters</button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Classes;
