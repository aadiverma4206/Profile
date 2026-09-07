import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Download, Menu, X, Sun, Moon } from 'lucide-react';
import { soundFx } from '../../utils/audioEffects';

export default function Navbar({ onSoundToggle, soundActive, theme = 'dark', onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Overview', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (idx) => {
    soundFx.playChirp(700 + idx * 40);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: '18px',
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 20px',
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1140px',
          background: 'var(--bg-surface)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '9999px',
          padding: '8px 18px',
          boxShadow: 'var(--card-shadow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'auto',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={() => soundFx.playChirp(900)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'var(--text-primary)'
          }}
        >
          {/* Arc Pulse Badge */}
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #00d2ff 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(0, 210, 255, 0.6)'
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                boxShadow: '0 0 8px #ffffff'
              }}
            />
          </div>

          <div>
            <div
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Aditya Kumar
              <span
                style={{
                  fontSize: '9px',
                  fontFamily: 'JetBrains Mono, monospace',
                  padding: '1px 6px',
                  backgroundColor: 'rgba(0, 210, 255, 0.15)',
                  border: '1px solid rgba(0, 210, 255, 0.3)',
                  color: 'var(--brand-cyan)',
                  borderRadius: '9999px',
                  fontWeight: 600
                }}
              >
                PROT-01
              </span>
            </div>
          </div>
        </a>

        {/* Center Desktop Navigation Pill */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            border: '1px solid var(--border-subtle)',
            padding: '4px 8px',
            borderRadius: '9999px'
          }}
          className="desktop-nav"
        >
          {navItems.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => handleNavClick(idx)}
              style={{
                textDecoration: 'none',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                padding: '6px 14px',
                borderRadius: '9999px',
                transition: 'all 0.2s ease'
              }}
              className="modern-nav-link"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleTheme}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '9999px',
              padding: '7px 11px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              transition: 'all 0.2s ease'
            }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={15} color="#f59e0b" /> : <Moon size={15} color="#4f46e5" />}
          </button>

          {/* Audio Toggle */}
          <button
            onClick={() => {
              const active = soundFx.toggle();
              if (onSoundToggle) onSoundToggle(active);
            }}
            style={{
              background: soundActive ? 'rgba(0, 210, 255, 0.15)' : 'var(--bg-surface)',
              border: `1px solid ${soundActive ? 'rgba(0, 210, 255, 0.5)' : 'var(--border-subtle)'}`,
              borderRadius: '9999px',
              padding: '7px 11px',
              color: soundActive ? 'var(--brand-cyan)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontFamily: 'JetBrains Mono, monospace',
              transition: 'all 0.2s ease'
            }}
            title="Toggle Sound FX"
          >
            {soundActive ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>

          {/* Download Resume Button */}
          <a
            href="/assets/Aditya_Kumar_Resume.pdf"
            download="Aditya_Kumar_Resume.pdf"
            onClick={() => soundFx.playLaser()}
            className="modern-btn-primary"
            style={{
              padding: '7px 16px',
              fontSize: '12.5px'
            }}
          >
            <Download size={13} />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              soundFx.playChirp(800);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            style={{
              display: 'flex',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '9999px',
              padding: '7px 10px',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '70px',
            left: '20px',
            right: '20px',
            background: 'var(--bg-surface)',
            backdropFilter: 'blur(30px)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '24px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: 'var(--card-shadow)',
            pointerEvents: 'auto',
            animation: 'fadeIn 0.25s ease-out'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {navItems.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(idx)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(0, 0, 0, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: 'Plus Jakarta Sans, sans-serif'
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        .modern-nav-link:hover {
          color: var(--brand-cyan) !important;
          background: rgba(0, 210, 255, 0.08);
        }
      `}</style>
    </header>
  );
}
