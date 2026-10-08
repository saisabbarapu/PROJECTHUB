import React, { useState, useMemo, useCallback, useContext } from 'react';
import api from './api';
import {
  FaHeart,
  FaRegHeart,
  FaPaperPlane,
  FaTimes,
  FaGithub,
  FaExternalLinkAlt,
  FaFilePdf,
  FaUser,
  FaEnvelope,
  FaArrowRight,
} from 'react-icons/fa';
import { ToasterContext } from './ToasterContext';

export const getFallbackProjectImage = (project = {}) => {
  const dept = (project.department || '').toUpperCase();
  const text = `${project.title || ''} ${project.description || ''} ${Array.isArray(project.toolsUsed) ? project.toolsUsed.join(' ') : ''}`.toLowerCase();

  if (text.includes('health') || text.includes('medic') || text.includes('hospital') || text.includes('disease') || text.includes('doctor') || text.includes('pulmonary') || text.includes('retinal')) {
    return 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('drone') || text.includes('robot') || text.includes('uav') || text.includes('automation') || text.includes('lidar') || dept.includes('ROBOT')) {
    return 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('solar') || text.includes('farm') || text.includes('agri') || text.includes('plant') || text.includes('crop') || text.includes('water') || text.includes('soil') || text.includes('irrigation')) {
    return 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('power') || text.includes('energy') || text.includes('grid') || text.includes('clean') || text.includes('meter') || dept.includes('EEE')) {
    return 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('circuit') || text.includes('chip') || text.includes('hardware') || text.includes('embedded') || text.includes('esp32') || text.includes('lorawan') || dept.includes('ECE')) {
    return 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('chemical') || text.includes('synthesis') || text.includes('lab') || text.includes('reaction') || dept.includes('CHEM')) {
    return 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('civil') || text.includes('bridge') || text.includes('build') || text.includes('struct') || dept.includes('CIVIL')) {
    return 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('ai') || text.includes('ml') || text.includes('model') || text.includes('vision') || text.includes('neural') || text.includes('deep learning') || dept.includes('AIML')) {
    return 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('cloud') || text.includes('server') || text.includes('database') || text.includes('web') || text.includes('network') || dept.includes('IT') || dept.includes('MCA') || dept.includes('CSE')) {
    return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('finance') || text.includes('market') || text.includes('analytics') || text.includes('stock') || dept.includes('MBA')) {
    return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
  }
  if (dept.includes('MECH')) {
    return 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
  }

  const sampleImages = [
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
  ];

  let hash = 0;
  const str = project.title || project._id || 'project';
  for (let i = 0; i < str.length; i++) {
    hash = (hash + str.charCodeAt(i)) % sampleImages.length;
  }
  return sampleImages[hash] || sampleImages[0];
};

