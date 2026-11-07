import { ArrowRight } from 'lucide-react';
import './Classes.css';

const CONSULTATION_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScLBo2EjmBCEzFKnVsxH2XuCQPKAMGRCgFFIiyddicUzfjslQ/viewform';

const Classes = () => {
  return (
    <div className="classes-page page-transition-enter-active">
      <div className="page-header pattern-bg" data-component="src/pages/Classes.jsx (Header)">
        <div className="container">
          <h1>Learning with Karuna</h1>
          <p>Online art classes and one-to-one feedback with Karuna Gupta, an educator who has helped hundreds of learners—from children to advanced artists—around the world.</p>
        </div>
      </div>

      <section className="class-consultation-section" aria-labelledby="consultation-heading">
        <div className="class-consultation-copy">
          <p className="eyebrow">Student consultation & feedback</p>
          <h2 id="consultation-heading">Let’s make space for <em>your questions.</em></h2>
          <p>Ask about online illustration or watercolour lessons, share your learning goals, or request one-to-one feedback to improve your work. Classes welcome beginners through advanced learners, including children worldwide. Use the form or send Karuna a WhatsApp message to ask questions and schedule a lesson.</p>
          <a className="text-link" href={CONSULTATION_FORM_URL} target="_blank" rel="noopener noreferrer">Open the consultation form <ArrowRight size={17} /></a>
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
            <summary>Do you offer online art education in Jaipur?</summary>
            <p>Yes. Karuna is based in Jaipur, Rajasthan and offers art guidance online, so learners can connect from Jaipur and other parts of India.</p>
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
