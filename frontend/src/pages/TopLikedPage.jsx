import React, { useState, useEffect } from 'react';
import api from '../components/api';
import TopProjectCard from './TopProjectCard';
import { FaTrophy } from 'react-icons/fa';

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
    <div className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Hero Section */}
        <section className="mb-16 space-y-4 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-3xl text-amber-400 shadow-lg shadow-amber-500/10">
            <FaTrophy />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Top 3 Most Liked Projects
          </h1>
          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-slate-400 sm:text-sm">
            Celebrating the most inspiring and high-impact student innovations voted on by our
            community!
          </p>
        </section>

        {/* Loading / Error States */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="flex animate-pulse items-center gap-3 text-sm font-medium text-indigo-400">
              <div className="h-2 w-2 animate-ping rounded-full bg-indigo-500"></div>
              Loading leaderboard rankings...
            </div>
          </div>
        )}

        {error && (
          <div className="mx-auto max-w-lg rounded-2xl border border-rose-800 bg-rose-950/40 p-4 text-center text-xs text-rose-300">
            {error}
          </div>
        )}

        {/* Cards Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {topProjects.length > 0 ? (
              topProjects.map((project, index) => (
                <TopProjectCard key={project._id} project={project} rank={index + 1} />
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-sm text-slate-500">
                No projects have been liked yet. Start the epic journey!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopLikedPage;
