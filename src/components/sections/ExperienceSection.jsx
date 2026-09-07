import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Briefcase, Calendar, MapPin, ArrowUpRight, CheckCircle } from 'lucide-react';
import { soundFx } from '../../utils/audioEffects';

export default function ExperienceSection() {
  const { experiences } = portfolioData;
  const [activeExpId, setActiveExpId] = useState(experiences[0]?.id);

  const activeExp = experiences.find((e) => e.id === activeExpId) || experiences[0];

  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        padding: '100px 24px',
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
        <div style={{ marginBottom: '48px' }}>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12px',
              color: '#00d2ff',
              fontWeight: 600,
              letterSpacing: '1px',
              marginBottom: '10px'
            }}
          >
            02 // WORK & ROLES
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              color: '#ffffff',
              fontWeight: 800,
              letterSpacing: '-0.02em'
            }}
          >
            Professional <span className="gradient-text-cyan">Experience</span>
          </h2>
        </div>

        {/* Master-Detail Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '32px',
            alignItems: 'start'
          }}
        >
          {/* Experience List Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {experiences.map((exp, idx) => {
              const isSelected = exp.id === activeExpId;
              return (
                <div
                  key={exp.id}
                  onClick={() => {
                    soundFx.playChirp(750 + idx * 50);
                    setActiveExpId(exp.id);
                  }}
                  className="modern-card"
                  style={{
                    padding: '20px 24px',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    borderColor: isSelected ? 'rgba(0, 210, 255, 0.45)' : 'rgba(255, 255, 255, 0.08)',
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(0, 210, 255, 0.12) 0%, rgba(13, 19, 36, 0.8) 100%)'
                      : 'rgba(13, 19, 36, 0.5)',
                    boxShadow: isSelected ? '0 20px 40px -10px rgba(0, 210, 255, 0.2)' : 'none'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '6px'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11px',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: 600,
                        color: isSelected ? '#00d2ff' : '#94a3b8'
                      }}
                    >
                      ROLE 0{idx + 1}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontFamily: 'JetBrains Mono, monospace',
                        color: '#94a3b8',
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '2px 8px',
                        borderRadius: '9999px'
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '4px'
                    }}
                  >
                    {exp.role}
                  </h3>

                  <div
                    style={{
                      fontSize: '13.5px',
                      color: isSelected ? '#38bdf8' : '#94a3b8',
                      fontWeight: 500
                    }}
                  >
                    {exp.company}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Experience Detailed Card */}
          <div
            className="modern-card"
            style={{
              padding: '36px',
              borderRadius: '24px',
              minHeight: '440px'
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '24px',
                marginBottom: '28px'
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 600,
                    color: '#00d2ff',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  {activeExp.tag}
                </span>
                <h3
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '1.6rem',
                    color: '#ffffff',
                    fontWeight: 800,
                    marginTop: '6px'
                  }}
                >
                  {activeExp.role}
                </h3>
                <div
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: '#38bdf8',
                    marginTop: '2px'
                  }}
                >
                  {activeExp.company}
                </div>
              </div>

              <div
                style={{
                  fontSize: '13px',
                  color: '#94a3b8',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={15} color="#00d2ff" />
                  <span>{activeExp.period}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={15} color="#a855f7" />
                  <span>{activeExp.location}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: '#e2e8f0',
                marginBottom: '28px'
              }}
            >
              {activeExp.description}
            </p>

            {/* Highlights */}
            <div style={{ marginBottom: '32px' }}>
              <div
                style={{
                  fontSize: '13px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 600,
                  color: '#00d2ff',
                  letterSpacing: '1px',
                  marginBottom: '16px'
                }}
              >
                KEY IMPACT &amp; ARCHITECTURAL CONTRIBUTIONS
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {activeExp.highlights.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      fontSize: '0.98rem',
                      lineHeight: 1.6,
                      color: '#cbd5e1'
                    }}
                  >
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#00d2ff',
                        boxShadow: '0 0 8px #00d2ff',
                        marginTop: '9px',
                        flexShrink: 0
                      }}
                    />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#94a3b8',
                  letterSpacing: '1px',
                  marginBottom: '12px'
                }}
              >
                TECH APPLIED:
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {activeExp.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: '12px',
                      fontFamily: 'JetBrains Mono, monospace',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#e2e8f0',
                      padding: '5px 12px',
                      borderRadius: '9999px'
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
