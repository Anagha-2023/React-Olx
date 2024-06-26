import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../Store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for error message
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Reset error message
    setError(null);
    
    // Validate email and password
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error("Login error:", error); // Log the error object
        if (error.code) {
          switch (error.code) {
            case 'auth/wrong-password':
              setError('Password is incorrect.');
              break;
            case 'auth/user-not-found':
              setError('No user found with this email.');
              break;
            case 'auth/invalid-email':
              setError('The email address is not valid.');
              break;
            case 'auth/user-disabled':
              setError('This user account has been disabled.');
              break;
            default:
              setError('An error occurred. Please try again.');
              break;
          }
        } else {
          setError('An error occurred. Please try again.');
        }
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          <br />
          {error && <div className="error">{error}</div>} {/* Display error message */}
          <br />
          <button type="submit" className="loginButton">Login</button>
        </form>
        <Link to='/signup' className="signupLink">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
