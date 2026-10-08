import React, { useState, useEffect, useContext } from 'react';
import { FaUserCircle, FaSearch, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { ToasterContext } from '../components/ToasterContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [searchEmail, setSearchEmail] = useState('');
  const { addToast } = useContext(ToasterContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
      addToast('Please login to access this page', 'warning', 4000);
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
        addToast('Please login to search projects', 'warning', 4000);
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

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-indigo-500/30 bg-slate-950/95 shadow-2xl shadow-indigo-950/40 ring-1 ring-indigo-500/20 backdrop-blur-2xl'
          : 'border-b border-slate-800/80 bg-slate-950/85 shadow-lg shadow-black/40 backdrop-blur-xl'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2.5 sm:py-3">
          {/* Left: Brand & Search */}
          <div className="flex items-center gap-4 lg:gap-6">
            <Link to="/" className="group flex items-center gap-2.5">
              <img
                src="/image/logo.png"
                alt="Logo"
                className="h-8 w-8 rounded-lg object-contain transition-transform group-hover:scale-105"
              />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-lg font-extrabold tracking-tight text-transparent sm:text-xl">
                ProjectHub
              </span>
            </Link>

            <form onSubmit={handleSearchSubmit} className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search author email..."
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  className="w-40 rounded-full border border-slate-700/60 bg-slate-900/90 py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-400 transition-all focus:w-56 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 lg:w-52 lg:focus:w-64"
                />
                <FaSearch className="absolute left-3 top-2.5 text-[11px] text-slate-400" />
              </div>
            </form>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden items-center gap-1 text-xs font-medium text-slate-300 lg:flex">
            <Link
              to="/home"
              className="rounded-full px-3.5 py-1.5 transition-all hover:bg-slate-800/70 hover:text-white"
            >
              Home
            </Link>

            {/* Departments Dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-all hover:bg-slate-800/70 hover:text-white">
                <span>Departments</span>
                <FaChevronDown className="text-[10px] transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute left-1/2 z-50 mt-2 hidden w-44 -translate-x-1/2 rounded-2xl border border-slate-800 bg-slate-950/95 p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-2xl group-hover:block">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => handleProtectedRouteClick(`/mainhome?department=${dept}`)}
                    className="w-full rounded-xl px-3 py-1.5 text-left text-xs text-slate-300 transition-colors hover:bg-indigo-600/20 hover:text-indigo-300"
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {user && (
              <Link
                to="/mainhome"
                className="rounded-full px-3.5 py-1.5 transition-all hover:bg-slate-800/70 hover:text-white"
              >
                Projects
              </Link>
            )}

            <button
              onClick={() => handleProtectedRouteClick('/top-liked')}
              className="rounded-full px-3.5 py-1.5 transition-all hover:bg-slate-800/70 hover:text-white"
            >
              Heroic
            </button>

            <button
              onClick={() => handleProtectedRouteClick('/aboutpage')}
              className="rounded-full px-3.5 py-1.5 transition-all hover:bg-slate-800/70 hover:text-white"
            >
              About
            </button>

            <button
              onClick={() => handleProtectedRouteClick('/contactus')}
              className="rounded-full px-3.5 py-1.5 transition-all hover:bg-slate-800/70 hover:text-white"
            >
              Contact
            </button>
          </div>

          {/* Right: Auth & Profile */}
          <div className="flex items-center gap-2.5">
            {!user ? (
              <button
                onClick={handleLoginClick}
                className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 px-5 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/25 transition-all hover:scale-105 hover:shadow-indigo-500/40 active:scale-95"
              >
                Login
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-200 transition-all hover:border-indigo-500 hover:text-white hover:shadow-sm"
                  title="User Dashboard"
                >
                  <FaUserCircle className="text-sm text-indigo-400" />
                  <span className="hidden max-w-[110px] truncate sm:inline">
                    {user.firstName || user.email?.split('@')[0]}
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="hidden rounded-full px-3 py-1.5 text-xs text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-400 sm:inline"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white lg:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes className="text-base" /> : <FaBars className="text-base" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="mt-1 rounded-2xl border-t border-slate-800/80 bg-slate-950/95 px-4 pb-5 pt-3 backdrop-blur-2xl lg:hidden">
            <form onSubmit={handleSearchSubmit} className="mb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search author email..."
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  className="w-full rounded-full border border-slate-700 bg-slate-900 px-4 py-2 pl-9 text-xs text-slate-200 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
                />
                <FaSearch className="absolute left-3.5 top-3 text-xs text-slate-400" />
              </div>
            </form>

            <div className="flex flex-col space-y-1 text-sm font-medium text-slate-300">
              <Link
                to="/home"
                onClick={closeMenu}
                className="rounded-xl px-3 py-2 transition-colors hover:bg-slate-800/70"
              >
                Home
              </Link>

              {/* Mobile Departments Accordion */}
              <div>
                <button
                  onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 transition-colors hover:bg-slate-800/70"
                >
                  <span>Departments</span>
                  <FaChevronDown
                    className={`text-xs transition-transform ${isDepartmentsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isDepartmentsOpen && (
                  <div className="my-1 grid grid-cols-3 gap-1 rounded-xl bg-slate-900/80 p-2">
                    {departments.map((dept) => (
                      <button
                        key={dept}
                        onClick={() => handleProtectedRouteClick(`/mainhome?department=${dept}`)}
                        className="rounded-lg px-2 py-1.5 text-center text-xs text-slate-300 transition-colors hover:bg-indigo-600/20 hover:text-indigo-300"
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
                  className="rounded-xl px-3 py-2 transition-colors hover:bg-slate-800/70"
                >
                  Projects
                </Link>
              )}

              <button
                onClick={() => handleProtectedRouteClick('/top-liked')}
                className="rounded-xl px-3 py-2 text-left transition-colors hover:bg-slate-800/70"
              >
                Heroic Leaderboard
              </button>

              <button
                onClick={() => handleProtectedRouteClick('/aboutpage')}
                className="rounded-xl px-3 py-2 text-left transition-colors hover:bg-slate-800/70"
              >
                About
              </button>

              <button
                onClick={() => handleProtectedRouteClick('/contactus')}
                className="rounded-xl px-3 py-2 text-left transition-colors hover:bg-slate-800/70"
              >
                Contact Us
              </button>

              <div className="border-t border-slate-800 pt-3">
                {!user ? (
                  <button
                    onClick={handleLoginClick}
                    className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 py-2.5 text-center text-xs font-semibold text-white shadow-md hover:from-indigo-600 hover:to-purple-700"
                  >
                    Login
                  </button>
                ) : (
                  <div className="flex w-full items-center justify-between">
                    <span className="truncate text-xs text-slate-400">
                      Signed in as <b className="text-slate-200">{user.email}</b>
                    </span>
                    <button
                      onClick={handleLogout}
                      className="rounded-full bg-rose-500/20 px-3 py-1.5 text-xs text-rose-300 transition-colors hover:bg-rose-500/30"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
