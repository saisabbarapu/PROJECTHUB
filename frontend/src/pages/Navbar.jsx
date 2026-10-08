import React, { useState, useEffect, useContext } from 'react';
import {
  FaUserCircle,
  FaSearch,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaPlus,
  FaTrophy,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ToasterContext } from '../components/ToasterContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
      addToast('Please login to access this section', 'warning', 3500);
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
        addToast('Please login to search projects', 'warning', 3500);
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

  const departments = ['CIVIL', 'CSE', 'AIML', 'ECE', 'EEE', 'IT', 'MBA', 'MCA', 'MECH'];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full px-3 py-3 sm:px-6 lg:px-8">
      <div
        className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-300 ${
          scrolled
            ? 'border-white/10 bg-[#030712]/85 shadow-2xl shadow-black/80 backdrop-blur-2xl'
            : 'border-white/[0.06] bg-[#050816]/70 shadow-lg shadow-black/40 backdrop-blur-xl'
        }`}
      >
        <nav className="flex items-center justify-between px-4 py-2.5 sm:px-6">
          {/* Left: Brand & Search */}
          <div className="flex items-center gap-5 lg:gap-8">
            <Link to="/" className="group flex items-center gap-2.5 focus:outline-none">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/image/logo.png"
                  alt="ProjectHub Logo"
                  className="h-5 w-5 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 rounded-lg bg-cyan-400/10 blur-sm"></div>
              </div>
              <span className="font-sora text-base font-bold tracking-tight text-white transition-colors group-hover:text-cyan-300 sm:text-lg">
                PROJECT<span className="text-cyan-400">HUB</span>
              </span>
            </Link>

            <form onSubmit={handleSearchSubmit} className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search creator email..."
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  className="w-44 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-8 pr-3 font-sans text-xs text-slate-200 placeholder-slate-500 transition-all duration-200 focus:w-60 focus:border-cyan-500/50 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-cyan-500/20 lg:w-52"
                />
                <FaSearch className="absolute left-3 top-2.5 text-[10px] text-slate-500" />
              </div>
            </form>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden items-center gap-1 font-sans text-xs font-medium text-slate-400 lg:flex">
            <Link
              to="/home"
              className={`rounded-full px-3.5 py-1.5 transition-all ${
                isActive('/') || isActive('/home')
                  ? 'bg-white/[0.08] font-semibold text-white'
                  : 'hover:bg-white/[0.04] hover:text-slate-200'
              }`}
            >
              Home
            </Link>

            {/* Departments Dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-all hover:bg-white/[0.04] hover:text-slate-200">
                <span>Departments</span>
                <FaChevronDown className="text-[9px] text-slate-500 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute left-1/2 z-50 mt-2 hidden w-48 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#050816]/95 p-2 shadow-2xl ring-1 ring-white/5 backdrop-blur-2xl group-hover:block">
                <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Disciplines
                </div>
                <div className="grid grid-cols-1 gap-0.5">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => handleProtectedRouteClick(`/mainhome?department=${dept}`)}
                      className="w-full rounded-xl px-3 py-1.5 text-left text-xs text-slate-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-300"
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {user && (
              <Link
                to="/mainhome"
                className={`rounded-full px-3.5 py-1.5 transition-all ${
                  isActive('/mainhome')
                    ? 'bg-white/[0.08] font-semibold text-white'
                    : 'hover:bg-white/[0.04] hover:text-slate-200'
                }`}
              >
                Projects
              </Link>
            )}

            <button
              onClick={() => handleProtectedRouteClick('/top-liked')}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-all ${
                isActive('/top-liked')
                  ? 'bg-white/[0.08] font-semibold text-white'
                  : 'hover:bg-white/[0.04] hover:text-slate-200'
              }`}
            >
              <span>Top Projects</span>
            </button>

            <button
              onClick={() => handleProtectedRouteClick('/aboutpage')}
              className={`rounded-full px-3.5 py-1.5 transition-all ${
                isActive('/aboutpage')
                  ? 'bg-white/[0.08] font-semibold text-white'
                  : 'hover:bg-white/[0.04] hover:text-slate-200'
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleProtectedRouteClick('/contactus')}
              className={`rounded-full px-3.5 py-1.5 transition-all ${
                isActive('/contactus')
                  ? 'bg-white/[0.08] font-semibold text-white'
                  : 'hover:bg-white/[0.04] hover:text-slate-200'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Right: Auth & CTAs */}
          <div className="flex items-center gap-3">
            {!user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLoginClick}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-slate-200 transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/loginpage')}
                  className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/15 px-4 py-1.5 text-xs font-semibold text-cyan-300 shadow-sm shadow-cyan-500/10 transition-all hover:border-cyan-400/60 hover:bg-cyan-500/25 hover:text-white"
                >
                  <span>Submit Project</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleProtectedRouteClick('/mainhome')}
                  className="hidden items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20 sm:inline-flex"
                >
                  <FaPlus className="text-[10px]" />
                  <span>Submit</span>
                </button>

                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-200 transition-all hover:border-cyan-500/40 hover:bg-white/[0.08] hover:text-white"
                  title="Your Dashboard"
                >
                  <FaUserCircle className="text-sm text-cyan-400" />
                  <span className="hidden max-w-[110px] truncate sm:inline">
                    {user.firstName || user.email?.split('@')[0]}
                  </span>
                </button>

                <button
                  onClick={handleLogout}
                  className="rounded-full p-2 text-slate-500 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                  title="Sign Out"
                >
                  <FaSignOutAlt className="text-xs" />
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMenu}
              className="rounded-full border border-white/10 bg-white/[0.03] p-2 text-slate-400 transition-colors hover:bg-white/[0.08] hover:text-white lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <FaTimes className="text-sm" /> : <FaBars className="text-sm" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Panel */}
        {isOpen && (
          <div className="border-t border-white/[0.08] px-4 pb-5 pt-3 lg:hidden">
            <form onSubmit={handleSearchSubmit} className="mb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search creator email..."
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 pl-8 font-sans text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-500/50 focus:outline-none"
                />
                <FaSearch className="absolute left-3 top-2.5 text-xs text-slate-500" />
              </div>
            </form>

            <div className="flex flex-col space-y-1 font-sans text-sm font-medium text-slate-300">
              <Link
                to="/home"
                onClick={closeMenu}
                className="rounded-xl px-3 py-2 transition-colors hover:bg-white/[0.05]"
              >
                Home
              </Link>

              {/* Mobile Departments */}
              <div>
                <button
                  onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 transition-colors hover:bg-white/[0.05]"
                >
                  <span>Departments</span>
                  <FaChevronDown
                    className={`text-xs text-slate-500 transition-transform ${isDepartmentsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isDepartmentsOpen && (
                  <div className="my-1 grid grid-cols-3 gap-1 rounded-xl border border-white/5 bg-white/[0.02] p-2">
                    {departments.map((dept) => (
                      <button
                        key={dept}
                        onClick={() => handleProtectedRouteClick(`/mainhome?department=${dept}`)}
                        className="rounded-lg px-2 py-1.5 text-center text-xs text-slate-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-300"
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {user && (
                <Link
                  to="/mainhome"
                  onClick={closeMenu}
                  className="rounded-xl px-3 py-2 transition-colors hover:bg-white/[0.05]"
                >
                  Projects Catalog
                </Link>
              )}

              <button
                onClick={() => handleProtectedRouteClick('/top-liked')}
                className="rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/[0.05]"
              >
                Top Projects
              </button>

              <button
                onClick={() => handleProtectedRouteClick('/aboutpage')}
                className="rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/[0.05]"
              >
                About
              </button>

              <button
                onClick={() => handleProtectedRouteClick('/contactus')}
                className="rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/[0.05]"
              >
                Contact
              </button>

              <div className="border-t border-white/[0.08] pt-3">
                {!user ? (
                  <button
                    onClick={handleLoginClick}
                    className="w-full rounded-xl border border-cyan-500/40 bg-cyan-500/20 py-2.5 text-center text-xs font-semibold text-cyan-200 shadow-md hover:bg-cyan-500/30"
                  >
                    Sign In
                  </button>
                ) : (
                  <div className="flex w-full items-center justify-between">
                    <span className="truncate text-xs text-slate-400">
                      Signed in as <b className="text-slate-200">{user.email}</b>
                    </span>
                    <button
                      onClick={handleLogout}
                      className="rounded-full bg-rose-500/20 px-3 py-1 text-xs text-rose-300 transition-colors hover:bg-rose-500/30"
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

