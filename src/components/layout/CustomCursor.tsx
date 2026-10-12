import { useEffect, useState, useRef, memo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = memo(() => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isHoveredRef = useRef(false);
  const isVisibleRef = useRef(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Smooth springs for outer ring
  const ringX = useSpring(rawX, { damping: 28, stiffness: 350, mass: 0.4 });
  const ringY = useSpring(rawY, { damping: 28, stiffness: 350, mass: 0.4 });

  useEffect(() => {
    // Only run on non-touch devices with fine pointers and no reduced motion preference
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const shouldHover = Boolean(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      );
      if (shouldHover !== isHoveredRef.current) {
        isHoveredRef.current = shouldHover;
        setIsHovered(shouldHover);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [rawX, rawY]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer subtle ring */}
      <motion.div
        className="absolute rounded-full border border-white/40 mix-blend-difference pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: isHovered ? -24 : -14,
          translateY: isHovered ? -24 : -14,
        }}
        animate={{
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          scale: isHovered ? 1.2 : 1,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
        }}
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
      />
      {/* Center sharp dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 bg-white rounded-full mix-blend-difference pointer-events-none"
        style={{
          x: rawX,
          y: rawY,
          translateX: -3,
          translateY: -3,
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
        transition={{
          duration: 0.15,
        }}
      />
    </div>
  );
});

CustomCursor.displayName = 'CustomCursor';
