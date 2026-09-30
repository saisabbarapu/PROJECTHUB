import React, { useState, useMemo, useCallback, useContext } from 'react';
import api from './api';
import {
  FaHeart,
  FaRegHeart,
  FaPaperPlane,
  FaTimes,
  FaGithub,
  FaLink,
  FaFilePdf,
  FaArrowRight,
  FaUserGraduate,
  FaTools,
} from 'react-icons/fa';
import { ToasterContext } from './ToasterContext';

const ProjectCard = React.memo(({ project }) => {
  const [likes, setLikes] = useState(project.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { addToast } = useContext(ToasterContext);

  const handleLike = useCallback(
    async (e) => {
      e.stopPropagation();
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.email) {
          addToast('You must be logged in to like a project.', 'error');
          return;
        }
        const response = await api.post(`/projects/${project._id}/like`, {
          userEmail: user.email,
        });
        if (response.data && typeof response.data.likes === 'number') {
          setLikes(response.data.likes);
          setIsLiked(!isLiked);
          addToast(isLiked ? 'Project unliked' : 'Project liked!', 'success');
        } else {
          addToast('Invalid response from server', 'error');
        }
      } catch (err) {
        addToast(
          `Failed to like project: ${err.response?.status === 404 ? 'Project not found' : err.message}`,
          'error'
        );
      }
    },
    [project._id, isLiked, addToast]
  );

  const handleFeedbackSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!feedbackText.trim() || isSubmittingFeedback) return;

      try {
        setIsSubmittingFeedback(true);
        await api.post(`/projects/${project._id}/feedback`, { feedback: feedbackText });
        setFeedbackText('');
        addToast('Feedback sent directly to the project author!', 'success');
      } catch (err) {
        addToast(`Failed to submit feedback: ${err.response?.data?.error || err.message}`, 'error');
      } finally {
        setIsSubmittingFeedback(false);
      }
    },
    [project._id, feedbackText, isSubmittingFeedback, addToast]
  );

  const toolsList = useMemo(() => {
    if (Array.isArray(project.toolsUsed) && project.toolsUsed.length > 0) {
      return project.toolsUsed;
    }
    return ['General'];
  }, [project.toolsUsed]);

  const imageUrl = useMemo(() => {
    if (project.imageData && project.imageMimeType) {
      return `data:${project.imageMimeType};base64,${project.imageData}`;
    }
    return project.imageUrl || '/image/projectbg.png';
  }, [project.imageData, project.imageMimeType, project.imageUrl]);

  const pdfUrl = useMemo(() => {
    if (project.pdfData) {
      return `data:application/pdf;base64,${project.pdfData}`;
    }
    return project.pdfUrl || '';
  }, [project.pdfData, project.pdfUrl]);

  return (
    <>
      {/* Modern Glassmorphic Project Card */}
      <div
        onClick={() => setIsPopupOpen(true)}
        className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10"
      >
        {/* Thumbnail Container */}
        <div className="relative h-52 w-full overflow-hidden bg-slate-800">
          <img
            src={imageUrl}
            alt={project.title}
            onError={(e) => {
              e.target.src = '/image/projectbg.png';
            }}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Department Tag */}
          <span className="absolute left-3.5 top-3.5 rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-300 backdrop-blur-md">
            {project.department || 'Project'}
          </span>

          {/* Floating Like Button */}
          <button
            onClick={handleLike}
            className={`absolute right-3.5 top-3.5 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md transition-all ${
              isLiked
                ? 'border border-rose-500/50 bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'border border-slate-700 bg-slate-950/80 text-slate-300 hover:border-rose-500/50 hover:text-rose-400'
            }`}
            title={isLiked ? 'Unlike' : 'Like'}
          >
            {isLiked ? (
              <FaHeart className="text-xs text-white" />
            ) : (
              <FaRegHeart className="text-xs" />
            )}
            <span>{likes}</span>
          </button>

          {/* Author Tag on Thumbnail Bottom */}
          <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-[10px] font-bold text-white shadow-sm">
                {(project.name || 'S').charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[150px] truncate font-semibold text-white drop-shadow-sm">
                {project.name}
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-300 drop-shadow-sm">
              {project.rollno}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex flex-grow flex-col justify-between space-y-4 p-5">
          <div className="space-y-2">
            <h3 className="line-clamp-1 text-base font-bold text-white transition-colors duration-200 group-hover:text-indigo-400">
              {project.title}
            </h3>
            <p className="line-clamp-2 text-xs leading-relaxed text-slate-300">
              {project.description}
            </p>

            {/* Tools Used Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {toolsList.slice(0, 4).map((tool) => (
                <span
                  key={tool}
                  className="rounded-md border border-slate-700/60 bg-slate-800/70 px-2 py-0.5 text-[10px] font-medium text-slate-300"
                >
                  {tool}
                </span>
              ))}
              {toolsList.length > 4 && (
                <span className="rounded-md border border-slate-800 bg-slate-800/40 px-1.5 py-0.5 text-[10px] text-slate-500">
                  +{toolsList.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Quick Feedback Form & Detail Action */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 border-t border-slate-800/80 pt-3"
          >
            <form onSubmit={handleFeedbackSubmit} className="flex flex-grow items-center gap-1.5">
              <input
                type="text"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Give quick feedback..."
                className="w-full rounded-full border border-slate-700/70 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 backdrop-blur-sm transition-all focus:border-indigo-500 focus:bg-slate-900 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!feedbackText.trim() || isSubmittingFeedback}
                className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-2 text-white shadow-md transition-all hover:scale-105 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-30 disabled:hover:scale-100"
                title="Send Feedback"
              >
                <FaPaperPlane className="text-[10px]" />
              </button>
            </form>

            <button
              onClick={() => setIsPopupOpen(true)}
              className="flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-800/80 px-2.5 py-1.5 text-[11px] font-semibold text-slate-300 transition-all hover:border-indigo-500 hover:bg-slate-700 hover:text-white"
              title="Inspect Details"
            >
              <span>View</span>
              <FaArrowRight className="text-[9px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Popup Modal */}
      {isPopupOpen && (
        <div
          onClick={() => setIsPopupOpen(false)}
          className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/80 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl space-y-6 overflow-y-auto rounded-3xl border border-slate-700/70 bg-slate-900 p-6 shadow-2xl backdrop-blur-2xl sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-800/90 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <FaTimes className="text-sm" />
            </button>

            {/* Modal Image */}
            <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-slate-800 shadow-inner">
              <img
                src={imageUrl}
                alt={project.title}
                onError={(e) => {
                  e.target.src = '/image/projectbg.png';
                }}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-slate-700 bg-slate-950/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-indigo-300 backdrop-blur-md">
                {project.department}
              </span>
            </div>

            {/* Modal Header */}
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                {project.title}
              </h2>
              <p className="whitespace-pre-line text-xs leading-relaxed text-slate-300 sm:text-sm">
                {project.description}
              </p>
            </div>

            {/* Author & Department Meta Card */}
            <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-xs sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <FaUserGraduate className="text-sm text-indigo-400" />
                <div>
                  <span className="text-slate-400">Author: </span>
                  <span className="font-semibold text-white">
                    {project.name} ({project.rollno})
                  </span>
                </div>
              </div>
              <div>
                <span className="text-slate-400">Email: </span>
                <span className="font-mono text-indigo-300">{project.email}</span>
              </div>
              <div>
                <span className="text-slate-400">Department: </span>
                <span className="font-semibold text-slate-200">{project.department}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaTools className="text-xs text-purple-400" />
                <span className="text-slate-400">Tools: </span>
                <span className="font-medium text-slate-200">{toolsList.join(', ')}</span>
              </div>
            </div>

            {/* Links Section */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-700"
                >
                  <FaGithub className="text-sm" /> View GitHub Repository
                </a>
              )}
              {pdfUrl && (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-600/20 px-4 py-2.5 text-xs font-semibold text-rose-300 shadow-sm transition-all hover:bg-rose-600/30"
                >
                  <FaFilePdf className="text-sm" /> View PDF Documentation
                </a>
              )}
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-600/20 px-4 py-2.5 text-xs font-semibold text-indigo-300 shadow-sm transition-all hover:bg-indigo-600/30"
                >
                  <FaLink className="text-sm" /> Open Live Project URL
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
