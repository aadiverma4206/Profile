import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Award, GraduationCap, Cpu, CheckCircle2, ShieldCheck } from 'lucide-react';
import { soundFx } from '../../utils/audioEffects';

export default function AboutSection() {
  const { personal, education, certifications } = portfolioData;

  return (
    <section
      id="about"
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
            01 // BACKGROUND & IDENTITY
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              color: '#ffffff',
              fontWeight: 800,
              letterSpacing: '-0.02em'
            }}
          >
            Full Stack <span className="gradient-text-cyan">Craftsmanship</span>
          </h2>
        </div>

        {/* 2-Column Modern Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '32px'
          }}
        >
          {/* Left Column: Bio Card */}
          <div
            className="modern-card"
            style={{
              padding: '36px',
              borderRadius: '24px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
                color: '#ffffff',
                fontFamily: 'Syne, sans-serif',
                fontSize: '18px',
                fontWeight: 700
              }}
            >
              <Cpu size={22} color="#00d2ff" />
              <span>Architectural Philosophy</span>
            </div>

            <p
              style={{
                fontSize: '1.02rem',
                lineHeight: 1.7,
                color: '#e2e8f0',
                marginBottom: '20px'
              }}
            >
              I build web and mobile systems at the intersection of <strong style={{ color: '#00d2ff' }}>photorealistic 3D interaction</strong> and bulletproof enterprise backend design. With hands-on experience across both government state centres and fast-moving private software companies, I focus on delivering scalable, latency-optimized solutions.
            </p>

            <p
              style={{
                fontSize: '0.96rem',
                lineHeight: 1.7,
                color: '#94a3b8',
                marginBottom: '32px'
              }}
            >
              From engineering real-time pharmaceutical drug tracking infrastructure for the National Informatics Centre (NIC) to developing interactive 3D tactical football simulators and live bullion trading platforms at Botivate Services LLP, quality and user delight remain paramount.
            </p>

            {/* Competency Pills */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px'
              }}
            >
              {[
                'React 19 & Three.js (WebGL)',
                'Production Flutter Ecosystems',
                'Enterprise REST APIs & JWT/RBAC',
                'Real-Time WebSockets & Socket.IO',
                'SQL & Scalable Cloud DBs',
                'AI-Assisted Fast Prototyping'
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '13.5px',
                    fontWeight: 500,
                    color: '#cbd5e1'
                  }}
                >
                  <CheckCircle2 size={16} color="#00d2ff" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education & Accreditations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Education Card */}
            <div
              className="modern-card"
              style={{
                padding: '32px',
                borderRadius: '24px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '22px',
                  color: '#ffffff',
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '17px',
                  fontWeight: 700
                }}
              >
                <GraduationCap size={20} color="#00d2ff" />
                <span>Academic Credentials</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    style={{
                      borderLeft: '2px solid rgba(0, 210, 255, 0.4)',
                      paddingLeft: '16px'
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
                      <h4
                        style={{
                          fontSize: '15px',
                          color: '#ffffff',
                          fontWeight: 700
                        }}
                      >
                        {edu.degree}
                      </h4>
                      <span
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#00d2ff',
                          backgroundColor: 'rgba(0, 210, 255, 0.12)',
                          padding: '3px 10px',
                          borderRadius: '9999px'
                        }}
                      >
                        {edu.score}
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: '13.5px',
                        fontWeight: 600,
                        color: '#38bdf8',
                        marginBottom: '4px'
                      }}
                    >
                      {edu.institution} ({edu.period})
                    </div>

                    <div
                      style={{
                        fontSize: '12.5px',
                        color: '#94a3b8'
                      }}
                    >
                      {edu.focus}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Card */}
            <div
              className="modern-card"
              style={{
                padding: '28px',
                borderRadius: '24px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '18px',
                  color: '#ffffff',
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '17px',
                  fontWeight: 700
                }}
              >
                <Award size={20} color="#f59e0b" />
                <span>Industry Accreditations</span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '12px'
                }}
              >
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '14px',
                      borderRadius: '14px'
                    }}
                  >
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#ffffff',
                        marginBottom: '4px'
                      }}
                    >
                      {cert.title}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: '#94a3b8',
                        fontFamily: 'JetBrains Mono, monospace'
                      }}
                    >
                      {cert.duration} • {cert.issuer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
