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
} from 'react-icons/fa';
import { ToasterContext } from './ToasterContext';

const ProjectCard = React.memo(({ project }) => {
  const [likes, setLikes] = useState(project.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { addToast } = useContext(ToasterContext);

  const handleLike = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.email) {
        addToast('You must be logged in to like a project.', 'error');
        return;
      }
      const response = await api.post(`/projects/${project._id}/like`, { userEmail: user.email });
      if (response.data && typeof response.data.likes === 'number') {
        setLikes(response.data.likes);
        setIsLiked(!isLiked);
        addToast(isLiked ? 'Project unliked!' : 'Project liked!', 'success');
      } else {
        addToast('Invalid response from server', 'error');
      }
    } catch (err) {
      addToast(
        `Failed to like project: ${err.response?.status === 404 ? 'Project not found' : err.message}`,
        'error'
      );
    }
  }, [project._id, isLiked, addToast]);

  const handleFeedbackSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!feedbackText.trim()) return;

      try {
        await api.post(`/projects/${project._id}/feedback`, { feedback: feedbackText });
        setFeedbackText('');
        addToast('Feedback submitted and sent to author!', 'success');
      } catch (err) {
        addToast(`Failed to submit feedback: ${err.response?.data?.error || err.message}`, 'error');
      }
    },
    [project._id, feedbackText, addToast]
  );

  const toolsDisplay = useMemo(() => {
    if (Array.isArray(project.toolsUsed) && project.toolsUsed.length > 0) {
      return project.toolsUsed.join(', ');
    }
    return 'General';
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
      {/* Project Card */}
      <div
        onClick={() => setIsPopupOpen(true)}
        className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10"
      >
        {/* Project Thumbnail */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-800">
          <img
            src={imageUrl}
            alt={project.title}
            onError={(e) => {
              e.target.src = '/image/projectbg.png';
            }}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute right-3 top-3 rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1 text-[11px] font-semibold uppercase text-indigo-300 backdrop-blur-md">
            {project.department || 'Project'}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-grow flex-col space-y-3 p-5">
          <div>
            <h3 className="line-clamp-1 text-base font-bold text-white transition-colors group-hover:text-indigo-400">
              {project.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1">
            <span className="mr-1 self-center text-[10px] text-slate-500">Tools:</span>
            {(project.toolsUsed?.length ? project.toolsUsed : ['General'])
              .slice(0, 3)
              .map((tool) => (
                <span
                  key={tool}
                  className="rounded-md border border-slate-700/60 bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-300"
                >
                  {tool}
                </span>
              ))}
          </div>

          {/* Interaction Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-auto flex items-center justify-between gap-3 border-t border-slate-800/80 pt-3"
          >
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                isLiked
                  ? 'border border-rose-500/30 bg-rose-500/20 text-rose-400'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700/60 hover:text-rose-400'
              }`}
              title={isLiked ? 'Unlike' : 'Like'}
            >
              {isLiked ? (
                <FaHeart className="text-xs text-rose-500" />
              ) : (
                <FaRegHeart className="text-xs" />
              )}
              <span>{likes}</span>
            </button>

            {/* Quick Feedback Input */}
            <form onSubmit={handleFeedbackSubmit} className="flex flex-grow items-center gap-1.5">
              <input
                type="text"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Give feedback..."
                className="w-full rounded-full border border-slate-700/80 bg-slate-800/80 px-3 py-1 text-[11px] text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!feedbackText.trim()}
                className="rounded-full bg-indigo-600 p-1.5 text-white transition-all hover:bg-indigo-700 disabled:opacity-30"
                title="Send Feedback"
              >
                <FaPaperPlane className="text-[10px]" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Detail Popup Modal */}
      {isPopupOpen && (
        <div
          onClick={() => setIsPopupOpen(false)}
          className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl space-y-5 overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <FaTimes className="text-sm" />
            </button>

            {/* Modal Image */}
            <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-slate-800">
              <img
                src={imageUrl}
                alt={project.title}
                onError={(e) => {
                  e.target.src = '/image/projectbg.png';
                }}
                className="h-full w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1 text-xs font-semibold uppercase text-indigo-300">
                {project.department}
              </span>
            </div>

            {/* Modal Header */}
            <div>
              <h2 className="text-2xl font-bold text-white">{project.title}</h2>
              <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-slate-300 sm:text-sm">
                {project.description}
              </p>
            </div>

            {/* Author & Department Meta */}
            <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-xs sm:grid-cols-2">
              <div>
                <span className="text-slate-400">Author: </span>
                <span className="font-semibold text-white">
                  {project.name} ({project.rollno})
                </span>
              </div>
              <div>
                <span className="text-slate-400">Email: </span>
                <span className="font-mono text-indigo-300">{project.email}</span>
              </div>
              <div>
                <span className="text-slate-400">Department: </span>
                <span className="font-semibold text-slate-200">{project.department}</span>
              </div>
              <div>
                <span className="text-slate-400">Tools: </span>
                <span className="font-medium text-slate-200">{toolsDisplay}</span>
              </div>
            </div>

            {/* Links Section */}
            <div className="flex flex-wrap gap-3 pt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-700"
                >
                  <FaGithub className="text-sm" /> View GitHub Code
                </a>
              )}
              {pdfUrl && (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-600/20 px-4 py-2 text-xs font-semibold text-rose-300 transition-colors hover:bg-rose-600/30"
                >
                  <FaFilePdf className="text-sm" /> View PDF Documentation
                </a>
              )}
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-600/20 px-4 py-2 text-xs font-semibold text-indigo-300 transition-colors hover:bg-indigo-600/30"
                >
                  <FaLink className="text-sm" /> Live Demo URL
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
