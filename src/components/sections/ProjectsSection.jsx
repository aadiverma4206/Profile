import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { soundFx } from '../../utils/audioEffects';

export default function ProjectsSection({ theme = 'light' }) {
  const { projects } = portfolioData;
  const [filter, setFilter] = useState('ALL');

  const categories = ['ALL', 'Full Stack & 3D Web', 'Mobile & Fintech', 'GovTech & Security', '3D Graphics & Creative Web'];

  const filteredProjects =
    filter === 'ALL' ? projects : projects.filter((p) => p.category === filter);

  const isLight = theme === 'light';

  return (
    <section
      id="projects"
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
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '20px',
            marginBottom: '44px'
          }}
        >
          <div>
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
              03 // PRODUCTION SHOWCASE
            </div>
            <h2
              style={{
                fontSize: 'clamp(2.1rem, 3.8vw, 3rem)',
                color: 'var(--text-primary)',
                fontWeight: 800,
                letterSpacing: '-0.025em'
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
                    soundFx.playChirp(650);
                    setFilter(cat);
                  }}
                  style={{
                    padding: '8px 16px',
                    fontSize: '12px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 600,
                    borderRadius: '9999px',
                    backgroundColor: active
                      ? 'var(--brand-blue)'
                      : isLight
                      ? 'rgba(241, 245, 249, 0.85)'
                      : 'rgba(30, 41, 59, 0.6)',
                    border: `1px solid ${active ? 'var(--brand-blue)' : 'var(--border-subtle)'}`,
                    color: active ? '#ffffff' : 'var(--text-secondary)',
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

        {/* Projects Responsive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: '24px'
          }}
        >
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="modern-card"
              style={{
                borderRadius: '24px',
                padding: 'clamp(22px, 3vw, 32px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '20px'
              }}
            >
              <div>
                {/* Top Badge & Category */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '14px'
                  }}
                >
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      backgroundColor: isLight ? 'rgba(37, 99, 235, 0.08)' : 'rgba(0, 210, 255, 0.12)',
                      color: 'var(--brand-blue)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    {proj.badge}
                  </span>

                  <span
                    style={{
                      fontSize: '11.5px',
                      color: 'var(--text-muted)',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                  >
                    {proj.category}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '6px'
                  }}
                >
                  {proj.title}
                </h3>

                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--brand-blue)',
                    marginBottom: '14px'
                  }}
                >
                  {proj.subtitle}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.94rem',
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                    marginBottom: '20px'
                  }}
                >
                  {proj.description}
                </p>
              </div>

              {/* Bottom: Tech Tags & Action Links */}
              <div>
                {/* Tech Chips */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '20px'
                  }}
                >
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '11.5px',
                        fontFamily: 'JetBrains Mono, monospace',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        backgroundColor: isLight ? 'rgba(241, 245, 249, 0.85)' : 'rgba(30, 41, 59, 0.5)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a
                    href={portfolioData.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playChirp(700)}
                    className="modern-btn-secondary"
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      fontSize: '12.5px',
                      gap: '6px'
                    }}
                  >
                    <GithubIcon size={14} />
                    <span>Source Code</span>
                  </a>

                  <a
                    href="#contact"
                    onClick={() => soundFx.playChirp(650)}
                    className="modern-btn-primary"
                    style={{
                      padding: '10px 18px',
                      fontSize: '12.5px',
                      gap: '6px'
                    }}
                  >
                    <span>Inspect</span>
                    <ArrowUpRight size={14} />
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
