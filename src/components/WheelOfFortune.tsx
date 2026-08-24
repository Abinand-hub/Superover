import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

interface WheelOfFortuneProps {
  onComplete: (multiplier: number) => void;
}

export const WheelOfFortune: React.FC<WheelOfFortuneProps> = ({ onComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);
  const [selectedMultiplier, setSelectedMultiplier] = useState<number | null>(null);

  const segments = [100, 125, 150, 200, 250, 300, 350, 400, 450, 500];
  const segmentAngle = 360 / segments.length;

  const spinWheel = () => {
    if (isSpinning || hasSpun) return;
    
    setIsSpinning(true);
    
    // Choose a random segment to win
    const winningIndex = Math.floor(Math.random() * segments.length);
    const winningMultiplier = segments[winningIndex];
    
    // Calculate final rotation
    const spins = 5; // Spin 5 times
    const baseRotation = spins * 360;
    // We want the winning index to land at the top (0 degrees).
    // The top is 0 deg. If wheel rotates clockwise, segment at angle A will be at top if rotation is 360 - A.
    // However, SVG is drawn starting from right usually, but we will draw from top.
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

  const getSegmentColor = (index: number) => {
    const colors = [
      '#901C3A', // Maroon
      '#3482C5', // Blue
      '#F2B807', // Yellow
      '#E54546', // Red
      '#C8C9BD', // Silver/Off-White
      '#1F9B7A', // Teal
      '#EB6E48', // Orange
      '#901C3A', // Maroon
      '#3482C5', // Blue
      '#F2B807', // Yellow
      '#E54546', // Red
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-2xl border border-[#FF6B00]/30 shadow-2xl">
      <h3 className="text-xl font-black text-white font-display mb-2 text-center">
        Spin for your Jackpot!
      </h3>
      <p className="text-sm text-slate-400 mb-6 text-center max-w-xs">
        Your 6 selections are locked in! Spin the wheel to determine your potential multiplier if you get 6/6 correct.
      </p>

      <div className="relative w-[250px] h-[250px] sm:w-72 sm:h-72 mb-6 drop-shadow-2xl">
        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <svg width="24" height="40" viewBox="0 0 24 40">
            <path d="M4 0 H20 V24 L12 36 L4 24 Z" fill="#F2B807" stroke="#b38703" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
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
          <svg viewBox="0 0 300 300" className="w-full h-full rounded-full overflow-hidden filter drop-shadow-xl">
            {/* Base Red Outer Rim Background */}
            <circle cx="150" cy="150" r="150" fill="#CC0000" />
            
            {/* The sliced inner wheel */}
            <g transform="translate(0,0)">
              {segments.map((mult, i) => {
                const textAngle = i * segmentAngle + (segmentAngle / 2);
                const textRad = (textAngle - 90) * Math.PI / 180;
                // Place text closer to edge
                const textX = 150 + 95 * Math.cos(textRad);
                const textY = 150 + 95 * Math.sin(textRad);
                
                return (
                  <g key={i}>
                    <path 
                      d={createSegmentPath(i)} 
                      fill={getSegmentColor(i)}
                      stroke="#444"
                      strokeWidth="1"
                    />
                    <text 
                      x={textX} 
                      y={textY} 
                      fill="white" 
                      fontSize={mult >= 200 ? "18" : "14"} 
                      fontWeight="900"
                      fontFamily="Outfit, sans-serif"
                      stroke="black"
                      strokeWidth="2.5"
                      paintOrder="stroke"
                      textAnchor="middle" 
                      alignmentBaseline="middle"
                      transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                      className="drop-shadow-md"
                    >
                      {mult}X
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Thick Red Rim overlay */}
            <circle cx="150" cy="150" r="140" fill="none" stroke="#CC0000" strokeWidth="20" />
            <circle cx="150" cy="150" r="130" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="3" />
            
            {/* Metallic Studs around the rim */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = i * 30;
              const rad = (angle - 90) * Math.PI / 180;
              const cx = 150 + 140 * Math.cos(rad);
              const cy = 150 + 140 * Math.sin(rad);
              return (
                <circle 
                  key={`stud-${i}`} 
                  cx={cx} cy={cy} r="3.5" 
                  fill="url(#metalGrad)" 
                  stroke="#555" strokeWidth="0.5" 
                  filter="drop-shadow(1px 1px 1px rgba(0,0,0,0.5))"
                />
              );
            })}

            {/* Center Metallic Hub */}
            <circle cx="150" cy="150" r="18" fill="url(#metalGrad)" stroke="#666" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))" />

            {/* Defs for Gradients */}
            <defs>
              <radialGradient id="metalGrad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#d4d4d4" />
                <stop offset="80%" stopColor="#999999" />
                <stop offset="100%" stopColor="#666666" />
              </radialGradient>
            </defs>
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
