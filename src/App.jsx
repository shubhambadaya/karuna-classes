import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import Shop from './pages/Shop';
import DevInspector from './components/DevInspector';
import { useEffect } from 'react';
import { captureUTMParams } from './utils/tracking';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const pages = {
      '/': ['Online Art Lessons in English Worldwide | Karuna Gupta', 'Online illustration and watercolour lessons in English for learners in the UK, US, Australia, New Zealand, Europe and the Middle East, with personal feedback.'],
      '/about': ['About Karuna Gupta — Art Educator & Illustrator', 'Meet Karuna Gupta, art educator and illustrator. She has helped hundreds of learners worldwide develop illustration and watercolour skills through online lessons and one-to-one feedback.'],
      '/artworks': ['Artwork Gallery — Karuna Gupta', 'Browse character design, children’s illustration, picture-book covers, portraits and visual storytelling by Karuna Gupta.'],
      '/shop': ['Shop Artworks — Karuna Gupta', 'Browse digital artwork and creative downloads by Karuna Gupta.'],
      '/classes': ['Online Art Lessons Worldwide | Karuna Gupta', 'English-language illustration and watercolour lessons for children and adults in the UK, US, Australia, New Zealand, the Netherlands, France, Spain, Dubai and the wider Middle East. Ask about one-to-one feedback.'],
      '/contact': ['Contact Karuna Gupta', 'Get in touch with Karuna Gupta about illustration projects, artwork, classes and workshops.'],
      '/lessons': ['Art Lessons — Karuna Gupta', 'Learn about Karuna Gupta’s teaching approach and student experiences.'],
      '/collaboration': ['Creative Collaboration — Karuna Gupta', 'Discuss illustration, visual development and custom artwork with Karuna Gupta.'],
    };
    const [title, description] = pages[pathname] || ['Karuna Artwork', 'Illustration, art classes and creative work by Karuna Gupta.'];
    document.title = title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) descriptionTag.setAttribute('content', description);
    const canonicalUrl = `https://karunagupta.online${pathname === '/' ? '/' : pathname}`;
    const canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) canonicalTag.setAttribute('href', canonicalUrl);
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) ogTitleTag.setAttribute('content', title);
    const ogDescriptionTag = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionTag) ogDescriptionTag.setAttribute('content', description);
    const ogUrlTag = document.querySelector('meta[property="og:url"]');
    if (ogUrlTag) ogUrlTag.setAttribute('content', canonicalUrl);
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
            <Route path="/shop" element={<Shop />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/collaboration" element={<Collaboration />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<Navigate to="/contact" replace />} />
            <Route path="/admin/leads" element={<Navigate to="/contact" replace />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
