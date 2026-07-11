import React, { useEffect, useRef } from 'react';

// Easing/Spring helper
const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

export default function InteractiveDotGrid() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let dots = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Config
    const GAP = 24;
    const BASE_RADIUS = 1; // 2px diameter
    const HOVER_RADIUS = 2.5; // 5px diameter
    const BASE_OPACITY = 0.18;
    const HOVER_OPACITY = 0.8;
    const DOT_COLOR = '124, 108, 246'; // #7C6CF6
    const INTERACTION_RADIUS = 120;
    const PUSH_FORCE = 6;
    
    // State
    let mouse = { x: -1000, y: -1000, active: false };
    let ripples = [];
    let scrollY = 0;

    // Initialize dots
    const initDots = () => {
      dots = [];
      const cols = Math.floor(width / GAP) + 2;
      const rows = Math.floor(height / GAP) + 2;
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const ox = i * GAP;
          const oy = j * GAP;
          dots.push({
            originX: ox,
            originY: oy,
            x: ox,
            y: oy,
            r: BASE_RADIUS,
            opacity: BASE_OPACITY,
            vx: 0,
            vy: 0
          });
        }
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initDots();
    };

    window.addEventListener('resize', resize);
    resize();

    // Mouse events
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    
    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleClick = (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        life: 1
      });
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation Loop
    let animationFrameId;
    const render = (time) => {
      ctx.clearRect(0, 0, width, height);

      // Idle breathing factor
      const idleBreath = (Math.sin(time * 0.001) + 1) * 0.5 * 0.1; // 0 to 0.1

      // Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 8;
        r.life -= 0.02;
        if (r.life <= 0) {
          ripples.splice(i, 1);
        }
      }

      // Parallax effect applied to rendering position
      const parallaxOffset = scrollY * 0.06;

      dots.forEach(dot => {
        // Target state
        let targetX = dot.originX;
        let targetY = dot.originY - parallaxOffset;
        let targetR = BASE_RADIUS;
        let targetOpacity = BASE_OPACITY + idleBreath;

        // Mouse interaction
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (mouse.active && dist < INTERACTION_RADIUS) {
          const force = (INTERACTION_RADIUS - dist) / INTERACTION_RADIUS; // 0 to 1
          
          // Push away
          const angle = Math.atan2(dy, dx);
          targetX += Math.cos(angle) * force * PUSH_FORCE;
          targetY += Math.sin(angle) * force * PUSH_FORCE;
          
          // Scale and opacity
          targetR = lerp(BASE_RADIUS, HOVER_RADIUS, force);
          targetOpacity = lerp(BASE_OPACITY, HOVER_OPACITY, force);
        }

        // Ripple interaction
        ripples.forEach(r => {
          const rdx = dot.x - r.x;
          const rdy = dot.y - r.y;
          const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
          
          // If ripple edge is near the dot
          if (Math.abs(rDist - r.radius) < 40) {
            const rForce = r.life * (1 - Math.abs(rDist - r.radius) / 40);
            targetR = Math.max(targetR, lerp(BASE_RADIUS, HOVER_RADIUS * 1.2, rForce));
            targetOpacity = Math.max(targetOpacity, lerp(BASE_OPACITY, 1, rForce));
            
            // Slight push from ripple center
            const rAngle = Math.atan2(rdy, rdx);
            targetX += Math.cos(rAngle) * rForce * 2;
            targetY += Math.sin(rAngle) * rForce * 2;
          }
        });

        // Edges fade out
        const edgeFadeX = Math.min(dot.x, width - dot.x) / 100;
        const edgeFadeY = Math.min(dot.y, height - dot.y) / 100;
        const edgeMult = Math.max(0, Math.min(1, edgeFadeX)) * Math.max(0, Math.min(1, edgeFadeY));
        
        targetOpacity *= edgeMult;

        // Apply physics (Spring/Lerp)
        // Springy movement
        dot.vx += (targetX - dot.x) * 0.1;
        dot.vy += (targetY - dot.y) * 0.1;
        dot.vx *= 0.7; // friction
        dot.vy *= 0.7;
        
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Smooth scale and opacity
        dot.r = lerp(dot.r, targetR, 0.15);
        dot.opacity = lerp(dot.opacity, targetOpacity, 0.15);

        // Draw
        if (dot.opacity > 0.01) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
          
          // Glow effect for larger dots
          if (dot.r > BASE_RADIUS * 1.5) {
            ctx.shadowBlur = 12;
            ctx.shadowColor = `rgba(${DOT_COLOR}, ${dot.opacity})`;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.fillStyle = `rgba(${DOT_COLOR}, ${dot.opacity})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      pointerEvents: 'none',
      background: '#FAFAFC', // Solid background as requested
      overflow: 'hidden'
    }}>
      {/* Soft central glow behind everything */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(124, 108, 246, 0.08) 0%, rgba(124, 108, 246, 0) 70%)',
        filter: 'blur(160px)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      
      <canvas 
        ref={canvasRef} 
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}
