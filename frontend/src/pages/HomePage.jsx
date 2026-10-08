import React, { useState, useMemo } from 'react';
import GlyphLottery from '../components/GlyphLottery';
import { useNavigate } from 'react-router-dom';
import {
  FaArrowRight,
  FaHeart,
  FaRegHeart,
  FaSearch,
  FaTimes,
  FaChevronRight,
  FaGithub,
  FaExternalLinkAlt,
  FaCodeBranch,
  FaShieldAlt,
  FaLightbulb,
} from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedProjects, setLikedProjects] = useState({});

  const categories = [
    'All',
    'AI / Healthcare',
    'IoT / Agriculture',
    'Robotics',
    'CleanTech',
    'EdTech',
    'Emergency Tech',
  ];

  const projectData = [
    {
      id: 1,
      title: 'AI-Powered Health Diagnosis',
      category: 'AI / Healthcare',
      description:
        'Intelligent deep learning model for early detection of pulmonary and retinal conditions with high clinical accuracy.',
      image:
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      author: 'Aarav Sharma',
      dept: 'CSE (AI/ML)',
      likes: 142,
      tech: ['Python', 'PyTorch', 'FastAPI', 'OpenCV'],
      badge: 'Spotlight #1',
    },
    {
      id: 2,
      title: 'Smart Solar Irrigation Grid',
      category: 'IoT / Agriculture',
      description:
        'IoT-driven precision agriculture system optimizing water consumption and soil moisture telemetry via LoRaWAN.',
      image:
        'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
      author: 'Priya Patel',
      dept: 'ECE / AgTech',
      likes: 98,
      tech: ['ESP32', 'MQTT', 'Node.js', 'React'],
      badge: 'Eco Award',
    },
    {
      id: 3,
      title: 'Autonomous Urban Delivery Drone',
      category: 'Robotics',
      description:
        'Quad-rotor UAV equipped with LiDAR obstacle avoidance and computer vision for rapid last-mile hospital deliveries.',
      image:
        'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
      author: 'Rohan Varma',
      dept: 'Mechanical & Robotics',
      likes: 124,
      tech: ['ROS2', 'C++', 'LiDAR', 'PX4'],
      badge: 'Trending',
    },
    {
      id: 4,
      title: 'Eco-Friendly Smart Power Meter',
      category: 'CleanTech',
      description:
        'Real-time non-intrusive appliance load monitoring (NILM) edge device identifying parasitic power draws in campus labs.',
      image:
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
      author: 'Sneha Reddy',
      dept: 'EEE / CleanTech',
      likes: 76,
      tech: ['STM32', 'Python', 'InfluxDB', 'Grafana'],
    },
    {
      id: 5,
      title: 'Virtual Chemical Synthesis Lab',
      category: 'EdTech',
      description:
        'Interactive 3D simulation environment enabling university chemistry students to safely conduct complex reactions online.',
      image:
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
      author: 'Karthik Rao',
      dept: 'Information Tech',
      likes: 110,
      tech: ['Three.js', 'React', 'WebXR', 'GLSL'],
    },
    {
      id: 6,
      title: 'Disaster Rapid Response Mesh',
      category: 'Emergency Tech',
      description:
        'Decentralized peer-to-peer offline communications protocol designed for disaster relief and emergency coordination.',
      image:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      author: 'Ananya Deshmukh',
      dept: 'CSE / Networks',
      likes: 89,
      tech: ['WebRTC', 'Go', 'Bluetooth Mesh', 'PWA'],
    },
  ];

  const handleToggleLike = (id, e) => {
    e.stopPropagation();
    setLikedProjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredProjects = useMemo(() => {
    return projectData.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="relative min-h-screen bg-transparent text-slate-100 selection:bg-violet-500/20 selection:text-violet-200">


      {/* Cinematic Hero Section */}
      <section className="relative px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-14 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Eyebrow Pill with Pulsing Cyan Aura */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-950/40 px-3.5 py-1 sm:px-4 sm:py-1.5 font-mono text-[10px] sm:text-xs font-semibold tracking-wider text-violet-300 shadow-[0_0_15px_rgba(168,85,247,0.25)] backdrop-blur-md">
            <span className="flex h-1.5 w-1.5 animate-ping rounded-full bg-cyan-400"></span>
            <span className="truncate max-w-[260px] sm:max-w-none">NEXT-GEN STUDENT INNOVATION ENGINE</span>
          </div>

          {/* Large Hero Editorial Headline — Glyph Lottery Slot-Reel Animation */}
          <h1 className="font-sora text-3xl min-[380px]:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] sm:leading-tight">
            {/* "BUILD." — starts immediately */}
            <GlyphLottery
              text="BUILD."
              trigger="mount"
              delay={0}
              staggerMs={55}
              spinDuration={620}
              fps={22}
              className="text-white"
            />
            {/* "SHARE." — starts after BUILD. finishes (~6*55+620 = 950ms) */}
            <span className="block">
              <GlyphLottery
                text="SHARE."
                trigger="mount"
                delay={960}
                staggerMs={55}
                spinDuration={620}
                fps={22}
                className="text-slate-300"
              />
            </span>
            {/* "DISCOVER." — starts after SHARE. finishes (~1960ms) */}
            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
              <GlyphLottery
                text="DISCOVER."
                trigger="mount"
                delay={1980}
                staggerMs={50}
                spinDuration={700}
                fps={22}
              />
            </span>
          </h1>

          {/* Supporting Headline & Paragraph */}
          <div className="mx-auto mt-6 sm:mt-8 max-w-2xl space-y-2 sm:space-y-3 px-2">
            <p className="font-sora text-base sm:text-xl font-medium text-slate-200">
              Turn your academic projects into something worth showcasing.
            </p>
            <p className="font-sans text-xs sm:text-base leading-relaxed text-slate-300">
              ProjectHub is a platform where students can submit, discover, and showcase projects while connecting ideas across departments.
            </p>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <button
              onClick={() => navigate('/mainhome')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-violet-400/50 bg-gradient-to-r from-violet-500 via-blue-600 to-indigo-600 px-6 sm:px-8 py-3 sm:py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-violet-500/25 transition-all duration-200 hover:scale-105 hover:border-cyan-300 hover:shadow-violet-500/50 active:scale-95"
            >
              <span>Explore Projects</span>
              <FaArrowRight className="text-xs" />
            </button>

            <button
              onClick={() => navigate('/loginpage')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-violet-500/30 bg-white/[0.04] px-6 sm:px-8 py-3 sm:py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-slate-200 backdrop-blur-md transition-all duration-200 hover:border-violet-400/50 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
            >
              <span>Submit Your Project</span>
            </button>
          </div>

          {/* Feature Highlights Strip */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-3 border-y border-violet-500/10 py-4 sm:py-5 md:flex md:flex-wrap md:items-center md:justify-center md:gap-8">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-slate-200">
              <FaChevronRight className="text-[9px] sm:text-[10px] text-violet-400 shrink-0" />
              <span>Project Showcase</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-slate-200">
              <FaChevronRight className="text-[9px] sm:text-[10px] text-violet-400 shrink-0" />
              <span>Smart Discovery</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-slate-200">
              <FaChevronRight className="text-[9px] sm:text-[10px] text-violet-400 shrink-0" />
              <span>Student Collaboration</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-slate-200">
              <FaChevronRight className="text-[9px] sm:text-[10px] text-violet-400 shrink-0" />
              <span>Department Exploration</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spotlight Card */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20 sm:px-6 lg:px-8">
        <div className="glass-panel relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-violet-500/30 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Content */}
            <div className="space-y-3 sm:space-y-4 lg:max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/20 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-semibold text-violet-300 shadow-[0_0_10px_rgba(168,85,247,0.25)]">
                <span>✦ SPOTLIGHT INNOVATION</span>
              </div>
              <h2 className="font-sora text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
                AI-Powered Early Health Diagnosis System
              </h2>
              <p className="font-sans text-xs leading-relaxed text-slate-300 sm:text-sm">
                Developed by university computer science researchers, this deep learning framework analyzes diagnostic medical imaging with high-throughput inference, offering a low-cost screening assistant for rural healthcare centers.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {['PyTorch', 'FastAPI', 'Computer Vision', 'Clinical Trial'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-violet-500/20 bg-violet-950/30 px-2 sm:px-2.5 py-0.5 sm:py-1 font-mono text-[10px] sm:text-[11px] text-violet-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-3">
                <button
                  onClick={() => navigate('/mainhome')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-400/50 bg-gradient-to-r from-violet-500/25 to-blue-600/25 px-5 py-2.5 text-xs font-bold text-violet-200 shadow-md transition-all hover:bg-violet-500/35 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                >
                  <span>Inspect In Showcase</span>
                  <FaArrowRight className="text-[10px]" />
                </button>
                <span className="font-mono text-[11px] sm:text-xs text-slate-400 text-center sm:text-left">Lead: Aarav Sharma (CSE)</span>
              </div>
            </div>

            {/* Right Thumbnail */}
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-violet-500/25 bg-slate-950 shadow-2xl lg:w-96 w-full">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80"
                alt="AI Diagnosis preview"
                className="h-48 sm:h-60 w-full object-cover transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  e.target.src = '/image/projectbg.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                <span className="font-medium text-white text-[11px] sm:text-xs">Verified Project</span>
                <span className="rounded-full border border-violet-400/40 bg-violet-950/90 px-2 sm:px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold text-violet-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                  98% Accuracy
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Grid & Search */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10 flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-violet-400">
              EXPLORE INNOVATIONS
            </div>
            <h2 className="mt-1 font-sora text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              FEATURED PROJECTS
            </h2>
            <p className="mt-1 sm:mt-2 max-w-xl font-sans text-xs sm:text-sm text-slate-400">
              Explore projects built by students across different technologies and departments.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2 sm:py-2.5 pl-9 pr-8 font-sans text-xs text-slate-200 placeholder-slate-500 transition-all focus:border-violet-500/50 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-violet-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="scrollbar-none mb-6 sm:mb-8 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-full px-3.5 sm:px-4 py-1.5 font-sans text-xs font-semibold transition-all shrink-0 ${
                  isActive
                    ? 'border border-violet-400/60 bg-violet-500/20 text-violet-200 shadow-[0_0_14px_rgba(168,85,247,0.25)]'
                    : 'border border-violet-500/15 bg-white/[0.02] text-slate-400 hover:border-violet-400/30 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Editorial Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl sm:rounded-3xl border border-dashed border-violet-500/20 bg-white/[0.01] py-12 sm:py-16 text-center px-4">
            <FaSearch className="mx-auto text-2xl text-violet-400/40" />
            <h3 className="mt-3 font-sora text-sm font-semibold text-slate-300">No projects found</h3>
            <p className="mt-1 text-xs text-slate-400">Try adjusting your search query or reset filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300 hover:bg-violet-500/20"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const isLiked = likedProjects[project.id];
              const totalLikes = project.likes + (isLiked ? 1 : 0);

              return (
                <div
                  key={project.id}
                  onClick={() => navigate('/mainhome')}
                  className="glass-card glass-card-hover group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-violet-500/15 hover:border-violet-400/50 transition-all duration-300"
                >
                  {/* Thumbnail Area with Subtle Overlay */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      onError={(e) => {
                        e.target.src = '/image/projectbg.png';
                      }}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-transparent to-transparent"></div>

                    {/* Department Tag */}
                    <span className="absolute left-3 top-3 rounded-full border border-violet-400/30 bg-black/40 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-violet-300 shadow-[0_0_10px_rgba(168,85,247,0.2)] backdrop-blur-md">
                      {project.category}
                    </span>

                    {/* Like button */}
                    <button
                      onClick={(e) => handleToggleLike(project.id, e)}
                      className={`absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs backdrop-blur-md transition-all ${
                        isLiked
                          ? 'border border-pink-500/50 bg-pink-500/20 text-pink-300 shadow-[0_0_10px_rgba(236,72,153,0.3)]'
                          : 'border border-white/10 bg-black/40 text-slate-300 hover:text-pink-400'
                      }`}
                    >
                      {isLiked ? <FaHeart className="text-pink-400" /> : <FaRegHeart />}
                      <span>{totalLikes}</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-grow flex-col p-4 sm:p-5">
                    <h3 className="font-sora text-base font-bold text-white transition-colors group-hover:text-violet-300">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-grow text-xs leading-relaxed text-slate-300">
                      {project.description}
                    </p>

                    {/* Technology tags */}
                    <div className="mt-4 flex flex-wrap items-center gap-1.5">
                      {project.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="rounded-md border border-violet-500/20 bg-violet-950/20 px-2 py-0.5 font-mono text-[10px] text-violet-200/90"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Footer Row */}
                    <div className="mt-4 flex items-center justify-between border-t border-violet-500/10 pt-3 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full border border-violet-500/40 bg-violet-950 font-mono text-[10px] font-bold text-violet-300">
                          {project.author.charAt(0)}
                        </div>
                        <span className="text-xs text-slate-200 truncate max-w-[120px] sm:max-w-none">{project.author}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-violet-400 transition-transform group-hover:translate-x-0.5">
                        Details <FaArrowRight className="text-[9px]" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 3 Step Workflow */}
      <section className="border-t border-violet-500/10 px-4 py-14 sm:py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-violet-400">
              WORKFLOW
            </span>
            <h2 className="mt-1 sm:mt-2 font-sora text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              From Idea to Recognition
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-slate-300">
              An intuitive process to publish capstones, collect peer reviews, and showcase your innovation portfolio.
            </p>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            <div className="glass-card rounded-2xl p-5 sm:p-6 border border-violet-500/15 hover:border-violet-400/40 transition-all">
              <span className="font-mono text-2xl font-black text-violet-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">01</span>
              <h3 className="mt-2.5 sm:mt-3 font-sora text-base font-bold text-white">Build & Document</h3>
              <p className="mt-1.5 sm:mt-2 text-xs leading-relaxed text-slate-300">
                Upload your project code, PDF architecture report, and visual media with tags across engineering disciplines.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-5 sm:p-6 border border-violet-500/15 hover:border-violet-400/40 transition-all">
              <span className="font-mono text-2xl font-black text-violet-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">02</span>
              <h3 className="mt-2.5 sm:mt-3 font-sora text-base font-bold text-white">Explore & Review</h3>
              <p className="mt-1.5 sm:mt-2 text-xs leading-relaxed text-slate-300">
                Discover active projects by discipline, test live deployment links, and provide structured academic feedback.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-5 sm:p-6 border border-violet-500/15 hover:border-violet-400/40 transition-all">
              <span className="font-mono text-2xl font-black text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.4)]">03</span>
              <h3 className="mt-2.5 sm:mt-3 font-sora text-base font-bold text-white">Rank & Showcase</h3>
              <p className="mt-1.5 sm:mt-2 text-xs leading-relaxed text-slate-300">
                Top-voted capstones ascend the university leaderboard and gain visibility with recruiters and faculty mentors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mx-4 my-12 sm:my-16 max-w-5xl sm:mx-auto">
        <div className="glass-panel relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 text-center">
          <div className="mx-auto max-w-2xl space-y-3 sm:space-y-4">
            <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Have a Project Ready for the Spotlight?
            </h2>
            <p className="font-sans text-xs sm:text-sm leading-relaxed text-slate-400">
              Join hundreds of student creators and faculty publishing capstones and research models on ProjectHub.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4">
              <button
                onClick={() => navigate('/loginpage')}
                className="w-full sm:w-auto rounded-full border border-violet-400/40 bg-gradient-to-r from-violet-500 to-blue-600 px-7 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-violet-500/20 hover:scale-105"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/aboutpage')}
                className="w-full sm:w-auto rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:bg-white/[0.08] hover:text-white"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;

