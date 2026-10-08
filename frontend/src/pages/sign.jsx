import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../components/api';
import { ToasterContext } from '../components/ToasterContext';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
  FaArrowRight,
  FaExclamationCircle,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

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
      staggerChildren: 0.06,
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

const Signup = () => {
  const navigate = useNavigate();
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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSignup = async (e) => {
    if (e) e.preventDefault();
    const newErrors = {};
    const requiredFields = [
      { key: 'firstName', label: 'First Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'email', label: 'Email Address' },
      { key: 'password', label: 'Create Password' },
      { key: 'confirmPassword', label: 'Confirm Password' },
    ];

    let someFieldsFilled = false;

    requiredFields.forEach((field) => {
      if (!formData[field.key].trim()) {
        newErrors[field.key] = `Please fill out ${field.label}.`;
      } else {
        someFieldsFilled = true;
      }
    });

    const emailRegex = /@(?:adityauniversity\.in|acet\.in|aec\.in)$/i;
    if (formData.email && !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Email must end with @adityauniversity.in, @acet.in, or @aec.in';
      someFieldsFilled = true;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (formData.password && !passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters with uppercase, lowercase, number, and special character.';
      someFieldsFilled = true;
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = 'Passwords do not match.';
      someFieldsFilled = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      addToast(
        someFieldsFilled
          ? 'Please resolve the highlighted errors.'
          : 'Please fill all required fields.',
        'error',
        4000
      );
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/users/signup', {
        ...formData,
        email: formData.email.trim().toLowerCase(),
      });
      addToast('Signup successful! Please sign in.', 'success', 3000);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setErrors({});
      setTimeout(() => navigate('/loginpage'), 1200);
    } catch (err) {
      addToast(err.response?.data?.error || 'Signup failed', 'error', 4000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-transparent px-4 py-8 sm:py-12 text-slate-100 sm:px-6 lg:px-8">
      {/* Ambient Floating Motion Glow Orbs */}
      <motion.div
        animate={{
          x: [0, 30, -25, 0],
          y: [0, -35, 25, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-20 left-1/4 h-80 w-80 rounded-full bg-violet-600/15 blur-[110px]"
      />
      <motion.div
        animate={{
          x: [0, -30, 25, 0],
          y: [0, 30, -20, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="pointer-events-none absolute -bottom-20 right-1/4 h-88 w-88 rounded-full bg-indigo-600/15 blur-[120px]"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-panel relative w-full max-w-lg rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl backdrop-blur-2xl"
      >
        <motion.div variants={itemVariants} className="mb-6 text-center">
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-semibold text-violet-300 shadow-[0_0_12px_rgba(168,85,247,0.2)] backdrop-blur-md">
            <span className="flex h-1.5 w-1.5 animate-ping rounded-full bg-cyan-400" />
            <FaUserPlus className="text-violet-400" />
            <span>CREATE ACCOUNT</span>
          </div>
          <h2 className="font-sora text-2xl sm:text-3xl font-black text-white">Join ProjectHub</h2>
          <p className="mt-1 font-sans text-xs text-slate-300">
            Showcase your capstone and collaborate with verified peers
          </p>
        </motion.div>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name Row */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-sans text-xs font-medium text-slate-300">First Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-violet-400/70 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-violet-400/30"
                />
                <FaUser className="absolute left-3 top-3 text-xs text-violet-400/70" />
              </div>
              <AnimatePresence>
                {errors.firstName && (
                  <motion.p
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    className="mt-1 flex items-center gap-1 font-sans text-[11px] font-medium text-rose-400"
                  >
                    <FaExclamationCircle className="text-xs shrink-0" />
                    <span>{errors.firstName}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label className="mb-1 block font-sans text-xs font-medium text-slate-300">Last Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-violet-400/70 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-violet-400/30"
                />
                <FaUser className="absolute left-3 top-3 text-xs text-violet-400/70" />
              </div>
              <AnimatePresence>
                {errors.lastName && (
                  <motion.p
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    className="mt-1 flex items-center gap-1 font-sans text-[11px] font-medium text-rose-400"
                  >
                    <FaExclamationCircle className="text-xs shrink-0" />
                    <span>{errors.lastName}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Email */}
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

          {/* Password */}
          <motion.div variants={itemVariants}>
            <label className="mb-1 block font-sans text-xs font-medium text-slate-300">Create Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Min. 8 characters"
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

          {/* Confirm Password */}
          <motion.div variants={itemVariants}>
            <label className="mb-1 block font-sans text-xs font-medium text-slate-300">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-10 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-violet-400/70 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-violet-400/30"
              />
              <FaLock className="absolute left-3 top-3 text-xs text-violet-400/70" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-xs text-slate-400 transition-colors hover:text-white"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <AnimatePresence>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -4, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -4, height: 0 }}
                  className="mt-1 flex items-center gap-1 font-sans text-[11px] font-medium text-rose-400"
                >
                  <FaExclamationCircle className="text-xs shrink-0" />
                  <span>{errors.confirmPassword}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="pt-2">
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
                  Creating Account...
                </span>
              ) : (
                <>
                  <span>Create Account</span>
                  <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </motion.div>

          <motion.p variants={itemVariants} className="pt-2 text-center font-sans text-xs text-slate-400">
            Already have an account?{' '}
            <Link
              to="/loginpage"
              className="font-semibold text-violet-400 transition-colors hover:text-violet-300 underline"
            >
              Sign In
            </Link>
          </motion.p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
