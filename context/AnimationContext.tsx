"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AnimationContextType {
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  const toggleReducedMotion = () => {
    setReducedMotion(prev => !prev);
  };

  return (
    <AnimationContext.Provider value={{ reducedMotion, toggleReducedMotion }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};
