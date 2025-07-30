import React, { useState, useContext } from 'react';
import api from '../components/api';
import styles from './loginpage.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { ToasterContext } from '../components/ToasterContext';
import { FaLock } from 'react-icons/fa';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useContext(ToasterContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/users/reset-password', { token, newPassword });
      addToast('Password reset successful! Redirecting to login...', 'success', 4000);
      setTimeout(() => navigate('/loginpage'), 3000);
    } catch (err) {
      addToast(err.response?.data?.error || 'Failed to reset password.', 'error', 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.leftSection}>
          <h2 className={styles.title}>Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                className={styles.input}
              />
              <FaLock className={styles.inputIcon} />
            </div>
            <button className={styles.loginBtn} type="submit" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
        <div className={styles.rightSection}>
          <h2><span>Set New </span><strong>Password</strong></h2>
          <p>Enter your new password to complete the reset process.</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 