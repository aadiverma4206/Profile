import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Mail, Phone, MapPin, Send, Check, Copy, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../../utils/audioEffects';

const GithubIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function ContactSection() {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('IDLE');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    soundFx.playChirp(900);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFx.playPulse();
    setStatus('TRANSMITTING');

    setTimeout(() => {
      setStatus('TRANSMITTED');
      soundFx.playLaser();
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#00d2ff', '#3b82f6', '#10b981', '#ffffff']
      });

      const mailtoLink = `mailto:${personal.email}?subject=${encodeURIComponent(
        formData.subject || 'Portfolio Inquiry'
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
      )}`;
      window.open(mailtoLink, '_blank');
    }, 900);
  };

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        padding: '100px 24px 130px',
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
            05 // GET IN TOUCH
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              color: '#ffffff',
              fontWeight: 800,
              letterSpacing: '-0.02em'
            }}
          >
            Let’s Build Something <span className="gradient-text-cyan">Exceptional</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '32px'
          }}
        >
          {/* Left Column: Direct Communication Channels */}
          <div
            className="modern-card"
            style={{
              padding: '36px',
              borderRadius: '24px'
            }}
          >
            <h3
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '1.4rem',
                color: '#ffffff',
                fontWeight: 700,
                marginBottom: '14px'
              }}
            >
              Direct Communication
            </h3>

            <p
              style={{
                fontSize: '0.98rem',
                lineHeight: 1.6,
                color: '#94a3b8',
                marginBottom: '28px'
              }}
            >
              Whether you’re interested in engineering a complex 3D web experience, a resilient mobile platform, or scalable cloud systems, let's connect.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
              {/* Email */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(0, 210, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Mail size={18} color="#00d2ff" />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
                      Email
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>
                      {personal.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    borderRadius: '9999px',
                    background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                    border: `1px solid ${copied ? '#10b981' : 'rgba(255, 255, 255, 0.15)'}`,
                    color: copied ? '#10b981' : '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Phone / WhatsApp */}
              <a
                href={`https://wa.me/919754313585?text=Hello%20Aditya`}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playLaser()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textDecoration: 'none'
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Phone size={18} color="#10b981" />
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
                    WhatsApp / Direct Call
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>
                    {personal.phone}
                  </div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playLaser()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textDecoration: 'none'
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <GithubIcon size={18} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
                    GitHub
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>
                    github.com/{personal.githubUsername}
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Modern Contact Form */}
          <div
            className="modern-card"
            style={{
              padding: '36px',
              borderRadius: '24px'
            }}
          >
            <h3
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '1.4rem',
                color: '#ffffff',
                fontWeight: 700,
                marginBottom: '20px'
              }}
            >
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    color: '#94a3b8',
                    marginBottom: '6px',
                    fontWeight: 500
                  }}
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Connor"
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '13px 16px',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#00d2ff')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    color: '#94a3b8',
                    marginBottom: '6px',
                    fontWeight: 500
                  }}
                >
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '13px 16px',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#00d2ff')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    color: '#94a3b8',
                    marginBottom: '6px',
                    fontWeight: 500
                  }}
                >
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project or inquiry..."
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '13px 16px',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#00d2ff')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'TRANSMITTING'}
                className="modern-btn-primary"
                style={{
                  width: '100%',
                  marginTop: '8px',
                  padding: '14px',
                  borderRadius: '12px'
                }}
              >
                {status === 'TRANSMITTING' ? (
                  <span>Sending Message...</span>
                ) : status === 'TRANSMITTED' ? (
                  <span>Message Sent Successfully!</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
