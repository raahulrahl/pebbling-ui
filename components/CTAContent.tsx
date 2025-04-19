"use client";
import React from "react";
import { Globe } from "./Globe";
import { motion } from "framer-motion";

export const CTAContent = () => {
  return (
    <section className="w-full py-12 md:py-24 relative overflow-hidden bg-background text-foreground">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-br from-pink-500 via-purple-500 to-purple-400 bg-clip-text text-transparent inline-block font-extrabold">Built to scale</span>
            </h2>
            <p className="text-muted-foreground md:text-xl max-w-md">
              Whether you need millions of agents or clicks, we&apos;ve got you covered.
            </p>

            <div className="space-y-3 mt-4">
              <div className="flex flex-col">
                <span className="text-purple-400 font-bold text-2xl">15 millions+</span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">AGENTS</span>
              </div>

              <div className="flex flex-col">
                <span className="text-purple-400 font-bold text-2xl">10+</span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">WEBSITE</span>
              </div>

              <div className="flex flex-col">
                <span className="text-purple-400 font-bold text-2xl">Will Live Soon</span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">Communication pings(Build)</span>
              </div>
            </div>
          </motion.div>

          <div className="relative h-[400px] md:h-[500px]">
            {/* Using a fixed size container for Globe to prevent re-renders */}
            <div className="w-full h-full">
              <Globe className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAContent;
