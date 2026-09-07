import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import NewElementCore from '../3d/NewElementCore';
import { soundFx } from '../../utils/audioEffects';
import { ArrowRight, Sparkles, Terminal, Image as ImageIcon, CheckCircle2, Shield } from 'lucide-react';

export default function HeroSection({
  onPulseTriggered,
  useEditedPhoto = true,
  onTogglePhoto,
  backdropIntensity = 'vivid',
  onChangeIntensity
}) {
  const { personal, stats } = portfolioData;
  const [photoScanning, setPhotoScanning] = useState(false);

  const togglePhotoStyle = () => {
    soundFx.playChirp(820);
    setPhotoScanning(true);
    setTimeout(() => {
      if (onTogglePhoto) onTogglePhoto();
      setPhotoScanning(false);
    }, 280);
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '120px',
        paddingBottom: '80px',
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
          padding: '0 24px',
          width: '100%',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Top Status Capsule */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(20px)',
            padding: '6px 16px',
            borderRadius: '9999px',
            marginBottom: '32px'
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
              fontWeight: 500,
              color: '#e2e8f0'
            }}
          >
            AVAILABLE FOR HIGH-IMPACT ARCHITECTURE
          </span>
          <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              color: '#00d2ff'
            }}
          >
            M.Sc. IT (83.59%)
          </span>
        </div>

        {/* Main 2-Column Hero Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Typography & CTAs */}
          <div
            className="modern-card"
            style={{
              maxWidth: '620px',
              padding: '36px',
              borderRadius: '24px'
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
                lineHeight: 1.15,
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '20px',
                letterSpacing: '-0.02em'
              }}
            >
              Engineering <br />
              <span className="gradient-text-cyan">
                Immersive 3D
              </span> <br />
              &amp; Scalable Systems.
            </h1>

            <p
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                marginBottom: '32px',
                fontWeight: 400
              }}
            >
              Hi, I’m <strong style={{ color: 'var(--text-primary)' }}>Aditya Kumar</strong>. Full Stack Architect specializing in high-performance React 19, Three.js 3D WebGL tactical engines, Flutter mobile applications, and resilient enterprise backends.
            </p>

            {/* Modern Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '40px'
              }}
            >
              <a
                href="#projects"
                onClick={() => soundFx.playLaser()}
                className="modern-btn-primary"
              >
                <span>Explore Projects</span>
                <ArrowRight size={17} />
              </a>

              <a
                href="#contact"
                onClick={() => soundFx.playChirp(800)}
                className="modern-btn-secondary"
              >
                <span>Get in Touch</span>
                <Sparkles size={16} color="#00d2ff" />
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '14px'
              }}
            >
              {stats.slice(0, 3).map((st) => (
                <div
                  key={st.label}
                  className="modern-card"
                  style={{
                    padding: '16px 20px',
                    borderRadius: '16px'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                      marginBottom: '4px'
                    }}
                  >
                    {st.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '11px',
                      color: 'var(--brand-cyan)',
                      fontWeight: 500
                    }}
                  >
                    {st.label}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-tertiary)',
                      marginTop: '2px'
                    }}
                  >
                    {st.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Photorealistic 3D Element & Floating Glass Portrait Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            {/* 3D New Element Canvas */}
            <div
              className="modern-card"
              style={{
                width: '100%',
                minHeight: '430px',
                borderRadius: '24px',
                overflow: 'hidden'
              }}
            >
              <NewElementCore onPulseTriggered={onPulseTriggered} />
            </div>

            {/* Floating Glassmorphic Portrait Pill Card */}
            <div
              className="modern-card"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 20px',
                borderRadius: '20px'
              }}
            >
              {/* Image Preview with Glowing Ring */}
              <div
                style={{
                  position: 'relative',
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid rgba(0, 210, 255, 0.6)',
                  boxShadow: '0 0 20px rgba(0, 210, 255, 0.35)',
                  flexShrink: 0
                }}
              >
                <img
                  src={useEditedPhoto ? personal.avatarEdited : personal.avatarOriginal}
                  alt="Aditya Kumar"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Identity Details */}
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
                      fontSize: '15px',
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
                      gap: '4px'
                    }}
                  >
                    <CheckCircle2 size={12} /> Verified
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    marginBottom: '8px'
                  }}
                >
                  M.Sc. IT (PRSU) • Botivate Services LLP
                </div>

                {/* Photo Toggle & Visibility Buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                  <button
                    onClick={togglePhotoStyle}
                    style={{
                      padding: '5px 12px',
                      fontSize: '11px',
                      borderRadius: '9999px',
                      background: 'rgba(0, 210, 255, 0.12)',
                      border: '1px solid rgba(0, 210, 255, 0.35)',
                      color: '#00d2ff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontWeight: 600
                    }}
                  >
                    <ImageIcon size={12} />
                    <span>{useEditedPhoto ? 'View Raw Photo' : 'View Stark Hologram'}</span>
                  </button>

                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[
                      { id: 'cinematic', label: 'Ultra' },
                      { id: 'vivid', label: 'Vivid' },
                      { id: 'normal', label: 'Soft' }
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        onClick={() => {
                          soundFx.playChirp(750);
                          if (onChangeIntensity) onChangeIntensity(lvl.id);
                        }}
                        style={{
                          padding: '4px 8px',
                          fontSize: '10px',
                          borderRadius: '6px',
                          background:
                            backdropIntensity === lvl.id
                              ? 'rgba(255, 255, 255, 0.2)'
                              : 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: backdropIntensity === lvl.id ? '#ffffff' : '#94a3b8',
                          cursor: 'pointer'
                        }}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
