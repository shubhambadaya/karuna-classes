import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Classes from './pages/Classes';
import Artworks from './pages/Artworks';
import Lessons from './pages/Lessons';
import Collaboration from './pages/Collaboration';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import DevInspector from './components/DevInspector';
import { useEffect, lazy, Suspense } from 'react';
import { captureUTMParams } from './utils/tracking';

const LeadsDashboard = lazy(() => import('./pages/LeadsDashboard'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const pages = {
      '/': ['Karuna Gupta — Illustrator & Visual Artist', 'Explore illustrations, character design, children’s book artwork and imagined worlds by Karuna Gupta, illustrator and visual artist in Jaipur, India.'],
      '/about': ['About Karuna Gupta — Illustrator & Visual Artist', 'Meet Karuna Gupta, illustrator and visual artist. Read about her creative journey, artistic practice and teaching.'],
      '/artworks': ['Artwork Gallery — Karuna Gupta', 'Browse character design, children’s illustration, picture-book covers, portraits and visual storytelling by Karuna Gupta.'],
      '/classes': ['Art Classes — Karuna Gupta', 'Explore drawing, painting and illustration classes with Karuna Gupta for children and adults.'],
      '/contact': ['Contact Karuna Gupta', 'Get in touch with Karuna Gupta about illustration projects, artwork, classes and workshops.'],
      '/lessons': ['Art Lessons — Karuna Gupta', 'Learn about Karuna Gupta’s teaching approach and student experiences.'],
      '/collaboration': ['Creative Collaboration — Karuna Gupta', 'Discuss illustration, visual development and custom artwork with Karuna Gupta.'],
      '/signin': ['Sign In — Karuna Artwork', 'Sign in to your Karuna Artwork account.'],
    };
    const [title, description] = pages[pathname] || ['Karuna Artwork', 'Illustration, art classes and creative work by Karuna Gupta.'];
    document.title = title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) descriptionTag.setAttribute('content', description);
  }, [pathname]);

  return null;
}

function UTMCapture() {
  useEffect(() => {
    captureUTMParams();
  }, []);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <UTMCapture />
      <div className="app">
        <DevInspector />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/artworks" element={<Artworks />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/collaboration" element={<Collaboration />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/admin/leads" element={<Suspense fallback={null}><LeadsDashboard /></Suspense>} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
