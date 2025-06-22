import React, { useState } from 'react';
import api from './api';
import styles from './ProjectCard.module.css';
import { FaHeart, FaComment } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  const [likes, setLikes] = useState(project.likes || 0);
  const [feedbackText, setFeedbackText] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleLike = async () => {
    try {
      const response = await api.post(`/projects/${project._id}/like`);
      if (response.data && typeof response.data.likes === 'number') {
        setLikes(response.data.likes);
        setError(null);
        setSuccessMessage('Project liked!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      setError(`Failed to like project: ${err.response?.status === 404 ? 'Project not found' : err.message}`);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    try {
      const response = await api.post(`/projects/${project._id}/feedback`, { feedback: feedbackText });
      setFeedbackText('');
      setError(null);
      setSuccessMessage('Feedback submitted and email sent!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(`Failed to submit feedback: ${err.response?.data?.error || err.message}`);
      setTimeout(() => setError(''), 3000);
    }
  };

  // Handler to close popup when input is clicked
  const handleInputClick = (e) => {
    e.stopPropagation(); // Prevent the card click event from reopening the popup
    setIsPopupOpen(false); // Close the popup if open
  };

  // Handler to prevent popup opening when feedback button is clicked
  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent the card click event from opening the popup
  };

  return (
    <>
      {error && <div className={styles.errorToast}>{error}</div>}
      {successMessage && <div className={styles.successToast}>{successMessage}</div>}

      {/* Condensed Card View */}
      <div className={styles.card} onClick={() => setIsPopupOpen(true)} style={{ cursor: 'pointer' }}>
        <img
          src={project.imageUrl || '/placeholder-image.jpg'}
          alt={project.title}
          className={styles.image}
          onError={(e) => (e.target.src = '/placeholder-image.jpg')}
        />
        <div className={styles.content}>
          <h3 className={styles.title}>{project.title}</h3>
          {Array.isArray(project.toolsUsed) && project.toolsUsed.length > 0 ? (
            <p className={styles.tools}>Tools Used: {project.toolsUsed.join(', ')}</p>
          ) : (
            <p className={styles.tools}>No tools specified</p>
          )}
        </div>
        <div className={styles.interaction}>
          <button className={styles.likeBtn} onClick={(e) => { e.stopPropagation(); handleLike(); }} disabled={error}>
            <FaHeart /> {likes}
          </button>
          <form className={styles.feedbackForm} onSubmit={(e) => { e.stopPropagation(); handleFeedbackSubmit(e); }}>
            <input
              type="text"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Add feedback..."
              className={styles.feedbackInput}
              disabled={error}
              onClick={handleInputClick} // Close popup if open, prevent opening
            />
            <button
              type="submit"
              className={styles.feedbackBtn}
              disabled={error}
              onClick={handleButtonClick} // Prevent popup opening
            >
              <FaComment />
            </button>
          </form>
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className={styles.popupOverlay} onClick={() => setIsPopupOpen(false)}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setIsPopupOpen(false)}>
              ×
            </button>
            <img
              src={project.imageUrl || '/placeholder-image.jpg'}
              alt={project.title}
              className={styles.popupImage}
              onError={(e) => (e.target.src = '/placeholder-image.jpg')}
            />
            <h3 className={styles.popupTitle}>{project.title}</h3>
            <p className={styles.popupDescription}>{project.description}</p>
            {Array.isArray(project.toolsUsed) && project.toolsUsed.length > 0 ? (
              <p className={styles.popupTools}>Tools Used: {project.toolsUsed.join(', ')}</p>
            ) : (
              <p className={styles.popupTools}>No tools specified</p>
            )}
            <div className={styles.popupLinks}>
              <a href={project.github} target="_blank" rel="noreferrer" className={styles.link}>GitHub</a>
              {project.pdfUrl ? (
                <a href={project.pdfUrl} target="_blank" rel="noreferrer" className={styles.link}>View PDF</a>
              ) : (
                <span className={styles.pdfUnavailable}>PDF not available</span>
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
};

export default ProjectCard;