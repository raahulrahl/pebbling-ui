"use client";
import React, { useRef } from "react";
import { Globe } from "./Globe";
import { motion, useInView } from "framer-motion";

export const CTAContent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // Trigger once when 30% is visible

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animation of children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="w-full py-12 md:py-24 relative overflow-hidden bg-background text-foreground"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants} // Apply container variants here
    >
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="flex flex-col space-y-4"
            variants={itemVariants} // Animate text block as one item
          >
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center ">
              <span className="bg-gradient-to-r from-red-700 via-red-500 to-orange-400 dark:bg-gradient-to-br dark:from-red-700 dark:via-red-600 dark:to-red-500 bg-clip-text text-transparent inline-block font-extrabold">
                Built to scale
              </span>
            </h2>
            <p className="text-muted-foreground md:text-xl max-w-md">
              Whether you need millions of agents or clicks, we&apos;ve got you covered.
            </p>

            <dl className="grid grid-cols-3 gap-4 text-center">
              <div>
                <dt className="text-sm text-muted-foreground">AGENTS</dt>
                <dd className="mt-1">
                  <span className="text-red-400 font-bold text-2xl">15 millions+</span>
                </dd>
              </div>

              <div>
                <dt className="text-sm text-muted-foreground">WEBSITE</dt>
                <dd className="mt-1">
                  <span className="text-red-400 font-bold text-2xl">10+</span>
                </dd>
              </div>

              <div>
                <dt className="text-sm text-muted-foreground">Communication pings(Build)</dt>
                <dd className="mt-1">
                  <span className="text-red-400 font-bold text-2xl">Will Live Soon</span>
                </dd>
              </div>
            </dl>
          </motion.div>

          <motion.div
            className="relative h-[400px] md:h-[500px]"
            variants={itemVariants} // Animate globe separately
          >
            {/* Using a fixed size container for Globe to prevent re-renders */}
            <div className="w-full h-full">
              <Globe className="w-full h-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CTAContent;
