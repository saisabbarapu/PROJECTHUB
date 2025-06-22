import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { FaUserCircle } from 'react-icons/fa';
import { RiLogoutBoxLine } from 'react-icons/ri';

// Note: If using React Router, import useNavigate
// import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('blast mohan');

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
    setLoggedInUser(null);
    closeMenu();
    console.log('User logged out!'); // No redirect, just state update
  };

  const handleLoginClick = () => {
    // If using React Router, use: navigate('/loginpage');
    window.location.href = '/loginpage'; // Fallback for basic navigation
    closeMenu();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <a href="/" className={styles.logoLink}>
          <img src="/image/logo.png" alt="Logo" className={styles.logoImg} />
          <span className={styles.logoTitle}>ProjectHub</span>
        </a>
      </div>

      <div className={styles.navLinksContainer}>
        <div className={styles.navLinksDesktop}>
          <a href="/home" onClick={closeMenu}>Home</a>
          <div className={styles.dropdown}>
            <a href="#" className={styles.dropdownToggle}>Departments</a>
            <div className={styles.dropdownMenu}>
              <a href="#">Civil</a>
              <a href="#">CSE</a>
              <a href="#">AIML</a>
              <a href="#">ECE</a>
              <a href="#">IT</a>
              <a href="#">MCA</a>
              <a href="#">Mech</a>
            </div>
          </div>
          <a href="#" onClick={closeMenu}>Projects</a>
          <a href="/top-liked" onClick={closeMenu}>Heroic</a>
          <a href="/contactus" onClick={closeMenu}>ContactUs</a>
        </div>
      </div>

      <div className={styles.mainRightContent}>
        {!loggedInUser && (
          <button className={styles.loginButton} onClick={handleLoginClick}>Login</button>
        )}

        <div
          className={styles.userProfileContainer}
          onMouseEnter={() => setIsUserDropdownOpen(true)}
          onMouseLeave={() => setIsUserDropdownOpen(false)}
        >
          <div className={styles.userIcon}>
            <FaUserCircle />
          </div>

          {loggedInUser && (
            <div
              className={`${styles.userDropdownMenu} ${
                isUserDropdownOpen ? styles.showUserDropdown : ''
              }`}
            >
              <div className={styles.userDropdownContent}>
                <div className={styles.userAvatar}>
                  <FaUserCircle />
                </div>
                <span className={styles.loggedInUserName}>{loggedInUser}</span>
                <button className={styles.logoutButton} onClick={handleLogout}>
                  <RiLogoutBoxLine /> Logout
                </button>
              </div>
            </div>
          )}
        </div>

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
        <a href="/home" className={styles.mobileNavLink} onClick={closeMenu}>Home</a>
        <span className={styles.mobileDepartmentHeading} onClick={toggleDepartments}>Departments</span>
        <div className={`${styles.mobileDepartmentLinks} ${isDepartmentsOpen ? styles.showDropdown : ''}`}>
          <a href="#" onClick={closeMenu}>Civil</a>
          <a href="#" onClick={closeMenu}>CSE</a>
          <a href="#" onClick={closeMenu}>ECE</a>
          <a href="#" onClick={closeMenu}>IT</a>
          <a href="#" onClick={closeMenu}>AIML</a>
          <a href="#" onClick={closeMenu}>MCA</a>
          <a href="#" onClick={closeMenu}>Mechanical</a>
        </div>
        <a href="#" className={styles.mobileNavLink} onClick={closeMenu}>Projects</a>
        <a href="/top-liked" className={styles.mobileNavLink} onClick={closeMenu}>Heroic</a>
        <a href="/aboutpage" className={styles.mobileNavLink} onClick={closeMenu}>About</a>
        <div className={styles.mobileUserSection}>
          {!loggedInUser ? (
            <button className={styles.mobileLoginButton} onClick={handleLoginClick}>Login</button>
          ) : (
            <>
              <div className={styles.mobileUserDisplay}>
                <FaUserCircle className={styles.mobileUserIcon} />
                <span className={styles.mobileLoggedInUserName}>{loggedInUser}</span>
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