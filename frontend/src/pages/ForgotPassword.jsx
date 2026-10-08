import React, { useState, useContext } from 'react';
import api from '../components/api';
import { useNavigate, Link } from 'react-router-dom';
import { ToasterContext } from '../components/ToasterContext';
import { FaEnvelope, FaArrowLeft, FaKey } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useContext(ToasterContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/users/forgot-password', { email: email.trim().toLowerCase() });
      addToast(
        'If an account with that email exists, a reset link has been sent.',
        'success',
        4000
      );
      setTimeout(() => navigate('/loginpage'), 2000);
    } catch (err) {
      addToast(err.response?.data?.error || 'Failed to send reset email.', 'error', 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-[#030712] px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-cyan-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="glass-panel relative w-full max-w-md rounded-3xl p-8 shadow-2xl sm:p-10">
        <div className="mb-6">
          <Link
            to="/loginpage"
            className="mb-4 inline-flex items-center gap-1.5 font-sans text-xs text-slate-400 transition-colors hover:text-cyan-300"
          >
            <FaArrowLeft className="text-xs" /> Back to Sign In
          </Link>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-0.5 font-mono text-[10px] font-semibold text-cyan-300">
            <FaKey className="text-cyan-400" />
            <span>ACCOUNT RECOVERY</span>
          </div>
          <h2 className="font-sora text-2xl font-black text-white">Reset Password</h2>
          <p className="mt-1 font-sans text-xs text-slate-400">
            Enter your verified university email to receive recovery instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block font-sans text-xs font-medium text-slate-300">Your University Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="rollno@adityauniversity.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-cyan-500/50 focus:bg-white/[0.06] focus:outline-none"
              />
              <FaEnvelope className="absolute left-3 top-2.5 text-xs text-slate-500" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? 'Sending link...' : 'Send Recovery Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

