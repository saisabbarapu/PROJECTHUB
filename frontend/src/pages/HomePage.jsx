import React, { useState, useMemo } from 'react';
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
    <main className="relative min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">


      {/* Cinematic Hero Section */}
      <section className="relative px-4 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Eyebrow Pill */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/[0.06] px-4 py-1.5 font-mono text-xs font-semibold tracking-wider text-cyan-300 backdrop-blur-md">
            <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400"></span>
            <span>STUDENT PROJECT SHOWCASE</span>
          </div>

          {/* Large Hero Editorial Headline */}
          <h1 className="font-sora text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl">
            BUILD.
            <span className="block text-slate-400">SHARE.</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
              DISCOVER.
            </span>
          </h1>

          {/* Supporting Headline & Paragraph */}
          <div className="mx-auto mt-8 max-w-2xl space-y-3">
            <p className="font-sora text-lg font-medium text-slate-200 sm:text-xl">
              Turn your academic projects into something worth showcasing.
            </p>
            <p className="font-sans text-sm leading-relaxed text-slate-400 sm:text-base">
              ProjectHub is a platform where students can submit, discover, and showcase projects while connecting ideas across departments.
            </p>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/mainhome')}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500/90 to-blue-600/90 px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-105 hover:border-cyan-300 hover:shadow-cyan-500/30 active:scale-95"
            >
              <span>Explore Projects</span>
              <FaArrowRight className="text-xs" />
            </button>

            <button
              onClick={() => navigate('/loginpage')}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-slate-200 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <span>Submit Your Project</span>
            </button>
          </div>

          {/* Feature Highlights Strip */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-3 border-y border-white/[0.06] py-5 sm:gap-8">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <FaChevronRight className="text-[10px] text-cyan-400" />
              <span>Project Showcase</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <FaChevronRight className="text-[10px] text-cyan-400" />
              <span>Smart Discovery</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <FaChevronRight className="text-[10px] text-cyan-400" />
              <span>Student Collaboration</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <FaChevronRight className="text-[10px] text-cyan-400" />
              <span>Department Exploration</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spotlight Card */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Content */}
            <div className="space-y-4 lg:max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-cyan-300">
                <span>✦ SPOTLIGHT INNOVATION</span>
              </div>
              <h2 className="font-sora text-2xl font-bold tracking-tight text-white sm:text-3xl">
                AI-Powered Early Health Diagnosis System
              </h2>
              <p className="font-sans text-xs leading-relaxed text-slate-400 sm:text-sm">
                Developed by university computer science researchers, this deep learning framework analyzes diagnostic medical imaging with high-throughput inference, offering a low-cost screening assistant for rural healthcare centers.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {['PyTorch', 'FastAPI', 'Computer Vision', 'Clinical Trial'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 pt-3">
                <button
                  onClick={() => navigate('/mainhome')}
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/15 px-5 py-2.5 text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-500/25 hover:text-white"
                >
                  <span>Inspect In Showcase</span>
                  <FaArrowRight className="text-[10px]" />
                </button>
                <span className="font-mono text-xs text-slate-400">Lead: Aarav Sharma (CSE)</span>
              </div>
            </div>

            {/* Right Thumbnail */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl lg:w-96">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80"
                alt="AI Diagnosis preview"
                className="h-60 w-full object-cover transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  e.target.src = '/image/projectbg.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                <span className="font-medium text-white">Verified Project</span>
                <span className="rounded-full border border-cyan-500/30 bg-cyan-950/80 px-2.5 py-0.5 font-mono text-[10px] text-cyan-300">
                  98% Accuracy
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Grid & Search */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
              EXPLORE INNOVATIONS
            </div>
            <h2 className="mt-1.5 font-sora text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              FEATURED PROJECTS
            </h2>
            <p className="mt-2 max-w-xl font-sans text-xs text-slate-400 sm:text-sm">
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
              className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-8 font-sans text-xs text-slate-200 placeholder-slate-500 transition-all focus:border-cyan-500/50 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-cyan-500/20"
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
        <div className="mb-8 flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 font-sans text-xs font-medium transition-all ${
                  isActive
                    ? 'border border-cyan-500/50 bg-cyan-500/20 text-cyan-200 shadow-sm'
                    : 'border border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Editorial Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.01] py-16 text-center">
            <FaSearch className="mx-auto text-2xl text-slate-600" />
            <h3 className="mt-3 font-sora text-sm font-semibold text-slate-300">No projects found</h3>
            <p className="mt-1 text-xs text-slate-500">Try adjusting your search query or reset filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1.5 text-xs text-cyan-300 hover:bg-cyan-500/20"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const isLiked = likedProjects[project.id];
              const totalLikes = project.likes + (isLiked ? 1 : 0);

              return (
                <div
                  key={project.id}
                  onClick={() => navigate('/mainhome')}
                  className="glass-card glass-card-hover group flex cursor-pointer flex-col overflow-hidden rounded-2xl"
                >
                  {/* Thumbnail Area with Subtle Overlay */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      onError={(e) => {
                        e.target.src = '/image/projectbg.png';
                      }}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent"></div>

                    {/* Department Tag */}
                    <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-[#030712]/80 px-2.5 py-0.5 font-mono text-[10px] font-medium text-cyan-300 backdrop-blur-md">
                      {project.category}
                    </span>

                    {/* Like button */}
                    <button
                      onClick={(e) => handleToggleLike(project.id, e)}
                      className={`absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs backdrop-blur-md transition-all ${
                        isLiked
                          ? 'border border-pink-500/40 bg-pink-500/20 text-pink-300'
                          : 'border border-white/10 bg-[#030712]/70 text-slate-300 hover:text-pink-400'
                      }`}
                    >
                      {isLiked ? <FaHeart className="text-pink-400" /> : <FaRegHeart />}
                      <span>{totalLikes}</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-grow flex-col p-5">
                    <h3 className="font-sora text-base font-bold text-white transition-colors group-hover:text-cyan-300">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-grow text-xs leading-relaxed text-slate-400">
                      {project.description}
                    </p>

                    {/* Technology tags */}
                    <div className="mt-4 flex flex-wrap items-center gap-1.5">
                      {project.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="rounded border border-white/5 bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-slate-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Footer Row */}
                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-950 font-mono text-[10px] font-bold text-cyan-300">
                          {project.author.charAt(0)}
                        </div>
                        <span className="text-xs text-slate-300">{project.author}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-cyan-400 transition-transform group-hover:translate-x-0.5">
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
      <section className="border-t border-white/[0.06] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
              WORKFLOW
            </span>
            <h2 className="mt-2 font-sora text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              From Idea to Recognition
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-xs text-slate-400 sm:text-sm">
              An intuitive process to publish capstones, collect peer reviews, and showcase your innovation portfolio.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="glass-card rounded-2xl p-6">
              <span className="font-mono text-2xl font-black text-cyan-400">01</span>
              <h3 className="mt-3 font-sora text-base font-bold text-white">Build & Document</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Upload your project code, PDF architecture report, and visual media with tags across engineering disciplines.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <span className="font-mono text-2xl font-black text-sky-400">02</span>
              <h3 className="mt-3 font-sora text-base font-bold text-white">Peer Feedback</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Gather upvotes and constructive feedback from fellow students and departmental mentors in real time.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <span className="font-mono text-2xl font-black text-blue-400">03</span>
              <h3 className="mt-3 font-sora text-base font-bold text-white">Top Showcase</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Standout submissions qualify for the community leaderboard and permanent verified university archives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mx-4 my-16 max-w-5xl sm:mx-auto">
        <div className="glass-panel relative overflow-hidden rounded-3xl p-8 text-center sm:p-14">
          <div className="mx-auto max-w-2xl space-y-4">
            <h2 className="font-sora text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Have a Project Ready for the Spotlight?
            </h2>
            <p className="font-sans text-xs leading-relaxed text-slate-400 sm:text-sm">
              Join hundreds of student creators and faculty publishing capstones and research models on ProjectHub.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => navigate('/loginpage')}
                className="rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-cyan-500/20 hover:scale-105"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/aboutpage')}
                className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:bg-white/[0.08] hover:text-white"
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

