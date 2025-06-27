import React, { useState, useMemo, useCallback, useContext } from 'react';
import api from './api';
import styles from './ProjectCard.module.css';
import { FaHeart, FaRegHeart, FaComment } from 'react-icons/fa';
import { ToasterContext } from './ToasterContext';

const ProjectCard = React.memo(({ project }) => {
  const [likes, setLikes] = useState(project.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { addToast } = useContext(ToasterContext);

  // Memoize handlers to prevent unnecessary re-renders
  const handleLike = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.email) {
        addToast('You must be logged in to like a project.', 'error');
        return;
      }
      const response = await api.post(`/projects/${project._id}/like`, { userEmail: user.email });
      if (response.data && typeof response.data.likes === 'number') {
        setLikes(response.data.likes);
        setIsLiked(!isLiked);
        addToast(isLiked ? 'Project unliked!' : 'Project liked!', 'success');
      } else {
        addToast('Invalid response from server', 'error');
      }
    } catch (err) {
      addToast(`Failed to like project: ${err.response?.status === 404 ? 'Project not found' : err.message}`, 'error');
    }
  }, [project._id, isLiked, addToast]);

  const handleFeedbackSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    try {
      const response = await api.post(`/projects/${project._id}/feedback`, { feedback: feedbackText });
      setFeedbackText('');
      addToast('Feedback submitted and email sent!', 'success');
    } catch (err) {
      addToast(`Failed to submit feedback: ${err.response?.data?.error || err.message}`, 'error');
    }
  }, [project._id, feedbackText, addToast]);

  // Memoize event handlers
  const handleInputClick = useCallback((e) => {
    e.stopPropagation();
    setIsPopupOpen(false);
  }, []);

  const handleButtonClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const handleLinkClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const handleCardClick = useCallback(() => {
    setIsPopupOpen(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  // Memoize computed values
  const toolsDisplay = useMemo(() => {
    if (Array.isArray(project.toolsUsed) && project.toolsUsed.length > 0) {
      return project.toolsUsed.join(', ');
    }
    return 'No tools specified';
  }, [project.toolsUsed]);

  const imageUrl = useMemo(() => {
    return project.imageUrl || '/placeholder-image.jpg';
  }, [project.imageUrl]);

  return (
    <>
      {/* Project Card */}
      <div className={styles.projectCard} onClick={handleCardClick}>
        <img
          src={imageUrl}
          alt={project.title}
          className={styles.projectImage}
          onError={e => {
            if (!e.target.src.includes('/image/placeholder-image.jpg')) {
              e.target.onerror = null;
              e.target.src = '/image/placeholder-image.jpg';
              e.target.style.filter = 'grayscale(1)';
              e.target.title = 'Image not found';
            }
          }}
          loading="lazy"
        />
        
        <div className={styles.projectContent}>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectTools}>Tools: {toolsDisplay}</p>
          <span className={styles.projectDepartment}>{project.department}</span>
        </div>

        <div className={styles.interactionBar}>
          <button 
            className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`} 
            onClick={(e) => { e.stopPropagation(); handleLike(); }} 
            title={isLiked ? 'Unlike project' : 'Like project'}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
            <span className={styles.likeCount}>{likes}</span>
          </button>
          <form className={styles.feedbackForm} onSubmit={(e) => { e.stopPropagation(); handleFeedbackSubmit(e); }}>
            <input
              type="text"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Add feedback..."
              className={styles.feedbackInput}
              onClick={handleInputClick}
            />
            <button
              type="submit"
              className={styles.commentButton}
              disabled={!feedbackText.trim()}
              onClick={handleButtonClick}
              title="Submit feedback"
            >
              <FaComment />
            </button>
          </form>
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className={styles.popupOverlay} onClick={handleClosePopup}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handleClosePopup}>
              ×
            </button>
            <img
              src={imageUrl}
              alt={project.title}
              className={styles.popupImage}
              onError={e => {
                if (!e.target.src.includes('/image/placeholder-image.jpg')) {
                  e.target.onerror = null;
                  e.target.src = '/image/placeholder-image.jpg';
                }
              }}
              loading="lazy"
            />
            <h3 className={styles.popupTitle}>{project.title}</h3>
            <p className={styles.popupDescription}>{project.description}</p>
            <p className={styles.popupTools}>Tools Used: {toolsDisplay}</p>
            <div className={styles.popupLinks}>
              <a href={project.github} target="_blank" rel="noreferrer" className={styles.link} onClick={handleLinkClick}>GitHub</a>
              {project.pdfUrl ? (
                <a href={project.pdfUrl} target="_blank" rel="noreferrer" className={styles.link} onClick={handleLinkClick}>View PDF</a>
              ) : (
                <span className={styles.pdfUnavailable}>PDF not available</span>
              )}
              {project.projectUrl ? (
                <a href={project.projectUrl} target="_blank" rel="noreferrer" className={styles.link} onClick={handleLinkClick}>Project URL</a>
              ) : (
                <span className={styles.pdfUnavailable}>Project URL not provided</span>
              )}
            </div>
            <p className={styles.popupMeta}><strong>By:</strong> <span>{project.name} ({project.rollno})</span></p>
            <p className={styles.popupMeta}><strong>Department:</strong> <span>{project.department}</span></p>
            <p className={styles.popupMeta}><strong>Email:</strong> <span>{project.email}</span></p>
          </div>
        </div>
      )}
    </>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;