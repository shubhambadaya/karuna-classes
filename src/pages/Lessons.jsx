import { Quote, Sparkles, BookOpen } from 'lucide-react';
import './Lessons.css';

const Lessons = () => {
  return (
    <div className="lessons-page page-transition-enter-active">
      {/* Philosophy hero */}
      <section className="philosophy-section texture-overlay">
        <div className="container">
          <div className="philosophy-content">
            <Sparkles size={48} className="icon-accent" />
            <h1>Teaching Philosophy</h1>
            <p className="lead-text">
              Art isn't just about perfect technique—it's about learning to see the world differently. In my classes, we focus on unblocking your natural creativity before we refine your brushstrokes. 
            </p>
            <p className="secondary-text">
              Whether you are holding a pencil for the first time or looking to master oils, my goal is to provide a nurturing, judgment-free zone where your unique style can flourish.
            </p>
          </div>
        </div>
      </section>

      {/* What you learn */}
      <section className="what-you-learn">
        <div className="container">
          <h2 className="section-title">What You Will Learn</h2>
          <div className="learn-grid">
            <div className="learn-card">
              <BookOpen className="learn-icon" />
              <h3>Foundational Skills</h3>
              <p>Mastering line, value, and color theory to give your work structure and depth.</p>
            </div>
            <div className="learn-card">
              <BookOpen className="learn-icon" />
              <h3>Medium Mastery</h3>
              <p>Exploring the unique properties of watercolor, acrylic, and oil paints through hands-on practice.</p>
            </div>
            <div className="learn-card">
              <BookOpen className="learn-icon" />
              <h3>Personal Voice</h3>
              <p>Moving beyond copying towards creating original conceptual works that tell your story.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Student Stories</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <Quote className="quote-icon" />
              <p className="quote-text">"Karuna’s classes are a breath of fresh air. She doesn’t just teach you how to paint; she teaches you how to feel what you're painting. I've found my passion again."</p>
              <div className="student-info">
                <div className="avatar bg-1">E</div>
                <div>
                  <h4>Elena R.</h4>
                  <span>Online Classes</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <Quote className="quote-icon" />
              <p className="quote-text">"My 10-year-old looks forward to Saturday classes all week. Karuna is incredibly patient and knows exactly how to make art fun and accessible for kids."</p>
              <div className="student-info">
                <div className="avatar bg-2">M</div>
                <div>
                  <h4>Marcus T.</h4>
                  <span>Kids Book Classes</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <Quote className="quote-icon" />
              <p className="quote-text">"The abstract workshop completely shifted my perspective. The space she creates is completely free of judgment, which allowed me to truly experiment."</p>
              <div className="student-info">
                <div className="avatar bg-3">S</div>
                <div>
                  <h4>Sarah J.</h4>
                  <span>Weekend Workshop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lessons;
