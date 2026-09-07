import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundFx } from '../../utils/audioEffects';
import { Box, Layers, RotateCw } from 'lucide-react';

export default function NewElementCore({ theme = 'light' }) {
  const mountRef = useRef(null);
  const [activeMode, setActiveMode] = useState('lattice'); // 'lattice' | 'prism' | 'wireframe'
  const modeRef = useRef(activeMode);

  useEffect(() => {
    modeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 420;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const isLight = theme === 'light';

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isLight ? 1.4 : 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(isLight ? 0x2563eb : 0x00d2ff, isLight ? 2.5 : 3.0);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(isLight ? 0x0284c7 : 0x818cf8, 1.5);
    fillLight.position.set(-5, -4, -4);
    scene.add(fillLight);

    // Root Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Crystalline Node
    const coreGeo = new THREE.IcosahedronGeometry(0.9, 2);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: isLight ? 0x2563eb : 0x00d2ff,
      emissive: isLight ? 0x1d4ed8 : 0x0284c7,
      emissiveIntensity: isLight ? 0.35 : 0.65,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.6,
      thickness: 1.2,
      transparent: true,
      opacity: 0.85
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // 2. Geodesic Cage / Wireframe
    const cageGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0284c7 : 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.45 : 0.6
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    coreGroup.add(cageMesh);

    // 3. Vertex Nodes on Cage
    const nodePositions = cageGeo.attributes.position;
    const nodeGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x2563eb : 0xffffff
    });
    const nodesGroup = new THREE.Group();

    for (let i = 0; i < nodePositions.count; i++) {
      const x = nodePositions.getX(i);
      const y = nodePositions.getY(i);
      const z = nodePositions.getZ(i);
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(x, y, z);
      nodesGroup.add(node);
    }
    coreGroup.add(nodesGroup);

    // 4. Orbital Ring
    const ringGeo = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x4f46e5 : 0x00d2ff,
      transparent: true,
      opacity: isLight ? 0.4 : 0.7
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    coreGroup.add(ringMesh);

    const ring2Mesh = ringMesh.clone();
    ring2Mesh.rotation.x = -Math.PI / 4;
    ring2Mesh.rotation.y = Math.PI / 4;
    coreGroup.add(ring2Mesh);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX || (e.touches && e.touches[0].clientX);
      prevMouseY = e.clientY || (e.touches && e.touches[0].clientY);
    };

    const onPointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (isDragging) {
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        prevMouseX = clientX;
        prevMouseY = clientY;
      } else {
        const rect = container.getBoundingClientRect();
        const x = (clientX - rect.left) / rect.width - 0.5;
        const y = (clientY - rect.top) / rect.height - 0.5;
        targetRotationY = x * 1.2;
        targetRotationX = -y * 1.2;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth damping
      coreGroup.rotation.y += (targetRotationY - coreGroup.rotation.y) * 0.05 + 0.004;
      coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.05;

      ringMesh.rotation.z = elapsed * 0.5;
      ring2Mesh.rotation.z = -elapsed * 0.4;

      // Mode adaptations
      if (modeRef.current === 'prism') {
        coreMesh.scale.setScalar(1 + Math.sin(elapsed * 2) * 0.08);
        cageMesh.visible = false;
        nodesGroup.visible = false;
      } else if (modeRef.current === 'wireframe') {
        coreMesh.visible = false;
        cageMesh.visible = true;
        cageMesh.scale.setScalar(1.2);
        nodesGroup.visible = true;
      } else {
        coreMesh.visible = true;
        coreMesh.scale.setScalar(1);
        cageMesh.visible = true;
        cageMesh.scale.setScalar(1);
        nodesGroup.visible = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [theme]);

  const modes = [
    { id: 'lattice', label: 'Quantum Lattice', icon: Layers },
    { id: 'prism', label: 'Solid Prism', icon: Box },
    { id: 'wireframe', label: 'Wireframe Mesh', icon: RotateCw }
  ];

  const isLight = theme === 'light';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'grab'
      }}
    >
      {/* Top Controls & Status Bar */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          right: '16px',
          zIndex: 10,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          pointerEvents: 'none'
        }}
      >
        {/* Metric Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 12px',
            borderRadius: '9999px',
            backgroundColor: isLight ? 'rgba(255, 255, 255, 0.85)' : 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border-medium)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            pointerEvents: 'auto'
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 6px #10b981'
            }}
          />
          <span>Three.js WebGL Spatial Core</span>
        </div>

        {/* Mode Selector */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            backgroundColor: isLight ? 'rgba(255, 255, 255, 0.85)' : 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border-medium)',
            borderRadius: '9999px',
            padding: '3px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            pointerEvents: 'auto'
          }}
        >
          {modes.map((m) => {
            const Icon = m.icon;
            const active = activeMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  soundFx.playChirp(680);
                  setActiveMode(m.id);
                }}
                style={{
                  padding: '5px 10px',
                  borderRadius: '9999px',
                  border: 'none',
                  background: active ? 'var(--brand-blue)' : 'transparent',
                  color: active ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.2s ease'
                }}
                title={m.label}
              >
                <Icon size={12} />
                <span className="mode-label-text">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* WebGL Canvas Container */}
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '380px',
          position: 'relative'
        }}
      />

      {/* Bottom Hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '14px',
          left: '16px',
          right: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          fontSize: '11px',
          fontFamily: 'JetBrains Mono, monospace',
          color: 'var(--text-muted)'
        }}
      >
        <span>Interactive: Drag to rotate</span>
        <span>60 FPS • 1,420 Vertices</span>
      </div>

      <style>{`
        @media (max-width: 540px) {
          .mode-label-text { display: none; }
        }
      `}</style>
    </div>
  );
}
