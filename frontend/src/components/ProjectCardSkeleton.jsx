import React from 'react';

/**
 * ProjectCardSkeleton - Shimmer bone skeleton mirroring ProjectCard
 * Uses high-velocity gradient sweep animation for loading states
 */
const ProjectCardSkeleton = ({ shimmerDuration = 1.5 }) => {
  const durationStyle = { animationDuration: `${shimmerDuration}s` };

  return (
    <div className="glass-card relative flex flex-col overflow-hidden rounded-2xl border border-white/10 p-0 shadow-lg backdrop-blur-xl">
      {/* Cover Skeleton */}
      <div className="relative h-48 w-full overflow-hidden bg-white/[0.02]">
        <div className="shimmer-bone h-full w-full" style={durationStyle} />
        {/* Department Badge Bone */}
        <div className="absolute right-3 top-3 h-5 w-20 rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
          <div className="shimmer-bone h-full w-full rounded-full" style={durationStyle} />
        </div>
      </div>

      {/* Content Area Skeleton */}
      <div className="flex flex-grow flex-col space-y-3.5 p-5">
        {/* Title & Description Bones */}
        <div className="space-y-2">
          <div className="shimmer-bone h-5 w-3/4 rounded-md" style={durationStyle} />
          <div className="shimmer-bone h-3.5 w-full rounded-md" style={durationStyle} />
          <div className="shimmer-bone h-3.5 w-4/5 rounded-md" style={durationStyle} />
        </div>

        {/* Tech Badges Bones */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <div className="shimmer-bone h-5 w-14 rounded-md" style={durationStyle} />
          <div className="shimmer-bone h-5 w-16 rounded-md" style={durationStyle} />
          <div className="shimmer-bone h-5 w-12 rounded-md" style={durationStyle} />
        </div>

        {/* Footer Author & Like Bones */}
        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-3.5">
          <div className="flex items-center gap-2">
            <div className="shimmer-bone h-6 w-6 rounded-full" style={durationStyle} />
            <div className="shimmer-bone h-3.5 w-24 rounded-md" style={durationStyle} />
          </div>
          <div className="shimmer-bone h-6 w-12 rounded-full" style={durationStyle} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
