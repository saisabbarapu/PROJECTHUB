import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative border-t border-white/[0.08] bg-[#020617]/90 backdrop-blur-xl text-slate-400">
      {/* Soft Ambient Glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand & Manifesto */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 shadow-glow-cyan">
                <span className="font-mono text-sm font-black text-cyan-300">P</span>
              </div>
              <span className="font-sora text-lg font-bold tracking-tight text-white">PROJECTHUB</span>
            </div>
            <p className="font-sora text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Build. Share. Discover.
            </p>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              A premium showcase platform empowering university students to publish research, discover multidisciplinary innovation, and collaborate seamlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-sora text-xs font-bold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/home" className="transition-colors hover:text-cyan-400">
                  Home Showcase
                </Link>
              </li>
              <li>
                <Link to="/mainhome" className="transition-colors hover:text-cyan-400">
                  Explore Projects
                </Link>
              </li>
              <li>
                <Link to="/top-liked" className="transition-colors hover:text-cyan-400">
                  Top Projects Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/aboutpage" className="transition-colors hover:text-cyan-400">
                  About the Platform
                </Link>
              </li>
              <li>
                <Link to="/contactus" className="transition-colors hover:text-cyan-400">
                  Support & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Institution & Contact */}
          <div className="space-y-3">
            <h4 className="font-sora text-xs font-bold uppercase tracking-wider text-slate-200">
              Institutional Hub
            </h4>
            <div className="space-y-2 text-sm text-slate-400">
              <p className="text-slate-300 font-medium">Aditya University & AEC</p>
              <p className="text-xs text-slate-500">Department Project Showcase Network</p>
              <div className="pt-2">
                <a
                  href="mailto:projecthubs983@gmail.com"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  projecthubs983@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ProjectHub. Designed for student innovators & researchers.</p>
          <div className="flex items-center gap-6">
            <Link to="/aboutpage" className="hover:text-slate-400 transition-colors">Privacy & Terms</Link>
            <Link to="/contactus" className="hover:text-slate-400 transition-colors">Contact</Link>
            <span className="font-mono text-[11px] text-cyan-500/70">v2.4.0-cinematic</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
