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
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ToasterContext } from '../components/ToasterContext';

const DEMO_ACCOUNTS = [
  {
    role: 'Demo Student',
    name: 'Student Account',
    email: 'demostudent@adityauniversity.in',
    password: 'DemoUser@123',
    icon: FaUserGraduate,
    badgeColor: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-300',
  },
  {
    role: 'Demo Faculty',
    name: 'Faculty Account',
    email: 'demo.faculty@adityauniversity.in',
    password: 'DemoUser@123',
    icon: FaChalkboardTeacher,
    badgeColor: 'from-purple-500/20 to-pink-500/20 border-purple-500/40 text-purple-300',
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
    setActiveDemo(account.role);
    addToast(`Filled credentials for ${account.role}!`, 'success', 2000);

    if (autoSubmit) {
      setTimeout(() => {
        executeLogin(account.email, account.password);
      }, 200);
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
        addToast('Login successful! Redirecting...', 'success', 2500);
        setTimeout(() => navigate('/mainhome'), 1200);
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
      newErrors.email = 'Email must end with @adityauniversity.in, @acet.in, or @aec.in';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      addToast('Please resolve the errors below.', 'error', 4000);
      return;
    }

    await executeLogin(formData.email, formData.password);
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
        {/* Left Section: Form */}
        <div className="w-full p-8 sm:p-12 lg:w-1/2">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-white">Sign In</h2>
            <p className="mt-2 text-xs text-slate-400">
              Welcome back! Please enter your university credentials or use quick demo login.
            </p>
          </div>

          {/* Quick Demo Autofill Bar */}
          <div className="mb-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 to-slate-900/80 p-3.5 backdrop-blur-md">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300">
                <FaBolt className="text-amber-400" /> Quick Auto-Fill Demo
              </span>
              <span className="text-[10px] text-slate-400">1-Click Auto Fill</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((acc) => {
                const Icon = acc.icon;
                const isSelected = activeDemo === acc.role;
                return (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => handleFillDemo(acc, false)}
                    className={`flex items-center justify-between rounded-xl border p-2 text-left transition-all ${
                      isSelected
                        ? 'border-indigo-400 bg-indigo-600/30 text-white shadow-sm shadow-indigo-500/30'
                        : 'border-slate-700/80 bg-slate-800/80 text-slate-300 hover:border-slate-600 hover:bg-slate-700/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-700/60 text-xs text-indigo-300">
                        <Icon />
                      </div>
                      <div className="leading-tight">
                        <div className="text-[11px] font-semibold text-white">{acc.role}</div>
                        <div className="text-[9px] text-slate-400">Demo Account</div>
                      </div>
                    </div>
                    {isSelected && <FaCheckCircle className="text-xs text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300">
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
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/90 py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 transition-all focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <FaEnvelope className="absolute left-3.5 top-3.5 text-xs text-slate-400" />
              </div>
              {errors.email && (
                <p className="mt-1 text-[11px] font-medium text-rose-400">⚠️ {errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/90 py-2.5 pl-10 pr-10 text-xs text-white placeholder-slate-500 transition-all focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <FaLock className="absolute left-3.5 top-3.5 text-xs text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-xs text-slate-400 transition-colors hover:text-slate-200"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-[11px] font-medium text-rose-400">⚠️ {errors.password}</p>
              )}
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex cursor-pointer items-center gap-2 text-slate-400">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-3.5 w-3.5 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/35 disabled:opacity-50"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>

              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleFillDemo(DEMO_ACCOUNTS[0], true)}
                className="w-full rounded-xl border border-indigo-500/30 bg-indigo-500/10 py-2.5 text-xs font-semibold text-indigo-300 transition-all hover:bg-indigo-500/20 hover:text-white"
              >
                ⚡ 1-Click Demo Login (Instant Access)
              </button>
            </div>

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

        {/* Right Section: Welcome Banner & Demo Account Credentials */}
        <div className="hidden w-1/2 flex-col justify-between border-l border-slate-800 bg-gradient-to-br from-indigo-900/60 via-purple-900/40 to-slate-900 p-10 text-white lg:flex">
          <div className="space-y-4">
            <span className="inline-block rounded-full border border-indigo-500/30 bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
              Department Portal
            </span>
            <h2 className="text-3xl font-extrabold leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-transparent">
                ProjectHub
              </span>
            </h2>
            <p className="text-xs leading-relaxed text-slate-300">
              Your gateway to organized, collaborative student project management. Sign in to browse
              submissions, give reviews, and showcase your engineering milestones.
            </p>
          </div>

          {/* Demo Credentials Box */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 backdrop-blur-md">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-xs font-bold text-white">Demo Credentials</span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                Ready to Test
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-indigo-300">🎓 Student Demo</span>
                  <button
                    type="button"
                    onClick={() => handleFillDemo(DEMO_ACCOUNTS[0], false)}
                    className="text-[11px] text-indigo-400 underline hover:text-indigo-200"
                  >
                    Auto Fill
                  </button>
                </div>
                <div className="mt-1 font-mono text-[11px] text-slate-400">
                  demostudent@adityauniversity.in
                </div>
                <div className="font-mono text-[11px] text-slate-500">Pass: DemoUser@123</div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-purple-300">👨‍🏫 Faculty Demo</span>
                  <button
                    type="button"
                    onClick={() => handleFillDemo(DEMO_ACCOUNTS[1], false)}
                    className="text-[11px] text-purple-400 underline hover:text-purple-200"
                  >
                    Auto Fill
                  </button>
                </div>
                <div className="mt-1 font-mono text-[11px] text-slate-400">
                  demo.faculty@adityauniversity.in
                </div>
                <div className="font-mono text-[11px] text-slate-500">Pass: DemoUser@123</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

