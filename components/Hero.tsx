"use client"
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "./RainbowButton";
import { SimpleParticles } from "./SimpleParticles";
import { useUser } from "@clerk/nextjs";
import { FloatingPaths } from "../components/ui/background-paths";
import { useTheme } from "next-themes";
import NewBackgroundAnimation from "./NewBackground";

function Hero() {
  const { isSignedIn } = useUser();
  const [titleNumber, setTitleNumber] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const titles = useMemo(
    () => ["framework agnostic", "extensive agents", "ease of use", "secure protocol"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 4000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div 
      ref={heroRef} 
      id="hero-section" 
      className="w-full bg-background text-foreground relative overflow-hidden"
      style={{ 
        position: 'relative',
        height: 'auto', 
        minHeight: '70vh',
      }}
    >
      <div className="absolute inset-0 overflow-hidden z-0">
        <SimpleParticles className="absolute top-0 left-0 right-0 bottom-0 h-full w-full" />
        <div className="absolute inset-0 dark:hidden text-red-700">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
        {theme === 'dark' && <NewBackgroundAnimation className="absolute inset-0 w-full h-full" />}
      </div>
      
      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="flex gap-6 sm:gap-8 py-16 sm:py-20 lg:py-32 items-center justify-center flex-col">
          <div>
            <Button
              variant="secondary"
              size="sm"
              className="gap-4 text-foreground hover:bg-gray-800"
            >
              Read our launch article <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col w-full">
            <h1 className="text-4xl sm:text-5xl md:text-7xl tracking-tighter text-center font-regular px-2">
              <span className="bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-600 bg-clip-text text-transparent font-bold">Agentify Yourself</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-foreground"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                          y: 0,
                          opacity: 1,
                        }
                        : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl mx-auto text-center px-4">
              Pebble is the Esperanto for agent-to-agent communication — a simple, secure, and powerful protocol enabling collaboration across multiple agent frameworks.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center px-4">
            <motion.div
              className="relative w-full sm:w-auto"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="absolute inset-0 bg-purple-500/50 rounded-lg blur-lg animate-pulse hidden sm:block"
                style={{
                  animationDuration: '2s',
                  animationIterationCount: 'infinite',
                }}
              />
              <RainbowButton
                className="relative z-10 h-12 w-full"
              >
                <span className="flex items-center gap-2 justify-center">
                  Jump on a call <PhoneCall className="w-4 h-4" />
                </span>
              </RainbowButton>
            </motion.div>

            {!isSignedIn && (
              <motion.div
                className="relative w-full sm:w-auto"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute inset-0 bg-cyan-500/50 rounded-lg blur-lg animate-pulse hidden sm:block"
                  style={{
                    animationDuration: '2s',
                    animationIterationCount: 'infinite',
                  }}
                />
                <RainbowButton
                  className="relative z-10 h-12 w-full"
                  onClick={() => window.location.href = '/sign-up'}
                >
                  <span className="flex items-center gap-2 justify-center">
                    Sign up here <MoveRight className="w-4 h-4" />
                  </span>
                </RainbowButton>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
