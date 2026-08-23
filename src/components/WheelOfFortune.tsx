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

  const segments = [50, 100, 50, 150, 50, 200, 100, 250, 300, 150, 500];
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

  const getSegmentColor = (index: number, value: number) => {
    if (value === 500) return '#4ADE80'; // Emerald for jackpot
    if (value >= 200) return '#FF6B00'; // Orange for high
    if (value >= 100) return '#FF8800'; // Light orange for med
    return index % 2 === 0 ? '#1A223E' : '#253058'; // Alternate for low
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-2xl border border-[#FF6B00]/30 shadow-2xl">
      <h3 className="text-xl font-black text-white font-display mb-2 text-center">
        Spin for your Jackpot!
      </h3>
      <p className="text-sm text-slate-400 mb-6 text-center max-w-xs">
        Your 6 selections are locked in! Spin the wheel to determine your potential multiplier if you get 6/6 correct.
      </p>

      <div className="relative w-72 h-72 mb-6">
        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 w-8 h-8 text-[#FF6B00] drop-shadow-lg">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22L2 2h20L12 22z" />
          </svg>
        </div>

        {/* Wheel SVG */}
        <div 
          className="w-full h-full rounded-full shadow-[0_0_40px_rgba(255,107,0,0.2)] border-4 border-slate-800 relative overflow-hidden transition-transform"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transitionDuration: isSpinning ? '5s' : '0s',
            transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)' // smooth deceleration
          }}
        >
          <svg viewBox="0 0 300 300" className="w-full h-full">
            {segments.map((mult, i) => {
              const textAngle = i * segmentAngle + (segmentAngle / 2);
              const textRad = (textAngle - 90) * Math.PI / 180;
              const textX = 150 + 100 * Math.cos(textRad);
              const textY = 150 + 100 * Math.sin(textRad);
              
              return (
                <g key={i}>
                  <path 
                    d={createSegmentPath(i)} 
                    fill={getSegmentColor(i, mult)}
                    stroke="#050816"
                    strokeWidth="2"
                  />
                  <text 
                    x={textX} 
                    y={textY} 
                    fill="white" 
                    fontSize={mult >= 200 ? "18" : "14"} 
                    fontWeight="bold" 
                    textAnchor="middle" 
                    alignmentBaseline="middle"
                    transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                  >
                    {mult}X
                  </text>
                </g>
              );
            })}
          </svg>
          
          {/* Inner circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-900 rounded-full border-4 border-slate-800 flex items-center justify-center shadow-inner">
            <Zap className="w-6 h-6 text-[#FF6B00]" />
          </div>
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
