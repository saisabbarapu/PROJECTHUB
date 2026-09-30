import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import api, { SOCKET_URL } from './api';
import ProjectCard from './ProjectCard';
import SubmitProjectModal from './SubmitProjectModal';
import {
  FaLaptopCode,
  FaBolt,
  FaWrench,
  FaFlask,
  FaBrain,
  FaCode,
  FaChartLine,
  FaBuilding,
  FaPlus,
  FaSync,
} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

const MainHome = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
    const socket = io(SOCKET_URL);
    socket.on('newProject', (project) => {
      setProjects((prev) => {
        if (prev.some((p) => p._id === project._id)) return prev;
        return [project, ...prev];
      });
    });
    return () => socket.disconnect();
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await api.get('/projects');
      let fetchedProjects = [];
      if (Array.isArray(res.data)) {
        fetchedProjects = res.data.map((p) => ({
          ...p,
          toolsUsed: Array.isArray(p.toolsUsed) ? p.toolsUsed : [],
        }));
      } else if (res.data && Array.isArray(res.data.projects)) {
        fetchedProjects = res.data.projects.map((p) => ({
          ...p,
          toolsUsed: Array.isArray(p.toolsUsed) ? p.toolsUsed : [],
        }));
      } else {
        throw new Error('Invalid response format: expected an array of projects');
      }
      setProjects(fetchedProjects);
    } catch (err) {
      setError('Failed to load projects: ' + (err.response?.data?.details || err.message));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleAddProject = useCallback(
    (newProject) => {
      if (newProject && newProject._id) {
        setProjects((prev) => {
          if (prev.some((p) => p._id === newProject._id)) return prev;
          return [newProject, ...prev];
        });
      } else {
        fetchProjects();
      }
    },
    [fetchProjects]
  );

  const normalizeDepartmentName = useCallback((deptName) => {
    if (!deptName) return null;
    const normalized = deptName.toUpperCase().trim();
    const departmentMappings = {
      CSE: ['CSE', 'COMPUTER SCIENCE', 'COMPUTER SCIENCE ENGINEERING', 'CS'],
      ECE: ['ECE', 'ELECTRONICS', 'ELECTRONICS AND COMMUNICATION', 'ELECTRONICS ENGINEERING'],
      MECH: ['MECH', 'MECHANICAL', 'MECHANICAL ENGINEERING'],
      CHEMICAL: ['CHEMICAL', 'CHEMICAL ENGINEERING'],
      'AI&ML': [
        'AI&ML',
        'AI/ML',
        'ARTIFICIAL INTELLIGENCE',
        'MACHINE LEARNING',
        'AI AND ML',
        'AIML',
      ],
      IT: ['IT', 'INFORMATION TECHNOLOGY'],
      MBA: ['MBA', 'BUSINESS ADMINISTRATION', 'MANAGEMENT'],
      CIVIL: ['CIVIL', 'CIVIL ENGINEERING'],
      MCA: ['MCA', 'MANAGEMENT', 'MANAGEMENT AND COMPUTER APPLICATION'],
      EEE: ['EEE', 'ELECTRONICS AND ELECTRICAL ENGINEERING'],
    };
    for (const [standardName, variations] of Object.entries(departmentMappings)) {
      if (
        variations.some(
          (variation) => normalized.includes(variation) || variation.includes(normalized)
        )
      ) {
        return standardName;
      }
    }
    return normalized;
  }, []);

  const handleDepartmentClick = useCallback(
    (department) => {
      const normalizedDepartment = normalizeDepartmentName(department);
      setSelectedDepartment(
        selectedDepartment === normalizedDepartment ? null : normalizedDepartment
      );
    },
    [selectedDepartment, normalizeDepartmentName]
  );

  const filteredProjects = useMemo(() => {
    let filtered = projects;
    if (selectedDepartment) {
      filtered = filtered.filter((project) => {
        if (!project.department) return false;
        const projectDeptNormalized = normalizeDepartmentName(project.department);
        return projectDeptNormalized === selectedDepartment;
      });
    }
    if (searchEmail) {
      filtered = filtered.filter(
        (project) => project.email && project.email.toLowerCase() === searchEmail.toLowerCase()
      );
    }
    return filtered;
  }, [projects, selectedDepartment, normalizeDepartmentName, searchEmail]);

  const departmentData = useMemo(
    () => [
      { id: 'CSE', name: 'CSE', icon: FaLaptopCode },
      { id: 'ECE', name: 'ECE', icon: FaBolt },
      { id: 'EEE', name: 'EEE', icon: FaBolt },
      { id: 'MECH', name: 'Mechanical', icon: FaWrench },
      { id: 'CHEMICAL', name: 'Chemical', icon: FaFlask },
      { id: 'AI&ML', name: 'AI&ML', icon: FaBrain },
      { id: 'IT', name: 'IT', icon: FaCode },
      { id: 'MBA', name: 'MBA', icon: FaChartLine },
      { id: 'MCA', name: 'MCA', icon: FaChartLine },
      { id: 'CIVIL', name: 'Civil', icon: FaBuilding },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header & Active Filter */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Project Showcase
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              Browse, like, and review academic projects across disciplines.
            </p>
          </div>
          {selectedDepartment && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Filtering by:</span>
              <span className="rounded-full border border-indigo-500/40 bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
                {selectedDepartment}
              </span>
              <button
                onClick={() => setSelectedDepartment(null)}
                className="ml-1 text-xs text-slate-400 underline hover:text-white"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Departments Scroll / Grid */}
        <div className="scrollbar-none mb-10 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-3">
            {departmentData.map(({ id, name, icon: Icon }) => {
              const isSelected = selectedDepartment === id;
              return (
                <button
                  key={id}
                  onClick={() => handleDepartmentClick(name)}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-2xl border px-4 py-3 text-xs font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'scale-105 border-indigo-500 bg-indigo-600/30 text-indigo-200 shadow-lg shadow-indigo-500/20'
                      : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80'
                  }`}
                >
                  <Icon
                    className={`text-base ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`}
                  />
                  <span>{name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center space-y-4 py-24">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-500"></div>
            <p className="text-xs font-medium text-slate-400">Loading project catalog...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mx-auto max-w-md space-y-3 rounded-2xl border border-rose-800 bg-rose-950/40 p-6 text-center">
            <p className="text-xs font-medium text-rose-300">{error}</p>
            <button
              onClick={fetchProjects}
              className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-rose-700"
            >
              <FaSync className="text-xs" /> Try Again
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((p) => <ProjectCard key={p._id} project={p} />)
            ) : (
              <div className="col-span-full space-y-2 rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 p-8 py-20 text-center">
                <p className="text-sm font-semibold text-slate-300">
                  No projects found{selectedDepartment ? ` for ${selectedDepartment}` : ''}.
                </p>
                <p className="text-xs text-slate-500">
                  Be the first to submit a project in this discipline!
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setShowModal(true)}
                    className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
                  >
                    Submit Project
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button (Submit Project) */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-2xl shadow-indigo-500/40 transition-all hover:scale-110 hover:shadow-indigo-500/60 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
        title="Submit New Project"
      >
        <FaPlus className="text-lg" />
      </button>

      {/* Modal */}
      {showModal && (
        <SubmitProjectModal onClose={() => setShowModal(false)} onSubmit={handleAddProject} />
      )}
    </div>
  );
};

export default MainHome;
