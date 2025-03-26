"use client";
import React from "react";
import { Globe } from "./Globe";
import { motion } from "framer-motion";

export const CTAContent = () => {
  return (
    <section className="w-full py-12 md:py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Built to scale
            </h2>
            <p className="text-gray-500 md:text-xl max-w-md">
              Whether you need millions of agents or clicks, we've got you covered.
            </p>

            <div className="space-y-3 mt-4">
              <div className="flex flex-col">
                <span className="text-orange-500 font-bold text-2xl">15 millions+</span>
                <span className="text-xs uppercase tracking-wider text-gray-500">AGENTS</span>
              </div>

              <div className="flex flex-col">
                <span className="text-orange-500 font-bold text-2xl">10+</span>
                <span className="text-xs uppercase tracking-wider text-gray-500">WEBSITE</span>
              </div>

              <div className="flex flex-col">
                <span className="text-orange-500 font-bold text-2xl">Will Live Soon</span>
                <span className="text-xs uppercase tracking-wider  text-gray-500">Communication pings(Build)</span>
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
