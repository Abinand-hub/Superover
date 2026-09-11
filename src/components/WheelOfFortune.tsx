import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { api } from '../services/api';
import { formatINR } from '../utils/payoutCalculator';

interface WheelOfFortuneProps {
  onComplete: (multiplier: number) => void;
  onExit?: () => void;
  baseStake?: number;
  finalPayable?: number;
  onSpinStart?: () => void;
}

const DEFAULT_WHEEL_CONFIG = [
  { multiplier: 60, probability: 25 },
  { multiplier: 75, probability: 20 },
  { multiplier: 80, probability: 15 },
  { multiplier: 100, probability: 12 },
  { multiplier: 110, probability: 8 },
  { multiplier: 120, probability: 6 },
  { multiplier: 140, probability: 5 },
  { multiplier: 150, probability: 3 },
  { multiplier: 175, probability: 2 },
  { multiplier: 200, probability: 1.5 },
  { multiplier: 250, probability: 1 },
  { multiplier: 300, probability: 0.8 },
  { multiplier: 400, probability: 0.4 },
  { multiplier: 500, probability: 0.3 },
];

export const WheelOfFortune: React.FC<WheelOfFortuneProps> = ({ 
  onComplete, 
  onExit,
  baseStake = 50, 
  finalPayable,
  onSpinStart
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);
  const [selectedMultiplier, setSelectedMultiplier] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number>(5);
  
  const [wheelConfig, setWheelConfig] = useState(DEFAULT_WHEEL_CONFIG);

  useEffect(() => {
    // Fetch dynamic probabilities from settings if available (exclude 50X)
    api.getSettings().then(settings => {
      if (settings && settings.wheelProbabilities && settings.wheelProbabilities.length > 0) {
        const parsed = settings.wheelProbabilities
          .map((p: any) => ({
            multiplier: Number(p.multiplier || (typeof p.segment === 'string' ? parseInt(p.segment.replace(/\D/g, '')) : p.segment) || 60),
            probability: Number(p.probability || 0)
          }))
          .filter(p => p.multiplier !== 50); // Explicitly remove 50X

        if (parsed.length > 0) {
          setWheelConfig(parsed);
        }
      }
    }).catch(console.error);
  }, []);

  const segments = wheelConfig.map(c => c.multiplier);
  const segmentAngle = 360 / segments.length;

  const spinWheel = () => {
    if (isSpinning || hasSpun) return;
    
    setIsSpinning(true);
    if (onSpinStart) {
      onSpinStart();
    }
    
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
      setCountdown(5);
    }, 5000);
  };

  // 5-second countdown timer after landing on multiplier, then auto-continue to next screen
  useEffect(() => {
    if (!hasSpun || selectedMultiplier === null) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete(selectedMultiplier);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasSpun, selectedMultiplier, onComplete]);

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
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-900/95 rounded-2xl sm:rounded-3xl border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.15)] backdrop-blur-xl">
      <div className="text-center mb-3 sm:mb-4">
        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-black text-[10px] sm:text-xs uppercase border border-amber-500/30 inline-flex items-center gap-1 mb-1">
          <Sparkles className="w-3 h-3" />
          14 JACKPOT MULTIPLIERS
        </span>
        <h3 className="text-lg sm:text-2xl font-black text-white font-display">
          Spin for your Jackpot!
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5 max-w-xs mx-auto">
          Spin the wheel to lock your 6/6 boost multiplier up to <span className="text-amber-400 font-bold">500X</span>!
        </p>
      </div>

      {/* Wheel Sizing & Responsive Container */}
      <div className="relative w-[230px] h-[230px] sm:w-[290px] sm:h-[290px] mb-4 sm:mb-6 mt-2 drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] shrink-0">
        {/* Glow behind wheel */}
        <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl animate-pulse"></div>
        
        {/* Pointer (Premium Golden Arrow) */}
        <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 z-30 drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]">
          <svg width="34" height="50" viewBox="0 0 40 60" className="sm:w-[40px] sm:h-[60px]">
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
                const textRadius = segments.length > 8 ? 102 : 95;
                const textX = 150 + textRadius * Math.cos(textRad);
                const textY = 150 + textRadius * Math.sin(textRad);
                
                return (
                  <g key={i}>
                    <path 
                      d={createSegmentPath(i)} 
                      fill={`url(#${grad.id})`}
                      stroke="#ffe699"
                      strokeWidth="1.2"
                    />
                    <text 
                      x={textX} 
                      y={textY} 
                      fill="#ffffff" 
                      fontSize={segments.length > 8 ? (mult >= 100 ? "10" : "11") : (mult >= 200 ? "22" : "16")} 
                      fontWeight="900"
                      fontFamily="Outfit, sans-serif"
                      textAnchor="middle" 
                      alignmentBaseline="middle"
                      transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                      filter="url(#glow)"
                      className="drop-shadow-md"
                    >
                      {mult}X
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Premium Gold Rim overlay */}
            <circle cx="150" cy="150" r="140" fill="none" stroke="url(#metalGrad)" strokeWidth="18" />
            <circle cx="150" cy="150" r="150" fill="url(#rimGrad)" pointerEvents="none" />
            <circle cx="150" cy="150" r="131" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            <circle cx="150" cy="150" r="148" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="3" />
            
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
                  cx={cx} cy={cy} r={isEven ? "3.5" : "2"} 
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
            <circle cx="150" cy="150" r="20" fill="#111" stroke="url(#metalGrad)" strokeWidth="3.5" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.7))" />
            <circle cx="150" cy="150" r="11" fill="url(#metalGrad)" />
            <circle cx="150" cy="150" r="5" fill="#333" />
          </svg>
        </div>
      </div>

      {/* Action Area: Spin or 5-Second Celebration Screen without back/continue buttons */}
      <div className="w-full flex flex-col items-center">
        {!hasSpun ? (
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={`w-full max-w-xs py-3.5 sm:py-4 px-6 rounded-2xl font-black text-slate-950 text-base sm:text-lg transition-all shadow-xl shadow-[#FF6B00]/40 ${
              isSpinning 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-[#FF6B00] via-[#FF8800] to-[#FFAA00] hover:brightness-110 active:scale-95 animate-pulse'
            }`}
          >
            {isSpinning ? 'SPINNING FOR JACKPOT...' : '🎰 SPIN THE WHEEL!'}
          </button>
        ) : (
          <div className="w-full max-w-xs flex flex-col items-center gap-3 animate-in zoom-in-95 duration-300">
            {/* Multiplier Won Celebration Card with Party Poppers 🎉 */}
            <div className="w-full bg-gradient-to-b from-amber-500/25 via-slate-900 to-slate-950 border-2 border-amber-400/60 rounded-3xl p-4 sm:p-5 text-center shadow-[0_0_40px_rgba(245,158,11,0.25)] relative overflow-hidden">
              <div className="text-3xl sm:text-4xl mb-1 animate-bounce">🎉 🥳 🎉</div>
              <span className="text-[10px] sm:text-xs font-black text-amber-400 uppercase tracking-widest block">
                YOU LANDED ON
              </span>
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FFAA00] to-yellow-300 font-display mt-0.5 drop-shadow-md">
                {selectedMultiplier}X JACKPOT!
              </div>
              <div className="text-xs text-slate-300 mt-1.5 flex items-center justify-center gap-1.5 font-medium">
                <span>Potential 6/6 Win:</span>
                <span className="font-mono font-black text-emerald-400 text-base">
                  {formatINR(baseStake * (selectedMultiplier || 60))}
                </span>
              </div>

              {/* Auto-redirect countdown & progress bar */}
              <div className="mt-4 pt-3 border-t border-amber-500/30 flex flex-col items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                  <span>Locking your {selectedMultiplier}X boost in {countdown}s...</span>
                  <span>🎉</span>
                </div>
                
                {/* Animated progress bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-1000 ease-linear rounded-full"
                    style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                  />
                </div>
                
                <span className="text-[10px] text-slate-400">
                  Auto-continuing to confirmation slip...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
