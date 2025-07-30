import React, { useState, useContext } from 'react';
import api from '../components/api';
import styles from './loginpage.module.css';
import { useNavigate } from 'react-router-dom';
import { ToasterContext } from '../components/ToasterContext';
import { FaEnvelope } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useContext(ToasterContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/users/forgot-password', { email });
      addToast('If an account with that email exists, a reset link has been sent.', 'success', 4000);
      setTimeout(() => navigate('/loginpage'), 3000);
    } catch (err) {
      addToast(err.response?.data?.error || 'Failed to send reset email.', 'error', 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.leftSection}>
          <h2 className={styles.title}>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className={styles.input}
              />
              <FaEnvelope className={styles.inputIcon} />
            </div>
            <button className={styles.loginBtn} type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        </div>
        <div className={styles.rightSection}>
          <h2><span>Reset Your </span><strong>Password</strong></h2>
          <p>Enter your email address and we'll send you a link to reset your password.</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 