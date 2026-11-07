import { ArrowRight } from 'lucide-react';
import './Classes.css';

const CONSULTATION_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScLBo2EjmBCEzFKnVsxH2XuCQPKAMGRCgFFIiyddicUzfjslQ/viewform';

const Classes = () => {
  return (
    <div className="classes-page page-transition-enter-active">
      <div className="page-header pattern-bg" data-component="src/pages/Classes.jsx (Header)">
        <div className="container">
          <h1>Learning with Karuna</h1>
          <p>Thoughtful one-to-one guidance and self-paced courses to help your creativity grow.</p>
        </div>
      </div>

      <section className="class-consultation-section" aria-labelledby="consultation-heading">
        <div className="class-consultation-copy">
          <p className="eyebrow">Student consultation & feedback</p>
          <h2 id="consultation-heading">Let’s make space for <em>your questions.</em></h2>
          <p>Ask about your learning journey, request feedback on your work, or share an inquiry before choosing a course. Fill in the form and Karuna will be in touch.</p>
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

    </div>
  );
};

export default Classes;
