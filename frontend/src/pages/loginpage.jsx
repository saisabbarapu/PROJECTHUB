import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../components/api';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaBolt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaArrowRight,
  FaExclamationCircle,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ToasterContext } from '../components/ToasterContext';

const DEMO_ACCOUNTS = [
  {
    title: 'Demo Student',
    role: 'Student',
    department: 'Computer Science',
    email: 'demostudent@adityauniversity.in',
    password: 'DemoUser@123',
    icon: FaUserGraduate,
  },
  {
    title: 'Demo Faculty',
    role: 'Faculty',
    department: 'AI & Research',
    email: 'demo.faculty@adityauniversity.in',
    password: 'DemoUser@123',
    icon: FaChalkboardTeacher,
  },
];

// Stagger Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 24,
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { addToast } = useContext(ToasterContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeDemo, setActiveDemo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFillDemo = (account, autoSubmit = false) => {
    setFormData({
      email: account.email,
      password: account.password,
    });
    setErrors({});
    setActiveDemo(account.title);
    addToast(`Loaded ${account.title}!`, 'success', 2000);

    if (autoSubmit) {
      setTimeout(() => {
        executeLogin(account.email, account.password);
      }, 150);
    }
  };

  const executeLogin = async (emailToUse, passwordToUse) => {
    setIsLoading(true);
    try {
      const response = await api.post('/users/login', {
        email: emailToUse.trim().toLowerCase(),
        password: passwordToUse,
      });
      if (response.data && response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        addToast('Login successful! Redirecting...', 'success', 2000);
        setTimeout(() => navigate('/mainhome'), 900);
      }
    } catch (err) {
      addToast(err.response?.data?.error || 'Login failed', 'error', 4000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Please enter your email.';
    if (!formData.password.trim()) newErrors.password = 'Please enter your password.';
    const emailRegex = /@(?:adityauniversity\.in|acet\.in|aec\.in)$/i;
    if (formData.email && !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Must end with @adityauniversity.in, @acet.in, or @aec.in';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      addToast('Please resolve the errors below.', 'error', 4000);
      return;
    }

    await executeLogin(formData.email, formData.password);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-transparent px-4 py-8 text-slate-100">
      {/* Ambient Floating Motion Glow Orbs */}
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
        animate={{
          x: [0, -30, 25, 0],
          y: [0, 25, -20, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="pointer-events-none absolute -bottom-16 right-1/4 h-80 w-80 rounded-full bg-indigo-600/15 blur-[110px]"
      />

      {/* Main Glassmorphic Animated Login Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-panel relative w-full max-w-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-2xl"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-5 text-center">
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-semibold text-violet-300 shadow-[0_0_12px_rgba(168,85,247,0.2)] backdrop-blur-md">
            <span className="flex h-1.5 w-1.5 animate-ping rounded-full bg-cyan-400" />
            <FaBolt className="text-violet-400" />
            <span>PROJECTHUB AUTHENTICATION</span>
          </div>

          <h1 className="font-sora text-2xl sm:text-3xl font-black tracking-tight text-white">
            Welcome Back
          </h1>
          <p className="mt-1 font-sans text-xs text-slate-300">
            Sign in with university credentials or 1-click demo
          </p>
        </motion.div>

        {/* 1-Click Quick Auto-Fill Demo Accounts */}
        <motion.div
          variants={itemVariants}
          className="mb-5 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.02] p-2.5 backdrop-blur-sm"
        >
          <div className="mb-2 flex items-center justify-between px-1 font-mono text-[10px] text-slate-400">
            <span className="flex items-center gap-1 font-semibold text-violet-300">
              <FaBolt className="text-amber-400" /> QUICK AUTO-FILL
            </span>
            <span className="rounded bg-violet-500/20 px-1.5 py-0.5 font-bold text-violet-300">
              1-CLICK
            </span>
          </div>

          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-2">
            {DEMO_ACCOUNTS.map((acc) => {
              const Icon = acc.icon;
              const isSelected = activeDemo === acc.title;
              return (
                <motion.button
                  key={acc.title}
                  type="button"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleFillDemo(acc, false)}
                  className={`group relative flex items-center justify-between rounded-xl border p-2.5 text-left transition-all ${
                    isSelected
                      ? 'border-violet-500/60 bg-gradient-to-r from-violet-500/25 to-indigo-600/25 text-white shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                      : 'border-white/5 bg-white/[0.02] text-slate-300 hover:border-violet-400/30 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-colors ${
                        isSelected
                          ? 'border-violet-400/50 bg-violet-500/30 text-white'
                          : 'border-white/10 bg-white/5 text-violet-400 group-hover:bg-violet-500/10'
                      }`}
                    >
                      <Icon className="text-xs" />
                    </div>
                    <div>
                      <div className="font-sans text-xs font-semibold leading-tight text-white">
                        {acc.role}
                      </div>
                      <div className="font-mono text-[9px] text-slate-400">
                        {acc.department}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    >
                      <FaCheckCircle className="text-xs text-cyan-400" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <motion.div variants={itemVariants}>
            <label className="mb-1 block font-sans text-xs font-medium text-slate-300">
              University Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="rollno@adityauniversity.in"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-violet-400/70 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-violet-400/30"
              />
              <FaEnvelope className="absolute left-3 top-3 text-xs text-violet-400/70" />
            </div>

            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -4, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -4, height: 0 }}
                  className="mt-1 flex items-center gap-1 font-sans text-[11px] font-medium text-rose-400"
                >
                  <FaExclamationCircle className="text-xs shrink-0" />
                  <span>{errors.email}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Password Field */}
          <motion.div variants={itemVariants}>
            <div className="mb-1 flex items-center justify-between">
              <label className="font-sans text-xs font-medium text-slate-300">Password</label>
              <Link
                to="/forgot-password"
                className="font-sans text-[11px] text-violet-400 transition-colors hover:text-violet-300"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-10 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-violet-400/70 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-violet-400/30"
              />
              <FaLock className="absolute left-3 top-3 text-xs text-violet-400/70" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-xs text-slate-400 transition-colors hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <AnimatePresence>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -4, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -4, height: 0 }}
                  className="mt-1 flex items-center gap-1 font-sans text-[11px] font-medium text-rose-400"
                >
                  <FaExclamationCircle className="text-xs shrink-0" />
                  <span>{errors.password}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="space-y-2.5 pt-2">
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex w-full items-center justify-center gap-2 rounded-xl border border-violet-400/40 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 py-3 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-violet-600/25 transition-all hover:border-cyan-300 hover:shadow-violet-600/40 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Authenticating...
                </span>
              ) : (
                <>
                  <span>Sign In</span>
                  <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />
                </>
              )}
            </motion.button>

            <motion.button
              type="button"
              disabled={isLoading}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleFillDemo(DEMO_ACCOUNTS[0], true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 py-2.5 font-sans text-xs font-semibold text-violet-300 backdrop-blur-md transition-all hover:border-violet-400/50 hover:bg-violet-500/20 hover:text-white"
            >
              <FaBolt className="text-xs text-amber-400" />
              <span>1-Click Instant Demo Login</span>
            </motion.button>
          </motion.div>

          {/* Footer Navigation */}
          <motion.p variants={itemVariants} className="pt-2 text-center font-sans text-xs text-slate-400">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-violet-400 transition-colors hover:text-violet-300 underline"
            >
              Sign Up
            </Link>
          </motion.p>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
