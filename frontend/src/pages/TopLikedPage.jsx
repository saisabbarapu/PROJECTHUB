import React, { useState, useEffect } from 'react';
import api from '../components/api';
import TopProjectCard from './TopProjectCard';
import Loader from '../components/Loader';
import { FaCrown, FaTrophy, FaFire } from 'react-icons/fa';

const TopLikedPage = () => {
  const [topProjects, setTopProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopLiked = async () => {
      try {
        const response = await api.get('/projects/top-liked');
        setTopProjects(response.data);
      } catch (err) {
        setError(
          'Failed to load top liked projects: ' + (err.response?.data?.details || err.message)
        );
      } finally {
        setLoading(false);
      }
    };
    fetchTopLiked();
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent px-4 py-10 sm:py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header Hero Section */}
        <section className="mb-10 sm:mb-14 text-center">
          <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 sm:px-4 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs font-semibold text-violet-300 backdrop-blur-md">
            <FaCrown className="text-violet-400" />
            <span>COMMUNITY LEADERBOARD</span>
          </div>
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            TOP PROJECTS
          </h1>
          <p className="mx-auto mt-2 sm:mt-3 max-w-xl font-sans text-xs leading-relaxed text-slate-400 sm:text-sm">
            The projects getting the most attention from the community across departments and disciplines.
          </p>
        </section>

        {/* Loading / Error States */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        )}

        {error && (
          <div className="glass-panel mx-auto max-w-lg rounded-2xl border-rose-500/30 p-4 text-center text-xs text-rose-300">
            {error}
          </div>
        )}

        {/* Ranked Projects List / Cards */}
        {!loading && !error && (
          <div className="space-y-6">
            {topProjects.length > 0 ? (
              topProjects.map((project, index) => (
                <TopProjectCard key={project._id} project={project} rank={index + 1} />
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.01] py-16 text-center text-sm text-slate-500">
                No projects have been ranked yet. Start exploring and upvoting!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopLikedPage;

