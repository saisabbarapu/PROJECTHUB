import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopProjectCard from './TopProjectCard';
import styles from './TopLikedPage.module.css';

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
      <h1 className={styles.title}>Top Three Most Liked Projects</h1>
      <div className={styles.cards}>
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