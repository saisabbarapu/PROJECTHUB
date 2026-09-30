import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaArrowRight } from 'react-icons/fa';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-16 text-slate-200 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8 text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">ProjectHub</h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          ProjectHub is an innovative platform designed to showcase, explore, and collaborate on
          projects across various academic domains. Build your portfolio, discover inspiring
          research, and connect with fellow creators.
        </p>
        <div>
          <button
            onClick={() => navigate('/mainhome')}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-7 py-3 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 hover:from-indigo-600 hover:to-purple-700"
          >
            Explore Now <FaArrowRight className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
