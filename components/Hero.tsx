"use client"
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "./RainbowButton";
import { SignUpButton, useUser } from "@clerk/nextjs";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const { isSignedIn, user } = useUser();
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
    <div className="w-full bg-white text-black">
      <div className="container mx-auto px-4">
        <div className="flex gap-6 sm:gap-8 py-16 sm:py-20 lg:py-32 items-center justify-center flex-col">
          <div>
            <Button
              variant="secondary"
              size="sm"
              className="gap-4 bg-gray-100 text-black hover:bg-gray-200"
            >
              Read our launch article <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl sm:text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent font-bold">Agentify Yourself</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-gray-800"
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
            <p className="text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-gray-600 max-w-2xl text-center">
              Pebble is the Esperanto for agent-to-agent communication — a simple, secure, and powerful protocol enabling collaboration across multiple agent frameworks.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center">
            <motion.div
              className="relative"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="absolute inset-0 bg-blue-500/50 rounded-lg blur-lg animate-pulse hidden sm:block"
                style={{
                  animationDuration: '2s',
                  animationIterationCount: 'infinite',
                }}
              />
              <RainbowButton
                className="relative z-10 h-12 w-full sm:w-auto"
              >
                <span className="flex items-center gap-2">
                  Jump on a call <PhoneCall className="w-4 h-4" />
                </span>
              </RainbowButton>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="absolute inset-0 bg-green-500/50 rounded-lg blur-lg animate-pulse hidden sm:block"
                style={{
                  animationDuration: '2s',
                  animationIterationCount: 'infinite',
                }}
              />
              {isSignedIn ? (
                <RainbowButton
                  className="relative z-10 h-12 w-full sm:w-auto"
                >
                  <span className="flex items-center gap-2">
                    Dashboard <MoveRight className="w-4 h-4" />
                  </span>
                </RainbowButton>
              ) : (
                <SignUpButton mode="modal">
                  <RainbowButton
                    className="relative z-10 h-12 w-full sm:w-auto"
                  >
                    <span className="flex items-center gap-2">
                      Sign up here <MoveRight className="w-4 h-4" />
                    </span>
                  </RainbowButton>
                </SignUpButton>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
