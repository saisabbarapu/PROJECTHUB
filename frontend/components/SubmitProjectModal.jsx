import React, { useState } from 'react';
import api from './api';
import styles from './SubmitProjectModal.module.css';
import { FaUser, FaEnvelope, FaIdBadge, FaBuilding, FaProjectDiagram, FaFileAlt, FaGithub, FaFilePdf, FaImage, FaCheck, FaTimes } from 'react-icons/fa';

const SubmitProjectModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    rollno: '',
    department: '',
    title: '',
    description: '',
    github: '',
    pdf: null,
    image: null,
    toolsUsed: '', // Comma-separated string
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length) {
      const file = files[0];
      if (name === 'pdf' && file.type !== 'application/pdf') {
        return alert('Please upload a PDF file.');
      }
      if (name === 'image' && !file.type.startsWith('image/')) {
        return alert('Please upload an image file.');
      }
      if (file.size > 5 * 1024 * 1024) {
        return alert('File must be less than 5MB.');
      }
      setForm((prev) => ({ ...prev, [name]: file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null || key === 'toolsUsed') { // Include toolsUsed even if null
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
      onSubmit();
      onClose();
    } catch (err) {
      console.error('Submission error:', err.message);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      const errorMessage = err.response?.data?.details || err.response?.data?.message || err.message || 'Unknown error';
      alert(`Submission failed: ${errorMessage} (Status: ${err.response?.status || 'N/A'})`);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <form className={styles.modal} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Submit Project</h2>
        <div className={styles.inputGroup}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Name"
            className={styles.input}
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
          />
          <FaGithub className={styles.inputIcon} />
        </div>
        <div className={styles.inputGroup}>
          <input
            name="toolsUsed"
            value={form.toolsUsed}
            onChange={handleChange}
            placeholder="Tools Used (e.g., Python, React, comma-separated)"
            className={styles.input}
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
          />
          <FaImage className={styles.inputIcon} />
        </div>
        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn}>
            <FaCheck className={styles.buttonIcon} />
            Submit
          </button>
          <button type="button" onClick={onClose} className={styles.cancelBtn}>
            <FaTimes className={styles.buttonIcon} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitProjectModal;