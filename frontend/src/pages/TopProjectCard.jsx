import React from 'react';
import styles from './TopProjectCard.module.css';
import { FaGithub, FaLink, FaFilePdf, FaHeart } from 'react-icons/fa';

const TopProjectCard = ({ project, rank }) => {
  return (
    <article className={styles.card}>
      {/* Rank badge */}
      <span className={styles.rankBadge}>#{rank}</span>

      {/* Project Image */}
      {project.imageUrl && (
        <div className={styles.imageWrapper}>
          <img
            src={project.imageUrl}
            alt={project.title}
            className={styles.projectImage}
            onError={e => {
              if (!e.target.src.includes('/image/placeholder-image.jpg')) {
                e.target.onerror = null;
                e.target.src = '/image/placeholder-image.jpg';
              }
            }}
            loading="lazy"
          />
        </div>
      )}

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
          {project.pdfUrl && (
            <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.link} title="Project PDF">
              <FaFilePdf />
            </a>
          )}
        </div>
      </footer>
    </article>
  );
};

export default TopProjectCard;
