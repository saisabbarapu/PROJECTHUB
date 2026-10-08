import React, { useEffect, useState, useCallback } from 'react';
import api from '../components/api';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import ProjectCardSkeleton from '../components/ProjectCardSkeleton';
import { getFallbackProjectImage } from '../components/ProjectCard';
import {
  FaCrown,
  FaSignOutAlt,
  FaEdit,
  FaTrash,
  FaGithub,
  FaFilePdf,
  FaExternalLinkAlt,
  FaHeart,
  FaPlus,
  FaFolder,
  FaLayerGroup,
} from 'react-icons/fa';

const UserDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });
  const [topLiked, setTopLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedProjects, setLikedProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('my-projects');
  const navigate = useNavigate();

  const fetchUserProjects = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/projects');
      const userProjects = res.data.filter((p) => p.email === email);
      setProjects(userProjects);
      const maxLikes = Math.max(...res.data.map((p) => p.likes || 0), 0);
      setTopLiked(userProjects.some((p) => (p.likes || 0) === maxLikes && maxLikes > 0));
    } catch (_err) {
      setError('Failed to load your projects.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLikedProjects = useCallback(async (email) => {
    try {
      const res = await api.get('/projects');
      const liked = res.data.filter((p) => Array.isArray(p.likedBy) && p.likedBy.includes(email));
      setLikedProjects(liked);
    } catch (_err) {
      // ignore
    }
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/loginpage');
      return;
    }
    fetchUserProjects(storedUser.email);
    fetchLikedProjects(storedUser.email);
  }, [navigate, fetchUserProjects, fetchLikedProjects]);

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/projects/${projectId}`);
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (_err) {
      alert('Failed to delete project.');
    }
  };

  const handleEdit = (_projectId) => {
    alert('Edit functionality coming soon!');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/loginpage');
  };

  const handleUnlike = async (projectId) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || !storedUser.email) return;
      await api.post(`/projects/${projectId}/like`, { userEmail: storedUser.email });
      setLikedProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (_err) {
      alert('Failed to unlike project.');
    }
  };

  const totalLikesReceived = projects.reduce((acc, curr) => acc + (curr.likes || 0), 0);

  if (loading) {
    return (
      <div className="relative min-h-screen bg-transparent px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="glass-panel h-24 w-full rounded-2xl sm:rounded-3xl p-5 shimmer-bone" />
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3 sm:gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card h-28 rounded-2xl shimmer-bone" />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <ProjectCardSkeleton key={i} shimmerDuration={1.4} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-transparent px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {error && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-center font-mono text-xs text-rose-300">
            {error}
          </div>
        )}
        {/* User Profile Editorial Banner */}
        <div className="glass-panel flex flex-col items-start md:items-center justify-between gap-5 sm:gap-6 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl md:flex-row">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4 w-full md:w-auto">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-950/40 text-xl sm:text-2xl text-violet-400">
              <FaCrown className={topLiked ? 'text-amber-400' : 'text-violet-400'} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-sora text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  {user?.firstName} {user?.lastName}
                </h1>
                {topLiked && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-300">
                    <FaCrown className="text-xs" /> Leaderboard Top
                  </span>
                )}
              </div>
              <p className="mt-1 font-mono text-xs text-slate-400 break-all">{user?.email}</p>
            </div>
          </div>

          <div className="flex w-full md:w-auto items-center justify-start sm:justify-end gap-2.5 sm:gap-3 flex-wrap">
            <Link
              to="/mainhome"
              className="flex-1 sm:flex-none text-center inline-flex items-center justify-center gap-1.5 rounded-full border border-violet-500/40 bg-violet-500/15 px-4 sm:px-5 py-2 font-sans text-xs font-semibold text-violet-300 transition-colors hover:bg-violet-500/25"
            >
              Browse Catalog
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 sm:flex-none text-center inline-flex items-center justify-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 font-sans text-xs font-semibold text-rose-300 transition-colors hover:bg-rose-500/20"
            >
              <FaSignOutAlt className="text-xs" /> Logout
            </button>
          </div>
        </div>

        {/* Minimal Glass Stat Cards */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3 sm:gap-4">
          <div className="glass-card rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-mono text-xs uppercase tracking-wider">Your Submissions</span>
              <FaFolder className="text-violet-400" />
            </div>
            <div className="mt-2 sm:mt-3 font-mono text-2xl sm:text-3xl font-bold text-white">{projects.length}</div>
            <p className="mt-1 text-[11px] text-slate-500">Published across campus showcase</p>
          </div>

          <div className="glass-card rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-mono text-xs uppercase tracking-wider">Total Likes Received</span>
              <FaHeart className="text-pink-400" />
            </div>
            <div className="mt-2 sm:mt-3 font-mono text-2xl sm:text-3xl font-bold text-white">{totalLikesReceived}</div>
            <p className="mt-1 text-[11px] text-slate-500">Community validation votes</p>
          </div>

          <div className="glass-card rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-mono text-xs uppercase tracking-wider">Saved Innovations</span>
              <FaLayerGroup className="text-violet-400" />
            </div>
            <div className="mt-2 sm:mt-3 font-mono text-2xl sm:text-3xl font-bold text-white">{likedProjects.length}</div>
            <p className="mt-1 text-[11px] text-slate-500">Projects you've upvoted</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="scrollbar-none flex gap-2 sm:gap-4 border-b border-white/[0.08] overflow-x-auto pb-0.5 whitespace-nowrap">
          <button
            onClick={() => setActiveTab('my-projects')}
            className={`border-b-2 pb-3 font-sans text-xs font-semibold uppercase tracking-wider transition-all shrink-0 ${
              activeTab === 'my-projects'
                ? 'border-violet-400 text-violet-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            My Uploaded Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('liked-projects')}
            className={`border-b-2 pb-3 font-sans text-xs font-semibold uppercase tracking-wider transition-all shrink-0 ${
              activeTab === 'liked-projects'
                ? 'border-violet-400 text-violet-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Liked Projects ({likedProjects.length})
          </button>
        </div>

        {/* Tab 1: User's Projects */}
        {activeTab === 'my-projects' && (
          <div>
            {projects.length === 0 ? (
              <div className="space-y-3 rounded-2xl sm:rounded-3xl border border-dashed border-white/10 bg-white/[0.01] p-6 sm:p-8 py-12 sm:py-16 text-center">
                <p className="font-sora text-sm font-semibold text-slate-300">
                  You haven't added any projects yet.
                </p>
                <p className="text-xs text-slate-500">
                  Share your latest invention, research paper, or academic capstone!
                </p>
                <div className="pt-2">
                  <Link
                    to="/mainhome"
                    className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/40 bg-violet-500/20 px-5 py-2 font-mono text-xs font-semibold text-violet-300 hover:bg-violet-500/30"
                  >
                    <FaPlus className="text-[10px]" /> Submit First Project
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 animate-wipe-reveal">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="glass-card flex flex-col overflow-hidden rounded-2xl"
                  >
                    <div className="relative h-44 w-full bg-slate-900">
                      <img
                        src={
                          project.imageData && project.imageMimeType
                            ? `data:${project.imageMimeType};base64,${project.imageData}`
                            : project.imageUrl && project.imageUrl.startsWith('http')
                              ? project.imageUrl
                              : getFallbackProjectImage(project)
                        }
                        alt={project.title}
                        onError={(e) => {
                          e.target.src = getFallbackProjectImage(project);
                        }}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent"></div>
                      <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase text-violet-300 backdrop-blur-md">
                        {project.department}
                      </span>
                    </div>

                    <div className="flex flex-grow flex-col space-y-3 p-5">
                      <div>
                        <h4 className="line-clamp-1 font-sora text-base font-bold text-white">
                          {project.title}
                        </h4>
                        <p className="mt-1 line-clamp-2 font-sans text-xs text-slate-400">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/[0.06] pt-2 text-[11px] text-slate-400">
                        <span className="font-mono text-slate-500">
                          {Array.isArray(project.toolsUsed)
                            ? project.toolsUsed.slice(0, 2).join(', ')
                            : project.toolsUsed || 'General'}
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono font-semibold text-pink-400">
                          <FaHeart className="text-[10px]" /> {project.likes || 0}
                        </span>
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-3 pt-1 text-xs">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-slate-400 hover:text-white"
                          >
                            <FaGithub /> GitHub
                          </a>
                        )}
                        {project.pdfUrl && (
                          <a
                            href={project.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-slate-400 hover:text-rose-400"
                          >
                            <FaFilePdf /> PDF
                          </a>
                        )}
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-slate-400 hover:text-violet-400"
                          >
                            <FaExternalLinkAlt className="text-[10px]" /> Demo
                          </a>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-auto flex items-center justify-end gap-2 border-t border-white/[0.06] pt-3">
                        <button
                          onClick={() => handleEdit(project._id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-sans text-xs text-slate-300 transition-colors hover:bg-white/[0.08]"
                        >
                          <FaEdit className="text-xs" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 font-sans text-xs text-rose-300 transition-colors hover:bg-rose-500/20"
                        >
                          <FaTrash className="text-xs" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Liked Projects */}
        {activeTab === 'liked-projects' && (
          <div>
            {likedProjects.length === 0 ? (
              <div className="space-y-2 rounded-2xl sm:rounded-3xl border border-dashed border-white/10 bg-white/[0.01] p-6 sm:p-8 py-12 sm:py-16 text-center">
                <p className="font-sora text-sm font-semibold text-slate-300">
                  You haven't liked any projects yet.
                </p>
                <p className="text-xs text-slate-500">
                  Explore the main showcase and vote for student projects you love!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {likedProjects.map((project) => (
                  <div
                    key={project._id}
                    className="glass-card flex flex-col overflow-hidden rounded-2xl"
                  >
                    <div className="relative h-44 w-full bg-slate-900">
                      <img
                        src={
                          project.imageData && project.imageMimeType
                            ? `data:${project.imageMimeType};base64,${project.imageData}`
                            : project.imageUrl && project.imageUrl.startsWith('http')
                              ? project.imageUrl
                              : getFallbackProjectImage(project)
                        }
                        alt={project.title}
                        onError={(e) => {
                          e.target.src = getFallbackProjectImage(project);
                        }}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent"></div>
                      <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase text-violet-300 backdrop-blur-md">
                        {project.department}
                      </span>
                    </div>

                    <div className="flex flex-grow flex-col space-y-3 p-5">
                      <div>
                        <h4 className="line-clamp-1 font-sora text-base font-bold text-white">
                          {project.title}
                        </h4>
                        <p className="mt-1 line-clamp-2 font-sans text-xs text-slate-400">
                          {project.description}
                        </p>
                      </div>

                      <div className="text-[11px] text-slate-400">
                        <span className="text-slate-500">By </span>
                        <span className="text-slate-200">{project.name}</span>
                      </div>

                      <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-3">
                        <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-pink-400">
                          <FaHeart /> {project.likes || 0}
                        </span>
                        <button
                          onClick={() => handleUnlike(project._id)}
                          className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1 font-sans text-xs text-slate-400 transition-colors hover:border-rose-500/30 hover:text-rose-400"
                        >
                          Unlike
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

