import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../../utils/audioEffects';

export default function ExperienceSection({ theme = 'light' }) {
  const { experiences } = portfolioData;
  const [activeExpId, setActiveExpId] = useState(experiences[0]?.id);

  const activeExp = experiences.find((e) => e.id === activeExpId) || experiences[0];
  const isLight = theme === 'light';

  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        padding: '100px 20px',
        backgroundColor: 'transparent'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Section Header */}
        <div style={{ marginBottom: '44px' }}>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12px',
              color: 'var(--brand-blue)',
              fontWeight: 600,
              letterSpacing: '1px',
              marginBottom: '8px'
            }}
          >
            02 // CAREER TIMELINE
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.1rem, 3.8vw, 3rem)',
              color: 'var(--text-primary)',
              fontWeight: 800,
              letterSpacing: '-0.025em'
            }}
          >
            Professional <span className="gradient-text-cyan">Experience</span>
          </h2>
        </div>

        {/* Master-Detail Responsive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '28px',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Role Selector Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {experiences.map((exp) => {
              const isSelected = exp.id === activeExpId;
              return (
                <div
                  key={exp.id}
                  onClick={() => {
                    soundFx.playChirp(680);
                    setActiveExpId(exp.id);
                  }}
                  className="modern-card"
                  style={{
                    padding: '18px 20px',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    borderColor: isSelected ? 'var(--brand-blue)' : 'var(--border-subtle)',
                    background: isSelected
                      ? isLight
                        ? 'rgba(37, 99, 235, 0.08)'
                        : 'rgba(0, 210, 255, 0.12)'
                      : 'var(--bg-surface)',
                    boxShadow: isSelected ? 'var(--card-shadow-hover)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '4px'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: 700,
                        color: isSelected ? 'var(--brand-blue)' : 'var(--text-muted)'
                      }}
                    >
                      {exp.tag}
                    </span>
                    <span
                      style={{
                        fontSize: '11.5px',
                        color: 'var(--text-muted)'
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: isSelected ? 'var(--brand-blue)' : 'var(--text-primary)',
                      marginBottom: '2px'
                    }}
                  >
                    {exp.role}
                  </div>

                  <div
                    style={{
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>{exp.company}</span>
                    <span>•</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{exp.location}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Role Detailed Dossier */}
          <div
            className="modern-card"
            style={{
              padding: 'clamp(24px, 3.5vw, 36px)',
              borderRadius: '24px'
            }}
          >
            {/* Role Header */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '18px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--border-subtle)'
              }}
            >
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 700,
                    backgroundColor: isLight ? 'rgba(37, 99, 235, 0.08)' : 'rgba(0, 210, 255, 0.12)',
                    color: 'var(--brand-blue)',
                    marginBottom: '8px'
                  }}
                >
                  {activeExp.tag}
                </span>

                <h3
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginBottom: '6px'
                  }}
                >
                  {activeExp.role}
                </h3>

                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--brand-blue)',
                    marginBottom: '8px'
                  }}
                >
                  {activeExp.company}
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '14px',
                    fontSize: '12.5px',
                    color: 'var(--text-muted)'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Calendar size={14} /> {activeExp.period}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <MapPin size={14} /> {activeExp.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '1.02rem',
                lineHeight: 1.65,
                color: 'var(--text-primary)',
                marginBottom: '20px',
                fontWeight: 500
              }}
            >
              {activeExp.description}
            </p>

            {/* Bullet Highlights */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.5px',
                  marginBottom: '12px'
                }}
              >
                KEY CONTRIBUTIONS &amp; ARCHITECTURAL IMPACT
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeExp.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px'
                    }}
                  >
                    <CheckCircle2
                      size={17}
                      color="#10b981"
                      style={{ flexShrink: 0, marginTop: '3px' }}
                    />
                    <span
                      style={{
                        fontSize: '0.94rem',
                        lineHeight: 1.6,
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.5px',
                  marginBottom: '10px'
                }}
              >
                TECHNOLOGY MATRIX
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {activeExp.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: 600,
                      backgroundColor: isLight ? 'rgba(241, 245, 249, 0.85)' : 'rgba(30, 41, 59, 0.6)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
