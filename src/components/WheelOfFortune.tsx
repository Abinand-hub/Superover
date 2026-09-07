import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { api } from '../services/api';

interface WheelOfFortuneProps {
  onComplete: (multiplier: number) => void;
}

export const WheelOfFortune: React.FC<WheelOfFortuneProps> = ({ onComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);
  const [selectedMultiplier, setSelectedMultiplier] = useState<number | null>(null);
  
  const [wheelConfig, setWheelConfig] = useState([
    { multiplier: 50, probability: 20 },
    { multiplier: 60, probability: 15 },
    { multiplier: 75, probability: 14 },
    { multiplier: 80, probability: 10 },
    { multiplier: 100, probability: 10 },
    { multiplier: 110, probability: 8 },
    { multiplier: 120, probability: 6 },
    { multiplier: 140, probability: 5 },
    { multiplier: 150, probability: 4 },
    { multiplier: 175, probability: 3 },
    { multiplier: 200, probability: 2 },
    { multiplier: 250, probability: 1 },
    { multiplier: 300, probability: 1 },
    { multiplier: 400, probability: 0.5 },
    { multiplier: 500, probability: 0.5 },
  ]);

  useEffect(() => {
    // Fetch dynamic probabilities from settings
    api.getSettings().then(settings => {
      if (settings && settings.wheelProbabilities && settings.wheelProbabilities.length > 0) {
        const parsed = settings.wheelProbabilities.map((p: any) => ({
          multiplier: Number(p.multiplier || (typeof p.segment === 'string' ? parseInt(p.segment.replace(/\D/g, '')) : p.segment) || 50),
          probability: Number(p.probability || 0)
        }));
        setWheelConfig(parsed);
      }
    }).catch(console.error);
  }, []);

  const segments = wheelConfig.map(c => c.multiplier);
  const segmentAngle = 360 / segments.length;

  const spinWheel = () => {
    if (isSpinning || hasSpun) return;
    
    setIsSpinning(true);
    
    // Dynamic Weighted probability selection
    const rand = Math.random() * 100;
    let winningIndex = 0;
    let cumulativeProb = 0;
    
    for (let i = 0; i < wheelConfig.length; i++) {
      cumulativeProb += wheelConfig[i].probability;
      if (rand < cumulativeProb) {
        winningIndex = i;
        break;
      }
    }

    const winningMultiplier = segments[winningIndex];
    
    // Calculate final rotation
    const spins = 5; // Spin 5 times
    const baseRotation = spins * 360;
    // Target winning slice to land precisely at the top pointer (0 degrees)
    const targetAngle = 360 - (winningIndex * segmentAngle) - (segmentAngle / 2);
    
    const finalRotation = rotation + baseRotation + targetAngle;
    
    setRotation(finalRotation);
    
    // Stop spinning after animation (5 seconds)
    setTimeout(() => {
      setIsSpinning(false);
      setHasSpun(true);
      setSelectedMultiplier(winningMultiplier);
      
      // Notify parent after a short delay so user sees the result
      setTimeout(() => {
        onComplete(winningMultiplier);
      }, 1500);
      
    }, 5000);
  };

  // Generate SVG paths for each segment
  const createSegmentPath = (index: number) => {
    const startAngle = index * segmentAngle;
    const endAngle = (index + 1) * segmentAngle;
    
    // Convert angle to radians (subtract 90 to start at top)
    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (endAngle - 90) * Math.PI / 180;
    
    const x1 = 150 + 150 * Math.cos(startRad);
    const y1 = 150 + 150 * Math.sin(startRad);
    const x2 = 150 + 150 * Math.cos(endRad);
    const y2 = 150 + 150 * Math.sin(endRad);
    
    // SVG arc command: M startX startY A rx ry x-axis-rotation large-arc-flag sweep-flag endX endY
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    
    return `M 150 150 L ${x1} ${y1} A 150 150 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  const getSegmentGradients = (index: number) => {
    const gradients = [
      { id: 'grad-0', from: '#ff4d4d', to: '#cc0000' }, // Red
      { id: 'grad-1', from: '#ff8800', to: '#cc5500' }, // Orange
      { id: 'grad-2', from: '#ffcc00', to: '#c28500' }, // Gold
      { id: 'grad-3', from: '#00e673', to: '#008040' }, // Green
      { id: 'grad-4', from: '#00d2ff', to: '#0077aa' }, // Cyan
      { id: 'grad-5', from: '#4d94ff', to: '#004de6' }, // Blue
      { id: 'grad-6', from: '#b366ff', to: '#6600cc' }, // Purple
      { id: 'grad-7', from: '#ff00aa', to: '#990066' }, // Magenta
      { id: 'grad-8', from: '#ff66a3', to: '#e6005c' }, // Pink
      { id: 'grad-9', from: '#00f5d4', to: '#009b86' }, // Teal
      { id: 'grad-10', from: '#fee440', to: '#d4af37' }, // Yellow
      { id: 'grad-11', from: '#70e000', to: '#38b000' }, // Lime
      { id: 'grad-12', from: '#9b5de5', to: '#5a189a' }, // Violet
      { id: 'grad-13', from: '#f72585', to: '#7209b7' }, // Rose
      { id: 'grad-14', from: '#4361ee', to: '#3a0ca3' }, // Indigo
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-slate-900/90 rounded-3xl border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.15)] backdrop-blur-xl">
      <h3 className="text-xl font-black text-white font-display mb-2 text-center">
        Spin for your Jackpot!
      </h3>
      <p className="text-sm text-slate-400 mb-6 text-center max-w-xs">
        Your 6 selections are locked in! Spin the wheel to determine your potential multiplier if you get 6/6 correct.
      </p>

      <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] mb-8 mt-4 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Glow behind wheel */}
        <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Pointer (Premium Golden Arrow) */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 drop-shadow-[0_5px_10px_rgba(0,0,0,0.6)]">
          <svg width="40" height="60" viewBox="0 0 40 60">
            <defs>
              <linearGradient id="goldArrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff3a1" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#996515" />
              </linearGradient>
            </defs>
            <path d="M20 60 L0 25 C0 10, 10 0, 20 0 C30 0, 40 10, 40 25 Z" fill="url(#goldArrowGrad)" stroke="#ffffff" strokeWidth="2" />
            <circle cx="20" cy="20" r="6" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
          </svg>
        </div>

        {/* Wheel Container */}
        <div 
          className="w-full h-full rounded-full relative"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transitionDuration: isSpinning ? '5s' : '0s',
            transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        >
          <svg viewBox="0 0 300 300" className="w-full h-full rounded-full overflow-hidden">
            <defs>
              <radialGradient id="metalGrad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#d4af37" />
                <stop offset="80%" stopColor="#aa7c11" />
                <stop offset="100%" stopColor="#6b4c05" />
              </radialGradient>
              <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
                <stop offset="85%" stopColor="transparent" />
                <stop offset="95%" stopColor="#1a1a1a" />
                <stop offset="100%" stopColor="#000000" />
              </radialGradient>
              {segments.map((_, i) => {
                const grad = getSegmentGradients(i);
                return (
                  <linearGradient key={grad.id} id={grad.id} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={grad.from} />
                    <stop offset="100%" stopColor={grad.to} />
                  </linearGradient>
                );
              })}
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Base Dark Outer Rim Background */}
            <circle cx="150" cy="150" r="150" fill="#111" />
            
            {/* The sliced inner wheel */}
            <g transform="translate(0,0)">
              {segments.map((mult, i) => {
                const grad = getSegmentGradients(i);
                const textAngle = i * segmentAngle + (segmentAngle / 2);
                const textRad = (textAngle - 90) * Math.PI / 180;
                // Place text appropriately along the slice radius
                const textRadius = segments.length > 8 ? 100 : 95;
                const textX = 150 + textRadius * Math.cos(textRad);
                const textY = 150 + textRadius * Math.sin(textRad);
                
                return (
                  <g key={i}>
                    <path 
                      d={createSegmentPath(i)} 
                      fill={`url(#${grad.id})`}
                      stroke="#ffe699"
                      strokeWidth="1.5"
                    />
                    <text 
                      x={textX} 
                      y={textY} 
                      fill="#ffffff" 
                      fontSize={segments.length > 8 ? (mult >= 100 ? "10.5" : "11.5") : (mult >= 200 ? "24" : "18")} 
                      fontWeight="900"
                      fontFamily="Outfit, sans-serif"
                      textAnchor="middle" 
                      alignmentBaseline="middle"
                      transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                      filter="url(#glow)"
                      className="drop-shadow-lg"
                    >
                      {mult}X
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Premium Gold Rim overlay */}
            <circle cx="150" cy="150" r="140" fill="none" stroke="url(#metalGrad)" strokeWidth="20" />
            <circle cx="150" cy="150" r="150" fill="url(#rimGrad)" pointerEvents="none" />
            <circle cx="150" cy="150" r="130" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            <circle cx="150" cy="150" r="148" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="4" />
            
            {/* Glowing Neon Lights around the rim */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = i * 15;
              const rad = (angle - 90) * Math.PI / 180;
              const cx = 150 + 140 * Math.cos(rad);
              const cy = 150 + 140 * Math.sin(rad);
              const isEven = i % 2 === 0;
              return (
                <circle 
                  key={`light-${i}`} 
                  cx={cx} cy={cy} r={isEven ? "4" : "2.5"} 
                  fill={isEven ? "#ffffff" : "#ffe699"} 
                  filter={isEven ? "url(#glow)" : "none"}
                  opacity={isSpinning ? 0.8 : 1}
                >
                  {isSpinning && (
                    <animate attributeName="opacity" values="0.2;1;0.2" dur={`${0.1 + Math.random() * 0.2}s`} repeatCount="indefinite" />
                  )}
                </circle>
              );
            })}

            {/* Center Premium Metallic Hub */}
            <circle cx="150" cy="150" r="22" fill="#111" stroke="url(#metalGrad)" strokeWidth="4" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.7))" />
            <circle cx="150" cy="150" r="12" fill="url(#metalGrad)" />
            <circle cx="150" cy="150" r="6" fill="#333" />
          </svg>
        </div>
      </div>

      {!hasSpun ? (
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className={`px-8 py-3 rounded-xl font-black text-white text-lg transition-all shadow-lg shadow-[#FF6B00]/40 ${
            isSpinning 
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-[#FF6B00] via-[#FF8800] to-[#FFAA00] hover:scale-105 active:scale-95 animate-pulse'
          }`}
        >
          {isSpinning ? 'SPINNING...' : 'SPIN WHEEL'}
        </button>
      ) : (
        <div className="text-center animate-bounce mt-2">
          <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">You landed on</div>
          <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FFAA00]">
            {selectedMultiplier}X MULTIPLIER!
          </div>
        </div>
      )}
    </div>
  );
};
