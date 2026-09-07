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
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('zold_theme') || 'dark';
  });
  const [soundActive, setSoundActive] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);
  const [useEditedPhoto, setUseEditedPhoto] = useState(true);
  const [backdropIntensity, setBackdropIntensity] = useState('vivid');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('zold_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    soundFx.playChirp(theme === 'dark' ? 880 : 540);
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handlePulseTrigger = () => {
    setPulseCount((c) => c + 1);
  };

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-dark)',
        minHeight: '100vh',
        color: 'var(--text-primary)',
        overflowX: 'hidden',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}
    >
      {/* 1. Full-Screen Prominent Background Image Layer */}
      <BackgroundHologram
        useEditedPhoto={useEditedPhoto}
        intensity={backdropIntensity}
        theme={theme}
      />

      {/* 2. Interactive Holographic Custom Cursor with Dynamic Trail */}
      <JarvisCursor />

      {/* 3. Interactive Background Particle Constellation Mesh */}
      <ConstellationCanvas theme={theme} />

      {/* 4. Top Floating Glass Island Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        soundActive={soundActive}
        onSoundToggle={(active) => setSoundActive(active)}
      />

      {/* 5. Main Portfolio Modules */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <HeroSection
          theme={theme}
          onToggleTheme={toggleTheme}
          onPulseTriggered={handlePulseTrigger}
          useEditedPhoto={useEditedPhoto}
          onTogglePhoto={() => setUseEditedPhoto((p) => !p)}
          backdropIntensity={backdropIntensity}
          onChangeIntensity={(i) => setBackdropIntensity(i)}
        />
        <AboutSection theme={theme} />
        <ExperienceSection theme={theme} />
        <ProjectsSection theme={theme} />
        <SkillsSection theme={theme} />
        <ContactSection theme={theme} />
      </main>

      {/* 6. Modern Footer */}
      <Footer theme={theme} />
    </div>
  );
}
