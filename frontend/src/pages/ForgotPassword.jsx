import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import api from '../components/api';
import { useNavigate, Link } from 'react-router-dom';
import { ToasterContext } from '../components/ToasterContext';
import { FaEnvelope, FaArrowLeft, FaKey, FaArrowRight } from 'react-icons/fa';

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
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-transparent px-4 py-8 sm:py-12 text-slate-100 sm:px-6 lg:px-8">
      {/* Ambient Floating Orbs */}
      <motion.div
        animate={{
          x: [0, 25, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-16 left-1/4 h-72 w-72 rounded-full bg-violet-600/15 blur-[100px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="glass-panel relative w-full max-w-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl backdrop-blur-2xl"
      >
        <div className="mb-6">
          <Link
            to="/loginpage"
            className="group mb-4 inline-flex items-center gap-1.5 font-sans text-xs text-slate-400 transition-colors hover:text-violet-300"
          >
            <FaArrowLeft className="text-xs transition-transform group-hover:-translate-x-1" />
            <span>Back to Sign In</span>
          </Link>
          <div className="mb-2 block">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[10px] font-semibold text-violet-300 shadow-[0_0_12px_rgba(168,85,247,0.2)]">
              <FaKey className="text-violet-400" />
              <span>ACCOUNT RECOVERY</span>
            </div>
          </div>
          <h2 className="font-sora text-2xl font-black text-white">Reset Password</h2>
          <p className="mt-1 font-sans text-xs text-slate-300">
            Enter your verified university email to receive recovery instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block font-sans text-xs font-medium text-slate-300">
              University Email
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="rollno@adityauniversity.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-violet-400/70 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-violet-400/30"
              />
              <FaEnvelope className="absolute left-3 top-3 text-xs text-violet-400/70" />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex w-full items-center justify-center gap-2 rounded-xl border border-violet-400/40 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 py-3 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-violet-600/25 transition-all hover:border-cyan-300 hover:shadow-violet-600/40 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Sending Link...
              </span>
            ) : (
              <>
                <span>Send Recovery Link</span>
                <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
