import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaShieldAlt, FaUsers, FaLayerGroup, FaArrowRight } from 'react-icons/fa';

const About = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <FaGraduationCap className="text-lg text-cyan-400" />,
      title: 'Our Mission & Aim',
      description:
        'To empower students and academic researchers by providing a centralized platform for capstone presentation, peer review, and technical skill development. ProjectHub facilitates transparency and recognition by enabling creators to share verified work.',
    },
    {
      icon: <FaLayerGroup className="text-lg text-sky-400" />,
      title: 'Discipline-Specific Taxonomy',
      description:
        'Projects are cleanly categorized across academic disciplines including Computer Science, Electrical, Electronics, Civil, Mechanical, AI/ML, and Management. This enables targeted exploration across specialized tech stacks.',
    },
    {
      icon: <FaUsers className="text-lg text-blue-400" />,
      title: 'Peer Feedback & Review',
      description:
        'Collaboration drives meaningful innovation. ProjectHub enables students to view detailed project documentation PDFs, explore GitHub codebases, upvote standout innovations, and exchange actionable feedback with authors.',
    },
    {
      icon: <FaShieldAlt className="text-lg text-emerald-400" />,
      title: 'Academic Integrity & Security',
      description:
        'ProjectHub guarantees authentic peer engagement through institutional email validation (@adityauniversity.in, @acet.in, and @aec.in). Student documentation and intellectual property remain safeguarded.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#030712] px-4 py-16 text-slate-200 sm:px-6 lg:px-8">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-full max-w-6xl -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.1),transparent_70%)] blur-3xl"></div>

      <div className="mx-auto max-w-5xl space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 font-mono text-xs font-semibold text-cyan-300">
            <span>ABOUT PROJECTHUB</span>
          </div>
          <h1 className="font-sora text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Bridging Student Talent & Technical Opportunity
          </h1>
          <p className="mx-auto max-w-2xl font-sans text-xs leading-relaxed text-slate-400 sm:text-sm">
            ProjectHub is an innovative academic showcase platform designed to discover, celebrate, and collaborate on student projects across all engineering and science departments.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sections.map((sec, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover space-y-3 rounded-2xl p-6"
            >
              <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.04] p-3 shadow-inner">
                {sec.icon}
              </div>
              <h3 className="font-sora text-base font-bold text-white">{sec.title}</h3>
              <p className="font-sans text-xs leading-relaxed text-slate-400 sm:text-sm">{sec.description}</p>
            </div>
          ))}
        </div>

        {/* Callout & Action */}
        <div className="glass-panel space-y-4 rounded-3xl p-8 text-center sm:p-10">
          <h2 className="font-sora text-2xl font-bold text-white sm:text-3xl">
            Ready to explore student innovations?
          </h2>
          <p className="mx-auto max-w-xl font-sans text-xs text-slate-300 sm:text-sm">
            Browse live projects from top departments, check out GitHub source code, and review PDF presentations.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/mainhome')}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
            >
              <span>Explore Projects</span>
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

