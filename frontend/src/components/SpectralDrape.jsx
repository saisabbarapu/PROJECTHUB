import React, { useEffect, useRef } from 'react';

/**
 * SpectralDrape - A glowing drape of dots folding in 3D
 * GPU-accelerated canvas component simulating a wavy, folded cloth of radiant particles
 */
const SpectralDrape = ({
  color = '#00f0ff',
  secondaryColor = '#6366f1',
  accentColor = '#ec4899',
  dotCountX = 70,
  dotCountY = 45,
  waveSpeed = 0.8,
  waveAmplitude = 38,
  waveFrequency = 0.045,
  foldIntensity = 1.2,
  dotSize = 1.6,
  interactive = true,
  mouseStrength = 40,
  glow = 0.85,
  perspective = 800,
  className = '',
  style = {},
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, active: false };
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Color helper
    const hexToRgb = (hex) => {
      const sanitized = hex.replace('#', '');
      const bigint = parseInt(sanitized, 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
      };
    };

    const c1 = hexToRgb(color);
    const c2 = hexToRgb(secondaryColor);
    const c3 = hexToRgb(accentColor);

    const render = () => {
      time += 0.015 * waveSpeed;

      // Mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cellW = width / (dotCountX - 1);
      const cellH = height / (dotCountY - 1);
      const centerX = width / 2;
      const centerY = height / 2;

      // 3D Drape Grid Calculation
      for (let y = 0; y < dotCountY; y++) {
        const v = y / (dotCountY - 1);
        const baseY = y * cellH;

        for (let x = 0; x < dotCountX; x++) {
          const u = x / (dotCountX - 1);
          const baseX = x * cellW;

          // Multi-frequency sine & cosine draping waves
          const wave1 = Math.sin(u * Math.PI * 4 + time * 1.5) * Math.cos(v * Math.PI * 3 + time * 0.8);
          const wave2 = Math.sin((u + v) * Math.PI * 3 - time * 1.2) * 0.5;
          const wave3 = Math.cos(u * 12 + v * 8 + time * 2) * 0.25;

          // Main 3D cloth fold distortion
          const drapeFold = (wave1 + wave2 + wave3) * waveAmplitude * foldIntensity;
          const zDepth = drapeFold * 2.5;

          // Mouse perturbation
          let mouseDisplacementX = 0;
          let mouseDisplacementY = 0;
          if (interactive && mouse.active) {
            const dx = baseX - mouse.x;
            const dy = baseY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 220;
            if (dist < maxDist) {
              const force = (1 - dist / maxDist) * mouseStrength;
              mouseDisplacementX = (dx / dist) * force;
              mouseDisplacementY = (dy / dist) * force;
            }
          }

          // 3D Perspective Projection
          const fov = perspective;
          const z = zDepth + 120;
          const scale = fov / (fov + z);

          const projX = centerX + (baseX - centerX + mouseDisplacementX) * scale;
          const projY = centerY + (baseY - centerY + drapeFold + mouseDisplacementY) * scale;

          // Depth-based size & opacity
          const sizeFactor = Math.max(0.4, scale * dotSize);
          const depthNorm = Math.min(1, Math.max(0, (zDepth + waveAmplitude) / (waveAmplitude * 2)));

          // Gradient color interpolation across the drape
          let r, g, b;
          if (depthNorm < 0.5) {
            const t = depthNorm * 2;
            r = Math.round(c1.r + (c2.r - c1.r) * t);
            g = Math.round(c1.g + (c2.g - c1.g) * t);
            b = Math.round(c1.b + (c2.b - c1.b) * t);
          } else {
            const t = (depthNorm - 0.5) * 2;
            r = Math.round(c2.r + (c3.r - c2.r) * t);
            g = Math.round(c2.g + (c3.g - c2.g) * t);
            b = Math.round(c2.b + (c3.b - c2.b) * t);
          }

          const alpha = Math.min(0.95, Math.max(0.15, 0.35 + depthNorm * 0.6));

          // Draw the glowing dot
          ctx.beginPath();
          ctx.arc(projX, projY, sizeFactor, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fill();

          // Subtle glow on crests
          if (glow > 0 && depthNorm > 0.65) {
            ctx.beginPath();
            ctx.arc(projX, projY, sizeFactor * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(depthNorm - 0.65) * 0.35 * glow})`;
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    color,
    secondaryColor,
    accentColor,
    dotCountX,
    dotCountY,
    waveSpeed,
    waveAmplitude,
    foldIntensity,
    dotSize,
    interactive,
    mouseStrength,
    glow,
    perspective,
  ]);

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: 'transparent', ...style }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full pointer-events-auto"
      />
    </div>
  );
};

export default SpectralDrape;
