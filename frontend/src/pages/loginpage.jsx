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
  FaLayerGroup,
  FaShieldAlt,
  FaRocket,
  FaAward,
  FaArrowRight,
  FaStar,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ToasterContext } from '../components/ToasterContext';

const DEMO_ACCOUNTS = [
  {
    role: 'Student Portal',
    title: 'Demo Student',
    email: 'demostudent@adityauniversity.in',
    password: 'DemoUser@123',
    icon: FaUserGraduate,
    badge: 'STUDENT',
    tagColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30',
    gradient: 'from-cyan-500/10 via-blue-500/5 to-transparent',
    borderActive: 'border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.25)]',
  },
  {
    role: 'Faculty Portal',
    title: 'Demo Faculty',
    email: 'demo.faculty@adityauniversity.in',
    password: 'DemoUser@123',
    icon: FaChalkboardTeacher,
    badge: 'FACULTY',
    tagColor: 'text-purple-400 bg-purple-950/60 border-purple-500/30',
    gradient: 'from-purple-500/10 via-pink-500/5 to-transparent',
    borderActive: 'border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.25)]',
  },
];

const HIGHLIGHTS = [
  {
    icon: FaRocket,
    title: 'Showcase Innovations',
    desc: 'Publish IoT, AI, Full-Stack and Engineering capstone projects.',
  },
  {
    icon: FaAward,
    title: 'Department Leaderboard',
    desc: 'Compete for the top 3 most liked milestones and peer recognition.',
  },
  {
    icon: FaShieldAlt,
    title: 'Institutional Access',
    desc: 'Secured domain authentication for Aditya University students.',
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
    addToast(`Filled credentials for ${account.title}!`, 'success', 2000);

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
        setTimeout(() => navigate('/mainhome'), 1000);
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
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-[#070b14] px-4 py-12 sm:px-6 lg:px-8">
      {/* Background Ambient Glow Orbs */}
      <div className="pointer-events-none absolute -left-48 -top-48 h-96 w-96 rounded-full bg-indigo-600/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-purple-600/20 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

      {/* Main Glassmorphic Card Container */}
      <div className="relative flex w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/70 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
        {/* Left Section: Login Form */}
        <div className="flex w-full flex-col justify-between p-8 sm:p-12 lg:w-7/12">
          <div>
            {/* Header / Brand Badge */}
            <div className="mb-6 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300">
                <FaLayerGroup className="text-indigo-400" />
                <span>ProjectHub Portal</span>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400 border border-emerald-500/20">
                ● System Online
              </span>
            </div>

            <div className="mb-6">
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Welcome <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">Back</span>
              </h1>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                Enter your university credentials or use quick 1-click demo access below.
              </p>
            </div>

            {/* Quick Demo Autofill Selector */}
            <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5 backdrop-blur-md">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                  <FaBolt className="text-amber-400" /> Quick Auto-Fill Demo
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-indigo-400">
                  Select Role
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {DEMO_ACCOUNTS.map((acc) => {
                  const Icon = acc.icon;
                  const isSelected = activeDemo === acc.title;
                  return (
                    <button
                      key={acc.title}
                      type="button"
                      onClick={() => handleFillDemo(acc, false)}
                      className={`group relative flex items-center justify-between rounded-xl border p-2.5 text-left transition-all ${
                        isSelected
                          ? `${acc.borderActive} bg-slate-800/90 text-white`
                          : 'border-slate-800/90 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/80 text-sm text-indigo-300 transition-transform group-hover:scale-105">
                          <Icon />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">{acc.title}</div>
                          <div className="text-[10px] text-slate-400">{acc.role}</div>
                        </div>
                      </div>
                      {isSelected ? (
                        <FaCheckCircle className="text-sm text-emerald-400" />
                      ) : (
                        <span className="text-[10px] font-semibold text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100">
                          Fill ➔
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">
                  University Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="rollno@adityauniversity.in"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 transition-all focus:border-indigo-500 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <FaEnvelope className="absolute left-3.5 top-3.5 text-xs text-slate-400" />
                </div>
                {errors.email && (
                  <p className="mt-1 text-[11px] font-medium text-rose-400">⚠️ {errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300">Password</label>
                  <Link
                    to="/forgot-password"
                    className="text-[11px] font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                  >
                    Forgot password?
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
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 py-2.5 pl-10 pr-10 text-xs text-white placeholder-slate-500 transition-all focus:border-indigo-500 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
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

              {/* Remember Me */}
              <div className="flex items-center text-xs">
                <label className="flex cursor-pointer items-center gap-2 text-slate-400 hover:text-slate-300">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-3.5 w-3.5 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  Remember my session
                </label>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-indigo-500/25 transition-all hover:opacity-95 hover:shadow-indigo-500/35 active:scale-[0.99] disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Signing In...
                    </span>
                  ) : (
                    <>
                      <span>Sign In to Portal</span>
                      <FaArrowRight className="text-[11px] transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleFillDemo(DEMO_ACCOUNTS[0], true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 py-2.5 text-xs font-semibold text-indigo-300 transition-all hover:border-indigo-400/50 hover:bg-indigo-500/20 hover:text-white"
                >
                  <FaBolt className="text-amber-400" />
                  <span>1-Click Instant Demo Access</span>
                </button>
              </div>
            </form>
          </div>

          {/* Footer Signup Link */}
          <div className="mt-8 border-t border-slate-800/80 pt-4 text-center text-xs text-slate-400">
            Don't have an account yet?{' '}
            <Link
              to="/signup"
              className="font-semibold text-indigo-400 underline transition-colors hover:text-indigo-300"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Right Section: Interactive Showcase Banner */}
        <div className="hidden w-5/12 flex-col justify-between border-l border-slate-800/80 bg-gradient-to-br from-indigo-950/70 via-slate-900/90 to-[#0b0f19] p-10 text-white lg:flex">
          {/* Top Intro */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-900/30 px-3 py-1 text-xs font-semibold text-purple-300">
              <FaStar className="text-amber-400" />
              <span>Project Showcase Matrix</span>
            </div>

            <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">
              Engineering{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
                Excellence
              </span>{' '}
              Hub
            </h2>

            <p className="text-xs leading-relaxed text-slate-300">
              The centralized digital portfolio for Aditya Educational Institutions. Submit capstones,
              explore research papers, and rate peers.
            </p>

            {/* Department Badges Grid */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {['CSE', 'AI&ML', 'IT', 'ECE', 'MECH', 'CIVIL', 'CHEM', 'MBA'].map((dept) => (
                <span
                  key={dept}
                  className="rounded-lg border border-slate-700/60 bg-slate-800/50 px-2 py-0.5 text-[10px] font-semibold text-slate-300 backdrop-blur-sm"
                >
                  {dept}
                </span>
              ))}
            </div>
          </div>

          {/* Feature Highlight Bullets */}
          <div className="space-y-3.5 my-6">
            {HIGHLIGHTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/50 p-3 backdrop-blur-sm"
                >
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-xs text-indigo-400">
                    <Icon />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{item.title}</div>
                    <div className="text-[11px] leading-relaxed text-slate-400">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Demo Credentials Vault */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 shadow-inner backdrop-blur-md">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">Demo Credentials</span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                Ready
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between rounded-xl border border-slate-800/90 bg-slate-900/80 p-2 text-left">
                <div>
                  <div className="text-[11px] font-semibold text-cyan-300">🎓 Student</div>
                  <div className="font-mono text-[10px] text-slate-400">demostudent@adityauniversity.in</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleFillDemo(DEMO_ACCOUNTS[0], false)}
                  className="rounded-md border border-cyan-500/30 bg-cyan-950/40 px-2 py-1 text-[10px] font-semibold text-cyan-300 hover:bg-cyan-900/60"
                >
                  Auto Fill
                </button>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-800/90 bg-slate-900/80 p-2 text-left">
                <div>
                  <div className="text-[11px] font-semibold text-purple-300">👨‍🏫 Faculty</div>
                  <div className="font-mono text-[10px] text-slate-400">demo.faculty@adityauniversity.in</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleFillDemo(DEMO_ACCOUNTS[1], false)}
                  className="rounded-md border border-purple-500/30 bg-purple-950/40 px-2 py-1 text-[10px] font-semibold text-purple-300 hover:bg-purple-900/60"
                >
                  Auto Fill
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


