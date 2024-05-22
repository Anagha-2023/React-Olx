import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Store/Context';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};

    // Username validation
    if (!username) {
      errors.username = 'Username is required';
    } else if (username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }

    // Email validation
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }

    // Phone validation
    if (!phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Phone number is invalid';
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(password)) {
      errors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(password)) {
      errors.password = 'Password must contain at least one digit';
    } else if (!/[!@#$%^&*]/.test(password)) {
      errors.password = 'Password must contain at least one special character';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      result.user.updateProfile({ displayName: username }).then(() => {
        firebase.firestore().collection('users').add({
          id: result.user.uid,
          username: username,
          phone: phone
        }).then(() => {
          // Redirect to the login page after successful signup
          navigate('/login');
        })
      })
    }).catch((error) => {
      alert(error.message);
      // Optionally, you can clear the input fields after displaying the error
      setUsername('');
      setEmail('');
      setPhone('');
      setPassword('');
    });
  };
  

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo"></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
          />
          {errors.username && <span className="error">{errors.username}</span>}
          <br />
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
          {errors.email && <span className="error">{errors.email}</span>}
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
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
          {errors.password && <span className="error">{errors.password}</span>}
          <br />
          <button type="submit" disabled={Object.keys(errors).length > 0}>Signup</button>
        </form>
        <a onClick={() => navigate('/login')}>Login</a>
      </div>
    </div>
  );
}