const ProjectCard = React.memo(({ project }) => {
  const [likes, setLikes] = useState(project.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { addToast } = useContext(ToasterContext);

  const fallbackImage = useMemo(() => getFallbackProjectImage(project), [project]);

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
  }, [project._id, isLiked, addToast]);

  const handleFeedbackSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!feedbackText.trim()) return;

      try {
        await api.post(`/projects/${project._id}/feedback`, { feedback: feedbackText });
        setFeedbackText('');
        addToast('Feedback submitted to author!', 'success');
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
    if (project.imageData && project.imageMimeType && typeof project.imageData === 'string' && project.imageData.length > 50) {
      return `data:${project.imageMimeType};base64,${project.imageData}`;
    }
    if (
      project.imageUrl &&
      typeof project.imageUrl === 'string' &&
      project.imageUrl.startsWith('http') &&
      !project.imageUrl.includes('placeholder') &&
      !project.imageUrl.includes('projectbg.png')
    ) {
      return project.imageUrl;
    }
    return fallbackImage;
  }, [project.imageData, project.imageMimeType, project.imageUrl, fallbackImage]);

  const pdfUrl = useMemo(() => {
    if (project.pdfData) {
      return `data:application/pdf;base64,${project.pdfData}`;
    }
    return project.pdfUrl || '';
  }, [project.pdfData, project.pdfUrl]);

  return (
    <>
      {/* Editorial Glass Project Card */}
      <div
        onClick={() => setIsPopupOpen(true)}
        className="glass-card glass-card-hover group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl"
      >
        {/* Project Thumbnail */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
          <img
            src={imageUrl}
            alt={project.title}
            onError={(e) => {
              e.target.src = fallbackImage;
            }}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/85 via-transparent to-transparent"></div>
          <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-[#030712]/80 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-cyan-300 backdrop-blur-md">
            {project.department || 'General'}
          </span>
        </div>

        {/* Content Body */}
        <div className="flex flex-grow flex-col space-y-3 p-5">
          <div>
            <h3 className="line-clamp-1 font-sora text-base font-bold text-white transition-colors group-hover:text-cyan-300">
              {project.title}
            </h3>
            <p className="mt-1 line-clamp-2 font-sans text-xs leading-relaxed text-slate-400">
              {project.description}
            </p>
          </div>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(project.toolsUsed?.length ? project.toolsUsed : ['General'])
              .slice(0, 3)
              .map((tool) => (
                <span
                  key={tool}
                  className="rounded border border-white/5 bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-slate-400"
                >
                  {tool}
                </span>
              ))}
          </div>

          {/* Interaction Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-auto flex items-center justify-between gap-2.5 border-t border-white/[0.06] pt-3.5"
          >
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs transition-all ${
                isLiked
                  ? 'border border-pink-500/40 bg-pink-500/20 text-pink-300'
                  : 'border border-white/10 bg-white/[0.03] text-slate-400 hover:border-pink-500/30 hover:text-pink-400'
              }`}
              title={isLiked ? 'Unlike' : 'Like'}
            >
              {isLiked ? (
                <FaHeart className="text-xs text-pink-400" />
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
                className="w-full rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-sans text-[11px] text-slate-200 placeholder-slate-500 focus:border-cyan-500/50 focus:bg-white/[0.06] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!feedbackText.trim()}
                className="rounded-full border border-cyan-500/30 bg-cyan-500/20 p-1.5 text-cyan-300 transition-all hover:bg-cyan-500/30 hover:text-white disabled:opacity-20"
                title="Send Feedback"
              >
                <FaPaperPlane className="text-[10px]" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Cinematic Detail Modal */}
      {isPopupOpen && (
        <div
          onClick={() => setIsPopupOpen(false)}
          className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/80 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-panel relative max-h-[90vh] w-full max-w-2xl space-y-6 overflow-y-auto rounded-3xl p-6 shadow-2xl sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#030712]/80 text-slate-400 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              <FaTimes className="text-xs" />
            </button>

            {/* Modal Image Area */}
            <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
              <img
                src={imageUrl}
                alt={project.title}
                onError={(e) => {
                  e.target.src = fallbackImage;
                }}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent"></div>
              <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-[#030712]/85 px-3 py-1 font-mono text-xs font-semibold uppercase text-cyan-300">
                {project.department}
              </span>
            </div>

            {/* Modal Header */}
            <div>
              <h2 className="font-sora text-2xl font-bold text-white sm:text-3xl">{project.title}</h2>
              <p className="mt-3 whitespace-pre-line font-sans text-xs leading-relaxed text-slate-300 sm:text-sm">
                {project.description}
              </p>
            </div>

            {/* Author & Department Meta Grid */}
            <div className="grid grid-cols-1 gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-xs sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Author:</span>
                <span className="font-medium text-white">
                  {project.name} {project.rollno ? `(${project.rollno})` : ''}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Email:</span>
                <span className="font-mono text-cyan-300">{project.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Department:</span>
                <span className="font-medium text-slate-200">{project.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Tools:</span>
                <span className="font-mono text-slate-300">{toolsDisplay}</span>
              </div>
            </div>

            {/* Links Section */}
            <div className="flex flex-wrap gap-3 pt-1">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 font-sans text-xs font-semibold text-slate-200 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  <FaGithub className="text-sm" /> View GitHub Repository
                </a>
              )}
              {pdfUrl && (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/15 px-4 py-2 font-sans text-xs font-semibold text-rose-300 transition-colors hover:bg-rose-500/25 hover:text-white"
                >
                  <FaFilePdf className="text-sm" /> Read PDF Documentation
                </a>
              )}
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/15 px-4 py-2 font-sans text-xs font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/25 hover:text-white"
                >
                  <FaExternalLinkAlt className="text-xs" /> Launch Live Demo
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

