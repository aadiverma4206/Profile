import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Layers, Cpu, Database, Terminal, Check } from 'lucide-react';
import { soundFx } from '../../utils/audioEffects';

export default function SkillsSection() {
  const { skills } = portfolioData;
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const getCategoryIcon = (name) => {
    switch (name) {
      case 'Frontend & 3D Matrix':
        return <Layers size={20} color="#00d2ff" />;
      case 'Backend & Systems Engine':
        return <Cpu size={20} color="#3b82f6" />;
      case 'Databases & Data Storage':
        return <Database size={20} color="#f59e0b" />;
      default:
        return <Terminal size={20} color="#10b981" />;
    }
  };

  return (
    <section
      id="skills"
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
            04 // EXPERTISE & TOOLS
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              color: '#ffffff',
              fontWeight: 800,
              letterSpacing: '-0.02em'
            }}
          >
            Technical <span className="gradient-text-cyan">Arsenal</span>
          </h2>
        </div>

        {/* 4-Column Modern Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '24px'
          }}
        >
          {skills.map((group) => (
            <div
              key={group.category}
              className="modern-card"
              style={{
                borderRadius: '24px',
                padding: '28px'
              }}
            >
              {/* Category Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '22px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '16px'
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {getCategoryIcon(group.category)}
                </div>

                <h3
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '15px',
                    color: '#ffffff',
                    fontWeight: 700
                  }}
                >
                  {group.category}
                </h3>
              </div>

              {/* Skill Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {group.items.map((sk) => {
                  const isHovered = hoveredSkill === sk.name;
                  return (
                    <div
                      key={sk.name}
                      onMouseEnter={() => {
                        soundFx.playHover();
                        setHoveredSkill(sk.name);
                      }}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{ cursor: 'pointer' }}
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
                            fontSize: '13.5px',
                            fontWeight: 500,
                            color: isHovered ? '#00d2ff' : '#cbd5e1',
                            transition: 'color 0.2s ease'
                          }}
                        >
                          {sk.name}
                        </span>
                        <span
                          style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '11px',
                            color: isHovered ? '#ffffff' : '#94a3b8'
                          }}
                        >
                          {sk.level}%
                        </span>
                      </div>

                      {/* Clean Modern Progress Bar */}
                      <div
                        style={{
                          width: '100%',
                          height: '5px',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          borderRadius: '9999px',
                          overflow: 'hidden'
                        }}
                      >
                        <div
                          style={{
                            width: `${sk.level}%`,
                            height: '100%',
                            background: `linear-gradient(90deg, ${group.color} 0%, #ffffff 100%)`,
                            borderRadius: '9999px',
                            boxShadow: `0 0 10px ${group.color}`,
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
