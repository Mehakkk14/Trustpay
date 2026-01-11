import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    alert('Account created!');
    navigate('/');
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSignup}>
        <h2>Create Account</h2>

        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />

        <button className="primary-btn">Sign Up</button>

        <p>
          Already have an account?{' '}
          <span className="link" onClick={() => navigate('/')}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
