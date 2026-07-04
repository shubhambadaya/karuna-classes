import { useState, useEffect } from 'react';
import { Clock, Calendar, Users, Filter } from 'lucide-react';
import { supabase } from '../supabaseClient';
import BookingModal from '../components/BookingModal';
import './Classes.css';

const MOCK_CLASSES = [
  { id: 1, title: 'Watercolor Basics', type: 'Online Classes', ageGroup: 'All ages', duration: '4 weeks', price: '₹999', img: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=500&q=80' },
  { id: 2, title: 'Acrylic Pouring Workshop', type: 'Workshop', ageGroup: 'Adults', duration: '1 day', price: '₹1,499', img: 'https://images.unsplash.com/photo-1627958999335-8ccb59eb4225?w=500&q=80' },
  { id: 3, title: 'Kids Intro to Sketching', type: 'Book Classes', ageGroup: 'Kids', duration: '6 weeks', price: '₹1,999', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&q=80' },
  { id: 4, title: 'Advanced Oil Painting', type: 'Online Classes', ageGroup: 'Adults', duration: '8 weeks', price: '₹2,999', img: 'https://images.unsplash.com/photo-1578301978693-85fa9c026b47?w=500&q=80' },
  { id: 5, title: 'Abstract Art for Teens', type: 'Book Classes', ageGroup: 'Kids', duration: '4 weeks', price: '₹1,299', img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&q=80' },
  { id: 6, title: 'Pottery & Clay Workshop', type: 'Workshop', ageGroup: 'All ages', duration: '2 days', price: '₹1,999', img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&q=80' },
];

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterAge, setFilterAge] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [bookingKey, setBookingKey] = useState(0);

  const handleBookNow = (classTitle) => {
    setSelectedClass(classTitle);
    setBookingKey((prev) => prev + 1);
    setModalOpen(true);
  };

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
            price: c.price,
            img: c.img
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
                  <img src={cls.img} alt={cls.title} />
                  <span className="class-badge type-badge">{cls.type}</span>
                </div>
                <div className="class-details">
                  <h3>{cls.title}</h3>
                  
                  <div className="class-meta">
                    <span className="meta-item"><Users size={16} /> {cls.ageGroup}</span>
                    <span className="meta-item"><Clock size={16} /> {cls.duration}</span>
                  </div>
                  
                  <div className="class-footer">
                    <span className="class-price">{cls.price}</span>
                    <button className="btn btn-primary btn-sm" onClick={() => handleBookNow(cls.title)}>Book Now</button>
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

      <BookingModal
        key={bookingKey}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        classTitle={selectedClass}
      />
    </div>
  );
};

export default Classes;
