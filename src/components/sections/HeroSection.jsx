import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import NewElementCore from '../3d/NewElementCore';
import { soundFx } from '../../utils/audioEffects';
import { ArrowRight, Sparkles, CheckCircle2, MapPin, Image as ImageIcon } from 'lucide-react';

export default function HeroSection({ theme = 'light' }) {
  const { personal, stats } = portfolioData;
  const [useEditedPhoto, setUseEditedPhoto] = useState(false);

  const togglePhoto = () => {
    soundFx.playChirp(680);
    setUseEditedPhoto((p) => !p);
  };

  const isLight = theme === 'light';

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '130px',
        paddingBottom: '70px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 20px',
          width: '100%',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Top Status Capsule */}
        <div
          style={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '10px',
            background: isLight ? 'rgba(255, 255, 255, 0.85)' : 'rgba(15, 23, 42, 0.85)',
            border: '1px solid var(--border-medium)',
            backdropFilter: 'blur(16px)',
            padding: '6px 16px',
            borderRadius: '9999px',
            marginBottom: '28px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)'
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 10px #10b981'
            }}
          />
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}
          >
            AVAILABLE FOR HIGH-IMPACT ARCHITECTURE
          </span>
          <span style={{ color: 'var(--text-muted)' }}>•</span>
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11.5px',
              color: 'var(--brand-blue)',
              fontWeight: 600
            }}
          >
            M.Sc. IT (83.59% Distinction)
          </span>
        </div>

        {/* Main 2-Column Responsive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '32px',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Heading, Bio, CTAs, Metrics */}
          <div
            className="modern-card"
            style={{
              padding: 'clamp(24px, 4vw, 40px)',
              borderRadius: '24px'
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(2.3rem, 4.5vw, 3.8rem)',
                lineHeight: 1.15,
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '18px',
                letterSpacing: '-0.025em'
              }}
            >
              Engineering <br />
              <span className="gradient-text-cyan">
                Scalable Systems
              </span> <br />
              &amp; Immersive 3D Web.
            </h1>

            <p
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: 'clamp(0.98rem, 1.8vw, 1.12rem)',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                marginBottom: '30px'
              }}
            >
              Hi, I’m <strong style={{ color: 'var(--text-primary)' }}>{personal.name}</strong>. Full Stack Architect specializing in high-performance React 19, Three.js 3D WebGL tactical engines, Flutter mobile applications, and resilient cloud architectures.
            </p>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                marginBottom: '36px'
              }}
            >
              <a
                href="#projects"
                onClick={() => soundFx.playChirp(700)}
                className="modern-btn-primary"
              >
                <span>View Featured Work</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="#contact"
                onClick={() => soundFx.playChirp(600)}
                className="modern-btn-secondary"
              >
                <span>Get in Touch</span>
                <Sparkles size={15} color="var(--brand-blue)" />
              </a>
            </div>

            {/* Metrics Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px'
              }}
            >
              {stats.slice(0, 3).map((st) => (
                <div
                  key={st.label}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '16px',
                    background: isLight ? 'rgba(241, 245, 249, 0.7)' : 'rgba(30, 41, 59, 0.45)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                      marginBottom: '2px'
                    }}
                  >
                    {st.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '11px',
                      color: 'var(--brand-blue)',
                      fontWeight: 600
                    }}
                  >
                    {st.label}
                  </div>
                  <div
                    style={{
                      fontSize: '11.5px',
                      color: 'var(--text-muted)',
                      marginTop: '2px'
                    }}
                  >
                    {st.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Core Canvas & Professional Profile Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            {/* 3D WebGL Canvas Card */}
            <div
              className="modern-card"
              style={{
                width: '100%',
                minHeight: '410px',
                borderRadius: '24px',
                overflow: 'hidden',
                padding: '0'
              }}
            >
              <NewElementCore theme={theme} />
            </div>

            {/* Professional Developer Profile Card */}
            <div
              className="modern-card"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '16px',
                padding: '18px 22px',
                borderRadius: '20px'
              }}
            >
              {/* Photo Frame */}
              <div
                style={{
                  position: 'relative',
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid var(--border-highlight)',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
                  flexShrink: 0
                }}
              >
                <img
                  src={useEditedPhoto ? personal.avatarEdited : personal.avatarOriginal}
                  alt={personal.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Identity & Details */}
              <div style={{ flex: 1, minWidth: '180px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '2px'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: 'var(--text-primary)'
                    }}
                  >
                    {personal.name}
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono, monospace',
                      color: '#10b981',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontWeight: 600
                    }}
                  >
                    <CheckCircle2 size={13} /> Verified
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '12.5px',
                    color: 'var(--text-secondary)',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <MapPin size={12} color="var(--brand-blue)" />
                  <span>{personal.location}</span>
                </div>

                {/* Photo switch button */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    onClick={togglePhoto}
                    style={{
                      padding: '5px 12px',
                      fontSize: '11px',
                      borderRadius: '9999px',
                      background: isLight ? 'rgba(37, 99, 235, 0.08)' : 'rgba(0, 210, 255, 0.12)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--brand-blue)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontWeight: 600,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <ImageIcon size={12} />
                    <span>{useEditedPhoto ? 'Switch to Original' : 'Switch to Studio Portrait'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
