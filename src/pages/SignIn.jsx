import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './SignIn.css';

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setSuccess('');
    setEmail('');
    setPassword('');
    setFullName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (isSignUp && !fullName.trim()) {
      setError('Please enter your full name.');
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        const { data, error: signUpErr } = await signUp(email, password, { full_name: fullName });
        if (signUpErr) throw signUpErr;

        if (data?.session) {
          setSuccess('Account created successfully! Logging you in...');
          setTimeout(() => navigate('/'), 1500);
        } else {
          setSuccess('Registration successful! Please check your email to confirm your account.');
          setEmail('');
          setPassword('');
          setFullName('');
        }
      } else {
        const { error: signInErr } = await signIn(email, password);
        if (signInErr) throw signInErr;

        setSuccess('Logged in successfully! Redirecting...');
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

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

          {error && <div className="auth-alert error-alert">{error}</div>}
          {success && <div className="auth-alert success-alert">{success}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {isSignUp && (
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <User className="input-icon" size={18} />
                  <input 
                    type="text" 
                    placeholder="Karuna Fan" 
                    required 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
            )}
            
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail className="input-icon" size={18} />
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock className="input-icon" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              {!isSignUp && <a href="#" className="forgot-password">Forgot password?</a>}
            </div>

            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button 
                className="toggle-auth-mode" 
                onClick={handleToggleMode}
                disabled={loading}
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
