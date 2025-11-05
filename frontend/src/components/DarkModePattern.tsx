'use client';

// Pre-generated particle positions for performance and purity
const PARTICLES = [
  { id: 0, left: 12, top: 8, delay: 0.2, duration: 3.1 },
  { id: 1, left: 85, top: 22, delay: 1.5, duration: 2.8 },
  { id: 2, left: 45, top: 65, delay: 0.8, duration: 3.5 },
  { id: 3, left: 68, top: 15, delay: 2.1, duration: 2.4 },
  { id: 4, left: 22, top: 88, delay: 0.5, duration: 3.9 },
  { id: 5, left: 91, top: 42, delay: 1.8, duration: 2.7 },
  { id: 6, left: 35, top: 73, delay: 0.9, duration: 3.2 },
  { id: 7, left: 58, top: 28, delay: 2.4, duration: 2.6 },
  { id: 8, left: 15, top: 55, delay: 0.3, duration: 3.7 },
  { id: 9, left: 77, top: 82, delay: 1.2, duration: 2.9 },
  { id: 10, left: 42, top: 18, delay: 0.7, duration: 3.4 },
  { id: 11, left: 88, top: 68, delay: 2.0, duration: 2.5 },
  { id: 12, left: 28, top: 45, delay: 1.1, duration: 3.6 },
  { id: 13, left: 65, top: 92, delay: 0.4, duration: 2.8 },
  { id: 14, left: 50, top: 35, delay: 1.6, duration: 3.3 },
  { id: 15, left: 18, top: 78, delay: 2.3, duration: 2.7 },
  { id: 16, left: 82, top: 12, delay: 0.6, duration: 3.8 },
  { id: 17, left: 38, top: 58, delay: 1.4, duration: 2.6 },
  { id: 18, left: 72, top: 25, delay: 0.9, duration: 3.1 },
  { id: 19, left: 25, top: 95, delay: 2.2, duration: 2.9 },
  { id: 20, left: 95, top: 48, delay: 0.5, duration: 3.5 },
  { id: 21, left: 52, top: 15, delay: 1.7, duration: 2.4 },
  { id: 22, left: 32, top: 88, delay: 1.0, duration: 3.2 },
  { id: 23, left: 78, top: 38, delay: 0.3, duration: 2.8 },
  { id: 24, left: 48, top: 72, delay: 2.5, duration: 3.7 },
  { id: 25, left: 62, top: 52, delay: 0.8, duration: 2.5 },
  { id: 26, left: 8, top: 32, delay: 1.3, duration: 3.4 },
  { id: 27, left: 92, top: 78, delay: 0.2, duration: 2.9 },
  { id: 28, left: 55, top: 8, delay: 1.9, duration: 3.6 },
  { id: 29, left: 20, top: 62, delay: 0.7, duration: 2.7 },
];

export default function DarkModePattern() {
  return (
    <div className="dark-pattern-overlay">
      {/* RGB Glowing Orbs */}
      <div className="rgb-orb rgb-orb-1"></div>
      <div className="rgb-orb rgb-orb-2"></div>
      <div className="rgb-orb rgb-orb-3"></div>

      {/* Animated Grid Pattern */}
      <div className="grid-pattern"></div>

      {/* Glowing Lines */}
      <div className="glow-line glow-line-1"></div>
      <div className="glow-line glow-line-2"></div>
      <div className="glow-line glow-line-3"></div>

      {/* Geometric Shapes */}
      <div className="geometric-shape shape-square"></div>
      <div className="geometric-shape shape-circle"></div>
      <div className="geometric-shape shape-triangle"></div>

      {/* Floating Particles */}
      {PARTICLES.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        ></div>
      ))}

      {/* 3D Rotating Cubes */}
      <div 
        className="cube-3d" 
        style={{ 
          top: '15%', 
          left: '80%',
          animationDuration: '25s'
        }}
      >
        <div className="cube-face" style={{ transform: 'rotateY(0deg) translateZ(50px)' }}></div>
        <div className="cube-face" style={{ transform: 'rotateY(90deg) translateZ(50px)' }}></div>
        <div className="cube-face" style={{ transform: 'rotateY(180deg) translateZ(50px)' }}></div>
        <div className="cube-face" style={{ transform: 'rotateY(-90deg) translateZ(50px)' }}></div>
        <div className="cube-face" style={{ transform: 'rotateX(90deg) translateZ(50px)' }}></div>
        <div className="cube-face" style={{ transform: 'rotateX(-90deg) translateZ(50px)' }}></div>
      </div>

      <div 
        className="cube-3d" 
        style={{ 
          bottom: '20%', 
          left: '20%',
          animationDuration: '30s',
          animationDirection: 'reverse'
        }}
      >
        <div className="cube-face" style={{ transform: 'rotateY(0deg) translateZ(50px)' }}></div>
        <div className="cube-face" style={{ transform: 'rotateY(90deg) translateZ(50px)' }}></div>
        <div className="cube-face" style={{ transform: 'rotateY(180deg) translateZ(50px)' }}></div>
        <div className="cube-face" style={{ transform: 'rotateY(-90deg) translateZ(50px)' }}></div>
        <div className="cube-face" style={{ transform: 'rotateX(90deg) translateZ(50px)' }}></div>
        <div className="cube-face" style={{ transform: 'rotateX(-90deg) translateZ(50px)' }}></div>
      </div>
    </div>
  );
}
