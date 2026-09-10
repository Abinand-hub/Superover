import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { BannerItem } from '../types';

interface BannerCarouselProps {
  banners: BannerItem[];
  onNavigateTab?: (tab: 'lobby' | 'intro' | 'my-contests' | 'profile' | 'payouts-rules') => void;
  autoPlayInterval?: number;
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({
  banners = [],
  onNavigateTab,
  autoPlayInterval = 4500,
}) => {
  const activeBanners = banners.filter((b) => b.isActive !== false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    if (activeBanners.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  }, [activeBanners.length]);

  const prevSlide = useCallback(() => {
    if (activeBanners.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  }, [activeBanners.length]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Auto-play timer
  useEffect(() => {
    if (activeBanners.length <= 1 || isPaused) {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
      return;
    }

    autoPlayTimer.current = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [activeBanners.length, isPaused, autoPlayInterval, nextSlide]);

  // Touch Swipe Handlers for Mobile & Tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45; // Minimum px to trigger swipe

    if (diff > minSwipeDistance) {
      // Swiped Left -> Next
      nextSlide();
    } else if (diff < -minSwipeDistance) {
      // Swiped Right -> Prev
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (activeBanners.length === 0) {
    return null;
  }

  const currentBanner = activeBanners[currentIndex] || activeBanners[0];

  const handleBannerAction = (banner: BannerItem) => {
    if (banner.linkTab && onNavigateTab) {
      onNavigateTab(banner.linkTab);
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-[#1A2548] shadow-2xl shadow-black/60 group bg-[#060A1A]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Banner Slides Container */}
      <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 w-full overflow-hidden">
        {activeBanners.map((banner, index) => {
          const isCurrent = index === currentIndex;
          return (
            <div
              key={banner.id || index}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform ${
                isCurrent
                  ? 'opacity-100 translate-x-0 scale-100 z-10'
                  : index < currentIndex
                  ? 'opacity-0 -translate-x-full scale-95 z-0'
                  : 'opacity-0 translate-x-full scale-95 z-0'
              }`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 group-hover:scale-100"
                style={{
                  backgroundImage: `url(${banner.imageUrl})`,
                }}
              />

              {/* Multi-gradient overlay for readability & premium glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060A1A] via-[#060A1A]/70 to-[#060A1A]/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#060A1A] via-[#060A1A]/80 to-transparent" />

              {/* Content Overlay */}
              <div className="relative z-20 h-full max-w-2xl flex flex-col justify-end p-5 sm:p-7 md:p-8 space-y-2.5 sm:space-y-3">
                {/* Badge */}
                {banner.badge && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00]/20 border border-[#FF6B00]/40 text-[#FF8800] text-[10px] sm:text-xs font-black uppercase tracking-wider backdrop-blur-md w-fit shadow-md shadow-[#FF6B00]/10">
                    <Sparkles className="w-3 h-3 text-[#FFAA00]" />
                    <span>{banner.badge}</span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight font-display leading-tight drop-shadow-md">
                  {banner.title}
                </h3>

                {/* Subtitle */}
                {banner.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-xl leading-relaxed drop-shadow">
                    {banner.subtitle}
                  </p>
                )}

                {/* Call to Action button */}
                {banner.actionText && (
                  <div className="pt-1">
                    <button
                      onClick={() => handleBannerAction(banner)}
                      className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF7A00] to-[#FFA000] text-slate-950 font-black text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg shadow-[#FF6B00]/30 hover:brightness-110 active:scale-95 transition-all w-fit"
                    >
                      <span>{banner.actionText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Control: Previous Chevron Button */}
      {activeBanners.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous Slide"
          className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-slate-950/60 hover:bg-[#FF6B00] text-white hover:text-slate-950 border border-white/10 hover:border-[#FF6B00] backdrop-blur-md transition-all duration-200 shadow-xl opacity-80 hover:opacity-100 active:scale-90"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}

      {/* Manual Control: Next Chevron Button */}
      {activeBanners.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next Slide"
          className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-slate-950/60 hover:bg-[#FF6B00] text-white hover:text-slate-950 border border-white/10 hover:border-[#FF6B00] backdrop-blur-md transition-all duration-200 shadow-xl opacity-80 hover:opacity-100 active:scale-90"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}

      {/* Manual Control: Navigation Dots & Counter */}
      {activeBanners.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-4 right-4 sm:right-6 z-30 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10 shadow-lg">
          {activeBanners.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => goToSlide(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                dotIdx === currentIndex
                  ? 'w-6 bg-[#FF6B00] shadow-sm shadow-[#FF6B00]'
                  : 'w-2 bg-slate-500 hover:bg-slate-300'
              }`}
            />
          ))}
          <span className="text-[10px] font-mono font-bold text-slate-400 pl-1">
            {currentIndex + 1}/{activeBanners.length}
          </span>
        </div>
      )}
    </div>
  );
};
