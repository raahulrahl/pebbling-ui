"use client";
import { useEffect, useRef, useState } from "react";

interface SimpleParticlesProps {
  className?: string;
}

export function SimpleParticles({ className }: SimpleParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile for performance optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match parent
    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle configuration - fewer particles on mobile for better performance
    const particleCount = isMobile ? 50 : 80;
    const linkDistance = isMobile ? 100 : 150;
    const particles: Particle[] = [];

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      opacityDir: number;
    }

    // Add a margin to keep particles from hitting the edge exactly
    const margin = 5;
    const effectiveWidth = canvas.width - (margin * 2);
    const effectiveHeight = canvas.height - (margin * 2);

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: margin + Math.random() * effectiveWidth,
        y: margin + Math.random() * effectiveHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * (isMobile ? 0.7 : 1),
        speedY: (Math.random() - 0.5) * (isMobile ? 0.7 : 1),
        opacity: Math.random() * 0.5 + 0.1,
        opacityDir: Math.random() > 0.5 ? 0.005 : -0.005
      });
    }

    // Animation loop with performance optimization
    let animationId: number;
    let lastTime = 0;
    const fps = isMobile ? 30 : 60; // Lower FPS on mobile
    const fpsInterval = 1000 / fps;

    const animate = (timestamp: number) => {
      if (!canvas || !ctx) return;
      
      // Throttle frame rate for performance
      if (timestamp - lastTime < fpsInterval) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      lastTime = timestamp;
      
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Twinkle effect by changing opacity
        p.opacity += p.opacityDir;
        if (p.opacity > 0.6 || p.opacity < 0.1) {
          p.opacityDir *= -1;
        }
        
        // Bounce off edges with strict boundary enforcement
        if (p.x >= canvas.width - margin) {
          p.x = canvas.width - margin;
          p.speedX *= -1;
        } else if (p.x <= margin) {
          p.x = margin;
          p.speedX *= -1;
        }
        
        if (p.y >= canvas.height - margin) {
          p.y = canvas.height - margin;
          p.speedY *= -1;
        } else if (p.y <= margin) {
          p.y = margin;
          p.speedY *= -1;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
        
        // Only draw links on non-mobile devices or if there aren't too many particles
        if (!isMobile || particles.length < 60) {
          // Draw links between particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < linkDistance) {
              const opacity = 0.3 * (1 - distance / linkDistance);
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationId = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', checkMobile);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  return (
    <canvas 
      ref={canvasRef} 
      className={className} 
      style={{ 
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        clipPath: 'inset(0)',  // Ensure content stays inside
        overflow: 'hidden'     // Extra safety measure
      }}
    />
  );
}
