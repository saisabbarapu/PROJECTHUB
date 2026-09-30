import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { FaRocket, FaLightbulb, FaUsers, FaArrowRight } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();

  const projectData = [
    {
      id: 1,
      title: 'AI-Powered Health Diagnosis',
      description: 'An intelligent tool for preliminary medical analysis using machine learning.',
      image: '/image/projectbg.png',
      tag: 'AI / Healthcare',
    },
    {
      id: 2,
      title: 'Smart Irrigation System',
      description:
        'Automated water usage optimization with IoT sensors for sustainable agriculture.',
      image: '/image/projbg.png',
      tag: 'IoT / Agriculture',
    },
    {
      id: 3,
      title: 'Autonomous Delivery Drone',
      description: 'An aerial drone solution designed for rapid last-mile delivery in urban zones.',
      image: '/image/projectbg2.png',
      tag: 'Robotics',
    },
    {
      id: 4,
      title: 'Eco-Friendly Power Monitor',
      description: 'A smart meter system to monitor and reduce household energy consumption.',
      image: '/image/projectbg.png',
      tag: 'CleanTech',
    },
    {
      id: 5,
      title: 'Virtual Lab for Chemistry',
      description:
        'A simulated environment allowing students to safely conduct experiments online.',
      image: '/image/projbg.png',
      tag: 'EdTech',
    },
    {
      id: 6,
      title: 'Disaster Alert & Rescue App',
      description: 'A real-time emergency alert and coordination system for disaster-prone areas.',
      image: '/image/projectbg2.png',
      tag: 'Emergency Tech',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.900/30),theme(colors.slate.950))]"></div>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-400 shadow-sm">
            <FaRocket className="text-xs" /> Official Academic Project Showcase
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block text-white">Inspire, Build & Share</span>
            <span className="mt-2 block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Student Innovations
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            At ProjectHub, we celebrate creativity and technical excellence. Explore cutting-edge
            student projects across AI, robotics, clean energy, and software engineering.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/mainhome')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/40"
            >
              Explore Projects <FaArrowRight className="text-xs" />
            </button>
            <button
              onClick={() => navigate('/loginpage')}
              className="rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-slate-200 transition-all hover:border-slate-500 hover:bg-slate-800"
            >
              Submit Your Work
            </button>
          </div>
        </div>
      </section>

      {/* Highlights / Features Banner */}
      <section className="border-y border-slate-800/80 bg-slate-900/40 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex items-start gap-4 rounded-xl border border-slate-800/60 bg-slate-900/30 p-4">
            <div className="rounded-lg bg-indigo-500/20 p-3 text-indigo-400">
              <FaLightbulb className="text-xl" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Groundbreaking Ideas</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Discover novel engineering solutions created by talented college students and
                researchers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-slate-800/60 bg-slate-900/30 p-4">
            <div className="rounded-lg bg-purple-500/20 p-3 text-purple-400">
              <FaUsers className="text-xl" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Cross-Department Hub</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Explore works from CSE, EEE, ECE, Civil, Mechanical, AI/ML, and Management streams.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-slate-800/60 bg-slate-900/30 p-4">
            <div className="rounded-lg bg-pink-500/20 p-3 text-pink-400">
              <FaRocket className="text-xl" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Live Feedback & Ranking</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Vote, like, and review projects with real-time leaderboards and engagement tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Featured Innovations
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
            A glimpse into the remarkable projects developed by our student innovators.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projectData.map(({ id, title, description, image, tag }) => (
            <div
              key={id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-500/10"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                <img
                  src={image}
                  alt={title}
                  onError={(e) => {
                    e.target.src = '/image/projectbg.png';
                  }}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1 text-[11px] font-medium text-indigo-300 backdrop-blur-md">
                  {tag}
                </span>
              </div>
              <div className="flex flex-grow flex-col p-5">
                <h3 className="text-lg font-bold text-white transition-colors group-hover:text-indigo-400">
                  {title}
                </h3>
                <p className="mt-2 flex-grow text-xs leading-relaxed text-slate-400">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative mx-4 my-12 overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-950 p-8 text-center sm:mx-8 sm:p-14">
        <div className="mx-auto max-w-2xl space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready to Showcase Your Project?
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">
            Join hundreds of fellow students presenting their work, gaining recognition, and
            collaborating on future technologies.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate('/loginpage')}
              className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 hover:from-indigo-600 hover:to-purple-700"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      <Outlet />
    </main>
  );
};

export default HomePage;
