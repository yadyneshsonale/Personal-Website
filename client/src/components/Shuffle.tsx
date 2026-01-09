import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface ShuffleProps {
  text: string;
  shuffleDirection?: 'left' | 'right';
  duration?: number;
  animationMode?: 'even' | 'odd' | 'evenodd';
  shuffleTimes?: number;
  ease?: string;
  stagger?: number;
  threshold?: number;
  triggerOnce?: boolean;
  triggerOnHover?: boolean;
  respectReducedMotion?: boolean;
  className?: string;
}

const Shuffle: React.FC<ShuffleProps> = ({
  text,
  shuffleDirection = 'right',
  duration = 0.35,
  animationMode = 'evenodd',
  shuffleTimes = 1,
  ease = 'power3.out',
  stagger = 0.03,
  threshold = 0.1,
  triggerOnce = true,
  triggerOnHover = true,
  respectReducedMotion = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

  const shuffle = () => {
    if (respectReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (triggerOnce && hasAnimated) {
      return;
    }

    const spans = containerRef.current?.querySelectorAll('.shuffle-char');
    if (!spans) return;

    spans.forEach((span, index) => {
      const originalText = span.getAttribute('data-original') || '';
      
      // Determine if this character should animate based on mode
      let shouldAnimate = true;
      if (animationMode === 'even') shouldAnimate = index % 2 === 0;
      if (animationMode === 'odd') shouldAnimate = index % 2 !== 0;

      if (!shouldAnimate) return;

      let iterations = 0;
      const interval = setInterval(() => {
        span.textContent = characters[Math.floor(Math.random() * characters.length)];
        iterations++;

        if (iterations >= shuffleTimes * 3) {
          clearInterval(interval);
          gsap.to(span, {
            duration: duration / 2,
            opacity: 1,
            onComplete: () => {
              span.textContent = originalText;
            }
          });
        }
      }, duration * 1000 / (shuffleTimes * 3));
    });

    // Stagger animation
    const direction = shuffleDirection === 'right' ? 1 : -1;
    gsap.fromTo(
      spans,
      { x: -20 * direction, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: duration,
        ease: ease,
        stagger: stagger,
      }
    );

    setHasAnimated(true);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up intersection observer for scroll-triggered animation
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            shuffle();
          }
        });
      },
      { threshold }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      shuffle();
    }
  };

  return (
    <span
      ref={containerRef}
      className={`shuffle-container ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="shuffle-char"
          data-original={char}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default Shuffle;
