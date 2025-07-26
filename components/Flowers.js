import React, { useState, useEffect } from 'react';

const Flower = ({ flower }) => {
  const [isNew, setIsNew] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const mountTimer = requestAnimationFrame(() => {
        setIsMounted(true);
    });
    
    // Set a timer to soften the glow after the initial "bloom"
    const glowTimer = setTimeout(() => {
      setIsNew(false);
    }, 2500);

    return () => {
      cancelAnimationFrame(mountTimer);
      clearTimeout(glowTimer);
    };
  }, []);

  // Dynamically set styles for animations and the glow effect
  const style = {
    color: flower.color,
    transition: 'opacity 1s ease-out, transform 1s ease-out, filter 1.5s ease-in-out',
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? 'scale(1)' : 'scale(0.5)',
    filter: isNew
      ? `drop-shadow(0 0 18px ${flower.color}) drop-shadow(0 0 40px ${flower.color}44)` // Intense glow for new flowers
      : `drop-shadow(0 0 8px ${flower.color}aa)`, // Softer, ambient glow for existing flowers
  };

  return (
    <div
      style={style}
      className="w-full h-full transform-gpu"
      dangerouslySetInnerHTML={{ __html: flower.svg }}
    />
  );
};

export default Flower;
