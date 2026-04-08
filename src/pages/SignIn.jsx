import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import './SignIn.css';

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="signin-page page-transition-enter-active">
      <div className="auth-container container">
        
        <div className="auth-panel glass-panel">
          <div className="auth-header">
            <h2>{isSignUp ? 'Join the Community' : 'Welcome Back'}</h2>
            <p>
              {isSignUp 
                ? 'Create an account to track your progress and access student materials.' 
                : 'Sign in to access your purchased classes and community forum.'}
            </p>
          </div>

          <form className="auth-form">
            {isSignUp && (
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <User className="input-icon" size={18} />
                  <input type="text" placeholder="Karuna Fan" required />
                </div>
              </div>
            )}
            
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail className="input-icon" size={18} />
                <input type="email" placeholder="you@example.com" required />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock className="input-icon" size={18} />
                <input type="password" placeholder="••••••••" required />
              </div>
              {!isSignUp && <a href="#" className="forgot-password">Forgot password?</a>}
            </div>

            <button type="submit" className="btn btn-primary auth-btn">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button 
                className="toggle-auth-mode" 
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>

        <div className="auth-sidebar">
          <div className="community-preview">
            <div className="preview-icon">
              <ShieldCheck size={40} />
            </div>
            <h3>The Karuna Community</h3>
            <p>By joining, you get exclusive access to:</p>
            <ul>
              <li>High-resolution reference images for classes</li>
              <li>Monthly live Q&A sessions with Karuna</li>
              <li>A supportive discord server to share your work</li>
              <li>Early access to original artwork purchases</li>
            </ul>
            
            <div className="explore-cta">
              <p>Not ready to join?</p>
              <Link to="/classes" className="btn btn-outline">
                Explore Courses <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignIn;
