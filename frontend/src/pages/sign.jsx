import React, { useState, useContext } from 'react';
import api from '../components/api';
import { ToasterContext } from '../components/ToasterContext';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

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
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-transparent px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      <div className="glass-panel relative w-full max-w-lg rounded-3xl p-8 shadow-2xl sm:p-10">
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-violet-300">
            <FaUserPlus className="text-violet-400" />
            <span>CREATE ACCOUNT</span>
          </div>
          <h2 className="font-sora text-2xl font-black text-white sm:text-3xl">Join ProjectHub</h2>
          <p className="mt-1 font-sans text-xs text-slate-400">
            Showcase your capstone and collaborate with verified peers
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-violet-500/50 focus:bg-white/[0.06] focus:outline-none"
                />
                <FaUser className="absolute left-3 top-2.5 text-xs text-slate-500" />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-[11px] font-medium text-rose-400">{errors.firstName}</p>
              )}
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
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-violet-500/50 focus:bg-white/[0.06] focus:outline-none"
                />
                <FaUser className="absolute left-3 top-2.5 text-xs text-slate-500" />
              </div>
              {errors.lastName && (
                <p className="mt-1 text-[11px] font-medium text-rose-400">{errors.lastName}</p>
              )}
            </div>
          </div>

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
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-violet-500/50 focus:bg-white/[0.06] focus:outline-none"
              />
              <FaEnvelope className="absolute left-3 top-2.5 text-xs text-slate-500" />
            </div>
            {errors.email && (
              <p className="mt-1 text-[11px] font-medium text-rose-400">⚠️ {errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block font-sans text-xs font-medium text-slate-300">Create Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Min. 8 characters"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-9 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-violet-500/50 focus:bg-white/[0.06] focus:outline-none"
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

          {/* Confirm Password */}
          <div>
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
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-9 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-violet-500/50 focus:bg-white/[0.06] focus:outline-none"
              />
              <FaLock className="absolute left-3 top-2.5 text-xs text-slate-500" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-200"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-[11px] font-medium text-rose-400">
                ⚠️ {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-xl border border-violet-400/40 bg-gradient-to-r from-violet-500 to-blue-600 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <p className="pt-2 text-center font-sans text-xs text-slate-400">
            Already have an account?{' '}
            <Link
              to="/loginpage"
              className="font-semibold text-violet-400 underline hover:text-violet-300"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

