import React, { useState, useContext } from 'react';
import { FaUserCircle, FaSearch, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { ToasterContext } from '../components/ToasterContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [searchEmail, setSearchEmail] = useState('');
  const { addToast } = useContext(ToasterContext);

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
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Brand & Search */}
        <div className="flex items-center gap-6">
          <Link to="/" className="group flex items-center gap-3">
            <img
              src="/image/logo.png"
              alt="Logo"
              className="h-9 w-9 rounded-lg object-contain transition-transform group-hover:scale-105"
            />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-xl font-bold tracking-tight text-transparent">
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
                className="w-48 rounded-full border border-slate-700/60 bg-slate-900/90 py-1.5 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 lg:w-64"
              />
              <FaSearch className="absolute left-3 top-2.5 text-xs text-slate-400" />
            </div>
          </form>
        </div>

        {/* Center: Desktop Navigation */}
        <div className="hidden items-center gap-6 text-sm font-medium text-slate-300 lg:flex">
          <Link to="/home" className="transition-colors hover:text-indigo-400">
            Home
          </Link>

          {/* Departments Dropdown */}
          <div className="group relative">
            <button className="flex items-center gap-1.5 py-2 transition-colors hover:text-indigo-400">
              Departments
              <FaChevronDown className="text-xs transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 mt-1 hidden w-44 rounded-xl border border-slate-800 bg-slate-900/95 p-2 shadow-xl backdrop-blur-lg transition-all group-hover:block">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => handleProtectedRouteClick(`/mainhome?department=${dept}`)}
                  className="w-full rounded-lg px-3 py-1.5 text-left text-xs text-slate-300 transition-colors hover:bg-indigo-600/20 hover:text-indigo-300"
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {user && (
            <Link to="/mainhome" className="transition-colors hover:text-indigo-400">
              Projects
            </Link>
          )}

          <button
            onClick={() => handleProtectedRouteClick('/top-liked')}
            className="transition-colors hover:text-indigo-400"
          >
            Heroic
          </button>

          <button
            onClick={() => handleProtectedRouteClick('/contactus')}
            className="transition-colors hover:text-indigo-400"
          >
            Contact Us
          </button>
        </div>

        {/* Right: Auth & Profile */}
        <div className="flex items-center gap-3">
          {!user ? (
            <button
              onClick={handleLoginClick}
              className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/30"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-xs text-slate-200 transition-all hover:border-indigo-500 hover:text-white"
                title="User Dashboard"
              >
                <FaUserCircle className="text-base text-indigo-400" />
                <span className="hidden max-w-[120px] truncate sm:inline">
                  {user.firstName || user.email?.split('@')[0]}
                </span>
              </button>
              <button
                onClick={handleLogout}
                className="hidden px-2 py-1 text-xs text-slate-400 transition-colors hover:text-rose-400 sm:inline"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="border-t border-slate-800/80 bg-slate-950/95 px-4 pb-6 pt-3 backdrop-blur-xl lg:hidden">
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search author email..."
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 pl-9 text-xs text-slate-200 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
              />
              <FaSearch className="absolute left-3 top-3 text-xs text-slate-400" />
            </div>
          </form>

          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-300">
            <Link
              to="/home"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 hover:bg-slate-800"
            >
              Home
            </Link>

            {/* Mobile Departments Accordion */}
            <div>
              <button
                onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-slate-800"
              >
                <span>Departments</span>
                <FaChevronDown
                  className={`text-xs transition-transform ${isDepartmentsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isDepartmentsOpen && (
                <div className="mt-1 grid grid-cols-2 gap-1 rounded-lg bg-slate-900/60 p-2">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => handleProtectedRouteClick(`/mainhome?department=${dept}`)}
                      className="rounded px-2 py-1.5 text-left text-xs text-slate-300 hover:bg-indigo-600/20 hover:text-indigo-300"
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
                className="rounded-lg px-3 py-2 hover:bg-slate-800"
              >
                Projects
              </Link>
            )}

            <button
              onClick={() => handleProtectedRouteClick('/top-liked')}
              className="rounded-lg px-3 py-2 text-left hover:bg-slate-800"
            >
              Heroic
            </button>

            <button
              onClick={() => handleProtectedRouteClick('/aboutpage')}
              className="rounded-lg px-3 py-2 text-left hover:bg-slate-800"
            >
              About
            </button>

            <button
              onClick={() => handleProtectedRouteClick('/contactus')}
              className="rounded-lg px-3 py-2 text-left hover:bg-slate-800"
            >
              Contact Us
            </button>

            <div className="flex items-center justify-between border-t border-slate-800 pt-3">
              {!user ? (
                <button
                  onClick={handleLoginClick}
                  className="w-full rounded-lg bg-indigo-600 py-2 text-center text-xs font-semibold text-white hover:bg-indigo-700"
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
                    className="rounded bg-rose-500/20 px-3 py-1 text-xs text-rose-300 hover:bg-rose-500/30"
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
  );
};

export default Navbar;
