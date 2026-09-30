import React, { useMemo } from 'react';
import { FaGithub, FaLink, FaFilePdf, FaHeart, FaCrown } from 'react-icons/fa';

const TopProjectCard = ({ project, rank }) => {
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

  const rankColors = {
    1: {
      badge: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black',
      border: 'border-amber-500/50 shadow-amber-500/10',
      glow: 'shadow-lg shadow-amber-500/10',
    },
    2: {
      badge: 'bg-gradient-to-r from-slate-300 to-slate-400 text-slate-950 font-black',
      border: 'border-slate-500/40 shadow-slate-500/10',
      glow: 'shadow-lg shadow-slate-500/10',
    },
    3: {
      badge: 'bg-gradient-to-r from-amber-600 to-amber-700 text-white font-black',
      border: 'border-amber-700/40 shadow-amber-700/10',
      glow: 'shadow-lg shadow-amber-700/10',
    },
  };

  const style = rankColors[rank] || {
    badge: 'bg-indigo-600 text-white font-bold',
    border: 'border-slate-800',
    glow: 'shadow-md',
  };

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-3xl border bg-slate-900/80 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] ${style.border} ${style.glow}`}
    >
      {/* Rank Badge */}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs shadow-md">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs ${style.badge}`}
        >
          {rank === 1 && <FaCrown className="text-xs" />} #{rank}
        </span>
      </div>

      {/* Project Image */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-800">
        <img
          src={imageUrl}
          alt={project.title}
          onError={(e) => {
            e.target.src = '/image/projectbg.png';
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-4 top-4 rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1 text-[11px] font-semibold uppercase text-indigo-300 backdrop-blur-md">
          {project.department}
        </span>
      </div>

      {/* Body Content */}
      <div className="flex flex-grow flex-col space-y-4 p-6">
        <div>
          <h2 className="text-xl font-bold text-white transition-colors group-hover:text-indigo-400">
            {project.title}
          </h2>
          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-400">
            {project.description}
          </p>
        </div>

        {/* Metadata */}
        <div className="space-y-1.5 rounded-xl border border-slate-800 bg-slate-950/50 p-3 text-xs text-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-400">Author:</span>
            <span className="font-medium text-white">
              {project.name} ({project.rollno})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Email:</span>
            <span className="max-w-[180px] truncate font-mono text-slate-300">{project.email}</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-800/80 pt-1">
            <span className="text-slate-400">Total Likes:</span>
            <span className="inline-flex items-center gap-1 font-bold text-pink-400">
              <FaHeart className="text-xs" /> {project.likes || 0}
            </span>
          </div>
        </div>

        {/* Tools Chips */}
        <div className="flex flex-wrap gap-1.5">
          {(project.toolsUsed?.length ? project.toolsUsed : ['General']).map((tool) => (
            <span
              key={tool}
              className="rounded-md border border-indigo-500/20 bg-indigo-950/60 px-2 py-0.5 text-[10px] font-medium text-indigo-300"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Footer Actions / Links */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-800/80 pt-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              title="GitHub Repository"
            >
              <FaGithub className="text-base" />
            </a>
          )}
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-indigo-400"
              title="Live Demo"
            >
              <FaLink className="text-base" />
            </a>
          )}
          {pdfUrl && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-rose-400"
              title="Project PDF Report"
            >
              <FaFilePdf className="text-base" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default TopProjectCard;
