import React, { useEffect, useState, useRef } from 'react';

function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
  return ((maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed);
}

export default function ThemeToggle({ theme, toggleTheme }) {
  const [val, setVal] = useState(theme === 'light' ? 150 : -90);
  const animationRef = useRef(null);
  
  useEffect(() => {
    const target = theme === 'light' ? 150 : -90;
    
    const animate = () => {
      setVal(prev => {
        const diff = target - prev;
        if (Math.abs(diff) < 0.5) return target;
        animationRef.current = requestAnimationFrame(animate);
        return prev + diff * 0.12; // smooth easing
      });
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [theme]);

  const min = -90;
  const max = 150;
  const x = 200;
  const y = 50;
  
  const rotation = scaleBetween(val, 30, 0, min, max);
  const oX = scaleBetween(val, 35, 0, min, max);
  const oY = scaleBetween(val, 20, 0, min, max);
  const back = val < 1 ? 0 : 1;
  const rayOpacity = scaleBetween(val, 0, 1, min, max);
  
  // Sun: Yellow (#fbc531 -> rgb(251, 197, 49))
  // Moon: Slate/Purple (#6c5ce7 -> rgb(108, 92, 231))
  const r = scaleBetween(val, 108, 251, min, max);
  const g = scaleBetween(val, 92, 197, min, max);
  const b = scaleBetween(val, 231, 49, min, max);
  
  const currentColor = `rgb(${r}, ${g}, ${b})`;

  return (
    <div onClick={toggleTheme} style={{ cursor: 'pointer', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="22" height="22" viewBox="0 0 400 400" style={{ overflow: 'visible' }}>
        <g style={{ transform: `rotate(${-rotation}deg)`, transformOrigin: '50% 50%' }}>
          <path 
            d={`M${x+oX*2} ${y+oY} A 150 150 0 1 0 ${x+oX*2} ${350-oY} A ${Math.abs(val)} 150 0 0 ${1-back} ${x+oX*2} ${y+oY} Z`} 
            fill={currentColor} 
          />
        </g>
        
        <g style={{ opacity: Math.max(0, rayOpacity) }}>
          {/* Top, Bottom, Left, Right */}
          <path d="M10 200 L 50 200" stroke={currentColor} strokeWidth="35" strokeLinecap="round" />
          <path d="M350 200 L 390 200" stroke={currentColor} strokeWidth="35" strokeLinecap="round" />
          <path d="M200 10 L 200 50" stroke={currentColor} strokeWidth="35" strokeLinecap="round" />
          <path d="M200 350 L 200 390" stroke={currentColor} strokeWidth="35" strokeLinecap="round" />
          
          {/* Diagonals */}
          <g style={{ transform: 'rotate(45deg)', transformOrigin: '50% 50%' }}>
            <path d="M10 200 L 50 200" stroke={currentColor} strokeWidth="35" strokeLinecap="round" />
            <path d="M350 200 L 390 200" stroke={currentColor} strokeWidth="35" strokeLinecap="round" />
            <path d="M200 10 L 200 50" stroke={currentColor} strokeWidth="35" strokeLinecap="round" />
            <path d="M200 350 L 200 390" stroke={currentColor} strokeWidth="35" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
}
