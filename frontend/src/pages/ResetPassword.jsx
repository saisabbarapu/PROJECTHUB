import React, { useState, useContext } from 'react';
import api from '../components/api';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ToasterContext } from '../components/ToasterContext';
import { FaLock, FaArrowLeft } from 'react-icons/fa';

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
      addToast('Password reset successful! Redirecting to login...', 'success', 3000);
      setTimeout(() => navigate('/loginpage'), 2000);
    } catch (err) {
      addToast(err.response?.data?.error || 'Failed to reset password.', 'error', 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="mb-6">
          <Link
            to="/loginpage"
            className="mb-4 inline-flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-indigo-400"
          >
            <FaArrowLeft className="text-xs" /> Back to Login
          </Link>
          <h2 className="text-2xl font-extrabold text-white">Create New Password</h2>
          <p className="mt-1 text-xs text-slate-400">
            Enter your new password below to secure your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">New Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800/90 py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 transition-all focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <FaLock className="absolute left-3 top-3 text-xs text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50"
          >
            {loading ? 'Updating password...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
