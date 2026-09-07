import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundFx } from '../../utils/audioEffects';
import { Layers, Zap, Eye } from 'lucide-react';

export default function NewElementCore({ onPulseTriggered }) {
  const mountRef = useRef(null);
  const pulseTriggerRef = useRef(null);
  const setHoloModeRef = useRef(null);
  const [currentMode, setCurrentMode] = useState('ironman'); // 'ironman' | 'ultron'

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 550;
    const height = container.clientHeight || 550;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Root Hologram Group
    const hologramGroup = new THREE.Group();
    scene.add(hologramGroup);

    // Holographic Theme Palettes
    const palettes = {
      ironman: {
        primary: 0x00d2ff,
        secondary: 0x38bdf8,
        core: 0x00f0ff,
        struts: 0x0284c7,
        inner: 0x818cf8,
        ambient: 0x0a192f
      },
      ultron: {
        primary: 0xf59e0b,
        secondary: 0xfbbf24,
        core: 0xff4400,
        struts: 0xd97706,
        inner: 0xef4444,
        ambient: 0x2e1005
      }
    };

    let activePalette = palettes.ironman;

    // 1. DYNAMIC LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const corePointLight = new THREE.PointLight(activePalette.core, 5, 20);
    corePointLight.position.set(0, 0, 0);
    scene.add(corePointLight);

    const topRimLight = new THREE.DirectionalLight(0x00d2ff, 2);
    topRimLight.position.set(5, 6, 5);
    scene.add(topRimLight);

    // 2. INNER TRANSLUCENT NEURAL CONSCIOUSNESS CORE (Ultron / New Element)
    const nucleusGeo = new THREE.IcosahedronGeometry(0.75, 3);
    const nucleusMat = new THREE.MeshPhysicalMaterial({
      color: activePalette.core,
      emissive: activePalette.core,
      emissiveIntensity: 0.75,
      roughness: 0.05,
      transmission: 0.92,
      thickness: 1.4,
      ior: 1.5,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    hologramGroup.add(nucleusMesh);

    // Inner White-Hot Photon Core
    const plasmaGeo = new THREE.SphereGeometry(0.38, 32, 32);
    const plasmaMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95
    });
    const plasmaMesh = new THREE.Mesh(plasmaGeo, plasmaMat);
    hologramGroup.add(plasmaMesh);

    // 3. TRANSPARENT GEODESIC NEURAL LATTICE (Iron Man 2 / Ultron Synapse Cage)
    const outerLatticeGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const posAttr = outerLatticeGeo.getAttribute('position');

    // Extract unique nodes
    const uniqueNodes = [];
    const nodeSet = new Set();
    for (let i = 0; i < posAttr.count; i++) {
      const v = new THREE.Vector3(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
      const key = `${v.x.toFixed(2)},${v.y.toFixed(2)},${v.z.toFixed(2)}`;
      if (!nodeSet.has(key)) {
        nodeSet.add(key);
        uniqueNodes.push(v);
      }
    }

    // Glowing Holographic Synapse Nodes
    const nodeSpheres = [];
    const nodeGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: activePalette.primary,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });

    uniqueNodes.forEach((pos) => {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.copy(pos);
      hologramGroup.add(node);
      nodeSpheres.push({
        mesh: node,
        basePos: pos.clone(),
        phase: Math.random() * Math.PI * 2
      });
    });

    // Luminous Holographic Laser Struts (Wireframe with Additive Transparency)
    const wireGeo = new THREE.WireframeGeometry(outerLatticeGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: activePalette.secondary,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      linewidth: 1.5
    });
    const latticeLines = new THREE.LineSegments(wireGeo, wireMat);
    hologramGroup.add(latticeLines);

    // Inner Secondary Translucent Neural Cage
    const innerLattice = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.45, 1)),
      new THREE.LineBasicMaterial({
        color: activePalette.inner,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending
      })
    );
    hologramGroup.add(innerLattice);

    // 4. MULTI-AXIS HOLOGRAPHIC GIMBAL ENERGY RINGS
    const createHoloRing = (radius, tube, rotX, rotY, rotZ) => {
      const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color: activePalette.primary,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.set(rotX, rotY, rotZ);
      hologramGroup.add(ring);
      return { mesh: ring, mat: ringMat };
    };

    const ring1 = createHoloRing(3.05, 0.02, Math.PI / 4, 0, 0);
    const ring2 = createHoloRing(3.22, 0.02, 0, Math.PI / 3, 0);
    const ring3 = createHoloRing(3.40, 0.02, Math.PI / 6, Math.PI / 6, Math.PI / 2);

    // 5. TRANSLUCENT SYNAPSE SWARM (Ultron Neural Particles)
    const particleCount = 500;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const rad = 1.0 + Math.random() * 2.7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = rad * Math.cos(phi);

      const c = new THREE.Color(activePalette.primary);
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    hologramGroup.add(particleSystem);

    // 6. EXPANDING SYNAPSE SHOCKWAVE RING
    const shockwaveGeo = new THREE.RingGeometry(0.15, 0.35, 64);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: activePalette.core,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    hologramGroup.add(shockwaveMesh);

    // Switch Hologram Mode Function (Iron Man 2 vs Ultron Neural Matrix)
    const updateHoloPalette = (modeKey) => {
      const target = palettes[modeKey] || palettes.ironman;
      activePalette = target;
      corePointLight.color.setHex(target.core);
      topRimLight.color.setHex(target.primary);
      nucleusMat.color.setHex(target.core);
      nucleusMat.emissive.setHex(target.core);
      nodeMat.color.setHex(target.primary);
      wireMat.color.setHex(target.secondary);
      innerLattice.material.color.setHex(target.inner);
      ring1.mat.color.setHex(target.primary);
      ring2.mat.color.setHex(target.secondary);
      ring3.mat.color.setHex(target.inner);
      shockwaveMat.color.setHex(target.core);

      // Re-color particles
      const colors = particleGeo.attributes.color.array;
      for (let i = 0; i < particleCount; i++) {
        const c = new THREE.Color(target.primary);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      particleGeo.attributes.color.needsUpdate = true;
    };
    setHoloModeRef.current = updateHoloPalette;

    // Drag & Interactive Movement
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let currentRotX = 0;
    let currentRotY = 0;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;

      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        currentRotY += dx * 0.007;
        currentRotX += dy * 0.007;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerDown = (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    // Energy Pulse
    let pulseProgress = 1;
    const triggerPulse = () => {
      pulseProgress = 0;
      soundFx.playPulse();
      if (onPulseTriggered) onPulseTriggered();
    };
    pulseTriggerRef.current = triggerPulse;

    // Animation Render Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        currentRotY += 0.004;
        hologramGroup.rotation.y += (currentRotY + mouseX * 0.8 - hologramGroup.rotation.y) * 0.05;
        hologramGroup.rotation.x += (currentRotX + mouseY * 0.8 - hologramGroup.rotation.x) * 0.05;
      } else {
        hologramGroup.rotation.y = currentRotY;
        hologramGroup.rotation.x = currentRotX;
      }

      // Counter-rotating gimbal rings
      ring1.mesh.rotation.x += 0.009;
      ring1.mesh.rotation.y += 0.006;
      ring2.mesh.rotation.y += 0.011;
      ring2.mesh.rotation.z += 0.007;
      ring3.mesh.rotation.z += 0.008;
      ring3.mesh.rotation.x += 0.005;

      // Particle orbital rotation
      particleSystem.rotation.y -= 0.002;
      particleSystem.rotation.x += 0.001;

      // Nucleus Breathing & Transparency Pulses
      const scaleBreathing = 1 + Math.sin(elapsed * 3.5) * 0.05;
      nucleusMesh.scale.set(scaleBreathing, scaleBreathing, scaleBreathing);
      plasmaMesh.scale.set(1 + Math.cos(elapsed * 4.5) * 0.08, 1 + Math.cos(elapsed * 4.5) * 0.08, 1 + Math.cos(elapsed * 4.5) * 0.08);

      // Node vertex vibrations
      nodeSpheres.forEach((node) => {
        const delta = Math.sin(elapsed * 2.8 + node.phase) * 0.035;
        node.mesh.position.copy(node.basePos).multiplyScalar(1 + delta);
      });

      // Pulse Shockwave Expansion
      if (pulseProgress < 1) {
        pulseProgress += 0.022;
        const s = 0.5 + pulseProgress * 4.8;
        shockwaveMesh.scale.set(s, s, 1);
        shockwaveMesh.rotation.z += 0.04;
        shockwaveMat.opacity = (1 - pulseProgress) * 0.95;
        corePointLight.intensity = 5 + (1 - pulseProgress) * 15;
        nucleusMat.emissiveIntensity = 0.75 + (1 - pulseProgress) * 2.5;
      } else {
        shockwaveMat.opacity = 0;
        corePointLight.intensity = 4.5 + Math.sin(elapsed * 3) * 0.8;
        nucleusMat.emissiveIntensity = 0.75;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleModeSwitch = (mode) => {
    soundFx.playChirp(mode === 'ultron' ? 620 : 880);
    setCurrentMode(mode);
    if (setHoloModeRef.current) {
      setHoloModeRef.current(mode);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '440px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
      }}
    >
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        onClick={() => pulseTriggerRef.current && pulseTriggerRef.current()}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '440px',
          cursor: 'grab',
          position: 'relative',
          zIndex: 10
        }}
      />

      {/* Modern Floating Hologram Controls Pill */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '8px',
          zIndex: 20,
          background: 'var(--bg-surface)',
          backdropFilter: 'blur(24px)',
          padding: '6px 12px',
          borderRadius: '9999px',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--card-shadow)'
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            pulseTriggerRef.current && pulseTriggerRef.current();
          }}
          className="modern-btn-primary"
          style={{
            padding: '6px 14px',
            fontSize: '0.78rem',
            borderRadius: '9999px'
          }}
        >
          <Zap size={13} />
          <span>Synapse Pulse</span>
        </button>

        {/* Mode Switcher: Iron Man 2 vs Age of Ultron */}
        <div style={{ display: 'flex', gap: '4px', backgroundColor: 'rgba(0,0,0,0.2)', padding: '2px', borderRadius: '9999px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleModeSwitch('ironman');
            }}
            style={{
              padding: '4px 10px',
              fontSize: '11px',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: currentMode === 'ironman' ? '#0284c7' : 'transparent',
              color: currentMode === 'ironman' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 600,
              fontFamily: 'Plus Jakarta Sans, sans-serif'
            }}
          >
            Iron Man 2
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleModeSwitch('ultron');
            }}
            style={{
              padding: '4px 10px',
              fontSize: '11px',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: currentMode === 'ultron' ? '#d97706' : 'transparent',
              color: currentMode === 'ultron' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 600,
              fontFamily: 'Plus Jakarta Sans, sans-serif'
            }}
          >
            Ultron Matrix
          </button>
        </div>
      </div>

      {/* Top Hologram Badge */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '20px',
          zIndex: 20,
          pointerEvents: 'none'
        }}
        className="modern-badge"
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: currentMode === 'ironman' ? '#00d2ff' : '#f59e0b',
            boxShadow: `0 0 10px ${currentMode === 'ironman' ? '#00d2ff' : '#f59e0b'}`
          }}
        />
        <span>
          {currentMode === 'ironman'
            ? 'IRON MAN 2 // NEW ELEMENT HOLOGRAM'
            : 'AVENGERS // ULTRON NEURAL CONSCIOUSNESS'}
        </span>
      </div>
    </div>
  );
}
