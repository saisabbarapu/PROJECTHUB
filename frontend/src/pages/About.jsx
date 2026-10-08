import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaShieldAlt, FaUsers, FaLayerGroup, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const About = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <FaGraduationCap className="text-xl text-violet-400" />,
      title: 'Our Mission & Aim',
      description:
        'To empower students and academic researchers by providing a centralized platform for capstone presentation, peer review, and technical skill development. ProjectHub facilitates transparency and recognition by enabling creators to share verified work.',
    },
    {
      icon: <FaLayerGroup className="text-xl text-violet-400" />,
      title: 'Discipline-Specific Taxonomy',
      description:
        'Projects are cleanly categorized across academic disciplines including Computer Science, Electrical, Electronics, Civil, Mechanical, AI/ML, and Management. This enables targeted exploration across specialized tech stacks.',
    },
    {
      icon: <FaUsers className="text-xl text-blue-400" />,
      title: 'Peer Feedback & Review',
      description:
        'Collaboration drives meaningful innovation. ProjectHub enables students to view detailed project documentation PDFs, explore GitHub codebases, upvote standout innovations, and exchange actionable feedback with authors.',
    },
    {
      icon: <FaShieldAlt className="text-xl text-emerald-400" />,
      title: 'Academic Integrity & Security',
      description:
        'ProjectHub guarantees authentic peer engagement through institutional email validation (@adityauniversity.in, @acet.in, and @aec.in). Student documentation and intellectual property remain safeguarded.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-transparent px-4 py-10 sm:py-16 text-slate-200 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-violet-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/2 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl space-y-8 sm:space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3 sm:space-y-4 text-center"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 sm:px-4 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs font-semibold text-violet-300">
            <span>ABOUT PROJECTHUB</span>
          </div>
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Bridging Student Talent & Technical Opportunity
          </h1>
          <p className="mx-auto max-w-2xl font-sans text-xs sm:text-sm leading-relaxed text-slate-400">
            ProjectHub is an innovative academic showcase platform designed to discover, celebrate, and collaborate on student projects across all engineering and science departments.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {sections.map((sec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, borderColor: 'rgba(168,85,247,0.35)' }}
              className="glass-card space-y-3 rounded-2xl p-5 sm:p-6 transition-all"
            >
              <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.04] p-2.5 sm:p-3 shadow-inner">
                {sec.icon}
              </div>
              <h3 className="font-sora text-base font-bold text-white">{sec.title}</h3>
              <p className="font-sans text-xs sm:text-sm leading-relaxed text-slate-400">{sec.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Callout & Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel space-y-4 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center"
        >
          <h2 className="font-sora text-xl sm:text-2xl md:text-3xl font-bold text-white">
            Ready to explore student innovations?
          </h2>
          <p className="mx-auto max-w-xl font-sans text-xs sm:text-sm text-slate-300">
            Browse live projects from top departments, check out GitHub source code, and review PDF presentations.
          </p>
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/mainhome')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-violet-400/40 bg-gradient-to-r from-violet-500 to-blue-600 px-7 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-violet-500/20"
            >
              <span>Explore Projects</span>
              <FaArrowRight className="text-xs" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

