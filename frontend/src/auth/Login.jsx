import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // temporary login (frontend only)
    navigate('/app');
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Login to TrustPay</h2>
        <p className="auth-subtitle">Secure access to your escrow dashboard</p>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <div className="input-wrapper">
          <i className="bx bx-lock-alt input-icon"></i> 
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <div className="input-wrapper">
            <i className="bx bx-key input-icon"></i>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button className="primary-btn" type="submit">
          Login
        </button>

        <p className="link" onClick={() => navigate('/forgot-password')}>
          Forgot password?
        </p>

        <p>
          Don’t have an account?{' '}
          <span className="link" onClick={() => navigate('/signup')}>
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
