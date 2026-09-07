import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Layers, Cpu, Database, Terminal } from 'lucide-react';
import { soundFx } from '../../utils/audioEffects';

export default function SkillsSection({ theme = 'light' }) {
  const { skills } = portfolioData;
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const isLight = theme === 'light';

  const getCategoryIcon = (name) => {
    switch (name) {
      case 'Frontend & 3D WebGL':
        return <Layers size={18} color="var(--brand-blue)" />;
      case 'Backend & Systems':
        return <Cpu size={18} color="var(--brand-cyan)" />;
      case 'Databases & Storage':
        return <Database size={18} color="#d97706" />;
      default:
        return <Terminal size={18} color="#059669" />;
    }
  };

  return (
    <section
      id="skills"
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
            04 // CAPABILITIES & ARCHITECTURE
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.1rem, 3.8vw, 3rem)',
              color: 'var(--text-primary)',
              fontWeight: 800,
              letterSpacing: '-0.025em'
            }}
          >
            Technical <span className="gradient-text-cyan">Arsenal</span>
          </h2>
        </div>

        {/* 4-Column Responsive Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))',
            gap: '24px'
          }}
        >
          {skills.map((group) => (
            <div
              key={group.category}
              className="modern-card"
              style={{
                borderRadius: '24px',
                padding: '24px'
              }}
            >
              {/* Category Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '20px',
                  paddingBottom: '14px',
                  borderBottom: '1px solid var(--border-subtle)'
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    backgroundColor: isLight ? 'rgba(37, 99, 235, 0.08)' : 'rgba(0, 210, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {getCategoryIcon(group.category)}
                </div>

                <div
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '15.5px',
                    fontWeight: 700,
                    color: 'var(--text-primary)'
                  }}
                >
                  {group.category}
                </div>
              </div>

              {/* Skills List with Progress Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {group.items.map((skill) => {
                  const isHovered = hoveredSkill === skill.name;
                  return (
                    <div
                      key={skill.name}
                      onMouseEnter={() => {
                        soundFx.playHover();
                        setHoveredSkill(skill.name);
                      }}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{ cursor: 'default' }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '6px'
                        }}
                      >
                        <span
                          style={{
                            fontSize: '13px',
                            fontWeight: 600,
                            color: isHovered ? 'var(--brand-blue)' : 'var(--text-primary)',
                            transition: 'color 0.2s ease'
                          }}
                        >
                          {skill.name}
                        </span>
                        <span
                          style={{
                            fontSize: '11px',
                            fontFamily: 'JetBrains Mono, monospace',
                            color: 'var(--text-muted)',
                            fontWeight: 600
                          }}
                        >
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Track */}
                      <div
                        style={{
                          height: '6px',
                          borderRadius: '9999px',
                          backgroundColor: isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)',
                          overflow: 'hidden'
                        }}
                      >
                        <div
                          style={{
                            width: `${skill.level}%`,
                            height: '100%',
                            borderRadius: '9999px',
                            background: `linear-gradient(90deg, ${group.color} 0%, var(--brand-cyan) 100%)`,
                            transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
