import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
  const navigation = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll(`.${styles.fadeIn}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <main className={styles.container}>
      

      {/* Hero Section */}
      <section className={`${styles.hero} ${styles.fadeIn}`}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Project Hub</h1>
          <p className={styles.heroSubtitle}>
            Explore groundbreaking innovations from our talented students.
          </p>
          <p className={styles.heroDescription}>
            At Project Hub, we celebrate creativity and innovation. Our student projects span diverse fields from AI and robotics to sustainable energy solutions. Dive deep into the future of technology and discover ideas that are shaping tomorrow.
          </p>
          <p className={styles.heroDescription}>
            Join us in this journey of exploration and development, where every project tells a story of passion, dedication, and expertise.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className={`${styles.introSection} ${styles.fadeIn}`}>
        <div className={styles.introTextBox}>
          <h2 className={styles.introHeading}>A Hub of Innovation</h2>
          <p className={styles.introParagraph}>
            Our department projects reflect a blend of creativity, technical excellence, and purpose-driven thinking.
            Dive into a curated collection of work that defines the future.
          </p>
        </div>
      </section>

      {/* Project Showcase Grid */}
      <section className={`${styles.projectsSection} ${styles.fadeIn}`}>
        <div className={styles.projectsGrid}>
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <div key={id} className={styles.projectCard}>
              <div className={`${styles.projectImage} ${styles[`projectImage${id}`]}`} />
              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>Project {id}</h3>
                <p className={styles.projectDescription}>
                  A short description outlining key features and value of this project.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${styles.ctaSection} ${styles.fadeIn}`}>
        <h2 className={styles.ctaText}>LET’S WORK TOGETHER</h2>
        <button className={styles.ctaButton} onClick={() => navigation("/loginpage")}>
          Submit Your Project
        </button>
      </section>

      <Outlet />
    </main>
  );
};

export default HomePage;
