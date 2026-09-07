import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function BackgroundHologram({ theme = 'light' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    // Camera placed back to give grand cinematic depth
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = theme === 'light' ? 1.15 : 1.35;
    container.appendChild(renderer.domElement);

    const isLight = theme === 'light';

    // 1. DYNAMIC LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, isLight ? 1.6 : 0.9);
    scene.add(ambientLight);

    const primaryLight = new THREE.DirectionalLight(isLight ? 0x2563eb : 0x00d2ff, isLight ? 2.8 : 3.5);
    primaryLight.position.set(10, 12, 14);
    scene.add(primaryLight);

    const fillLight = new THREE.DirectionalLight(isLight ? 0x0284c7 : 0x6366f1, isLight ? 1.8 : 2.2);
    fillLight.position.set(-12, -10, -8);
    scene.add(fillLight);

    const corePointLight = new THREE.PointLight(isLight ? 0x2563eb : 0x00f0ff, isLight ? 3.0 : 5.0, 30);
    corePointLight.position.set(0, 0, 0);
    scene.add(corePointLight);

    // 2. GRAND QUANTUM CORE ROOT GROUP
    const grandCoreGroup = new THREE.Group();
    // Position grand core gracefully: centered slightly right on desktop to balance hero text
    const initialPosX = width > 900 ? 3.2 : 0;
    const initialPosY = 0.5;
    grandCoreGroup.position.set(initialPosX, initialPosY, 0);
    scene.add(grandCoreGroup);

    // --- A. INNER TRANSLUCENT CRYSTALLINE NUCLEUS ---
    const nucleusGeo = new THREE.IcosahedronGeometry(3.0, 2);
    const nucleusMat = new THREE.MeshPhysicalMaterial({
      color: isLight ? 0x2563eb : 0x00d2ff,
      emissive: isLight ? 0x1d4ed8 : 0x0284c7,
      emissiveIntensity: isLight ? 0.3 : 0.6,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.65,
      thickness: 2.2,
      transparent: true,
      opacity: isLight ? 0.65 : 0.8,
      wireframe: false
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    grandCoreGroup.add(nucleusMesh);

    // --- B. INNER GLOWING PHOTON CORE ---
    const photonGeo = new THREE.SphereGeometry(1.3, 32, 32);
    const photonMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0xffffff : 0xe0f2fe,
      transparent: true,
      opacity: isLight ? 0.85 : 0.95
    });
    const photonMesh = new THREE.Mesh(photonGeo, photonMat);
    grandCoreGroup.add(photonMesh);

    // --- C. PRIMARY GEODESIC WIREFRAME CAGE ---
    const cageGeo = new THREE.IcosahedronGeometry(5.2, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0284c7 : 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.45 : 0.65
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    grandCoreGroup.add(cageMesh);

    // --- D. GLEAMING VERTEX NODE SPHERES (at all cage vertices) ---
    const nodePositions = cageGeo.attributes.position;
    const nodeGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0xffffff : 0xffffff
    });
    const nodeGroup = new THREE.Group();

    for (let i = 0; i < nodePositions.count; i++) {
      const x = nodePositions.getX(i);
      const y = nodePositions.getY(i);
      const z = nodePositions.getZ(i);
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      nodeGroup.add(nodeMesh);
    }
    grandCoreGroup.add(nodeGroup);

    // --- E. OUTER SECONDARY GEODESIC SHELL (Counter-rotating) ---
    const outerCageGeo = new THREE.IcosahedronGeometry(6.6, 1);
    const outerCageMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x4f46e5 : 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.2 : 0.3
    });
    const outerCageMesh = new THREE.Mesh(outerCageGeo, outerCageMat);
    grandCoreGroup.add(outerCageMesh);

    // --- F. GRAND ORBITAL TORUS RINGS & ORBITING BEACONS ---
    const ringSpecs = [
      { radius: 7.2, tube: 0.05, rotX: Math.PI / 3.2, rotY: Math.PI / 6, speed: 0.4, color: isLight ? 0x2563eb : 0x00d2ff },
      { radius: 7.8, tube: 0.05, rotX: -Math.PI / 3.8, rotY: Math.PI / 3, speed: -0.35, color: isLight ? 0x0284c7 : 0x38bdf8 },
      { radius: 8.4, tube: 0.05, rotX: Math.PI / 5, rotY: -Math.PI / 4, speed: 0.28, color: isLight ? 0x4f46e5 : 0xa855f7 }
    ];

    const ringsData = [];

    ringSpecs.forEach((spec, idx) => {
      const ringGeo = new THREE.TorusGeometry(spec.radius, spec.tube, 16, 140);
      const ringMat = new THREE.MeshBasicMaterial({
        color: spec.color,
        transparent: true,
        opacity: isLight ? 0.38 : 0.65
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = spec.rotX;
      ringMesh.rotation.y = spec.rotY;
      grandCoreGroup.add(ringMesh);

      // Orbiting beacon traveling along the ring
      const beaconGeo = new THREE.SphereGeometry(0.28, 16, 16);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: isLight ? 0xffffff : 0x00f0ff
      });
      const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
      grandCoreGroup.add(beaconMesh);

      ringsData.push({
        mesh: ringMesh,
        beacon: beaconMesh,
        radius: spec.radius,
        rotX: spec.rotX,
        rotY: spec.rotY,
        speed: spec.speed,
        phase: idx * 2.1
      });
    });

    // --- G. SURROUNDING QUANTUM SPATIAL FIELD PARTICLES ---
    const particlesCount = 90;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 32;
      particlePositions[i + 1] = (Math.random() - 0.5) * 24;
      particlePositions[i + 2] = (Math.random() - 0.5) * 20;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: isLight ? 0x2563eb : 0x00d2ff,
      size: isLight ? 0.18 : 0.22,
      transparent: true,
      opacity: isLight ? 0.35 : 0.6
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // 3. MOUSE & SCROLL PARALLAX HANDLERS
    let targetRotationX = 0;
    let targetRotationY = 0;
    let scrollRotationY = 0;
    let scrollPosY = 0;

    const onMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) - 0.5;
      const normY = (e.clientY / window.innerHeight) - 0.5;
      targetRotationY = normX * 0.9;
      targetRotationX = normY * 0.7;
    };

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      scrollRotationY = scrollY * 0.0012;
      scrollPosY = -scrollY * 0.0025;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Window Resize Handler
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      // Adjust position on small vs large screens
      grandCoreGroup.position.x = width > 900 ? 3.2 : 0;
    };
    window.addEventListener('resize', onResize, { passive: true });

    // 4. ANIMATION LOOP
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse rotation damping
      grandCoreGroup.rotation.y += (targetRotationY + scrollRotationY - grandCoreGroup.rotation.y) * 0.04 + 0.003;
      grandCoreGroup.rotation.x += (targetRotationX - grandCoreGroup.rotation.x) * 0.04;

      // Scroll position parallax
      grandCoreGroup.position.y = initialPosY + scrollPosY;

      // Counter-rotate outer cage
      outerCageMesh.rotation.y = -elapsed * 0.15;
      outerCageMesh.rotation.x = elapsed * 0.08;

      // Pulse nucleus breathing
      const pulse = Math.sin(elapsed * 2.2) * 0.05;
      nucleusMesh.scale.setScalar(1 + pulse);
      photonMesh.scale.setScalar(1 + pulse * 1.5);

      // Rotate orbital rings & update beacon positions
      ringsData.forEach((ring) => {
        ring.mesh.rotation.z = elapsed * ring.speed;

        // Position beacon along orbit in 3D
        const angle = elapsed * ring.speed * 1.8 + ring.phase;
        const localX = Math.cos(angle) * ring.radius;
        const localY = Math.sin(angle) * ring.radius;
        
        // Transform local coordinate to ring orientation
        const pos = new THREE.Vector3(localX, localY, 0);
        pos.applyAxisAngle(new THREE.Vector3(1, 0, 0), ring.rotX);
        pos.applyAxisAngle(new THREE.Vector3(0, 1, 0), ring.rotY);

        ring.beacon.position.copy(pos);
      });

      // Slowly drift ambient particle field
      particleField.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // 5. CLEANUP ON UNMOUNT
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      photonGeo.dispose();
      photonMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      outerCageGeo.dispose();
      outerCageMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [theme]);

  const isLight = theme === 'light';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        backgroundColor: 'var(--bg-dark)',
        transition: 'background-color 0.35s ease'
      }}
      aria-hidden="true"
    >
      {/* 1. Ambient Radial Lighting Halo */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          right: '15%',
          width: 'min(900px, 90vw)',
          height: 'min(900px, 90vw)',
          background: isLight
            ? 'radial-gradient(circle, rgba(37, 99, 235, 0.09) 0%, rgba(2, 132, 199, 0.04) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0, 210, 255, 0.14) 0%, rgba(37, 99, 235, 0.06) 50%, transparent 70%)',
          filter: 'blur(90px)',
          borderRadius: '50%',
          transition: 'background 0.35s ease'
        }}
      />

      {/* 2. Three.js Grand 3D Quantum Core WebGL Canvas */}
      <div
        ref={mountRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%'
        }}
      />

      {/* 3. Subtle Modern Dot Grid Layer */}
      <div
        className="modern-grid-bg"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: isLight ? 0.45 : 0.35
        }}
      />

      {/* 4. Soft Vignette to guarantee 100% foreground text legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isLight
            ? 'radial-gradient(circle at 50% 50%, transparent 50%, rgba(248, 250, 252, 0.6) 100%)'
            : 'radial-gradient(circle at 50% 50%, transparent 50%, rgba(9, 13, 22, 0.65) 100%)'
        }}
      />
    </div>
  );
}
