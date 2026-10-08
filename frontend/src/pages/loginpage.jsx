import React, { useState, useContext } from 'react';
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
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ToasterContext } from '../components/ToasterContext';

const DEMO_ACCOUNTS = [
  {
    title: 'Demo Student',
    role: 'Student',
    email: 'demostudent@adityauniversity.in',
    password: 'DemoUser@123',
    icon: FaUserGraduate,
  },
  {
    title: 'Demo Faculty',
    role: 'Faculty',
    email: 'demo.faculty@adityauniversity.in',
    password: 'DemoUser@123',
    icon: FaChalkboardTeacher,
  },
];

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
      {/* Centered Glass Card */}
      <div className="glass-panel relative w-full max-w-md rounded-3xl p-6 shadow-2xl sm:p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-cyan-300">
            <FaBolt className="text-cyan-400" />
            <span>PROJECTHUB AUTHENTICATION</span>
          </div>
          <h1 className="font-sora text-2xl font-black tracking-tight text-white sm:text-3xl">
            Welcome Back
          </h1>
          <p className="mt-1 font-sans text-xs text-slate-400">
            Sign in with university credentials or 1-click demo
          </p>
        </div>

        {/* Quick Demo Pill Selector */}
        <div className="mb-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-2.5">
          <div className="mb-2 flex items-center justify-between px-1 font-mono text-[10px] text-slate-400">
            <span>⚡ QUICK AUTO-FILL</span>
            <span className="text-cyan-400">1-CLICK</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_ACCOUNTS.map((acc) => {
              const Icon = acc.icon;
              const isSelected = activeDemo === acc.title;
              return (
                <button
                  key={acc.title}
                  type="button"
                  onClick={() => handleFillDemo(acc, false)}
                  className={`flex items-center justify-between rounded-xl border px-3 py-2 text-left transition-all ${
                    isSelected
                      ? 'border-cyan-500/60 bg-cyan-500/20 text-white shadow-sm'
                      : 'border-white/5 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="text-xs text-cyan-400" />
                    <span className="font-sans text-xs font-semibold">{acc.role}</span>
                  </div>
                  {isSelected && <FaCheckCircle className="text-xs text-cyan-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
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
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-cyan-500/50 focus:bg-white/[0.06] focus:outline-none"
              />
              <FaEnvelope className="absolute left-3 top-2.5 text-xs text-slate-500" />
            </div>
            {errors.email && (
              <p className="mt-1 text-[11px] font-medium text-rose-400">⚠️ {errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="font-sans text-xs font-medium text-slate-300">Password</label>
              <Link
                to="/forgot-password"
                className="font-sans text-[11px] text-cyan-400 transition-colors hover:text-cyan-300"
              >
                Forgot?
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
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-9 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-cyan-500/50 focus:bg-white/[0.06] focus:outline-none"
              />
              <FaLock className="absolute left-3 top-2.5 text-xs text-slate-500" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-[11px] font-medium text-rose-400">⚠️ {errors.password}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="space-y-2 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing In...
                </span>
              ) : (
                <>
                  <span>Sign In</span>
                  <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleFillDemo(DEMO_ACCOUNTS[0], true)}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 py-2 font-sans text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20 hover:text-white"
            >
              <FaBolt className="text-[11px] text-cyan-400" />
              <span>1-Click Instant Demo Login</span>
            </button>
          </div>

          {/* Footer */}
          <p className="pt-2 text-center font-sans text-xs text-slate-400">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-cyan-400 underline hover:text-cyan-300"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;



