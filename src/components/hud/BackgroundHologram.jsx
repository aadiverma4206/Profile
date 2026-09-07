import React, { useEffect, useState } from 'react';
import { portfolioData } from '../../data/portfolioData';

export default function BackgroundHologram({ useEditedPhoto = true, intensity = 'vivid', theme = 'dark' }) {
  const { personal } = portfolioData;
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const imageSrc = useEditedPhoto ? personal.avatarEdited : personal.avatarOriginal;
  const opacityVal = intensity === 'cinematic' ? 0.88 : intensity === 'vivid' ? 0.72 : 0.48;

  const isLight = theme === 'light';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        backgroundColor: 'var(--bg-dark)',
        transition: 'background-color 0.3s ease'
      }}
    >
      {/* 1. Ambient Dynamic Glow Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '750px',
          height: '750px',
          background: isLight
            ? 'radial-gradient(circle, rgba(2, 132, 199, 0.12) 0%, rgba(37, 99, 235, 0.05) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0, 210, 255, 0.15) 0%, rgba(37, 99, 235, 0.08) 50%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: '500px',
          height: '500px',
          background: isLight
            ? 'radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, transparent 65%)'
            : 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 65%)',
          filter: 'blur(70px)'
        }}
      />

      {/* 2. Main Background Portrait Image */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          left: '-20px',
          right: '-20px',
          bottom: '-20px',
          backgroundImage: `url(${imageSrc})`,
          backgroundPosition: 'center 16%',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          opacity: isLight ? Math.max(0.55, opacityVal * 0.85) : opacityVal,
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
          transition: 'opacity 0.35s ease, transform 0.15s ease-out',
          filter: useEditedPhoto
            ? isLight
              ? 'contrast(1.1) brightness(1.02) saturate(1.05)'
              : 'contrast(1.15) brightness(1.05) saturate(1.1)'
            : 'contrast(1.05) brightness(1.0)'
        }}
      />

      {/* 3. Soft Luxury Vignette: Clear Center Spotlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isLight
            ? `
              radial-gradient(circle at 50% 35%, rgba(248, 250, 252, 0.1) 25%, rgba(248, 250, 252, 0.6) 70%, #f8fafc 100%),
              linear-gradient(180deg, rgba(248, 250, 252, 0.5) 0%, transparent 20%, transparent 70%, #f8fafc 100%)
            `
            : `
              radial-gradient(circle at 50% 35%, rgba(3, 7, 18, 0) 30%, rgba(3, 7, 18, 0.45) 70%, #030712 100%),
              linear-gradient(180deg, rgba(3, 7, 18, 0.45) 0%, transparent 20%, transparent 70%, #030712 100%)
            `
        }}
      />

      {/* 4. Modern Subtle Ambient Dot Grid */}
      <div
        className="modern-grid-bg"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5
        }}
      />
    </div>
  );
}
