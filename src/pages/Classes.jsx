import { ArrowRight } from 'lucide-react';
import './Classes.css';

const CONSULTATION_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScLBo2EjmBCEzFKnVsxH2XuCQPKAMGRCgFFIiyddicUzfjslQ/viewform';

const Classes = () => {
  return (
    <div className="classes-page page-transition-enter-active">
      <div className="page-header pattern-bg" data-component="src/pages/Classes.jsx (Header)">
        <div className="container">
          <h1>Online art lessons for learners everywhere</h1>
          <p>Learn illustration and watercolour with Karuna Gupta, an art educator teaching learners worldwide. Lessons are in English and welcome children and adults, from beginners to advanced artists.</p>
        </div>
      </div>

      <section className="class-consultation-section" aria-labelledby="consultation-heading">
        <div className="class-consultation-copy">
          <p className="eyebrow">Student consultation & feedback</p>
          <h2 id="consultation-heading">Tell Karuna what you’d like to <em>learn.</em></h2>
          <p>Ask about online illustration or watercolour lessons, share your experience and goals, or request one-to-one feedback on your work. Lessons are taught in English and are open to children and adults worldwide, from beginners to advanced learners. Use the form to start a conversation and arrange a lesson.</p>
          <a className="text-link" href={CONSULTATION_FORM_URL} target="_blank" rel="noopener noreferrer">Ask about lessons or feedback <ArrowRight size={17} /></a>
        </div>
        <div className="consultation-form-frame">
          <iframe
            src={`${CONSULTATION_FORM_URL}?embedded=true`}
            title="Student consultation and feedback form"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </section>

      <section className="pre-recorded-coming-soon" aria-labelledby="pre-recorded-heading">
        <p className="eyebrow">Coming soon</p>
        <h2 id="pre-recorded-heading">Pre-recorded <em>courses.</em></h2>
        <p>Self-paced art courses are in the works. Check back soon for details.</p>
      </section>

      <section className="art-education-faq" aria-labelledby="art-education-faq-heading">
        <p className="eyebrow">A few helpful details</p>
        <h2 id="art-education-faq-heading">Online art education <em>FAQ</em></h2>
        <div className="art-education-faq-list">
          <details>
            <summary>Do you teach learners in the UK, US, Australia, Europe and the Middle East?</summary>
            <p>Yes. Karuna welcomes online learners worldwide, including the UK, US, Australia, New Zealand, the Netherlands, France, Spain, Dubai and other parts of the Middle East. Lessons are in English; use the form to discuss your time zone and availability.</p>
          </details>
          <details>
            <summary>Are online art lessons available worldwide?</summary>
            <p>Yes. Karuna welcomes learners worldwide. Lessons are conducted in English; use the consultation form to ask about availability and format.</p>
          </details>
          <details>
            <summary>What languages are lessons taught in?</summary>
            <p>Lessons and instruction are in English. Learners can ask questions through the consultation form before scheduling.</p>
          </details>
          <details>
            <summary>What can I ask for feedback on?</summary>
            <p>You can use the consultation form to ask about your learning goals and request feedback related to drawing, painting, illustration or digital art.</p>
          </details>
          <details>
            <summary>Are pre-recorded art courses available?</summary>
            <p>Pre-recorded courses are coming soon. For current questions or student feedback, please use the consultation form above.</p>
          </details>
        </div>
      </section>

    </div>
  );
};

export default Classes;
