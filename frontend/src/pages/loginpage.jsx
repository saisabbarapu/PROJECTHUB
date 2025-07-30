import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styles from './loginPage.module.css';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ToasterContext } from '../components/ToasterContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { addToast } = useContext(ToasterContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleLogin = async () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Please enter your email.';
    if (!formData.password.trim()) newErrors.password = 'Please enter your password.';
    const emailRegex = /@(?:adityauniversity\.in|aec\.in)$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Email must end with @adityauniversity.in or @aec.in';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      addToast('Please resolve the issues.', 'error', 4000);
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/users/login', formData);
      // Store user in localStorage for Navbar/profile
      if (response.data && response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        addToast('Login successful!', 'success', 3000);
        setTimeout(() => navigate('/mainhome'), 2000); // Redirect after 2s
      }
    } catch (err) {
      addToast(err.response?.data?.error || 'Login failed', 'error', 4000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.leftSection}>
          <h2 className={styles.title}>Login</h2>
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <FaEnvelope className={styles.inputIcon} />
            {errors.email && (
              <div className={styles.tooltipError}>
                <span className={styles.tooltipIcon}>!</span>
                {errors.email}
              </div>
            )}
          </div>
          <div className={styles.inputGroup}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <FaLock className={styles.inputIcon} />
            <button
              type="button"
              className={styles.toggleButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash className={styles.toggleIcon} /> : <FaEye className={styles.toggleIcon} />}
            </button>
            {errors.password && (
              <div className={styles.tooltipError}>
                <span className={styles.tooltipIcon}>!</span>
                {errors.password}
              </div>
            )}
          </div>
          <div className={styles.options}>
            <div className={styles.checkboxWrapper}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className={styles.forgot}>Forgot password?</Link>
          </div>
          <button className={styles.loginBtn} onClick={handleLogin}>
            Login
          </button>
          <p className={styles.signupText}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
        <div className={styles.rightSection}>
          <h2><span>Welcome to </span><strong>ProjectHub</strong></h2>
          <p>Your gateway to organized and collaborative project management.<br />Sign in and get started today!</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;