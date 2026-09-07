import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Mail, Phone, MapPin, Send, Check, Copy, MessageSquare, ArrowRight } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import confetti from 'canvas-confetti';
import { soundFx } from '../../utils/audioEffects';

export default function ContactSection({ theme = 'light' }) {
  const { personal } = portfolioData;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('IDLE'); // 'IDLE' | 'SENDING' | 'SENT'
  const isLight = theme === 'light';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    soundFx.playChirp(750);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personal.phone);
    soundFx.playChirp(750);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFx.playPulse();
    setStatus('SENDING');

    setTimeout(() => {
      setStatus('SENT');
      soundFx.playChirp(800);
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563eb', '#0284c7', '#10b981', '#ffffff']
        });
      } catch {
        // Fallback if confetti blocked
      }

      const mailtoLink = `mailto:${personal.email}?subject=${encodeURIComponent(
        formData.subject || 'Portfolio Inquiry'
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
      )}`;
      window.open(mailtoLink, '_blank');
    }, 800);
  };

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        padding: '100px 20px 120px',
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
            05 // DIRECT CONTACT
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.1rem, 3.8vw, 3rem)',
              color: 'var(--text-primary)',
              fontWeight: 800,
              letterSpacing: '-0.025em'
            }}
          >
            Let’s Build Something <span className="gradient-text-cyan">Exceptional</span>
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
          {/* Left Column: Direct Communication Channels */}
          <div
            className="modern-card"
            style={{
              padding: 'clamp(24px, 3.5vw, 36px)',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px'
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '1.4rem',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  marginBottom: '10px'
                }}
              >
                Get in Touch
              </h3>

              <p
                style={{
                  fontSize: '0.96rem',
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  marginBottom: '24px'
                }}
              >
                I am actively considering high-impact technical leadership, full-stack architecture, and 3D WebGL engineering roles. Reach out via email, phone, or send a direct message.
              </p>

              {/* Direct Channel Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Email Card */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '16px',
                    background: isLight ? 'rgba(241, 245, 249, 0.7)' : 'rgba(30, 41, 59, 0.45)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: isLight ? 'rgba(37, 99, 235, 0.1)' : 'rgba(0, 210, 255, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--brand-blue)'
                      }}
                    >
                      <Mail size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                        EMAIL ADDRESS
                      </div>
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {personal.email}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '9999px',
                      background: copiedEmail ? '#10b981' : isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid var(--border-medium)',
                      color: copiedEmail ? '#ffffff' : 'var(--text-primary)',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.2s ease'
                    }}
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Phone Card */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '16px',
                    background: isLight ? 'rgba(241, 245, 249, 0.7)' : 'rgba(30, 41, 59, 0.45)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: isLight ? 'rgba(37, 99, 235, 0.1)' : 'rgba(0, 210, 255, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--brand-blue)'
                      }}
                    >
                      <Phone size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                        PHONE / WHATSAPP
                      </div>
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {personal.phone}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyPhone}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '9999px',
                      background: copiedPhone ? '#10b981' : isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid var(--border-medium)',
                      color: copiedPhone ? '#ffffff' : 'var(--text-primary)',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.2s ease'
                    }}
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Location Card */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 16px',
                    borderRadius: '16px',
                    background: isLight ? 'rgba(241, 245, 249, 0.7)' : 'rgba(30, 41, 59, 0.45)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: isLight ? 'rgba(37, 99, 235, 0.1)' : 'rgba(0, 210, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--brand-blue)'
                    }}
                  >
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                      LOCATION
                    </div>
                    <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {personal.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* GitHub Profile Link */}
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playChirp(700)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                borderRadius: '16px',
                border: '1px solid var(--border-medium)',
                background: isLight ? '#ffffff' : 'rgba(15, 23, 42, 0.6)',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <GithubIcon size={18} color="var(--brand-blue)" />
                <span style={{ fontSize: '13.5px', fontWeight: 600 }}>github.com/{personal.githubUsername}</span>
              </div>
              <ArrowRight size={15} color="var(--brand-blue)" />
            </a>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div
            className="modern-card"
            style={{
              padding: 'clamp(24px, 3.5vw, 36px)',
              borderRadius: '24px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <MessageSquare size={18} color="var(--brand-blue)" />
              <h3
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '1.35rem',
                  color: 'var(--text-primary)',
                  fontWeight: 700
                }}
              >
                Send a Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    marginBottom: '6px'
                  }}
                >
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="modern-input"
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    marginBottom: '6px'
                  }}
                >
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  placeholder="rahul@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="modern-input"
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    marginBottom: '6px'
                  }}
                >
                  SUBJECT
                </label>
                <input
                  type="text"
                  placeholder="Project Inquiry / Job Opportunity"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="modern-input"
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    marginBottom: '6px'
                  }}
                >
                  MESSAGE *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your architectural requirements, project scope, or opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="modern-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'SENDING'}
                className="modern-btn-primary"
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  marginTop: '8px',
                  fontSize: '14px'
                }}
              >
                {status === 'SENDING' ? (
                  <span>Sending Message...</span>
                ) : status === 'SENT' ? (
                  <>
                    <Check size={16} />
                    <span>Message Dispatched!</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>

              {status === 'SENT' && (
                <div
                  style={{
                    textAlign: 'center',
                    fontSize: '12.5px',
                    color: '#10b981',
                    fontWeight: 600,
                    marginTop: '4px'
                  }}
                >
                  Thank you! Your email client has been opened, and the message is queued.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
