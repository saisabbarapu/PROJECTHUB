import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './loginPage.module.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isSuccessToast, setIsSuccessToast] = useState(false);
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
      setToastMessage('Please resolve the issues.');
      setShowToast(true);
      setIsSuccessToast(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/users/login', formData);
      setToastMessage('Login successful!');
      setShowToast(true);
      setIsSuccessToast(true);
      setTimeout(() => navigate('/mainhome'), 2000); // Redirect after 2s
    } catch (err) {
      setToastMessage(err.response?.data?.error || 'Login failed');
      setShowToast(true);
      setIsSuccessToast(false);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
        setIsSuccessToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.leftSection}>
          <h2 className={styles.title}>Login</h2>
          {showToast && (
            <div className={`${styles.toast} ${isSuccessToast ? styles.toastSuccess : styles.toastError}`}>
              <span className={styles.warningIcon}>
                {isSuccessToast ? '✅' : '⚠'}
              </span>
              <span>{toastMessage}</span>
            </div>
          )}
          <div className={styles.inputGroup}>
            <FaEnvelope className={styles.icon} />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <div className={styles.tooltipError}>
                <span className={styles.tooltipIcon}>!</span>
                {errors.email}
              </div>
            )}
          </div>
          <div className={styles.inputGroup}>
            <FaLock className={styles.icon} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className={styles.toggleButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              <svg className={styles.inputIcon} viewBox="0 0 24 24">
                <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"/>
              </svg>
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
            <a href="#" className={styles.forgot}>Forgot password?</a>
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