import React from 'react';

const Loader = () => {
  const texts = [
    {
      clip: 'polygon(0% 0%, 11.11% 0%, 11.11% 100%, 0% 100%)',
      size: '0.2em',
      margin: '-2.1em',
      opacity: 0.6,
      gradient: 'linear-gradient(to right, #fff 4%, #aaa 7%)',
    },
    {
      clip: 'polygon(11.11% 0%, 22.22% 0%, 22.22% 100%, 11.11% 100%)',
      size: '0.25em',
      margin: '-0.98em',
      opacity: 0.7,
      gradient: 'linear-gradient(to right, #fff 9%, #aaa 13%)',
    },
    {
      clip: 'polygon(22.22% 0%, 33.33% 0%, 33.33% 100%, 22.22% 100%)',
      size: '0.307em',
      margin: '-0.33em',
      opacity: 0.8,
      gradient: 'linear-gradient(to right, #fff 15%, #aaa 18%)',
    },
    {
      clip: 'polygon(33.33% 0%, 44.44% 0%, 44.44% 100%, 33.33% 100%)',
      size: '0.364em',
      margin: '-0.05em',
      opacity: 0.9,
      gradient: 'linear-gradient(to right, #fff 20%, #aaa 23%)',
    },
    {
      clip: 'polygon(44.44% 0%, 55.55% 0%, 55.55% 100%, 44.44% 100%)',
      size: '0.4em',
      margin: '0em',
      opacity: 1,
      gradient: null,
    },
    {
      clip: 'polygon(55.55% 0%, 66.66% 0%, 66.66% 100%, 55.55% 100%)',
      size: '0.364em',
      margin: '0.05em',
      opacity: 0.9,
      gradient: 'linear-gradient(to right, #aaa 29%, #fff 32%)',
    },
    {
      clip: 'polygon(66.66% 0%, 77.77% 0%, 77.77% 100%, 66.66% 100%)',
      size: '0.307em',
      margin: '0.33em',
      opacity: 0.8,
      gradient: 'linear-gradient(to right, #aaa 34%, #fff 37%)',
    },
    {
      clip: 'polygon(77.77% 0%, 88.88% 0%, 88.88% 100%, 77.77% 100%)',
      size: '0.25em',
      margin: '0.98em',
      opacity: 0.7,
      gradient: 'linear-gradient(to right, #aaa 39%, #fff 42%)',
    },
    {
      clip: 'polygon(88.88% 0%, 100% 0%, 100% 100%, 88.88% 100%)',
      size: '0.2em',
      margin: '2.1em',
      opacity: 0.6,
      gradient: 'linear-gradient(to right, #aaa 45%, #fff 48%)',
    },
  ];

  return (
    <div
      className="
        relative flex h-[1em] w-[7.3em]
        select-none items-center justify-center
        overflow-hidden text-[4em] font-black
        uppercase text-white
      "
      style={{
        filter: 'drop-shadow(0 0 0.05em #ffffff40)',
      }}
    >
      {texts.map((item, index) => (
        <div
          key={index}
          className="
            absolute flex items-center justify-center
            overflow-hidden whitespace-nowrap text-center
          "
          style={{
            clipPath: item.clip,
            fontSize: item.size,
            marginLeft: item.margin,
            opacity: item.opacity,
          }}
        >
          <span
            className="animate-scrolling"
            style={{
              background: item.gradient || '#fff',
              backgroundSize: '200% auto',
              backgroundClip: item.gradient ? 'text' : undefined,
              WebkitBackgroundClip: item.gradient ? 'text' : undefined,
              color: item.gradient ? 'transparent' : '#fff',
              animation:
                'scrolling 2s cubic-bezier(0.1, 0.6, 0.9, 0.4) infinite, shadow 2s cubic-bezier(0.1, 0.6, 0.9, 0.4) infinite',
            }}
          >
            LOADING
          </span>
        </div>
      ))}

      <div className="relative mt-[0.9em] flex h-[0.05em] w-[2em] items-center justify-center overflow-hidden rounded-[0.05em]">
        <div className="absolute inset-0 bg-white opacity-30" />

        <div
          className="
            absolute inset-0
            rounded-[0.05em]
            bg-white
            animate-wobble
          "
        />
      </div>
    </div>
  );
};

export default Loader;
