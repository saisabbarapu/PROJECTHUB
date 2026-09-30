import React, { useMemo } from 'react';
import {
  FaGithub,
  FaLink,
  FaFilePdf,
  FaHeart,
  FaCrown,
  FaMedal,
  FaAward,
  FaGraduationCap,
  FaExternalLinkAlt,
} from 'react-icons/fa';

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

  // Rank-specific themed styles and halos
  const rankThemes = {
    1: {
      title: '#1 Champion',
      icon: <FaCrown className="text-sm" />,
      badge:
        'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/30',
      border: 'border-amber-400/40 hover:border-amber-300',
      glow: 'shadow-2xl shadow-amber-500/15',
      ambientBacklight: 'from-amber-500/20 via-yellow-500/10 to-transparent',
      accentColor: 'text-amber-400',
    },
    2: {
      title: '#2 Runner-Up',
      icon: <FaMedal className="text-sm" />,
      badge:
        'bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 text-slate-950 font-black shadow-lg shadow-slate-300/25',
      border: 'border-slate-400/40 hover:border-slate-200',
      glow: 'shadow-2xl shadow-slate-400/10',
      ambientBacklight: 'from-slate-400/15 via-slate-300/10 to-transparent',
      accentColor: 'text-slate-300',
    },
    3: {
      title: '#3 Bronze Merit',
      icon: <FaAward className="text-sm" />,
      badge:
        'bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 text-white font-black shadow-lg shadow-amber-600/30',
      border: 'border-amber-700/40 hover:border-amber-500',
      glow: 'shadow-2xl shadow-amber-600/15',
      ambientBacklight: 'from-amber-700/20 via-orange-600/10 to-transparent',
      accentColor: 'text-amber-500',
    },
  };

  const theme = rankThemes[rank] || {
    title: `#${rank} Featured`,
    icon: <FaAward className="text-xs" />,
    badge: 'bg-indigo-600 text-white font-bold',
    border: 'border-slate-800 hover:border-indigo-500/40',
    glow: 'shadow-xl shadow-indigo-500/10',
    ambientBacklight: 'from-indigo-600/15 to-transparent',
    accentColor: 'text-indigo-400',
  };

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-3xl border bg-slate-900/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${theme.border} ${theme.glow}`}
    >
      {/* Ambient Top Backlight Glow */}
      <div
        className={`pointer-events-none absolute -top-12 left-1/2 -z-10 h-44 w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-b ${theme.ambientBacklight} opacity-75 blur-2xl`}
      />

      {/* Project Thumbnail with Zoom */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-800">
        <img
          src={imageUrl}
          alt={project.title}
          onError={(e) => {
            e.target.src = '/image/projectbg.png';
          }}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Rank Podium Badge */}
        <div className="absolute left-4 top-4 z-10">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs tracking-wide backdrop-blur-md ${theme.badge}`}
          >
            {theme.icon}
            <span>{theme.title}</span>
          </span>
        </div>

        {/* Department Badge */}
        <div className="absolute right-4 top-4 z-10">
          <span className="rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-300 backdrop-blur-md">
            {project.department || 'Academic'}
          </span>
        </div>

        {/* Author Floating Overlay */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-[11px] font-bold text-white shadow-md">
              {(project.name || 'S').charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-white drop-shadow-sm">{project.name}</p>
              <p className="font-mono text-[10px] text-slate-300 drop-shadow-sm">
                {project.rollno}
              </p>
            </div>
          </div>

          {/* Likes Pill */}
          <div className="flex items-center gap-1.5 rounded-full border border-pink-500/40 bg-pink-500/20 px-3 py-1 text-xs font-bold text-pink-300 shadow-sm backdrop-blur-md">
            <FaHeart className="animate-pulse text-xs text-pink-400" />
            <span>{project.likes || 0}</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="flex flex-grow flex-col justify-between p-6">
        <div className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-indigo-400">
            {project.title}
          </h2>
          <p className="line-clamp-3 text-xs leading-relaxed text-slate-300">
            {project.description}
          </p>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {(project.toolsUsed?.length ? project.toolsUsed : ['General Research']).map((tool) => (
              <span
                key={tool}
                className="rounded-lg border border-slate-700/60 bg-slate-800/80 px-2.5 py-1 text-[10px] font-medium text-slate-300 shadow-sm transition-colors hover:border-indigo-500/50 hover:text-white"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions / Links */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4">
          <span className="max-w-[140px] truncate font-mono text-[11px] text-slate-400">
            {project.email}
          </span>

          <div className="flex items-center gap-1.5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-700 bg-slate-800/80 p-2.5 text-slate-300 shadow-sm transition-all hover:scale-105 hover:border-slate-500 hover:bg-slate-700 hover:text-white"
                title="View GitHub Repository"
              >
                <FaGithub className="text-sm" />
              </a>
            )}
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-indigo-500/30 bg-indigo-950/60 p-2.5 text-indigo-300 shadow-sm transition-all hover:scale-105 hover:border-indigo-400 hover:bg-indigo-600 hover:text-white"
                title="Open Live Project URL"
              >
                <FaExternalLinkAlt className="text-xs" />
              </a>
            )}
            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-rose-500/30 bg-rose-950/60 p-2.5 text-rose-300 shadow-sm transition-all hover:scale-105 hover:border-rose-400 hover:bg-rose-600 hover:text-white"
                title="Download Project Documentation PDF"
              >
                <FaFilePdf className="text-sm" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default TopProjectCard;
