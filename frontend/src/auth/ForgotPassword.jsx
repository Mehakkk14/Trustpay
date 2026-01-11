import { useNavigate } from 'react-router-dom';
import './Auth.css';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    alert('Password reset link sent!');
    navigate('/');
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleReset}>
        <h2>Reset Password</h2>

        <input type="email" placeholder="Enter your email" required />

        <button className="primary-btn">Send Reset Link</button>

        <p className="link" onClick={() => navigate('/')}>
          Back to login
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
