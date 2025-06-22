import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './sign.module.css';

// SVG Icon Components
const PersonIcon = () => (
  <svg className={styles.inputIcon} viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const EmailIcon = () => (
  <svg className={styles.inputIcon} viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const LockIcon = () => (
  <svg className={styles.inputIcon} viewBox="0 0 24 24">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-7c-1.66 0-3-1.34-3-3V6c0-1.66 1.34-3 3-3s3 1.34 3 3v1c0 1.66-1.34 3-3 3z"/>
  </svg>
);

const EyeIcon = () => (
  <svg className={styles.inputIcon} viewBox="0 0 24 24">
    <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"/>
  </svg>
);

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleSignup = async () => {
    const newErrors = {};
    const requiredFields = [
      { key: 'firstName', label: 'First Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'email', label: 'Email Address' },
      { key: 'password', label: 'Create Password' },
      { key: 'confirmPassword', label: 'Confirm Password' },
    ];

    let allFieldsEmpty = true;
    let someFieldsFilled = false;

    requiredFields.forEach(field => {
      if (!formData[field.key].trim()) {
        newErrors[field.key] = `Please fill out ${field.label}.`;
        allFieldsEmpty = false;
      } else {
        someFieldsFilled = true;
      }
    });

    // Email validation
    const emailRegex = /@(?:adityauniversity\.in|aec\.in)$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Email must end with @adityauniversity.in or @aec.in';
      someFieldsFilled = true;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (formData.password && !passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character (@$!%*?&)';
      someFieldsFilled = true;
    }

    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      someFieldsFilled = true;
    }

    if (Object.keys(newErrors).length === requiredFields.length) {
      setToastMessage('Please fill all fields');
      setShowToast(true);
    } else if (Object.keys(newErrors).length > 0 && someFieldsFilled) {
      setToastMessage('Please resolve the issues and fill remaining fields.');
      setShowToast(true);
    } else {
      try {
        const response = await axios.post('http://localhost:4000/api/users/signup', formData);
        setToastMessage('Signup successful!');
        setShowToast(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setErrors({});
      } catch (err) {
        setToastMessage(err.response?.data?.error || 'Signup failed');
        setShowToast(true);
      }
    }

    setErrors(newErrors);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.formSection}>
          <h2>Create Account</h2>
          {showToast && (
            <div className={styles.toast}>
              <span className={styles.warningIcon}>✔</span>
              <span>{toastMessage}</span>
            </div>
          )}
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <PersonIcon />
            </div>
            {errors.firstName && (
              <div className={styles.tooltipError}>
                <span className={styles.tooltipIcon}>!</span>
                {errors.firstName}
              </div>
            )}
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <PersonIcon />
            </div>
            {errors.lastName && (
              <div className={styles.tooltipError}>
                <span className={styles.tooltipIcon}>!</span>
                {errors.lastName}
              </div>
            )}
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <EmailIcon />
            </div>
            {errors.email && (
              <div className={styles.tooltipError}>
                <span className={styles.tooltipIcon}>!</span>
                {errors.email}
              </div>
            )}
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <LockIcon />
              <button
                type="button"
                className={styles.toggleButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                <EyeIcon />
              </button>
            </div>
            {errors.password && (
              <div className={styles.tooltipError}>
                <span className={styles.tooltipIcon}>!</span>
                {errors.password}
              </div>
            )}
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <LockIcon />
              <button
                type="button"
                className={styles.toggleButton}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <EyeIcon />
              </button>
            </div>
            {errors.confirmPassword && (
              <div className={styles.tooltipError}>
                <span className={styles.tooltipIcon}>!</span>
                {errors.confirmPassword}
              </div>
            )}
          </div>
          <button className={styles.signupBtn} onClick={handleSignup}>
            SIGN UP
          </button>
          <div className={styles.loginLink}>
            <p>Already have an account? <a href="/loginpage">Login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;