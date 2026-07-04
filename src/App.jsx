import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Classes from './pages/Classes';
import Artworks from './pages/Artworks';
import Lessons from './pages/Lessons';
import Collaboration from './pages/Collaboration';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import LeadsDashboard from './pages/LeadsDashboard';
import DevInspector from './components/DevInspector';
import { useEffect } from 'react';
import { captureUTMParams } from './utils/tracking';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
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
            <Route path="/classes" element={<Classes />} />
            <Route path="/artworks" element={<Artworks />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/collaboration" element={<Collaboration />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/admin/leads" element={<LeadsDashboard />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
