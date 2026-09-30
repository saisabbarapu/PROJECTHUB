import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import api from './api';
import styles from './MainHome.module.css';
import ProjectCard from './ProjectCard';
import SubmitProjectModal from './SubmitProjectModal';
import { FaLaptopCode, FaBolt, FaWrench, FaFlask, FaBrain, FaCode, FaChartLine, FaBuilding } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

const MainHome = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(true); // Start as visible to prevent flickering
  const containerRef = useRef(null);
  const location = useLocation();
  const [searchEmail, setSearchEmail] = useState('');

  // Read department and email from URL query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const dept = params.get('department');
    if (dept) {
      setSelectedDepartment(dept.toUpperCase());
    }
    setSearchEmail(params.get('email') || '');
  }, [location.search]);

  // Setup Socket.IO client for real-time updates
  useEffect(() => {
    const socket = io('http://localhost:4000');
    socket.on('newProject', (project) => {
      console.log('New project received via socket:', project);
      setProjects(prev => {
        // Prevent duplicates
        if (prev.some(p => p._id === project._id)) return prev;
        return [project, ...prev];
      });
    });
    return () => socket.disconnect();
  }, []);

  // Simplified intersection observer - only trigger once
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isVisible]);

  const fetchProjects = useCallback(async () => {
    try {
      console.log('Fetching projects...');
      setIsLoading(true);
      setError(null);
      const res = await api.get('/projects');
      console.log('API response:', res.data);
      let fetchedProjects = [];
      if (Array.isArray(res.data)) {
        fetchedProjects = res.data.map(p => ({
          ...p,
          toolsUsed: Array.isArray(p.toolsUsed) ? p.toolsUsed : [],
        }));
      } else if (res.data && Array.isArray(res.data.projects)) {
        fetchedProjects = res.data.projects.map(p => ({
          ...p,
          toolsUsed: Array.isArray(p.toolsUsed) ? p.toolsUsed : [],
        }));
      } else {
        throw new Error('Invalid response format: expected an array of projects');
      }
      console.log('Processed projects:', fetchedProjects);
      setProjects(fetchedProjects);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects: ' + (err.response?.data?.details || err.message));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Optimistically add new project to the list
  const handleAddProject = useCallback((newProject) => {
    console.log('Adding new project:', newProject);
    if (newProject && newProject._id) {
      setProjects(prev => {
        if (prev.some(p => p._id === newProject._id)) return prev;
        return [newProject, ...prev];
      });
    } else {
      fetchProjects(); // fallback if no new project provided
    }
  }, [fetchProjects]);

  // Department name normalization function
  const normalizeDepartmentName = useCallback((deptName) => {
    if (!deptName) return null;
    const normalized = deptName.toUpperCase().trim();
    // Map common variations to standard names
    const departmentMappings = {
      'CSE': ['CSE', 'COMPUTER SCIENCE', 'COMPUTER SCIENCE ENGINEERING', 'CS'],
      'ECE': ['ECE', 'ELECTRONICS', 'ELECTRONICS AND COMMUNICATION', 'ELECTRONICS ENGINEERING'],
      'MECH': ['MECH', 'MECHANICAL', 'MECHANICAL ENGINEERING'],
      'CHEMICAL': ['CHEMICAL', 'CHEMICAL ENGINEERING'],
      'AI&ML': ['AI&ML', 'AI/ML', 'ARTIFICIAL INTELLIGENCE', 'MACHINE LEARNING', 'AI AND ML', 'AIML'],
      'IT': ['IT', 'INFORMATION TECHNOLOGY'],
      'MBA': ['MBA', 'BUSINESS ADMINISTRATION', 'MANAGEMENT'],
      'CIVIL': ['CIVIL', 'CIVIL ENGINEERING'],
      'MCA': ['MCA', 'MANAGEMENT', 'MANAGEMENT AND COMPUTER APPLICATION'],
      'EEE': ['EEE', 'ELECTRONICS AND ELECTRICAL ENGINEERING']
    };
    for (const [standardName, variations] of Object.entries(departmentMappings)) {
      if (variations.some(variation => normalized.includes(variation) || variation.includes(normalized))) {
        return standardName;
      }
    }
    return normalized; // Return as-is if no mapping found
  }, []);

  // Handler to filter projects by department
  const handleDepartmentClick = useCallback((department) => {
    console.log('Department clicked:', department);
    const normalizedDepartment = normalizeDepartmentName(department);
    console.log('Normalized department:', normalizedDepartment);
    setSelectedDepartment(selectedDepartment === normalizedDepartment ? null : normalizedDepartment);
  }, [selectedDepartment, normalizeDepartmentName]);

  // Filter projects with normalized department comparison and email
  const filteredProjects = useMemo(() => {
    let filtered = projects;
    if (selectedDepartment) {
      filtered = filtered.filter(project => {
        if (!project.department) return false;
        const projectDeptNormalized = normalizeDepartmentName(project.department);
        return projectDeptNormalized === selectedDepartment;
      });
    }
    if (searchEmail) {
      filtered = filtered.filter(project => project.email && project.email.toLowerCase() === searchEmail.toLowerCase());
    }
    return filtered;
  }, [projects, selectedDepartment, normalizeDepartmentName, searchEmail]);

  // Memoize department data
  const departmentData = useMemo(() => [
    { id: 'CSE', name: 'CSE', icon: FaLaptopCode },
    { id: 'ECE', name: 'ECE', icon: FaBolt },
    { id: 'EEE', name: 'EEE', icon: FaBolt },
    { id: 'MECH', name: 'Mechanical', icon: FaWrench },
    { id: 'CHEMICAL', name: 'Chemical', icon: FaFlask },
    { id: 'AI&ML', name: 'AI&ML', icon: FaBrain },
    { id: 'IT', name: 'IT', icon: FaCode },
    { id: 'MBA', name: 'MBA', icon: FaChartLine },
    { id: 'MCA', name: 'MCA', icon: FaChartLine },
    { id: 'CIVIL', name: 'Civil', icon: FaBuilding }
  ], []);

  console.log('Render state:', { 
    isLoading, 
    error, 
    projectsCount: projects.length, 
    filteredCount: filteredProjects.length,
    selectedDepartment 
  });

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>{error}</p>
          <button onClick={fetchProjects} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container} ref={containerRef}>
        <div style={{ marginBottom: 24 }}>
          <h2 className={styles.pageTitle}>Projects</h2>
        </div>
        <div className={styles.departments}>
          {departmentData.map(({ id, name, icon: Icon }) => (
            <div
              key={id}
              className={`${styles.departmentCard} ${selectedDepartment === id ? styles.selected : ''}`}
              onClick={() => handleDepartmentClick(name)}
            >
              <Icon className={styles.departmentIcon} />
              <p className={styles.departmentName}>{name}</p>
            </div>
          ))}
        </div>
        <div className={styles.projectList}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map(p => <ProjectCard key={p._id} project={p} />)
          ) : (
            <div className={styles.noProjects}>
              <p>No projects found{selectedDepartment ? ` for ${selectedDepartment}` : ''}.</p>
              <p>Be the first to submit a project!</p>
            </div>
          )}
        </div>
      </div>
      {/* Add button positioned outside container for proper fixed positioning */}
      <button className={styles.addButton} onClick={() => setShowModal(true)}>+</button>
      {showModal && (
        <SubmitProjectModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddProject}
        />
      )}
    </>
  );
};

export default MainHome;