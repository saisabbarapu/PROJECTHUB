import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src="/image/logo.png" alt="Logo" className="h-7 w-7 rounded object-contain" />
              <span className="text-xl font-bold tracking-tight text-white">ProjectHub</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Showcasing student innovation, departmental research, and technical achievements.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/home" className="transition-colors hover:text-indigo-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/aboutpage" className="transition-colors hover:text-indigo-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/top-liked" className="transition-colors hover:text-indigo-400">
                  Heroic Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/contactus" className="transition-colors hover:text-indigo-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Contact
            </h4>
            <div className="space-y-1.5 text-sm text-slate-400">
              <p>
                Email:{' '}
                <a
                  href="mailto:projecthubs983@gmail.com"
                  className="text-indigo-400 hover:underline"
                >
                  projecthubs983@gmail.com
                </a>
              </p>
              <p>Institution: Aditya University & AEC</p>
              <p className="text-xs text-slate-500">Department Project Showcase Network</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800/80 pt-6 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} ProjectHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
