import { ArrowUp } from 'lucide-react';
import { soundFx } from '../../utils/audioEffects';

export default function Footer({ theme = 'light' }) {
  const scrollToTop = () => {
    soundFx.playChirp(720);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLight = theme === 'light';

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-medium)',
        padding: '40px 20px',
        position: 'relative',
        zIndex: 10,
        background: isLight ? 'rgba(255, 255, 255, 0.85)' : 'rgba(9, 13, 22, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
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
          gap: '20px'
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '15px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '4px'
            }}
          >
            Aditya Kumar
          </div>
          <div
            style={{
              fontSize: '13px',
              color: 'var(--text-secondary)'
            }}
          >
            Designed &amp; Engineered with React 19, Three.js 3D WebGL &amp; Modern Web Standards.
          </div>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="modern-btn-secondary"
          style={{
            padding: '9px 18px',
            fontSize: '12.5px',
            gap: '8px'
          }}
          aria-label="Back to top"
        >
          <span>Back to Top</span>
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}
