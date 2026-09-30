import React, { useEffect } from 'react';
import styles from './homepage.module.css';
import { useNavigate, Outlet } from 'react-router-dom';

const HomePage = () => {
  const navigation = useNavigate();

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

  const projectData = [
    {
      id: 1,
      title: 'AI-Powered Health Diagnosis',
      description: 'An intelligent tool for preliminary medical analysis using machine learning.',
      image: '/image/aipowered.jpg',
    },
    {
      id: 2,
      title: 'Smart Irrigation System',
      description: 'Automated water usage optimization for sustainable agriculture.',
      image: 'C:\Users\LEELA SAI\OneDrive\Desktop\projecthub\frontend\public\image\smartirrigation.jpeg.jpg',
    },
    {
      id: 3,
      title: 'Autonomous Delivery Drone',
      description: 'A drone solution for last-mile delivery in urban areas.',
      image: '/image/deliverydrone.jpg',
    },
    {
      id: 4,
      title: 'Eco-Friendly Power Monitor',
      description: 'A smart meter system to monitor and reduce household energy consumption.',
      image: '/image/powermonitor.jpg',
    },
    {
      id: 5,
      title: 'Virtual Lab for Chemistry',
      description: 'A simulated environment allowing students to safely conduct experiments online.',
      image: 'C:\Users\LEELA SAI\OneDrive\Desktop\projecthub\frontend\public\image\virtuallab.webp.jpg',
    },
    {
      id: 6,
      title: 'Disaster Alert & Rescue App',
      description: 'A real-time emergency alert and coordination system for disaster-prone areas.',
      image: '/image/disasteralert.jpg',
    },
  ];

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
            At Project Hub, we celebrate creativity and innovation. Our student projects span diverse fields from AI and robotics to sustainable energy solutions.
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
          </p>
        </div>
      </section>

      {/* Project Showcase Grid */}
      <section className={`${styles.projectsSection} ${styles.fadeIn}`}>
       <div className={styles.projectsGrid}>
  {projectData.map(({ id, title, description, image }) => (
    <div key={id} className={styles.projectCard}>
      {/* Project Image Section */}
      <div className={styles.projectImage}>
        <img src={image} alt={title} className={styles.projectImageTag} />
      </div>
      {/* Project Content Section (Title + Description) */}
      <div className={styles.projectContent}>
        {/* Project Title Section */}
        <h3 className={styles.projectTitle}>{title}</h3>
        {/* Project Description Section */}
        <p className={styles.projectDescription}>{description}</p>
      </div>
    </div>
  ))}
</div>
      </section>

      {/* CTA Section */}
      <section className={`${styles.ctaSection} ${styles.fadeIn}`}>
        <h2 className={styles.ctaText}>LET’S WORK TOGETHER</h2>
        <button
          className={styles.ctaButton}
          onClick={() => navigation('/loginpage')}
        >
          Submit Your Project
        </button>
      </section>

      <Outlet />
    </main>
  );
};

export default HomePage;