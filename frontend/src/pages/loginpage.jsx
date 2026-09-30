import React, { useState, useContext } from 'react';
import api from '../components/api';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ToasterContext } from '../components/ToasterContext';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Please enter your email.';
    if (!formData.password.trim()) newErrors.password = 'Please enter your password.';
    const emailRegex = /@(?:adityauniversity\.in|aec\.in)$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Email must end with @adityauniversity.in or @aec.in';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      addToast('Please resolve the errors below.', 'error', 4000);
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/users/login', formData);
      if (response.data && response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        addToast('Login successful! Redirecting...', 'success', 2500);
        setTimeout(() => navigate('/mainhome'), 1500);
      }
    } catch (err) {
      addToast(err.response?.data?.error || 'Login failed', 'error', 4000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
        {/* Left Section: Form */}
        <div className="w-full p-8 sm:p-12 lg:w-1/2">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-white">Sign In</h2>
            <p className="mt-2 text-xs text-slate-400">
              Welcome back! Please enter your university credentials.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/35 disabled:opacity-50"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

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

        {/* Right Section: Welcome Banner */}
        <div className="hidden w-1/2 flex-col justify-center border-l border-slate-800 bg-gradient-to-br from-indigo-900/60 via-purple-900/40 to-slate-900 p-12 text-white lg:flex">
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
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
