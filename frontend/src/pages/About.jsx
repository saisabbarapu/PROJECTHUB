import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaShieldAlt, FaUsers, FaLayerGroup, FaArrowRight } from 'react-icons/fa';

const About = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <FaGraduationCap className="text-xl text-indigo-400" />,
      title: 'Our Mission & Aim',
      description:
        'To empower students and academic researchers by providing a centralized hub for project presentation, peer review, and technical skill development. ProjectHub facilitates transparency and growth by enabling creators to share their work and receive constructive evaluation.',
    },
    {
      icon: <FaLayerGroup className="text-xl text-purple-400" />,
      title: 'Branch-wise Organization',
      description:
        'Projects are cleanly categorized across academic disciplines including Computer Science, Electrical, Electronics, Civil, Mechanical, AI/ML, and Management. This helps students explore solutions relevant to their field and learn discipline-specific stacks.',
    },
    {
      icon: <FaUsers className="text-xl text-pink-400" />,
      title: 'Collaboration & Feedback',
      description:
        'Collaboration drives meaningful innovation. ProjectHub enables students to view detailed project documentation PDFs, explore GitHub codebases, like standout innovations, and exchange actionable feedback with authors.',
    },
    {
      icon: <FaShieldAlt className="text-xl text-emerald-400" />,
      title: 'Academic Integrity & Security',
      description:
        'ProjectHub ensures data protection through verified university email authentication (@adityauniversity.in and @aec.in). Student intellectual property and documentation remain safeguarded while being showcased to faculty and peers.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-16 text-slate-200 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <span className="inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-400">
            About ProjectHub
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Bridging Student Talent & Technical Opportunity
          </h1>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
            ProjectHub is an innovative academic showcase platform designed to discover, celebrate,
            and collaborate on student projects across all engineering and management departments.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sections.map((sec, idx) => (
            <div
              key={idx}
              className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg backdrop-blur-sm transition-all hover:border-slate-700"
            >
              <div className="inline-flex rounded-xl bg-slate-800 p-3 shadow-inner">{sec.icon}</div>
              <h3 className="text-lg font-bold text-white">{sec.title}</h3>
              <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">{sec.description}</p>
            </div>
          ))}
        </div>

        {/* Callout & Action */}
        <div className="space-y-4 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 p-8 text-center sm:p-10">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to explore student innovations?
          </h2>
          <p className="mx-auto max-w-xl text-xs text-slate-300 sm:text-sm">
            Browse live projects from top departments, check out GitHub source code, and review PDF
            presentations.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/mainhome')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-7 py-3 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 hover:from-indigo-600 hover:to-purple-700"
            >
              Explore Projects <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
