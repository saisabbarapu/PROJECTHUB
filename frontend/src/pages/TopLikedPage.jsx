import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopProjectCard from './TopProjectCard';
import styles from './TopLikedPage.module.css';
import { FaTrophy } from 'react-icons/fa';

const TopLikedPage = () => {
  const [topProjects, setTopProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopLiked = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/projects/top-liked');
        setTopProjects(response.data);
      } catch (err) {
        setError('Failed to load top liked projects: ' + (err.response?.data?.details || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchTopLiked();
  }, []);

  if (loading) return <div className={styles.loading}>Loading heroic rankings...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <FaTrophy className={styles.trophyIcon} />
        <h1 className={styles.title}>Top Three Most Liked Projects</h1>
        <p className={styles.subtitle}>Celebrating the most inspiring and impactful student innovations!</p>
      </section>
      <div className={styles.cardsAnimated}>
        {topProjects.length > 0 ? (
          topProjects.map((project, index) => (
            <TopProjectCard key={project._id} project={project} rank={index + 1} />
          ))
        ) : (
          <p className={styles.noData}>No projects have been liked yet. Start the epic journey!</p>
        )}
      </div>
    </div>
  );
};

export default TopLikedPage;