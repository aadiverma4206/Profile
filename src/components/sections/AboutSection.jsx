import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Award, GraduationCap, Cpu, CheckCircle2, ShieldCheck, Code2, Globe2 } from 'lucide-react';

export default function AboutSection({ theme = 'light' }) {
  const { education, certifications } = portfolioData;
  const isLight = theme === 'light';

  const pillars = [
    {
      icon: Code2,
      title: "Interactive 3D & WebGL",
      desc: "Crafting real-time WebGL engines, spatial product visualizers, and performant Three.js scenes with sub-16ms frame budgets."
    },
    {
      icon: Cpu,
      title: "Scalable Full Stack Architecture",
      desc: "Architecting decoupled microservices and event-driven backends with Node.js, Express, TypeScript, and high-concurrency SQL/NoSQL stores."
    },
    {
      icon: Globe2,
      title: "Cross-Platform Mobile Ecosystems",
      desc: "Building production Flutter applications with secure biometrics, offline caching, live WebSockets, and integrated payment gateways."
    },
    {
      icon: ShieldCheck,
      title: "Security & Enterprise Auditing",
      desc: "Implementing military-grade RBAC permissions, tamper-evident audit logs, JWT handshakes, and government-standard data protection."
    }
  ];

  return (
    <section
      id="about"
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
            01 // BACKGROUND & PHILOSOPHY
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.1rem, 3.8vw, 3rem)',
              color: 'var(--text-primary)',
              fontWeight: 800,
              letterSpacing: '-0.025em'
            }}
          >
            Full Stack <span className="gradient-text-cyan">Craftsmanship</span>
          </h2>
        </div>

        {/* 2-Column Responsive Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '28px'
          }}
        >
          {/* Left Column: Bio & Core Engineering Pillars */}
          <div
            className="modern-card"
            style={{
              padding: 'clamp(22px, 3.5vw, 36px)',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '16px',
                  color: 'var(--text-primary)',
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '18px',
                  fontWeight: 700
                }}
              >
                <Cpu size={20} color="var(--brand-blue)" />
                <span>Engineering Mindset</span>
              </div>

              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: 'var(--text-primary)',
                  marginBottom: '16px',
                  fontWeight: 500
                }}
              >
                I build digital systems at the convergence of <strong style={{ color: 'var(--brand-blue)' }}>interactive 3D graphics</strong> and resilient enterprise backend architecture. With hands-on experience in both government state centers and high-velocity private engineering firms, I specialize in high-throughput, latency-critical software.
              </p>

              <p
                style={{
                  fontSize: '0.94rem',
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)'
                }}
              >
                Whether it's building a 3D tactical stadium visualizer in Three.js &amp; React 19, an end-to-end digital gold trading app in Flutter, or a nationwide pharmaceutical supply chain verifier for the National Informatics Centre (NIC), I write clean, maintainable, and type-safe code.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px'
              }}
            >
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    style={{
                      padding: '16px',
                      borderRadius: '16px',
                      background: isLight ? 'rgba(241, 245, 249, 0.7)' : 'rgba(30, 41, 59, 0.45)',
                      border: '1px solid var(--border-subtle)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Icon size={16} color="var(--brand-blue)" />
                      <div
                        style={{
                          fontFamily: 'Syne, sans-serif',
                          fontSize: '13.5px',
                          fontWeight: 700,
                          color: 'var(--text-primary)'
                        }}
                      >
                        {p.title}
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {p.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Education & Verified Certifications */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Academic Credentials */}
            <div
              className="modern-card"
              style={{
                padding: 'clamp(20px, 3vw, 32px)',
                borderRadius: '24px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '20px',
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '17px',
                  fontWeight: 700,
                  color: 'var(--text-primary)'
                }}
              >
                <GraduationCap size={20} color="var(--brand-blue)" />
                <span>Academic Credentials</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    style={{
                      padding: '16px',
                      borderRadius: '16px',
                      background: isLight ? 'rgba(241, 245, 249, 0.65)' : 'rgba(30, 41, 59, 0.4)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        gap: '6px',
                        marginBottom: '4px'
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
                        {edu.degree}
                      </div>
                      <span
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '12px',
                          fontWeight: 700,
                          color: 'var(--brand-blue)',
                          backgroundColor: isLight ? 'rgba(37, 99, 235, 0.08)' : 'rgba(0, 210, 255, 0.12)',
                          padding: '2px 8px',
                          borderRadius: '9999px'
                        }}
                      >
                        {edu.score}
                      </span>
                    </div>

                    <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      {edu.institution}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
                      <span>{edu.period}</span>
                      <span>•</span>
                      <span style={{ color: '#10b981', fontWeight: 600 }}>{edu.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Certifications & Experience Badges */}
            <div
              className="modern-card"
              style={{
                padding: 'clamp(20px, 3vw, 32px)',
                borderRadius: '24px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '18px',
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '17px',
                  fontWeight: 700,
                  color: 'var(--text-primary)'
                }}
              >
                <Award size={20} color="#10b981" />
                <span>Verified Industry Experience</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                {certifications.map((c) => (
                  <div
                    key={c.title}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '14px',
                      background: isLight ? 'rgba(241, 245, 249, 0.65)' : 'rgba(30, 41, 59, 0.4)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px'
                    }}
                  >
                    <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {c.title}
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                        {c.issuer} • {c.duration}
                      </div>
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
