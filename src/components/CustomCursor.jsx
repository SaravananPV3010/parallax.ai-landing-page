import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(() => {
    // Hide default cursor
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    // Create quickTo instances for high performance
    const xToDot = gsap.quickTo(dotRef.current, "x", { duration: 0.1, ease: "power3.out" });
    const yToDot = gsap.quickTo(dotRef.current, "y", { duration: 0.1, ease: "power3.out" });
    
    // Ring follows the dot but slightly slower for interpolation
    const xToRing = gsap.quickTo(ringRef.current, "x", { duration: 0.35, ease: "power3" });
    const yToRing = gsap.quickTo(ringRef.current, "y", { duration: 0.35, ease: "power3" });

    const handleMouseMove = (e) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // Check if hovering over an interactive element
      const isHoverable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(isHoverable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-[width,height,margin,opacity,border-radius,background-color] duration-300 ease-out flex items-center justify-center mix-blend-difference"
        style={{
          width: isHovering ? '64px' : '36px',
          height: isHovering ? '64px' : '36px',
          marginLeft: isHovering ? '-32px' : '-18px',
          marginTop: isHovering ? '-32px' : '-18px',
          opacity: isHovering ? 0.8 : 1,
          border: isHovering ? '1px solid transparent' : '1px solid white',
          backgroundColor: isHovering ? 'white' : 'transparent',
          borderRadius: '50%'
        }}
      />
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 ml-[-4px] mt-[-4px] bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-200 ${isHovering ? 'scale-0' : 'scale-100'}`}
      />
    </>
  );
};

export default CustomCursor;
