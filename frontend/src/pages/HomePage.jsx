import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import { useNavigate, Outlet } from 'react-router-dom';
import api from '../components/api.js';

const HomePage = () => {
  const navigation = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Fetch real projects from the database
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        // Take only the first 6 projects for the homepage showcase
        setProjects(response.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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
          {loading ? (
            // Loading state
            <div className={styles.loadingMessage}>
              <p>Loading projects...</p>
            </div>
          ) : projects.length > 0 ? (
            // Show real projects from database
            projects.map((project) => (
              <div key={project._id} className={styles.projectCard}>
                {/* Project Image Section */}
                <div className={styles.projectImage}>
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className={styles.projectImageTag}
                    onError={(e) => {
                      e.target.src = '/image/placeholder-image.jpg';
                      e.target.style.filter = 'grayscale(1)';
                    }}
                  />
                </div>
                {/* Project Content Section (Title + Description) */}
                <div className={styles.projectContent}>
                  {/* Project Title Section */}
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  {/* Project Description Section */}
                  <p className={styles.projectDescription}>
                    {project.description.length > 150 
                      ? `${project.description.substring(0, 150)}...` 
                      : project.description
                    }
                  </p>
                  {/* Department Badge */}
                  <span className={styles.projectDepartment}>{project.department}</span>
                </div>
              </div>
            ))
          ) : (
            // No projects state
            <div className={styles.noProjectsMessage}>
              <p>No projects available yet. Be the first to submit your project!</p>
              <button
                className={styles.ctaButton}
                onClick={() => navigation('/loginpage')}
              >
                Submit Your Project
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${styles.ctaSection} ${styles.fadeIn}`}>
        <h2 className={styles.ctaText}>LET'S WORK TOGETHER</h2>
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