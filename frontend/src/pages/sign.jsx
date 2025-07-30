import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styles from './sign.module.css';
import { ToasterContext } from '../components/ToasterContext';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const { addToast } = useContext(ToasterContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
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
      addToast('Please fill all fields', 'error', 4000);
    } else if (Object.keys(newErrors).length > 0 && someFieldsFilled) {
      addToast('Please resolve the issues and fill remaining fields.', 'error', 4000);
    } else {
      try {
        const response = await axios.post('http://localhost:4000/api/users/signup', formData);
        addToast('Signup successful!', 'success', 3000);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setErrors({});
      } catch (err) {
        addToast(err.response?.data?.error || 'Signup failed', 'error', 4000);
      }
    }

    setErrors(newErrors);
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.formSection}>
          <h2>Create Account</h2>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <FaUser className={styles.inputIcon} />
            {errors.firstName && (
              <div className={styles.tooltipError}>
                <span className={styles.tooltipIcon}>!</span>
                {errors.firstName}
              </div>
            )}
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <FaUser className={styles.inputIcon} />
            {errors.lastName && (
              <div className={styles.tooltipError}>
                <span className={styles.tooltipIcon}>!</span>
                {errors.lastName}
              </div>
            )}
          </div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
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
              placeholder="Create Password"
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
          <div className={styles.inputGroup}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <FaLock className={styles.inputIcon} />
            <button
              type="button"
              className={styles.toggleButton}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash className={styles.toggleIcon} /> : <FaEye className={styles.toggleIcon} />}
            </button>
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