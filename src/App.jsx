import React, { useState, useEffect } from 'react';
import Navbar from './components/hud/Navbar';
import JarvisCursor from './components/hud/JarvisCursor';
import ConstellationCanvas from './components/hud/ConstellationCanvas';
import BackgroundHologram from './components/hud/BackgroundHologram';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/hud/Footer';
import { soundFx } from './utils/audioEffects';

export default function App() {
  // 1. DEFAULT TO LIGHT MODE with localStorage persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio_theme') || 'light';
  });
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio_theme', theme);

    // Update meta theme-color to match theme
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'light' ? '#f8fafc' : '#090d16');
    }
  }, [theme]);

  const toggleTheme = () => {
    soundFx.playChirp(theme === 'dark' ? 680 : 540);
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-dark)',
        minHeight: '100vh',
        color: 'var(--text-primary)',
        overflowX: 'hidden',
        transition: 'background-color 0.35s ease, color 0.35s ease'
      }}
    >
      {/* 1. Ambient Dynamic Gradient Mesh Background */}
      <BackgroundHologram theme={theme} />

      {/* 2. Sleek Custom Magnetic Pointer Dot */}
      <JarvisCursor />

      {/* 3. Interactive WebGL/Canvas Constellation Particles */}
      <ConstellationCanvas theme={theme} />

      {/* 4. Top Floating Island Glass Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        soundActive={soundActive}
        onSoundToggle={(active) => setSoundActive(active)}
      />

      {/* 5. Main Portfolio Modules */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <HeroSection theme={theme} />
        <AboutSection theme={theme} />
        <ExperienceSection theme={theme} />
        <ProjectsSection theme={theme} />
        <SkillsSection theme={theme} />
        <ContactSection theme={theme} />
      </main>

      {/* 6. Refined Footer */}
      <Footer theme={theme} />
    </div>
  );
}
