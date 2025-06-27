import React, { useEffect, useState, useCallback } from 'react';
import api from '../../components/api';
import styles from './UserDashboard.module.css';
import { useNavigate } from 'react-router-dom';
import { FaCrown, FaSignOutAlt, FaEdit, FaTrash, FaGithub, FaFilePdf, FaLink, FaHeart } from 'react-icons/fa';

const UserDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [topLiked, setTopLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedProjects, setLikedProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/loginpage');
      return;
    }
    setUser(storedUser);
    fetchUserProjects(storedUser.email);
    fetchLikedProjects(storedUser.email);
  }, [navigate]);

  const fetchUserProjects = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/projects');
      const userProjects = res.data.filter(p => p.email === email);
      setProjects(userProjects);
      // Check if any project is top liked (max likes among all projects)
      const maxLikes = Math.max(...res.data.map(p => p.likes || 0), 0);
      setTopLiked(userProjects.some(p => (p.likes || 0) === maxLikes && maxLikes > 0));
    } catch (err) {
      setError('Failed to load your projects.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLikedProjects = useCallback(async (email) => {
    try {
      const res = await api.get('/projects');
      const liked = res.data.filter(p => Array.isArray(p.likedBy) && p.likedBy.includes(email));
      setLikedProjects(liked);
    } catch (err) {
      // Optionally handle error
    }
  }, []);

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/projects/${projectId}`);
      setProjects(prev => prev.filter(p => p._id !== projectId));
    } catch (err) {
      alert('Failed to delete project.');
    }
  };

  const handleEdit = (projectId) => {
    // You can implement a modal or redirect to an edit page
    alert('Edit functionality coming soon!');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/loginpage');
  };

  const handleUnlike = async (projectId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.email) {
        alert('You must be logged in to unlike a project.');
        return;
      }
      await api.post(`/projects/${projectId}/like`, { userEmail: user.email });
      setLikedProjects(prev => prev.filter(p => p._id !== projectId));
    } catch (err) {
      alert('Failed to unlike project.');
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.userInfoSection}>
        <div className={styles.userAvatar}><FaCrown style={{ color: topLiked ? 'gold' : '#ccc' }} /></div>
        <div>
          <h2>{user?.firstName} {user?.lastName}</h2>
          <p>{user?.email}</p>
          {topLiked && <span className={styles.topLikedBadge}><FaCrown /> Top Liked Achiever!</span>}
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout}><FaSignOutAlt /> Logout</button>
      </div>
      <h3>Your Projects</h3>
      <div className={styles.projectsList}>
        {projects.length === 0 ? (
          <div className={styles.noProjects}>You haven't added any projects yet.</div>
        ) : (
          projects.map(project => (
            <div key={project._id} className={styles.dashboardProjectCard}>
              <img src={project.imageUrl || '/placeholder-image.jpg'} alt={project.title} className={styles.dashboardProjectImage} />
              <div className={styles.dashboardProjectContent}>
                <h4 className={styles.dashboardProjectTitle}>{project.title}</h4>
                <p className={styles.dashboardProjectDescription}>{project.description}</p>
                <div className={styles.dashboardProjectMeta}><strong>Tools Used:</strong> {Array.isArray(project.toolsUsed) ? project.toolsUsed.join(', ') : project.toolsUsed}</div>
                <div className={styles.dashboardProjectMeta}><strong>Department:</strong> {project.department}</div>
                <div className={styles.dashboardProjectMeta}><strong>By:</strong> {project.name} ({project.rollno})</div>
                <div className={styles.dashboardProjectMeta}><strong>Email:</strong> {project.email}</div>
                <div className={styles.dashboardProjectLinks}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.dashboardProjectLink}><FaGithub /> GitHub</a>
                  {project.pdfUrl && <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.dashboardProjectLink}><FaFilePdf /> View PDF</a>}
                  {project.projectUrl && <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className={styles.dashboardProjectLink}><FaLink /> Project URL</a>}
                </div>
                <div className={styles.dashboardProjectActions}>
                  <button onClick={() => handleEdit(project._id)} className={styles.editBtn}><FaEdit /> Edit</button>
                  <button onClick={() => handleDelete(project._id)} className={styles.deleteBtn}><FaTrash /> Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <h3>Liked Projects</h3>
      <div className={styles.projectsList}>
        {likedProjects.length === 0 ? (
          <div className={styles.noProjects}>You haven't liked any projects yet.</div>
        ) : (
          likedProjects.map(project => (
            <div key={project._id} className={styles.dashboardProjectCard}>
              <img src={project.imageUrl || '/placeholder-image.jpg'} alt={project.title} className={styles.dashboardProjectImage} />
              <div className={styles.dashboardProjectContent}>
                <h4 className={styles.dashboardProjectTitle}>{project.title}</h4>
                <p className={styles.dashboardProjectDescription}>{project.description}</p>
                <div className={styles.dashboardProjectMeta}><strong>Tools Used:</strong> {Array.isArray(project.toolsUsed) ? project.toolsUsed.join(', ') : project.toolsUsed}</div>
                <div className={styles.dashboardProjectMeta}><strong>Department:</strong> {project.department}</div>
                <div className={styles.dashboardProjectMeta}><strong>By:</strong> {project.name} ({project.rollno})</div>
                <div className={styles.dashboardProjectMeta}><strong>Email:</strong> {project.email}</div>
                <div className={styles.dashboardProjectLinks}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.dashboardProjectLink}><FaGithub /> GitHub</a>
                  {project.pdfUrl && <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.dashboardProjectLink}><FaFilePdf /> View PDF</a>}
                  {project.projectUrl && <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className={styles.dashboardProjectLink}><FaLink /> Project URL</a>}
                </div>
                <button
                  onClick={() => handleUnlike(project._id)}
                  className={styles.unlikeBtn}
                  title="Remove from liked projects"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ff6b6b',
                    cursor: 'pointer',
                    fontSize: '1.5em',
                    marginTop: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <FaHeart />
                  <span style={{ fontSize: '0.9em', color: '#ff6b6b' }}>Unlike</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDashboard; 