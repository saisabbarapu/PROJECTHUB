import React, { useEffect, useState, useCallback } from 'react';
import api from '../components/api';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaCrown,
  FaSignOutAlt,
  FaEdit,
  FaTrash,
  FaGithub,
  FaFilePdf,
  FaLink,
  FaHeart,
  FaPlus,
} from 'react-icons/fa';

const UserDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [topLiked, setTopLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedProjects, setLikedProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('my-projects');
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
      const userProjects = res.data.filter((p) => p.email === email);
      setProjects(userProjects);
      const maxLikes = Math.max(...res.data.map((p) => p.likes || 0), 0);
      setTopLiked(userProjects.some((p) => (p.likes || 0) === maxLikes && maxLikes > 0));
    } catch (err) {
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
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/projects/${projectId}`);
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (err) {
      alert('Failed to delete project.');
    }
  };

  const handleEdit = (projectId) => {
    alert('Edit functionality coming soon!');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/loginpage');
  };

  const handleUnlike = async (projectId) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || !storedUser.email) return;
      await api.post(`/projects/${projectId}/like`, { userEmail: storedUser.email });
      setLikedProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (err) {
      alert('Failed to unlike project.');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* User Profile Header Card */}
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl backdrop-blur-md sm:flex-row sm:p-8">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-3xl">
              <FaCrown className={topLiked ? 'text-amber-400' : 'text-slate-500'} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">
                  {user?.firstName} {user?.lastName}
                </h1>
                {topLiked && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
                    <FaCrown className="text-xs" /> Top Achiever
                  </span>
                )}
              </div>
              <p className="mt-0.5 font-mono text-xs text-slate-400">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/mainhome"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-700"
            >
              Browse Projects
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-600/20 px-4 py-2 text-xs font-semibold text-rose-300 transition-colors hover:bg-rose-600/30"
            >
              <FaSignOutAlt className="text-xs" /> Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('my-projects')}
            className={`border-b-2 pb-3 text-sm font-semibold transition-all ${
              activeTab === 'my-projects'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            My Uploaded Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('liked-projects')}
            className={`border-b-2 pb-3 text-sm font-semibold transition-all ${
              activeTab === 'liked-projects'
                ? 'border-indigo-500 text-indigo-400'
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
              <div className="space-y-2 rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 p-8 py-16 text-center">
                <p className="text-sm font-semibold text-slate-300">
                  You haven't added any projects yet.
                </p>
                <p className="text-xs text-slate-500">
                  Share your latest invention or academic assignment!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-lg"
                  >
                    <div className="relative h-44 w-full bg-slate-800">
                      <img
                        src={project.imageUrl || '/image/projectbg.png'}
                        alt={project.title}
                        onError={(e) => {
                          e.target.src = '/image/projectbg.png';
                        }}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute right-3 top-3 rounded-full border border-slate-700 bg-slate-950/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-indigo-300">
                        {project.department}
                      </span>
                    </div>

                    <div className="flex flex-grow flex-col space-y-3 p-5">
                      <div>
                        <h4 className="line-clamp-1 text-base font-bold text-white">
                          {project.title}
                        </h4>
                        <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                          {project.description}
                        </p>
                      </div>

                      <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-950/50 p-2.5 text-[11px] text-slate-400">
                        <div>
                          <span>Tools: </span>
                          <span className="text-slate-200">
                            {Array.isArray(project.toolsUsed)
                              ? project.toolsUsed.join(', ')
                              : project.toolsUsed || 'General'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 font-semibold text-pink-400">
                          <FaHeart className="text-xs" /> {project.likes || 0} Likes
                        </div>
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
                            className="inline-flex items-center gap-1 text-slate-400 hover:text-indigo-400"
                          >
                            <FaLink /> Demo
                          </a>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="mt-auto flex items-center justify-end gap-2 border-t border-slate-800 pt-3">
                        <button
                          onClick={() => handleEdit(project._id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:bg-slate-700"
                        >
                          <FaEdit className="text-xs" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-600/20 px-3 py-1.5 text-xs text-rose-300 transition-colors hover:bg-rose-600/30"
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
              <div className="space-y-2 rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 p-8 py-16 text-center">
                <p className="text-sm font-semibold text-slate-300">
                  You haven't liked any projects yet.
                </p>
                <p className="text-xs text-slate-500">
                  Explore the main showcase and vote for projects you love!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {likedProjects.map((project) => (
                  <div
                    key={project._id}
                    className="flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-lg"
                  >
                    <div className="relative h-44 w-full bg-slate-800">
                      <img
                        src={project.imageUrl || '/image/projectbg.png'}
                        alt={project.title}
                        onError={(e) => {
                          e.target.src = '/image/projectbg.png';
                        }}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute right-3 top-3 rounded-full border border-slate-700 bg-slate-950/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-indigo-300">
                        {project.department}
                      </span>
                    </div>

                    <div className="flex flex-grow flex-col space-y-3 p-5">
                      <div>
                        <h4 className="line-clamp-1 text-base font-bold text-white">
                          {project.title}
                        </h4>
                        <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                          {project.description}
                        </p>
                      </div>

                      <div className="text-[11px] text-slate-400">
                        <span>By: </span>
                        <span className="text-slate-200">{project.name}</span>
                      </div>

                      <div className="mt-auto flex items-center justify-between border-t border-slate-800 pt-3">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-pink-400">
                          <FaHeart /> {project.likes || 0}
                        </span>
                        <button
                          onClick={() => handleUnlike(project._id)}
                          className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-400 transition-colors hover:text-rose-400"
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
