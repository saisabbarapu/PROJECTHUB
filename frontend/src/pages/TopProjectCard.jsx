import React, { useMemo } from 'react';
import styles from './TopProjectCard.module.css';
import { FaGithub, FaLink, FaFilePdf, FaHeart } from 'react-icons/fa';

const TopProjectCard = ({ project, rank }) => {
  // Use base64 image if available, otherwise fallback
  const imageUrl = useMemo(() => {
    if (project.imageData && project.imageMimeType) {
      return `data:${project.imageMimeType};base64,${project.imageData}`;
    }
    return project.imageUrl || '/placeholder-image.jpg';
  }, [project.imageData, project.imageMimeType, project.imageUrl]);

  // Create PDF URL from database data or fallback to URL
  const pdfUrl = useMemo(() => {
    if (project.pdfData) {
      return `data:application/pdf;base64,${project.pdfData}`;
    }
    return project.pdfUrl || '';
  }, [project.pdfData, project.pdfUrl]);

  return (
    <article className={styles.card}>
      {/* Rank badge */}
      <span className={styles.rankBadge}>#{rank}</span>

      {/* Project Image (always show, fallback to placeholder) */}
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl}
          alt={project.title}
          className={styles.projectImage}
          onError={e => {
            if (!e.target.src.includes('/placeholder-image.jpg')) {
              e.target.onerror = null;
              e.target.src = '/placeholder-image.jpg';
            }
          }}
          loading="lazy"
        />
      </div>

      {/* HEADER */}
      <header className={styles.header}>
        <h2 className={styles.title}>{project.title}</h2>
        <span className={styles.department}>{project.department}</span>
      </header>

      {/* BODY */}
      <section className={styles.body}>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.meta}>
          <span className={styles.author}><strong>By:</strong> {project.name} ({project.rollno})</span>
          <span className={styles.email}><strong>Email:</strong> {project.email}</span>
        </div>
        <div className={styles.meta}>
          <span><strong>Likes:</strong> <FaHeart style={{ color: '#ff6bcb', marginRight: 2 }} /> {project.likes || 0}</span>
        </div>
      </section>

      {/* FOOTER: Tools & Links */}
      <footer className={styles.footer}>
        <div className={styles.toolsSection}>
          {(project.toolsUsed?.length
            ? project.toolsUsed
            : ['N/A']
          ).map((tool) => (
            <span key={tool} className={styles.toolChip}>
              {tool}
            </span>
          ))}
        </div>
        <div className={styles.linksSection}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.link} title="GitHub">
              <FaGithub />
            </a>
          )}
          {project.projectUrl && (
            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className={styles.link} title="Project URL">
              <FaLink />
            </a>
          )}
          {pdfUrl && (
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.link} title="Project PDF">
              <FaFilePdf />
            </a>
          )}
        </div>
      </footer>
    </article>
  );
};

export default TopProjectCard;
