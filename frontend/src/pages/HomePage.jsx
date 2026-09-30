import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaRocket,
  FaLightbulb,
  FaUsers,
  FaArrowRight,
  FaHeart,
  FaRegHeart,
  FaSearch,
  FaStar,
  FaCode,
  FaGraduationCap,
  FaAward,
  FaCheckCircle,
  FaFire,
  FaCompass,
  FaTimes,
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
    <main className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Ambient Aurora Glow behind Floating Navbar */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-80 w-full max-w-6xl -translate-x-1/2 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(99,102,241,0.35),rgba(168,85,247,0.18),transparent_75%)] blur-3xl"></div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-20 pt-10 sm:px-6 sm:pb-28 sm:pt-14 lg:px-8">
        {/* Ambient Gradient Background & Tech Grid */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.25),rgba(2,6,23,0))]"></div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-600/10 blur-[130px]"></div>

        <div className="mx-auto max-w-5xl text-center">
          {/* Glowing Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/60 px-4 py-1.5 text-xs font-semibold text-indigo-300 shadow-sm backdrop-blur-md transition-all hover:border-indigo-500/50">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
            <FaRocket className="text-indigo-400" />
            <span>Official University Project Showcase Platform</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Inspire, Build & Share{' '}
            <span className="mt-2 block bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Student Innovations
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            A collaborative hub for undergraduate, postgraduate, and departmental researchers to
            publish capstone projects, gain peer feedback, and showcase real-world solutions.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/mainhome')}
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 hover:shadow-indigo-500/50 active:scale-95"
            >
              <FaCompass className="text-sm" />
              Explore All Projects
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate('/loginpage')}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all hover:border-indigo-500/50 hover:bg-slate-800 hover:text-white"
            >
              <FaCode className="text-sm text-indigo-400" />
              Submit Your Project
            </button>
            <button
              onClick={() => navigate('/top-liked')}
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-5 py-3.5 text-sm font-semibold text-amber-300 backdrop-blur-md transition-all hover:border-amber-500/40 hover:bg-amber-500/20"
            >
              <FaAward className="text-sm text-amber-400" />
              Top Leaderboard
            </button>
          </div>

          {/* Stats Bar */}
          <div className="mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-md sm:grid-cols-4 sm:p-8">
            <div className="text-center">
              <div className="text-2xl font-black text-white sm:text-3xl">500+</div>
              <div className="mt-1 text-xs font-medium text-slate-400">Published Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-indigo-400 sm:text-3xl">12+</div>
              <div className="mt-1 text-xs font-medium text-slate-400">Engineering Disciplines</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-purple-400 sm:text-3xl">15K+</div>
              <div className="mt-1 text-xs font-medium text-slate-400">Peer Reviews & Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-emerald-400 sm:text-3xl">100%</div>
              <div className="mt-1 text-xs font-medium text-slate-400">Verified Creators</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Hero Spotlight Card */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-900/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Content */}
            <div className="space-y-4 lg:max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                <FaFire className="text-amber-400" /> Editor's Spotlight Pick of the Week
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                AI-Powered Early Health Diagnosis System
              </h2>
              <p className="text-sm leading-relaxed text-slate-300">
                Developed by university computer science researchers, this deep learning framework
                analyzes diagnostic medical imaging with high-throughput inference, offering a
                low-cost screening assistant for rural healthcare centers.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="rounded-md border border-indigo-500/30 bg-indigo-500/20 px-2.5 py-1 text-xs font-semibold text-indigo-300">
                  PyTorch
                </span>
                <span className="rounded-md border border-purple-500/30 bg-purple-500/20 px-2.5 py-1 text-xs font-semibold text-purple-300">
                  FastAPI
                </span>
                <span className="rounded-md border border-pink-500/30 bg-pink-500/20 px-2.5 py-1 text-xs font-semibold text-pink-300">
                  Computer Vision
                </span>
                <span className="rounded-md border border-emerald-500/30 bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                  Clinical Trial
                </span>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('/mainhome')}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition-all hover:bg-indigo-500"
                >
                  Inspect Project in Showcase <FaArrowRight className="text-[10px]" />
                </button>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <FaStar className="text-amber-400" />
                  <span className="font-semibold text-white">4.9</span> / 5.0 (68 peer ratings)
                </div>
              </div>
            </div>

            {/* Right Preview Image with Glow */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800 shadow-xl lg:w-96">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80"
                alt="AI Health Diagnosis Preview"
                className="h-56 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-64"
                onError={(e) => {
                  e.target.src = '/image/projectbg.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                <span className="font-medium text-white">Lead: Aarav Sharma</span>
                <span className="rounded-full bg-indigo-500/80 px-2.5 py-0.5 text-[10px] font-bold text-white">
                  Verified Department Work
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explorer / Filterable Innovations Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              <FaGraduationCap className="text-sm" /> Department Portfolios
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Featured Innovations
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-400">
              Browse top projects created by students across engineering and science streams.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
            <input
              type="text"
              placeholder="Search title, tech, or dept..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-700/80 bg-slate-900/90 py-2.5 pl-9 pr-8 text-xs text-slate-200 placeholder-slate-500 shadow-inner outline-none transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
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
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 py-16 text-center">
            <FaSearch className="mx-auto text-3xl text-slate-600" />
            <h3 className="mt-3 text-base font-semibold text-slate-300">No projects found</h3>
            <p className="mt-1 text-xs text-slate-500">
              Try adjusting your search query or switching categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300 hover:bg-indigo-500/20"
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
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10"
                >
                  {/* Image Container */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                    <img
                      src={project.image}
                      alt={project.title}
                      onError={(e) => {
                        e.target.src = '/image/projectbg.png';
                      }}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                    {/* Department Tag */}
                    <span className="absolute left-3 top-3 rounded-full border border-slate-700 bg-slate-950/80 px-2.5 py-1 text-[11px] font-medium text-indigo-300 backdrop-blur-md">
                      {project.category}
                    </span>

                    {/* Badge if available */}
                    {project.badge && (
                      <span className="absolute right-3 top-3 rounded-full border border-amber-500/30 bg-amber-500/80 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm backdrop-blur-md">
                        {project.badge}
                      </span>
                    )}

                    {/* Floating Like Button */}
                    <button
                      onClick={(e) => handleToggleLike(project.id, e)}
                      className={`absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md transition-all ${
                        isLiked
                          ? 'border border-pink-500/50 bg-pink-500 text-white shadow-md shadow-pink-500/30'
                          : 'border border-slate-700 bg-slate-950/70 text-slate-300 hover:text-pink-400'
                      }`}
                    >
                      {isLiked ? (
                        <FaHeart className="text-xs text-white" />
                      ) : (
                        <FaRegHeart className="text-xs" />
                      )}
                      <span>{totalLikes}</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-grow flex-col p-5">
                    <h3 className="text-base font-bold text-white transition-colors group-hover:text-indigo-400">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-grow text-xs leading-relaxed text-slate-400">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="mt-4 flex flex-wrap items-center gap-1.5">
                      {project.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="rounded-md border border-slate-800 bg-slate-800/60 px-2 py-0.5 text-[10px] font-medium text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Footer Info */}
                    <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-[10px] font-bold text-white">
                          {project.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-200">{project.author}</p>
                          <p className="text-[10px] text-slate-500">{project.dept}</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 group-hover:underline">
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

      {/* How It Works - 3 Step Roadmap */}
      <section className="border-t border-slate-800/80 bg-slate-900/30 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
              <FaRocket className="text-xs" /> Seamless Workflow
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              From Idea to Recognition in 3 Steps
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
              ProjectHub makes it effortless to document your hard work, receive constructive
              feedback, and stand out.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-xl font-bold text-indigo-400">
                01
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">Build & Upload</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Document your semester capstone, thesis research, or hackathon prototype with code
                links, abstract, and architecture diagrams.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-xl font-bold text-purple-400">
                02
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">Peer Feedback & Upvotes</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Receive ratings and comments from classmates, professors, and alumni to refine your
                project implementation and validate outcomes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/20 text-xl font-bold text-pink-400">
                03
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">Climb the Leaderboard</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Top-rated innovations rise to the Heroic Leaderboard, gaining campus recognition and
                visibility with hiring partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Platform Pillars */}
      <section className="border-t border-slate-800/80 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Why Colleges Choose ProjectHub
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
              Built specifically for academic ecosystems to bridge student ingenuity with
              institutional pride.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                <FaLightbulb className="text-lg" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">Interdisciplinary Sync</h3>
              <p className="mt-1 text-xs text-slate-400">
                Connect software developers with electronics and mechanical teams for complex
                projects.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                <FaUsers className="text-lg" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">Real-Time Engagement</h3>
              <p className="mt-1 text-xs text-slate-400">
                Instant notification updates on likes, comments, and reviews via Socket.IO.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/20 text-pink-400">
                <FaAward className="text-lg" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">Verified Portfolios</h3>
              <p className="mt-1 text-xs text-slate-400">
                Every project profile acts as an authentic digital credential for resumes and
                portfolios.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                <FaCheckCircle className="text-lg" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">Department Archives</h3>
              <p className="mt-1 text-xs text-slate-400">
                Preserve research continuity so junior batches can learn and expand on past
                successes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="relative mx-4 my-16 overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/70 via-purple-950/50 to-slate-950 p-8 text-center sm:mx-8 sm:p-14">
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
            <FaRocket className="text-xs" /> Take the Spotlight
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Have a Project That Deserves Recognition?
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">
            Join hundreds of engineering students and faculty mentors publishing their achievements
            on ProjectHub today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/loginpage')}
              className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 hover:from-indigo-600 hover:to-purple-700 active:scale-95"
            >
              Get Started Now
            </button>
            <button
              onClick={() => navigate('/aboutpage')}
              className="rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-300 transition-all hover:bg-slate-800 hover:text-white"
            >
              Learn More About ProjectHub
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
