"use client";

import React, { useRef, useEffect } from 'react';

interface ParticlesBackgroundProps {
  className?: string;
  containerId?: string;
}

// This is now a legacy wrapper component that delegates to our SimpleParticles approach
// Keeping this for backward compatibility while we transition to the new solution
export function ParticlesBackground({ className, containerId = "hero-particles" }: ParticlesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Empty implementation - we're using SimpleParticles instead
    return () => {
      // No cleanup needed
    };
  }, [containerId]);

  return (
    <div ref={containerRef} id={containerId} className={className}>
      {/* Simplified placeholder for backward compatibility */}
      <div className="absolute inset-0 opacity-0">
        {/* No content - using SimpleParticles instead */}
      </div>
    </div>
  );
}
