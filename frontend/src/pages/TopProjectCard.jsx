import React, { useMemo } from 'react';
import { FaGithub, FaExternalLinkAlt, FaFilePdf, FaHeart, FaCrown } from 'react-icons/fa';
import { getFallbackProjectImage } from '../components/ProjectCard';

const TopProjectCard = ({ project, rank }) => {
  const fallbackImage = useMemo(() => getFallbackProjectImage(project), [project]);

  const imageUrl = useMemo(() => {
    if (project.imageData && project.imageMimeType) {
      return `data:${project.imageMimeType};base64,${project.imageData}`;
    }
    if (project.imageUrl && (project.imageUrl.startsWith('http') || project.imageUrl.startsWith('data:'))) {
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

  const rankBadgeColors = {
    1: 'text-amber-300 border-amber-400/30 bg-amber-400/10',
    2: 'text-slate-200 border-slate-300/30 bg-slate-300/10',
    3: 'text-amber-500 border-amber-600/30 bg-amber-600/10',
  };

  const rankNumberFormatted = String(rank).padStart(2, '0');

  return (
    <article className="glass-card glass-card-hover group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 sm:flex-row sm:items-center sm:gap-6">
      {/* Large Editorial Rank Number */}
      <div className="mb-3 flex items-center justify-between sm:mb-0 sm:flex-col sm:items-center sm:justify-center sm:px-2">
        <div className="flex items-center gap-2 sm:flex-col sm:items-center">
          <span className="font-mono text-3xl sm:text-5xl font-black tracking-tighter text-violet-400">
            {rankNumberFormatted}
          </span>
          {rank === 1 && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/15 px-2 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold text-amber-300">
              <FaCrown className="text-[9px]" /> TOP #1
            </span>
          )}
        </div>
      </div>

      {/* Project Thumbnail */}
      <div className="relative h-44 w-full flex-shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-slate-900 sm:h-36 sm:w-56">
        <img
          src={imageUrl}
          alt={project.title}
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent"></div>
        <span className="absolute left-2.5 top-2.5 rounded-full border border-white/10 bg-[#030712]/80 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase text-violet-300 backdrop-blur-md">
          {project.department}
        </span>
      </div>

      {/* Project Info & Description */}
      <div className="mt-3.5 flex flex-grow flex-col justify-between space-y-3 sm:mt-0">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-sora text-base sm:text-xl font-bold text-white transition-colors group-hover:text-violet-300">
              {project.title}
            </h2>

            {/* Like Counter Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-500/15 px-2.5 sm:px-3 py-1 font-mono text-xs font-semibold text-pink-300">
              <FaHeart className="text-xs text-pink-400" />
              <span>{project.likes || 0} Upvotes</span>
            </div>
          </div>

          <p className="mt-1.5 line-clamp-2 font-sans text-xs leading-relaxed text-slate-400">
            {project.description}
          </p>
        </div>

        {/* Tools & Creator Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border-t border-white/[0.06] pt-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300 flex-wrap">
            <span className="text-slate-500">By</span>
            <span className="font-medium text-white truncate max-w-[150px] sm:max-w-none">{project.name}</span>
            {project.rollno && (
              <span className="font-mono text-[11px] text-slate-400">({project.rollno})</span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-2 flex-wrap">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                title="GitHub Repo"
              >
                <FaGithub className="text-xs" /> <span>Code</span>
              </a>
            )}
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-xs text-violet-300 transition-colors hover:bg-violet-500/20"
                title="Live Demo"
              >
                <FaExternalLinkAlt className="text-[10px]" /> <span>Demo</span>
              </a>
            )}
            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-xs text-rose-300 transition-colors hover:bg-rose-500/20"
                title="PDF Documentation"
              >
                <FaFilePdf className="text-xs" /> <span>PDF</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default TopProjectCard;

