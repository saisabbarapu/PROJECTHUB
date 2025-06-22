import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3 className={styles.logo}>ProjectHub</h3>
          <p>Showcasing student innovation and departmental achievements.</p>
        </div>

        <div className={styles.section}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/submit">Submit Project</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h4>Contact</h4>
          <p>Email: projecthubs983@gmail.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} Department Project Showcase. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
