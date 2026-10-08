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
    accent: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300',
  },
  {
    title: 'Demo Faculty',
    role: 'Faculty',
    email: 'demo.faculty@adityauniversity.in',
    password: 'DemoUser@123',
    icon: FaChalkboardTeacher,
    accent: 'border-purple-500/50 bg-purple-500/10 text-purple-300',
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
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-[#070b14] px-4 py-8">
      {/* Subtle Background Glows */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-indigo-600/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-purple-600/15 blur-[100px]" />

      {/* Centered Compact Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-slate-800/90 bg-slate-900/85 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        {/* Card Header */}
        <div className="mb-5 text-center">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-0.5 text-[11px] font-semibold text-indigo-300">
            <FaBolt className="text-amber-400" />
            <span>ProjectHub Portal</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Welcome <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">Back</span>
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Sign in with university credentials or 1-click demo
          </p>
        </div>

        {/* Quick Demo Pill Selector */}
        <div className="mb-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-2.5">
          <div className="mb-1.5 flex items-center justify-between px-1 text-[10px] font-medium text-slate-400">
            <span>⚡ QUICK AUTO-FILL</span>
            <span className="text-indigo-400">1-CLICK</span>
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
                  className={`flex items-center justify-between rounded-xl border px-2.5 py-1.5 text-left transition-all ${
                    isSelected
                      ? 'border-indigo-500/60 bg-indigo-600/20 text-white shadow-sm'
                      : 'border-slate-800/80 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="text-xs text-indigo-400" />
                    <span className="text-xs font-semibold">{acc.role}</span>
                  </div>
                  {isSelected && <FaCheckCircle className="text-xs text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-3.5">
          {/* Email */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
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
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 transition-all focus:border-indigo-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
              />
              <FaEnvelope className="absolute left-3 top-3 text-xs text-slate-400" />
            </div>
            {errors.email && (
              <p className="mt-1 text-[11px] font-medium text-rose-400">⚠️ {errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-xs font-medium text-slate-300">Password</label>
              <Link
                to="/forgot-password"
                className="text-[11px] text-indigo-400 transition-colors hover:text-indigo-300"
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
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 py-2 pl-9 pr-9 text-xs text-white placeholder-slate-500 transition-all focus:border-indigo-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
              />
              <FaLock className="absolute left-3 top-3 text-xs text-slate-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-[11px] font-medium text-rose-400">⚠️ {errors.password}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center text-xs">
            <label className="flex cursor-pointer items-center gap-2 text-slate-400 hover:text-slate-300">
              <input
                type="checkbox"
                id="remember"
                className="h-3.5 w-3.5 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
              />
              Remember me
            </label>
          </div>

          {/* Buttons */}
          <div className="space-y-2 pt-1">
            <button
              type="submit"
              disabled={isLoading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-indigo-500/25 transition-all hover:opacity-95 hover:shadow-indigo-500/35 active:scale-[0.99] disabled:opacity-50"
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
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 py-2 text-xs font-semibold text-indigo-300 transition-all hover:border-indigo-400/50 hover:bg-indigo-500/20 hover:text-white"
            >
              <FaBolt className="text-[11px] text-amber-400" />
              <span>1-Click Instant Demo Login</span>
            </button>
          </div>

          {/* Footer */}
          <p className="pt-2 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-indigo-400 underline hover:text-indigo-300"
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



