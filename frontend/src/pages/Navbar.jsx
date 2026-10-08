import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  FaUserCircle,
  FaSearch,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaFire,
  FaCompass,
  FaThLarge,
  FaInfoCircle,
  FaEnvelope,
  FaLaptopCode,
} from 'react-icons/fa';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ToasterContext } from '../components/ToasterContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const [searchEmail, setSearchEmail] = useState('');
  const { addToast } = useContext(ToasterContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDepartmentsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => {
    setIsOpen(false);
    setIsDepartmentsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    closeMenu();
    navigate('/loginpage');
  };

  const handleLoginClick = () => {
    navigate('/loginpage');
    closeMenu();
  };

  const handleProfileClick = () => {
    navigate('/dashboard');
    closeMenu();
  };

  const handleProtectedRouteClick = (route) => {
    if (!user) {
      addToast('Please sign in to access this section', 'warning', 3500);
      navigate('/loginpage');
      closeMenu();
    } else {
      navigate(route);
      closeMenu();
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchEmail.trim()) {
      if (!user) {
        addToast('Please sign in to search projects', 'warning', 3500);
        navigate('/loginpage');
        setSearchEmail('');
        closeMenu();
      } else {
        navigate(`/mainhome?email=${encodeURIComponent(searchEmail.trim())}`);
        setSearchEmail('');
        closeMenu();
      }
    }
  };

  const departments = [
    { code: 'CSE', name: 'Computer Science', icon: '💻' },
    { code: 'AIML', name: 'AI & Machine Learning', icon: '🧠' },
    { code: 'IT', name: 'Information Technology', icon: '🌐' },
    { code: 'ECE', name: 'Electronics & Comm.', icon: '⚡' },
    { code: 'EEE', name: 'Electrical Engineering', icon: '🔋' },
    { code: 'MECH', name: 'Mechanical Systems', icon: '⚙️' },
    { code: 'CIVIL', name: 'Civil & Infra', icon: '🏗️' },
    { code: 'CHEMICAL', name: 'Chemical Process', icon: '🧪' },
    { code: 'MCA', name: 'Computer Applications', icon: '📱' },
    { code: 'MBA', name: 'Management / Innovation', icon: '📊' },
  ];

  const isActive = (path) => {
    if (path === '/home' || path === '/') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    return location.pathname === path;
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-cyan-500/20 bg-[#030712]/95 shadow-xl shadow-cyan-950/20 backdrop-blur-2xl'
          : 'border-b border-white/[0.08] bg-[#030712]/85 shadow-lg shadow-black/40 backdrop-blur-xl'
      }`}
    >
      {/* Full-width container with responsive horizontal padding */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <nav className="flex h-16 items-center justify-between gap-4">
          {/* LEFT: Brand Logo & Creator Search */}
          <div className="flex items-center gap-4 lg:gap-6">
            <Link to="/" className="group flex items-center gap-3 focus:outline-none">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-indigo-600/20 shadow-glow-cyan transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-400">
                <span className="font-mono text-xs font-black tracking-tighter text-cyan-300">PH</span>
                <div className="absolute inset-0 rounded-xl bg-cyan-400/10 blur-sm"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-sora text-base font-extrabold tracking-tight text-white transition-colors group-hover:text-cyan-300 sm:text-lg leading-tight">
                  PROJECT<span className="text-cyan-400">HUB</span>
                </span>
                <span className="hidden text-[9px] font-mono uppercase tracking-widest text-slate-400 sm:block">
                  Student Innovation Engine
                </span>
              </div>
            </Link>

            {/* Creator Email Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search creator email..."
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  className="w-48 xl:w-56 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-8 pr-3 font-sans text-xs text-slate-200 placeholder-slate-500 transition-all duration-200 focus:w-64 focus:border-cyan-500/50 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-cyan-500/20"
                />
                <FaSearch className="absolute left-3 top-2.5 text-[10px] text-slate-500" />
              </div>
            </form>
          </div>

          {/* CENTER: Navigation Links */}
          <div className="hidden items-center gap-1 font-sans text-xs font-medium text-slate-300 lg:flex">
            <Link
              to="/home"
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-all duration-200 ${
                isActive('/home')
                  ? 'border border-cyan-500/30 bg-cyan-500/10 font-semibold text-cyan-300 shadow-sm shadow-cyan-500/20'
                  : 'hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              <span>Home</span>
            </Link>

            {/* Explore Projects */}
            <button
              onClick={() => handleProtectedRouteClick('/mainhome')}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-all duration-200 ${
                isActive('/mainhome') && !location.search
                  ? 'border border-cyan-500/30 bg-cyan-500/10 font-semibold text-cyan-300 shadow-sm shadow-cyan-500/20'
                  : 'hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              <FaCompass className="text-[11px] text-cyan-400" />
              <span>Explore</span>
            </button>

            {/* Disciplines Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-all duration-200 ${
                  location.search.includes('department=')
                    ? 'border border-cyan-500/30 bg-cyan-500/10 font-semibold text-cyan-300'
                    : 'hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <FaThLarge className="text-[10px] text-slate-400" />
                <span>Disciplines</span>
                <FaChevronDown
                  className={`text-[9px] text-slate-500 transition-transform duration-200 ${
                    isDepartmentsOpen ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>

              {/* Glass Dropdown Menu */}
              {isDepartmentsOpen && (
                <div className="absolute left-1/2 z-50 mt-2 w-64 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#030712]/95 p-2.5 shadow-2xl ring-1 ring-white/5 backdrop-blur-2xl animate-fade-in">
                  <div className="mb-2 flex items-center justify-between border-b border-white/[0.08] px-2 pb-1.5">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                      Engineering Disciplines
                    </span>
                    <span className="text-[10px] text-slate-500">{departments.length} Fields</span>
                  </div>
                  <div className="max-h-72 space-y-0.5 overflow-y-auto pr-1">
                    {departments.map((dept) => (
                      <button
                        key={dept.code}
                        onClick={() => {
                          handleProtectedRouteClick(`/mainhome?department=${dept.code}`);
                          setIsDepartmentsOpen(false);
                        }}
                        className="flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-left text-xs text-slate-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-300 group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs">{dept.icon}</span>
                          <span className="font-semibold text-slate-200 group-hover:text-cyan-300">{dept.code}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 truncate max-w-[120px]">{dept.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Leaderboard / Top Liked */}
            <button
              onClick={() => handleProtectedRouteClick('/top-liked')}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-all duration-200 ${
                isActive('/top-liked')
                  ? 'border border-cyan-500/30 bg-cyan-500/10 font-semibold text-cyan-300 shadow-sm shadow-cyan-500/20'
                  : 'hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              <FaFire className="text-[11px] text-amber-400" />
              <span>Leaderboard</span>
            </button>

            {/* About */}
            <button
              onClick={() => handleProtectedRouteClick('/aboutpage')}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-all duration-200 ${
                isActive('/aboutpage')
                  ? 'border border-cyan-500/30 bg-cyan-500/10 font-semibold text-cyan-300 shadow-sm shadow-cyan-500/20'
                  : 'hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              <FaInfoCircle className="text-[10px] text-slate-400" />
              <span>About</span>
            </button>

            {/* Contact */}
            <button
              onClick={() => handleProtectedRouteClick('/contactus')}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-all duration-200 ${
                isActive('/contactus')
                  ? 'border border-cyan-500/30 bg-cyan-500/10 font-semibold text-cyan-300 shadow-sm shadow-cyan-500/20'
                  : 'hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              <FaEnvelope className="text-[10px] text-slate-400" />
              <span>Contact</span>
            </button>
          </div>

          {/* RIGHT: User Profile & Auth Controls */}
          <div className="flex items-center gap-3">
            {!user ? (
              <button
                onClick={handleLoginClick}
                className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 px-4 py-1.5 text-xs font-semibold text-cyan-300 shadow-md shadow-cyan-500/10 transition-all duration-200 hover:border-cyan-400 hover:from-cyan-500/30 hover:to-blue-600/30 hover:text-white hover:shadow-cyan-500/30"
              >
                <span>Sign In</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-slate-200 transition-all hover:border-cyan-500/40 hover:bg-white/[0.08] hover:text-white"
                  title="Open Dashboard"
                >
                  <FaUserCircle className="text-sm text-cyan-400" />
                  <span className="hidden max-w-[120px] truncate font-medium sm:inline">
                    {user.firstName || user.email?.split('@')[0]}
                  </span>
                  <span className="hidden rounded bg-cyan-500/20 px-1.5 py-0.5 text-[9px] font-mono text-cyan-300 xl:inline">
                    {user.role || 'MEMBER'}
                  </span>
                </button>

                <button
                  onClick={handleLogout}
                  className="rounded-full p-2 text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                  title="Sign Out"
                >
                  <FaSignOutAlt className="text-xs" />
                </button>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={toggleMenu}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-2 text-slate-400 transition-colors hover:bg-white/[0.08] hover:text-white lg:hidden"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <FaTimes className="text-sm" /> : <FaBars className="text-sm" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="border-t border-white/[0.08] bg-[#030712]/98 px-2 py-4 backdrop-blur-2xl lg:hidden">
            <div className="flex flex-col gap-1 font-sans text-xs font-medium text-slate-300">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mb-3 px-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search creator email..."
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-500/50 focus:outline-none"
                  />
                  <FaSearch className="absolute left-3 top-3 text-[11px] text-slate-500" />
                </div>
              </form>

              <Link
                to="/home"
                onClick={closeMenu}
                className={`rounded-xl px-3.5 py-2.5 transition-colors ${
                  isActive('/home') ? 'bg-cyan-500/15 font-semibold text-cyan-300' : 'hover:bg-white/[0.05]'
                }`}
              >
                Home
              </Link>

              <button
                onClick={() => handleProtectedRouteClick('/mainhome')}
                className={`rounded-xl px-3.5 py-2.5 text-left transition-colors ${
                  isActive('/mainhome') && !location.search
                    ? 'bg-cyan-500/15 font-semibold text-cyan-300'
                    : 'hover:bg-white/[0.05]'
                }`}
              >
                Explore Projects
              </button>

              {/* Mobile Disciplines Accordion */}
              <div>
                <button
                  onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}
                  className="flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 transition-colors hover:bg-white/[0.05]"
                >
                  <span>Disciplines</span>
                  <FaChevronDown
                    className={`text-xs text-slate-500 transition-transform ${isDepartmentsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isDepartmentsOpen && (
                  <div className="my-1 grid grid-cols-2 gap-1 rounded-xl border border-white/5 bg-white/[0.02] p-2">
                    {departments.map((dept) => (
                      <button
                        key={dept.code}
                        onClick={() => handleProtectedRouteClick(`/mainhome?department=${dept.code}`)}
                        className="rounded-lg px-2.5 py-2 text-left text-xs text-slate-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-300 flex items-center gap-1.5"
                      >
                        <span>{dept.icon}</span>
                        <span className="font-semibold">{dept.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleProtectedRouteClick('/top-liked')}
                className={`rounded-xl px-3.5 py-2.5 text-left transition-colors flex items-center gap-2 ${
                  isActive('/top-liked') ? 'bg-cyan-500/15 font-semibold text-cyan-300' : 'hover:bg-white/[0.05]'
                }`}
              >
                <FaFire className="text-amber-400 text-xs" />
                <span>Leaderboard / Top Projects</span>
              </button>

              <button
                onClick={() => handleProtectedRouteClick('/aboutpage')}
                className={`rounded-xl px-3.5 py-2.5 text-left transition-colors ${
                  isActive('/aboutpage') ? 'bg-cyan-500/15 font-semibold text-cyan-300' : 'hover:bg-white/[0.05]'
                }`}
              >
                About ProjectHub
              </button>

              <button
                onClick={() => handleProtectedRouteClick('/contactus')}
                className={`rounded-xl px-3.5 py-2.5 text-left transition-colors ${
                  isActive('/contactus') ? 'bg-cyan-500/15 font-semibold text-cyan-300' : 'hover:bg-white/[0.05]'
                }`}
              >
                Contact & Support
              </button>

              <div className="border-t border-white/[0.08] mt-2 pt-3">
                {!user ? (
                  <button
                    onClick={handleLoginClick}
                    className="w-full rounded-xl border border-cyan-500/40 bg-gradient-to-r from-cyan-500/25 to-blue-600/25 py-2.5 text-center text-xs font-semibold text-cyan-200 shadow-md hover:from-cyan-500/35 hover:to-blue-600/35"
                  >
                    Sign In to ProjectHub
                  </button>
                ) : (
                  <div className="flex w-full items-center justify-between px-2">
                    <button
                      onClick={handleProfileClick}
                      className="truncate text-xs text-slate-300 hover:text-cyan-300 text-left"
                    >
                      Signed in as <b className="text-white">{user.firstName || user.email}</b>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="rounded-lg bg-rose-500/20 px-3 py-1.5 text-xs font-semibold text-rose-300 transition-colors hover:bg-rose-500/30"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

