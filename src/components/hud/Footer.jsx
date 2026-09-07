import React from 'react';
import { ArrowUp } from 'lucide-react';
import { soundFx } from '../../utils/audioEffects';

export default function Footer() {
  const scrollToTop = () => {
    soundFx.playLaser();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '40px 24px',
        position: 'relative',
        zIndex: 10,
        background: 'rgba(3, 7, 18, 0.85)',
        backdropFilter: 'blur(20px)'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px'
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '15px',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '4px'
            }}
          >
            Aditya Kumar
          </div>
          <div
            style={{
              fontSize: '13px',
              color: '#94a3b8'
            }}
          >
            Designed &amp; Developed with React 19, Three.js &amp; Modern Web Standards.
          </div>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="modern-btn-secondary"
          style={{
            padding: '10px 20px',
            fontSize: '12.5px'
          }}
        >
          <span>Back to Top</span>
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}
