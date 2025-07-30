import React, { useState } from 'react';
import api from './api';
import styles from './SubmitProjectModal.module.css';
import { FaUser, FaEnvelope, FaIdBadge, FaBuilding, FaProjectDiagram, FaFileAlt, FaGithub, FaFilePdf, FaImage, FaCheck, FaTimes, FaLink, FaSpinner } from 'react-icons/fa';

const SubmitProjectModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    rollno: '',
    department: '',
    title: '',
    description: '',
    github: '',
    projectUrl: '', // New optional field
    pdf: null,
    image: null,
    toolsUsed: '', // Comma-separated string
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      rollno: '',
      department: '',
      title: '',
      description: '',
      github: '',
      projectUrl: '',
      pdf: null,
      image: null,
      toolsUsed: '',
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length) {
      const file = files[0];
      if (name === 'pdf' && file.type !== 'application/pdf') {
        setSubmitMessage('Please upload a PDF file.');
        setTimeout(() => setSubmitMessage(''), 3000);
        return;
      }
      if (name === 'image' && !file.type.startsWith('image/')) {
        setSubmitMessage('Please upload an image file.');
        setTimeout(() => setSubmitMessage(''), 3000);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setSubmitMessage('File must be less than 5MB.');
        setTimeout(() => setSubmitMessage(''), 3000);
        return;
      }
      setForm((prev) => ({ ...prev, [name]: file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('Uploading project...');
    
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null || key === 'toolsUsed' || key === 'projectUrl') { // Include projectUrl even if empty
        formData.append(key, value || ''); // Append empty string if null
      }
    });

    console.log('Submitting form data entries:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    } // Detailed debug log

    try {
      const response = await api.post('/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Submission successful, response:', response.data);
      setSubmitMessage('Project uploaded successfully!');
      
      // Reset form and close modal after a brief delay
      setTimeout(() => {
        resetForm();
        setIsSubmitting(false);
        setSubmitMessage('');
        // Pass the new project up for optimistic UI update
        if (response.data && response.data.project) {
          onSubmit(response.data.project);
        } else {
          onSubmit();
        }
        onClose();
      }, 1500);
      
    } catch (err) {
      console.error('Submission error:', err.message);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      const errorMessage = err.response?.data?.details || err.response?.data?.message || err.message || 'Unknown error';
      setSubmitMessage(`Upload failed: ${errorMessage}`);
      setIsSubmitting(false);
      
      // Clear error message after 5 seconds
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <form className={styles.modal} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Submit Project</h2>
        
        {submitMessage && (
          <div className={`${styles.message} ${submitMessage.includes('successfully') ? styles.successMessage : styles.errorMessage}`}>
            {submitMessage}
          </div>
        )}
        
        <div className={styles.inputGroup}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Name"
            className={styles.input}
            disabled={isSubmitting}
          />
          <FaUser className={styles.inputIcon} />
        </div>
        <div className={styles.inputGroup}>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className={styles.input}
            disabled={isSubmitting}
          />
          <FaEnvelope className={styles.inputIcon} />
        </div>
        <div className={styles.inputGroup}>
          <input
            name="rollno"
            value={form.rollno}
            onChange={handleChange}
            required
            placeholder="Roll No"
            className={styles.input}
            disabled={isSubmitting}
          />
          <FaIdBadge className={styles.inputIcon} />
        </div>
        <div className={styles.inputGroup}>
          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            required
            placeholder="Department"
            className={styles.input}
            disabled={isSubmitting}
          />
          <FaBuilding className={styles.inputIcon} />
        </div>
        <div className={styles.inputGroup}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Project Title"
            className={styles.input}
            disabled={isSubmitting}
          />
          <FaProjectDiagram className={styles.inputIcon} />
        </div>
        <div className={styles.inputGroup}>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            placeholder="Description"
            className={styles.input}
            disabled={isSubmitting}
          />
          <FaFileAlt className={styles.inputIcon} />
        </div>
        <div className={styles.inputGroup}>
          <input
            name="github"
            type="url"
            value={form.github}
            onChange={handleChange}
            required
            placeholder="GitHub URL"
            className={styles.input}
            disabled={isSubmitting}
          />
          <FaGithub className={styles.inputIcon} />
        </div>
        <div className={styles.inputGroup}>
          <input
            name="projectUrl"
            type="url"
            value={form.projectUrl}
            onChange={handleChange}
            placeholder="Project URL (Optional)"
            className={styles.input}
            disabled={isSubmitting}
          />
          <FaLink className={styles.inputIcon} />
        </div>
        <div className={styles.inputGroup}>
          <input
            name="toolsUsed"
            value={form.toolsUsed}
            onChange={handleChange}
            placeholder="Tools Used (e.g., Python, React, comma-separated)"
            className={styles.input}
            disabled={isSubmitting}
          />
          <FaProjectDiagram className={styles.inputIcon} />
        </div>
        <div className={styles.inputGroup}>
          <input
            name="pdf"
            type="file"
            accept="application/pdf"
            onChange={handleChange}
            required
            className={styles.input}
            disabled={isSubmitting}
          />
          <FaFilePdf className={styles.inputIcon} />
        </div>
        <div className={styles.inputGroup}>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            required
            className={styles.input}
            disabled={isSubmitting}
          />
          <FaImage className={styles.inputIcon} />
        </div>
        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <FaSpinner className={`${styles.buttonIcon} ${styles.spinning}`} />
                Uploading...
              </>
            ) : (
              <>
                <FaCheck className={styles.buttonIcon} />
                Submit
              </>
            )}
          </button>
          <button type="button" onClick={handleClose} className={styles.cancelBtn} disabled={isSubmitting}>
            <FaTimes className={styles.buttonIcon} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitProjectModal;