import React, { useState, useEffect, useCallback, useMemo } from 'react';
import api, { SOCKET_URL } from './api';
import ProjectCard from './ProjectCard';
import ProjectCardSkeleton from './ProjectCardSkeleton';
import SubmitProjectModal from './SubmitProjectModal';
import Loader from './Loader';
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
  FaSearch,
  FaTimes,
  FaFilter,
} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';

const MainHome = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [searchEmail, setSearchEmail] = useState('');

  const normalizeDepartmentName = useCallback((deptName) => {
    if (!deptName) return null;
    const normalized = deptName.toUpperCase().trim();
    const departmentMappings = {
      CSE: ['CSE', 'COMPUTER SCIENCE', 'COMPUTER SCIENCE ENGINEERING', 'CS', 'COMPUTER SCIENCE & ENGINEERING'],
      AIML: ['AIML', 'AI&ML', 'AI/ML', 'ARTIFICIAL INTELLIGENCE', 'MACHINE LEARNING', 'AI AND ML', 'AI', 'ML', 'CSE (AI/ML)'],
      ECE: ['ECE', 'ELECTRONICS', 'ELECTRONICS AND COMMUNICATION', 'ELECTRONICS ENGINEERING', 'ECE / AGTECH'],
      EEE: ['EEE', 'ELECTRICAL', 'ELECTRICAL AND ELECTRONICS', 'ELECTRICAL ENGINEERING', 'EEE / CLEANTECH', 'ELECTRONICS AND ELECTRICAL ENGINEERING'],
      MECH: ['MECH', 'MECHANICAL', 'MECHANICAL ENGINEERING', 'ROBOTICS', 'MECHANICAL & ROBOTICS'],
      CHEMICAL: ['CHEMICAL', 'CHEMICAL ENGINEERING'],
      IT: ['IT', 'INFORMATION TECHNOLOGY', 'INFORMATION TECH'],
      MBA: ['MBA', 'BUSINESS ADMINISTRATION', 'MANAGEMENT'],
      CIVIL: ['CIVIL', 'CIVIL ENGINEERING'],
      MCA: ['MCA', 'MASTER OF COMPUTER APPLICATIONS', 'MANAGEMENT AND COMPUTER APPLICATION'],
    };
    for (const [standardName, variations] of Object.entries(departmentMappings)) {
      if (
        standardName === normalized ||
        variations.some(
          (variation) => normalized === variation || normalized.includes(variation) || variation.includes(normalized)
        )
      ) {
        return standardName;
      }
    }
    return normalized;
  }, []);

  // Read department and email from URL query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const dept = params.get('department');
    if (dept) {
      setSelectedDepartment(normalizeDepartmentName(dept));
    } else {
      setSelectedDepartment(null);
    }
    setSearchEmail(params.get('email') || '');
  }, [location.search, normalizeDepartmentName]);

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

  const handleDepartmentClick = useCallback(
    (department) => {
      const normalizedDepartment = normalizeDepartmentName(department);
      setSelectedDepartment((prev) =>
        prev === normalizedDepartment ? null : normalizedDepartment
      );
    },
    [normalizeDepartmentName]
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
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      filtered = filtered.filter((p) => {
        return (
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.department?.toLowerCase().includes(q) ||
          (Array.isArray(p.toolsUsed) && p.toolsUsed.some((t) => t.toLowerCase().includes(q)))
        );
      });
    }

    if (sortBy === 'likes') {
      return [...filtered].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    if (sortBy === 'title') {
      return [...filtered].sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }

    return filtered;
  }, [projects, selectedDepartment, normalizeDepartmentName, searchEmail, searchFilter, sortBy]);

  const departmentData = useMemo(
    () => [
      { id: 'CSE', name: 'CSE', icon: FaLaptopCode },
      { id: 'AIML', name: 'AI & ML', icon: FaBrain },
      { id: 'IT', name: 'IT', icon: FaCode },
      { id: 'ECE', name: 'ECE', icon: FaBolt },
      { id: 'EEE', name: 'EEE', icon: FaBolt },
      { id: 'MECH', name: 'Mechanical', icon: FaWrench },
      { id: 'CIVIL', name: 'Civil', icon: FaBuilding },
      { id: 'CHEMICAL', name: 'Chemical', icon: FaFlask },
      { id: 'MCA', name: 'MCA', icon: FaChartLine },
      { id: 'MBA', name: 'MBA', icon: FaChartLine },
    ],
    []
  );

  return (
    <div className="relative min-h-screen bg-transparent px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Title Section */}
        <div className="mb-6 sm:mb-8">
          <div className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-violet-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
            DISCOVERY PLATFORM
          </div>
          <h1 className="mt-1 font-sora text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
            EXPLORE <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">PROJECTS</span>
          </h1>
          <p className="mt-1 font-sans text-xs sm:text-sm text-slate-300">
            Discover, review, and evaluate student capstones across all university departments.
          </p>
        </div>

        {/* Discovery Filter & Search Bar */}
        <div className="glass-panel mb-6 sm:mb-8 rounded-2xl p-3.5 sm:p-5 border border-violet-500/25 shadow-[0_0_30px_rgba(168,85,247,0.12)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-violet-400/60" />
              <input
                type="text"
                placeholder="Search projects by title, tech, or keywords..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full rounded-xl border border-violet-500/20 bg-white/[0.04] py-2 sm:py-2.5 pl-9 pr-8 font-sans text-xs text-slate-100 placeholder-slate-400 transition-all focus:border-violet-400/70 focus:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-violet-500/30"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Sort & Status */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-slate-300">
                <FaFilter className="text-[10px] text-violet-400" />
                <span>Sort:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-violet-500/25 bg-black/40 backdrop-blur-md px-2.5 py-1.5 font-sans text-xs text-slate-200 outline-none transition-colors hover:border-violet-400/50 focus:border-violet-400"
              >
                <option value="latest">Recently Added</option>
                <option value="likes">Most Liked</option>
                <option value="title">Alphabetical (A-Z)</option>
              </select>

              {(selectedDepartment || searchEmail || searchFilter) && (
                <button
                  onClick={() => {
                    setSelectedDepartment(null);
                    setSearchFilter('');
                    setSearchEmail('');
                  }}
                  className="rounded-xl border border-violet-500/40 bg-violet-500/15 px-3 py-1.5 font-mono text-xs font-semibold text-violet-200 transition-colors hover:bg-violet-500/25"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Departments Scroll Strip */}
        <div className="scrollbar-none mb-10 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-2.5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDepartment(null)}
              className={`rounded-full border px-4 py-2 font-mono text-xs font-semibold transition-colors ${
                selectedDepartment === null
                  ? 'border-violet-400/70 bg-gradient-to-r from-violet-500/25 to-blue-600/25 text-violet-200 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  : 'border-violet-500/15 bg-white/[0.03] text-slate-300 hover:border-violet-400/40 hover:text-white'
              }`}
            >
              All Departments
            </motion.button>
            {departmentData.map(({ id, name, icon: Icon }) => {
              const isSelected = selectedDepartment === id;
              return (
                <motion.button
                  key={id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDepartmentClick(name)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-xs font-medium transition-colors ${
                    isSelected
                      ? 'border-violet-400/70 bg-gradient-to-r from-violet-500/25 to-blue-600/25 text-violet-200 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                      : 'border-violet-500/15 bg-white/[0.03] text-slate-300 hover:border-violet-400/40 hover:text-white'
                  }`}
                >
                  <Icon className={`text-xs ${isSelected ? 'text-violet-300' : 'text-slate-400'}`} />
                  <span>{name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Loading State - Skeleton Shimmer Grid */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <ProjectCardSkeleton key={idx} shimmerDuration={1.4} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="glass-panel mx-auto max-w-md space-y-3 rounded-2xl border-rose-500/30 p-6 text-center">
            <p className="text-xs font-medium text-rose-300">{error}</p>
            <button
              onClick={fetchProjects}
              className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600/80 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-rose-600"
            >
              <FaSync className="text-xs" /> Try Again
            </button>
          </div>
        )}

        {/* Projects Grid with Wipe Reveal Transition */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 animate-wipe-reveal">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((p) => <ProjectCard key={p._id} project={p} />)
            ) : (
              <div className="col-span-full space-y-2 rounded-2xl sm:rounded-3xl border border-dashed border-white/10 bg-white/[0.01] p-6 sm:p-8 py-14 sm:py-20 text-center">
                <p className="font-sora text-sm font-semibold text-slate-300">
                  No projects found{selectedDepartment ? ` for ${selectedDepartment}` : ''}.
                </p>
                <p className="text-xs text-slate-500">
                  Be the first to submit a project in this discipline!
                </p>
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowModal(true)}
                    className="rounded-full border border-violet-500/40 bg-violet-500/20 px-5 py-2 font-mono text-xs font-semibold text-violet-300 hover:bg-violet-500/30"
                  >
                    Submit Project
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button on Bottom Right */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setShowModal(true)}
        className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center gap-2 sm:gap-2.5 rounded-full border border-violet-400/50 bg-gradient-to-r from-violet-500 via-blue-600 to-indigo-600 px-4 py-2.5 sm:px-5 sm:py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-2xl shadow-violet-500/40 hover:border-cyan-300 hover:shadow-violet-500/60 focus:outline-none"
        title="Submit New Project"
      >
        <FaPlus className="text-xs text-white" />
        <span className="tracking-wide">Submit Project</span>
      </motion.button>

      {/* Submit Project Modal */}
      <AnimatePresence>
        {showModal && (
          <SubmitProjectModal onClose={() => setShowModal(false)} onSubmit={handleAddProject} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainHome;

