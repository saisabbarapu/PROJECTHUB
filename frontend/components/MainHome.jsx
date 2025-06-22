import React, { useState, useEffect } from 'react';
import api from './api';
import styles from './MainHome.module.css';
import ProjectCard from './ProjectCard';
import SubmitProjectModal from './SubmitProjectModal';
import { FaLaptopCode, FaBolt, FaWrench, FaFlask, FaBrain, FaCode, FaChartLine, FaBuilding } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MainHome = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      const fetchedProjects = res.data.map(p => ({
        ...p,
        toolsUsed: Array.isArray(p.toolsUsed) ? p.toolsUsed : [], // Ensure toolsUsed is an array
      }));
      console.log('Fetched projects with toolsUsed:', fetchedProjects.map(p => ({ _id: p._id, toolsUsed: p.toolsUsed })));
      setProjects(fetchedProjects);
    } catch (err) {
      console.error('Error fetching projects:', err.message);
      console.error('Error response:', err.response?.data);
      alert('Failed to load projects: ' + (err.response?.data?.details || err.message));
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async () => {
    await fetchProjects();
  };

  // Handler to filter projects by department with case-insensitive comparison
  const handleDepartmentClick = (department) => {
    const normalizedDepartment = department.toUpperCase(); // Normalize to uppercase
    setSelectedDepartment(selectedDepartment === normalizedDepartment ? null : normalizedDepartment);
  };

  // Filter projects with case-insensitive comparison
  const filteredProjects = selectedDepartment
    ? projects.filter(project => 
        project.department && project.department.toUpperCase() === selectedDepartment
      )
    : projects;

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.heading}>Department Project Showcase</h1>
      <div className={styles.departmentIcons}>
        <div
          className={`${styles.departmentCard} ${selectedDepartment === 'CSC' ? styles.selected : ''}`}
          onClick={() => handleDepartmentClick('CSC')}
        >
          <FaLaptopCode className={styles.departmentIcon} />
          <p className={styles.departmentName}>CSC</p>
        </div>
        <div
          className={`${styles.departmentCard} ${selectedDepartment === 'EEE' ? styles.selected : ''}`}
          onClick={() => handleDepartmentClick('EEE')}
        >
          <FaBolt className={styles.departmentIcon} />
          <p className={styles.departmentName}>EEE</p>
        </div>
        <div
          className={`${styles.departmentCard} ${selectedDepartment === 'MECH' ? styles.selected : ''}`}
          onClick={() => handleDepartmentClick('MECH')}
        >
          <FaWrench className={styles.departmentIcon} />
          <p className={styles.departmentName}>MECH</p>
        </div>
        <div
          className={`${styles.departmentCard} ${selectedDepartment === 'AIML' ? styles.selected : ''}`}
          onClick={() => handleDepartmentClick('AIML')}
        >
          <FaBrain className={styles.departmentIcon} />
          <p className={styles.departmentName}>AIML</p>
        </div>
        <div
          className={`${styles.departmentCard} ${selectedDepartment === 'MCA' ? styles.selected : ''}`}
          onClick={() => handleDepartmentClick('MCA')}
        >
          <FaCode className={styles.departmentIcon} />
          <p className={styles.departmentName}>MCA</p>
        </div>
        <div
          className={`${styles.departmentCard} ${selectedDepartment === 'MBA' ? styles.selected : ''}`}
          onClick={() => handleDepartmentClick('MBA')}
        >
          <FaChartLine className={styles.departmentIcon} />
          <p className={styles.departmentName}>MBA</p>
        </div>
        <div
          className={`${styles.departmentCard} ${selectedDepartment === 'CIVIL' ? styles.selected : ''}`}
          onClick={() => handleDepartmentClick('Civil')}
        >
          <FaBuilding className={styles.departmentIcon} />
          <p className={styles.departmentName}>Civil</p>
        </div>
      </div>
      <div className={styles.projectList}>
        {filteredProjects.map(p => <ProjectCard key={p._id} project={p} />)}
      </div>
      {/* <Link to="/top-liked" className={styles.topLikedLink}>View Top Liked Projects</Link> */}
      <button className={styles.addButton} onClick={() => setShowModal(true)}>+</button>
      {showModal && (
        <SubmitProjectModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddProject}
        />
      )}
    </div>
  );
};

export default MainHome;