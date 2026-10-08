import React, { useState, useEffect } from 'react';

/**
 * SkeletonShimmer - Glowing bone skeleton card with smooth wipe reveal
 * Based on the Motion AnimateView shimmer profile card design
 */
export default function SkeletonShimmer({
  shimmerDuration = 1.5,
  loadDelay = 2500,
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, loadDelay);
      return () => clearTimeout(timer);
    }
  }, [loaded, loadDelay]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-5 w-full">
      <div className="relative w-full max-w-[360px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl backdrop-blur-xl">
        {loaded ? (
          <div className="animate-wipe-reveal">
            <ProfileCard />
          </div>
        ) : (
          <SkeletonCard shimmerDuration={shimmerDuration} />
        )}
      </div>

      <button
        onClick={() => setLoaded(false)}
        className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2 font-mono text-xs font-semibold text-white transition-all hover:border-violet-400/50 hover:bg-violet-500/20 active:scale-95"
      >
        Reload Shimmer
      </button>
    </div>
  );
}

/** ==============   Views   ================ */

function ProfileCard() {
  return (
    <div className="flex flex-col">
      {/* Cover */}
      <div className="h-[120px] w-full bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-800" />

      {/* Profile Area */}
      <div className="flex flex-col gap-3.5 px-5 pb-5">
        {/* Avatar */}
        <div className="-mt-7">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#030712] bg-[#f5e725] text-black shadow-lg">
            <MotionLogo />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1">
          <h3 className="m-0 font-sora text-base font-semibold leading-tight text-white">
            {PROFILE_NAME}
          </h3>
          <p className="m-0 font-mono text-xs text-slate-400">
            {PROFILE_HANDLE}
          </p>
        </div>

        {/* Bio */}
        <p className="m-0 font-sans text-xs leading-relaxed text-slate-300">
          {PROFILE_BIO}
        </p>

        {/* Stats */}
        <div className="flex gap-2">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-1 flex-col items-center gap-0.5 rounded-lg border border-white/5 bg-white/[0.04] p-2"
            >
              <span className="font-mono text-sm font-semibold text-white">
                {stat.value}
              </span>
              <span className="text-[11px] text-slate-400">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button className="w-full rounded-xl bg-violet-600 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-violet-600/30 transition-all hover:bg-violet-500 active:scale-95">
          Follow
        </button>
      </div>
    </div>
  );
}

function SkeletonCard({ shimmerDuration }) {
  const durationStyle = { animationDuration: `${shimmerDuration}s` };

  return (
    <div className="flex flex-col">
      {/* Cover Skeleton */}
      <div className="shimmer-bone h-[120px] w-full" style={durationStyle} />

      {/* Profile Area */}
      <div className="flex flex-col gap-3.5 px-5 pb-5">
        {/* Avatar Ring & Bone */}
        <div className="-mt-7">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#030712] bg-white/[0.03]">
            <div
              className="shimmer-bone h-12 w-12 rounded-full"
              style={durationStyle}
            />
          </div>
        </div>

        {/* Info Shimmer */}
        <div className="flex flex-col gap-1.5 self-start">
          <div
            className="shimmer-bone h-4 w-32 rounded-md"
            style={durationStyle}
          />
          <div
            className="shimmer-bone h-3 w-20 rounded-md"
            style={durationStyle}
          />
        </div>

        {/* Bio Shimmer */}
        <div className="flex flex-col gap-1.5">
          <div
            className="shimmer-bone h-3 w-full rounded-md"
            style={durationStyle}
          />
          <div
            className="shimmer-bone h-3 w-4/5 rounded-md"
            style={durationStyle}
          />
        </div>

        {/* Stats Row */}
        <div className="flex gap-2">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="shimmer-bone flex-1 h-12 rounded-lg"
              style={durationStyle}
            />
          ))}
        </div>

        {/* Follow Button Sizer */}
        <div
          className="shimmer-bone h-9 w-full rounded-xl"
          style={durationStyle}
        />
      </div>
    </div>
  );
}

function MotionLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1260 454"
      fill="currentColor"
      className="h-3/5 w-3/5"
    >
      <path d="M475.753 0L226.8 453.6L0 453.6L194.392 99.4116C224.526 44.5081 299.724 0 362.353 0L475.753 0Z" />
      <path d="M1031.93 113.4C1031.93 50.7709 1082.7 0 1145.33 0C1207.96 0 1258.73 50.7709 1258.73 113.4C1258.73 176.029 1207.96 226.8 1145.33 226.8C1082.7 226.8 1031.93 176.029 1031.93 113.4Z" />
      <path d="M518.278 0L745.078 0L496.125 453.6L269.325 453.6L518.278 0Z" />
      <path d="M786.147 0L1012.95 0L818.555 354.188C788.422 409.092 713.223 453.6 650.594 453.6L537.194 453.6L786.147 0Z" />
    </svg>
  );
}

/** ==============   Constants   ================ */

const PROFILE_NAME = 'Motion';
const PROFILE_HANDLE = '@motiondotdev';
const PROFILE_BIO =
  'Free and open source. Create stunning web animations for React, JavaScript and Vue.';

const STATS = [
  { value: '127', label: 'Posts' },
  { value: '11K', label: 'Followers' },
  { value: '5', label: 'Following' },
];
