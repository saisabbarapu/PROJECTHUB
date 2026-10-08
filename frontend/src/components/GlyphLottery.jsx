import React, { useEffect, useRef, useState } from 'react';

/**
 * GlyphLottery — Letters spin like slot reels and lock into place one by one.
 * Inspired by the React Bits Pro "Glyph Lottery" component.
 *
 * Props:
 *  text          — The target string to resolve into
 *  className     — Wrapper class (apply font, size, color, etc.)
 *  charClassName — Class per individual character span
 *  staggerMs     — Delay between each character starting its reel (ms)
 *  spinDuration  — How long each reel spins before locking (ms)
 *  fps           — How many glyphs flicker per second while spinning
 *  glyphSet      — Character pool to draw random glyphs from
 *  trigger       — 'mount' | 'hover' | 'inView'
 *  loop          — Whether to restart the animation repeatedly
 *  loopDelay     — Ms to wait before restarting
 */

const DEFAULT_GLYPHS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?*+=<>';

function GlyphLottery({
  text = '',
  className = '',
  charClassName = '',
  staggerMs = 60,
  spinDuration = 600,
  fps = 20,
  delay = 0,
  glyphSet = DEFAULT_GLYPHS,
  trigger = 'mount',
  loop = false,
  loopDelay = 2500,
}) {
  const [chars, setChars] = useState(() => text.split('').map(() => ''));
  const [running, setRunning] = useState(false);
  const wrapperRef = useRef(null);
  const timersRef = useRef([]);

  const randomGlyph = () => glyphSet[Math.floor(Math.random() * glyphSet.length)];

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current.forEach(clearInterval);
    timersRef.current = [];
  };

  const runAnimation = () => {
    clearAllTimers();
    // Reset all chars to blank
    setChars(text.split('').map(() => ''));
    setRunning(true);

    const letters = text.split('');

    letters.forEach((targetChar, i) => {
      // Blank space, skip spinning
      if (targetChar === ' ') {
        const t = setTimeout(() => {
          setChars((prev) => {
            const next = [...prev];
            next[i] = ' ';
            return next;
          });
        }, i * staggerMs);
        timersRef.current.push(t);
        return;
      }

      const startDelay = i * staggerMs;
      const intervalMs = 1000 / fps;

      // Start flickering after stagger delay
      const startT = setTimeout(() => {
        // Flicker interval
        const interval = setInterval(() => {
          setChars((prev) => {
            const next = [...prev];
            next[i] = randomGlyph();
            return next;
          });
        }, intervalMs);
        timersRef.current.push(interval);

        // Lock to target after spinDuration
        const lockT = setTimeout(() => {
          clearInterval(interval);
          setChars((prev) => {
            const next = [...prev];
            next[i] = targetChar;
            return next;
          });

          // After last char locks, signal done
          if (i === letters.length - 1 || letters.slice(i + 1).every((c) => c === ' ')) {
            setRunning(false);
          }
        }, spinDuration);
        timersRef.current.push(lockT);
      }, startDelay);

      timersRef.current.push(startT);
    });

    // Loop restart
    if (loop) {
      const totalDuration = letters.length * staggerMs + spinDuration + loopDelay;
      const loopT = setTimeout(() => runAnimation(), totalDuration);
      timersRef.current.push(loopT);
    }
  };

  // Intersection Observer for 'inView' trigger
  useEffect(() => {
    if (trigger !== 'inView') return;
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimation();
          if (!loop) observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  // Mount trigger
  useEffect(() => {
    if (trigger === 'mount') {
      if (delay > 0) {
        const t = setTimeout(() => runAnimation(), delay);
        timersRef.current.push(t);
      } else {
        runAnimation();
      }
    }
    return () => clearAllTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger, delay]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') runAnimation();
  };

  return (
    <span
      ref={wrapperRef}
      className={`inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      aria-label={text}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className={`inline-block transition-none ${charClassName} ${
            char === '' ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ minWidth: char === ' ' ? '0.3em' : undefined }}
          aria-hidden="true"
        >
          {char || text[i]}
        </span>
      ))}
    </span>
  );
}

export default GlyphLottery;
