import React from 'react';
import styles from './TopProjectCard.module.css';

const TopProjectCard = ({ project, rank }) => {
  return (
    <article className={styles.card}>
      {/* Rank badge */}
      <span className={styles.rankBadge}>#{rank}</span>

      {/* HEADER */}
      <header className={styles.header}>
        <h2 className={styles.title}>{project.title}</h2>
        <span className={styles.department}>{project.department}</span>
      </header>

      {/* BODY */}
      <section className={styles.body}>
        <p className={styles.description}>{project.description}</p>

        <p className={styles.meta}>
          <span className={styles.author}>{project.name}</span>
          <span className={styles.email}>{project.email}</span>
        </p>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        {(project.toolsUsed?.length
          ? project.toolsUsed
          : ['N/A']
        ).map((tool) => (
          <span key={tool} className={styles.toolChip}>
            {tool}
          </span>
        ))}
      </footer>
    </article>
  );
};

export default TopProjectCard;
