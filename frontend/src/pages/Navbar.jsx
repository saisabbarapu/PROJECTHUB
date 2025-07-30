import React, { useState, useContext } from 'react';
import styles from './Navbar.module.css';
import { FaUserCircle } from 'react-icons/fa';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState as useReactState } from 'react';
import { ToasterContext } from '../components/ToasterContext';

// Note: If using React Router, import useNavigate
// import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [searchEmail, setSearchEmail] = useReactState('');
  const { addToast } = useContext(ToasterContext);

  // If using React Router, uncomment and use this
  // const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setIsDepartmentsOpen(false);
      setIsUserDropdownOpen(false);
    }
  };

  const toggleDepartments = () => setIsDepartmentsOpen(!isDepartmentsOpen);

  const closeMenu = () => {
    setIsOpen(false);
    setIsDepartmentsOpen(false);
    setIsUserDropdownOpen(false);
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

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <a href="/" className={styles.logoLink}>
          <img src="/image/logo.png" alt="Logo" className={styles.logoImg} />
          <span className={styles.logoTitle}>ProjectHub</span>
        </a>
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <div className={styles.searchInputGroup}>
            <input
              type="text"
              placeholder="Search by email..."
              value={searchEmail}
              onChange={e => setSearchEmail(e.target.value)}
              className={styles.searchInput}
            />
            <FaSearch className={styles.searchIcon} />
          </div>
        </form>
      </div>

      <div className={styles.navLinksContainer}>
        <div className={styles.navLinksDesktop}>
          <a href="/home" onClick={closeMenu}>Home</a>
          <div className={styles.dropdown}>
            <a href="#" className={styles.dropdownToggle}>Departments</a>
            <div className={styles.dropdownMenu}>
              <a href="#" onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/mainhome?department=CIVIL'); }}>Civil</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/mainhome?department=CSE'); }}>CSE</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/mainhome?department=AI&ML'); }}>AIML</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/mainhome?department=ECE'); }}>ECE</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/mainhome?department=EEE'); }}>EEE</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/mainhome?department=IT'); }}>IT</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/mainhome?department=MBA'); }}>MBA</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/mainhome?department=MCA'); }}>MCA</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/mainhome?department=MECH'); }}>Mech</a>
            </div>
          </div>
          {user && <a href="/mainhome" onClick={closeMenu}>Projects</a>}
          <a href="#" onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/top-liked'); }}>Heroic</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/contactus'); }}>ContactUs</a>
        </div>
      </div>

      <div className={styles.mainRightContent}>
        {!user ? (
          <button className={styles.loginButton} onClick={handleLoginClick}>Login</button>
        ) : (
          <div
            className={styles.userProfileContainer}
          >
            <div className={styles.userIcon} onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
              <FaUserCircle />
            </div>
          </div>
        )}
        <div
          className={`${styles.hamburgerIcon} ${isOpen ? styles.active : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`${styles.navLinksMobile} ${isOpen ? styles.showMenu : ''}`}>
        <div className={styles.mobileSearchContainer}>
          <form onSubmit={handleSearchSubmit} className={styles.mobileSearchForm}>
            <div className={styles.mobileSearchInputGroup}>
              <input
                type="text"
                placeholder="Search by email..."
                value={searchEmail}
                onChange={e => setSearchEmail(e.target.value)}
                className={styles.mobileSearchInput}
              />
              <FaSearch className={styles.mobileSearchIcon} />
            </div>
          </form>
        </div>
        <a href="/home" className={styles.mobileNavLink} onClick={closeMenu}>Home</a>
        <span className={styles.mobileDepartmentHeading} onClick={toggleDepartments}>Departments</span>
        <div className={`${styles.mobileDepartmentLinks} ${isDepartmentsOpen ? styles.showDropdown : ''}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/mainhome?department=CIVIL'); }}>Civil</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/mainhome?department=CSE'); }}>CSE</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/mainhome?department=ECE'); }}>ECE</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/mainhome?department=EEE'); }}>EEE</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/mainhome?department=IT'); }}>IT</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/mainhome?department=MBA'); }}>MBA</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/mainhome?department=MCA'); }}>MCA</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/mainhome?department=MECH'); }}>Mechanical</a>
        </div>
        {user && <a href="/mainhome" className={styles.mobileNavLink} onClick={closeMenu}>Projects</a>}
        <a href="#" className={styles.mobileNavLink} onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/top-liked'); }}>Heroic</a>
        <a href="#" className={styles.mobileNavLink} onClick={(e) => { e.preventDefault(); handleProtectedRouteClick('/aboutpage'); }}>About</a>
        <div className={styles.mobileUserSection}>
          {!user ? (
            <button className={styles.mobileLoginButton} onClick={handleLoginClick}>Login</button>
          ) : (
            <>
              <div className={styles.mobileUserDisplay}>
                <FaUserCircle className={styles.mobileUserIcon} />
                <span className={styles.mobileLoggedInUserName}>{user.firstName || user.email}</span>
              </div>
              <button className={styles.mobileLogoutButton} onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;