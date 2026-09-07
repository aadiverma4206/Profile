import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { ExternalLink, ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { soundFx } from '../../utils/audioEffects';

const GithubIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function ProjectsSection() {
  const { projects } = portfolioData;
  const [filter, setFilter] = useState('ALL');

  const categories = ['ALL', '3D Graphics & Creative Web', 'Full Stack & 3D Web', 'Mobile & Fintech', 'GovTech & Security'];

  const filteredProjects =
    filter === 'ALL' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
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
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '24px',
            marginBottom: '48px'
          }}
        >
          <div>
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
              03 // SELECT WORK
            </div>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                color: '#ffffff',
                fontWeight: 800,
                letterSpacing: '-0.02em'
              }}
            >
              Featured <span className="gradient-text-cyan">Projects</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    soundFx.playChirp(700);
                    setFilter(cat);
                  }}
                  style={{
                    padding: '8px 16px',
                    fontSize: '12px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 600,
                    borderRadius: '9999px',
                    backgroundColor: active ? '#00d2ff' : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${active ? '#00d2ff' : 'rgba(255, 255, 255, 0.1)'}`,
                    color: active ? '#030712' : '#94a3b8',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '28px'
          }}
        >
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="modern-card"
              style={{
                borderRadius: '24px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '390px'
              }}
            >
              <div>
                {/* Category & Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '18px'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '11px',
                      color: '#00d2ff',
                      fontWeight: 600
                    }}
                  >
                    {proj.category}
                  </span>

                  <span
                    style={{
                      fontSize: '10px',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: 700,
                      color: '#f59e0b',
                      backgroundColor: 'rgba(245, 158, 11, 0.12)',
                      border: '1px solid rgba(245, 158, 11, 0.25)',
                      padding: '3px 10px',
                      borderRadius: '9999px'
                    }}
                  >
                    {proj.badge}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '1.4rem',
                    color: '#ffffff',
                    fontWeight: 700,
                    marginBottom: '6px'
                  }}
                >
                  {proj.title}
                </h3>

                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#38bdf8',
                    marginBottom: '16px'
                  }}
                >
                  {proj.subtitle}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.96rem',
                    lineHeight: 1.6,
                    color: '#94a3b8',
                    marginBottom: '24px'
                  }}
                >
                  {proj.description}
                </p>
              </div>

              <div>
                {/* Tech Pills */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '24px'
                  }}
                >
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '11px',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#cbd5e1',
                        padding: '4px 10px',
                        borderRadius: '9999px'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '20px'
                  }}
                >
                  <a
                    href="https://github.com/aadiverma4206"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFx.playLaser()}
                    className="modern-btn-secondary"
                    style={{
                      padding: '10px 18px',
                      fontSize: '13px',
                      flex: 1,
                      justifyContent: 'center'
                    }}
                  >
                    <GithubIcon size={15} />
                    <span>Code</span>
                  </a>

                  <a
                    href="#contact"
                    onClick={() => soundFx.playChirp(850)}
                    className="modern-btn-primary"
                    style={{
                      padding: '10px 18px',
                      fontSize: '13px',
                      flex: 1,
                      justifyContent: 'center'
                    }}
                  >
                    <span>Inquire</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
