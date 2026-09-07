import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Download, Menu, X, Sun, Moon } from 'lucide-react';
import { soundFx } from '../../utils/audioEffects';

export default function Navbar({ onSoundToggle, soundActive, theme = 'light', onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Overview', href: '#hero', id: 'hero' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  const handleNavClick = () => {
    soundFx.playChirp(650);
    setMobileMenuOpen(false);
  };

  const isLight = theme === 'light';

  return (
    <header
      style={{
        position: 'fixed',
        top: '16px',
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1120px',
          background: scrolled
            ? 'var(--bg-surface)'
            : isLight
            ? 'rgba(255, 255, 255, 0.85)'
            : 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid var(--border-medium)',
          borderRadius: '9999px',
          padding: '8px 16px',
          boxShadow: scrolled ? 'var(--card-shadow)' : '0 4px 20px rgba(0, 0, 0, 0.05)',
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
          onClick={() => soundFx.playChirp(700)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'var(--text-primary)'
          }}
        >
          {/* Stylized Node Avatar */}
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--brand-blue) 0%, var(--brand-cyan) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(37, 99, 235, 0.35)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '13px',
              fontFamily: 'Syne, sans-serif'
            }}
          >
            AK
          </div>

          <div>
            <div
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '14.5px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Aditya Kumar
              <span
                style={{
                  fontSize: '9.5px',
                  fontFamily: 'JetBrains Mono, monospace',
                  padding: '2px 7px',
                  backgroundColor: isLight ? 'rgba(37, 99, 235, 0.08)' : 'rgba(0, 210, 255, 0.12)',
                  border: `1px solid ${isLight ? 'rgba(37, 99, 235, 0.2)' : 'rgba(0, 210, 255, 0.3)'}`,
                  color: isLight ? 'var(--brand-blue)' : 'var(--brand-cyan)',
                  borderRadius: '9999px',
                  fontWeight: 600
                }}
              >
                ARCHITECT
              </span>
            </div>
          </div>
        </a>

        {/* Center Desktop Navigation Pill */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: isLight ? 'rgba(241, 245, 249, 0.7)' : 'rgba(30, 41, 59, 0.5)',
            border: '1px solid var(--border-subtle)',
            padding: '3px 6px',
            borderRadius: '9999px'
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={handleNavClick}
                style={{
                  textDecoration: 'none',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--brand-blue)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--bg-surface-elevated)' : 'transparent',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  boxShadow: isActive ? '0 2px 8px rgba(0, 0, 0, 0.06)' : 'none',
                  transition: 'all 0.2s ease'
                }}
                className="nav-link-pill"
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleTheme}
            style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-medium)',
              borderRadius: '9999px',
              padding: '7px 11px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.2s ease'
            }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun size={15} color="#f59e0b" />
            ) : (
              <Moon size={15} color="#2563eb" />
            )}
          </button>

          {/* Audio Toggle (Optional feedback) */}
          <button
            onClick={() => {
              const active = soundFx.toggle();
              if (onSoundToggle) onSoundToggle(active);
            }}
            style={{
              background: soundActive
                ? isLight
                  ? 'rgba(37, 99, 235, 0.1)'
                  : 'rgba(0, 210, 255, 0.15)'
                : 'var(--bg-surface-elevated)',
              border: `1px solid ${
                soundActive
                  ? isLight
                    ? 'rgba(37, 99, 235, 0.4)'
                    : 'rgba(0, 210, 255, 0.4)'
                  : 'var(--border-medium)'
              }`,
              borderRadius: '9999px',
              padding: '7px 11px',
              color: soundActive ? 'var(--brand-blue)' : 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              fontSize: '12px',
              transition: 'all 0.2s ease'
            }}
            title={soundActive ? 'Sound Feedback: ON' : 'Sound Feedback: OFF'}
            aria-label="Toggle Sound Feedback"
          >
            {soundActive ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>

          {/* Download Resume Button */}
          <a
            href="/assets/Aditya_Kumar_Resume.pdf"
            download="Aditya_Kumar_Resume.pdf"
            onClick={() => soundFx.playChirp(700)}
            className="modern-btn-primary"
            style={{
              padding: '7px 15px',
              fontSize: '12px',
              gap: '6px'
            }}
          >
            <Download size={13} />
            <span className="resume-btn-text">Resume</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              soundFx.playChirp(650);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            style={{
              display: 'flex',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-medium)',
              borderRadius: '9999px',
              padding: '7px 9px',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
            className="mobile-menu-btn"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '64px',
            left: '16px',
            right: '16px',
            background: 'var(--bg-surface)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid var(--border-medium)',
            borderRadius: '20px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxShadow: 'var(--card-shadow)',
            pointerEvents: 'auto'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: isActive ? 'var(--bg-surface-subtle)' : 'transparent',
                    border: `1px solid ${isActive ? 'var(--border-highlight)' : 'var(--border-subtle)'}`,
                    color: isActive ? 'var(--brand-blue)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    textAlign: 'center'
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 480px) {
          .resume-btn-text { display: none; }
        }
        .nav-link-pill:hover {
          color: var(--brand-blue) !important;
        }
      `}</style>
    </header>
  );
}
