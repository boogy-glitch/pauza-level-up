import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

export type MascotState = 'splash' | 'playing' | 'levelup';

interface MascotProps {
  state: MascotState;
}

export const Mascot: React.FC<MascotProps> = ({ state }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(Math.hypot(dx, dy) / 15, 8); 
      
      setMousePos({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const isSplash = state === 'splash';
  const isPlaying = state === 'playing';
  const isLevelUp = state === 'levelup';

  return (
    <motion.div 
      className="relative w-56 h-56 mx-auto cursor-pointer"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <svg ref={svgRef} viewBox="0 0 200 200" className="w-full h-full overflow-visible">
        <defs>
          <radialGradient id="bodyGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="60%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#4C1D95" />
          </radialGradient>
          <radialGradient id="eyeWhite" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="80%" stopColor="#F3F4F6" />
            <stop offset="100%" stopColor="#9CA3AF" />
          </radialGradient>
          <radialGradient id="irisGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="70%" stopColor="#0369A1" />
            <stop offset="100%" stopColor="#082F49" />
          </radialGradient>
          <linearGradient id="legGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6D28D9" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#4C1D95" floodOpacity="0.4" />
          </filter>
          <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feOffset dx="0" dy="4"/>
            <feGaussianBlur stdDeviation="3" result="offset-blur"/>
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
            <feFlood floodColor="black" floodOpacity="0.3" result="color"/>
            <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
            <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
          </filter>
        </defs>

        {/* Legs */}
        <path d="M 65 160 C 65 180, 50 190, 50 190 C 70 195, 80 180, 80 160 Z" fill="url(#legGrad)" />
        <path d="M 135 160 C 135 180, 150 190, 150 190 C 130 195, 120 180, 120 160 Z" fill="url(#legGrad)" />

        {/* Body */}
        <motion.path 
          d="M 40 100 C 40 20, 160 20, 160 100 C 160 170, 140 180, 100 180 C 60 180, 40 170, 40 100 Z" 
          fill="url(#bodyGrad)" 
          filter="url(#shadow)"
          animate={{
            scaleY: isPlaying ? [1, 0.96, 1] : 1,
            scaleX: isPlaying ? [1, 1.02, 1] : 1,
          }}
          transition={{ repeat: isPlaying ? Infinity : 0, duration: 0.6, ease: "easeInOut" }}
          style={{ transformOrigin: '100px 180px' }}
        />
        
        {/* Arms */}
        {isSplash && (
          <motion.path 
            d="M 155 100 C 180 80, 190 50, 170 40 C 160 35, 145 60, 145 80" 
            fill="url(#legGrad)"
            animate={{ rotate: [0, 20, -10, 20, 0], originX: "155px", originY: "100px" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        )}
        <path d="M 45 100 C 20 120, 10 150, 30 160 C 40 165, 55 140, 55 120" fill="url(#legGrad)" />
        {!isSplash && (
          <path d="M 155 100 C 180 120, 190 150, 170 160 C 160 165, 145 140, 145 120" fill="url(#legGrad)" />
        )}

        {/* Eyes Background */}
        <circle cx="75" cy="85" r="20" fill="url(#eyeWhite)" filter="url(#innerShadow)" />
        <circle cx="125" cy="85" r="20" fill="url(#eyeWhite)" filter="url(#innerShadow)" />
        
        {/* Pupils & Iris */}
        <motion.g animate={{ x: mousePos.x, y: mousePos.y }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
          {/* Left Eye */}
          <circle cx="75" cy="85" r="11" fill="url(#irisGrad)" />
          <circle cx="75" cy="85" r="6" fill="#0F172A" />
          <circle cx="71" cy="81" r="3" fill="#FFFFFF" opacity="0.9" />
          <circle cx="78" cy="88" r="1.5" fill="#FFFFFF" opacity="0.6" />
          
          {/* Right Eye */}
          <circle cx="125" cy="85" r="11" fill="url(#irisGrad)" />
          <circle cx="125" cy="85" r="6" fill="#0F172A" />
          <circle cx="121" cy="81" r="3" fill="#FFFFFF" opacity="0.9" />
          <circle cx="128" cy="88" r="1.5" fill="#FFFFFF" opacity="0.6" />
        </motion.g>

        {/* Blinking Eyelids */}
        <motion.path
          d="M 50 85 Q 75 105 100 85"
          fill="#7C3AED"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [0, 0, 1, 0, 0] }}
          transition={{ repeat: Infinity, duration: 4, times: [0, 0.9, 0.95, 0.98, 1] }}
          style={{ transformOrigin: '75px 65px' }}
        />
        <motion.path
          d="M 100 85 Q 125 105 150 85"
          fill="#7C3AED"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [0, 0, 1, 0, 0] }}
          transition={{ repeat: Infinity, duration: 4, times: [0, 0.9, 0.95, 0.98, 1] }}
          style={{ transformOrigin: '125px 65px' }}
        />

        {/* Mouth */}
        {isSplash && (
          <g>
            <path d="M 80 120 Q 100 145 120 120 Q 100 130 80 120 Z" fill="#1E1B4B" />
            <path d="M 85 125 Q 100 140 115 125 Q 100 130 85 125 Z" fill="#E11D48" />
          </g>
        )}
        {isPlaying && (
          <path d="M 90 125 Q 100 130 110 125" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" fill="none" />
        )}
        {isLevelUp && (
          <g>
            <path d="M 70 115 Q 100 170 130 115 Z" fill="#1E1B4B" />
            <path d="M 85 135 Q 100 160 115 135 Z" fill="#E11D48" />
            <path d="M 75 115 Q 100 125 125 115 Z" fill="#FFFFFF" /> {/* Teeth */}
          </g>
        )}

        {/* Sparkles for Level Up */}
        {isLevelUp && (
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            style={{ transformOrigin: '100px 100px' }}
          >
            <path d="M 10 50 Q 25 50 25 35 Q 25 50 40 50 Q 25 50 25 65 Q 25 50 10 50 Z" fill="#FBBF24" />
            <path d="M 160 30 Q 170 30 170 20 Q 170 30 180 30 Q 170 30 170 40 Q 170 30 160 30 Z" fill="#FBBF24" />
            <path d="M 20 150 Q 30 150 30 140 Q 30 150 40 150 Q 30 150 30 160 Q 30 150 20 150 Z" fill="#FBBF24" />
            <path d="M 150 160 Q 165 160 165 145 Q 165 160 180 160 Q 165 160 165 175 Q 165 160 150 160 Z" fill="#FBBF24" />
          </motion.g>
        )}
      </svg>
    </motion.div>
  );
};
