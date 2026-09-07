import React, { useEffect, useState, useRef } from 'react';

export default function JarvisCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [sparks, setSparks] = useState([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const sparkIdRef = useRef(0);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0)
    ) {
      setIsTouchDevice(true);
      return;
    }

    let lastTime = 0;
    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setPos({ x, y });

      const now = performance.now();
      if (now - lastTime > 25) {
        lastTime = now;
        const newSpark = {
          id: ++sparkIdRef.current,
          x,
          y,
          size: Math.random() * 3.5 + 2,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          opacity: 0.9,
          color: Math.random() > 0.4 ? '#00d2ff' : '#60a5fa'
        };
        setSparks((prev) => [...prev.slice(-30), newSpark]);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.modern-btn-primary') ||
        target.closest('.modern-btn-secondary') ||
        target.closest('.modern-card')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);

    let animId;
    const updateSparks = () => {
      setSparks((prev) =>
        prev
          .map((s) => ({
            ...s,
            x: s.x + s.vx,
            y: s.y + s.vy,
            opacity: s.opacity - 0.035,
            size: Math.max(0.5, s.size * 0.96)
          }))
          .filter((s) => s.opacity > 0.05)
      );
      animId = requestAnimationFrame(updateSparks);
    };
    animId = requestAnimationFrame(updateSparks);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 99999 }}>
      {/* Sparks */}
      {sparks.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            backgroundColor: s.color,
            boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
            opacity: s.opacity,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Modern Soft Outer Ring */}
      <div
        className={`modern-cursor-glow ${isHovered ? 'hovered' : ''}`}
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`
        }}
      />

      {/* Modern Center Dot */}
      <div
        className="modern-cursor-dot"
        style={{
          left: pos.x,
          top: pos.y
        }}
      />
    </div>
  );
}
