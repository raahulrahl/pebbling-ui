"use client";
import React from "react";
import { BentoCard } from "./BentoGrid";
import { LockIcon, PuzzleIcon, Brain, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const FeatureSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // Hover variants are applied directly in the whileHover prop of motion.div

  return (
    <section className="w-full py-8 md:py-16 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-3 text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Powerful Features
          </h2>
          <p className="max-w-[600px] text-sm text-gray-500 md:text-base dark:text-gray-400">
            Our platform is built with cutting-edge technology to power your applications
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[18rem]"
        >
          <motion.div variants={itemVariants} whileHover="hover" custom={0} className="md:col-span-1">
            <BentoCard
              name="Security First"
              className="h-full transition-all duration-300 hover:border-blue-500 hover:border-2"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 opacity-70">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                </div>
              }
              Icon={() => (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 group-hover:scale-110 transition-transform duration-300">
                  <LockIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              )}
              description="Built on mutual TLS (mTLS) for end-to-end trust"
              href="#"
              cta="Learn more"
            />
          </motion.div>
          
          <motion.div variants={itemVariants} whileHover="hover" custom={1} className="md:col-span-2">
            <BentoCard
              name="Framework-Agnostic"
              className="h-full transition-all duration-300 hover:border-purple-500 hover:border-2"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 opacity-70">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                </div>
              }
              Icon={() => (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 group-hover:scale-110 transition-transform duration-300">
                  <PuzzleIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              )}
              description="Adapters bridge internal APIs across ecosystems"
              href="#"
              cta="Learn more"
            />
          </motion.div>
          
          <motion.div variants={itemVariants} whileHover="hover" custom={2} className="md:col-span-2">
            <BentoCard
              name="Stateful by Default"
              className="h-full transition-all duration-300 hover:border-amber-500 hover:border-2"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 opacity-70">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                </div>
              }
              Icon={() => (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              )}
              description="Maintain agent memory and cognition across requests"
              href="#"
              cta="Learn more"
            />
          </motion.div>
          
          <motion.div variants={itemVariants} whileHover="hover" custom={3} className="md:col-span-1">
            <BentoCard
              name="Blazing Fast"
              className="h-full transition-all duration-300 hover:border-red-500 hover:border-2"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 opacity-70">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                </div>
              }
              Icon={() => (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              )}
              description="Lightweight protocol optimized for distributed deployments"
              href="#"
              cta="Learn more"
            />
          </motion.div>
          
          <motion.div variants={itemVariants} whileHover="hover" custom={4} className="md:col-span-3">
            <BentoCard
              name="Future-Proof"
              className="h-full transition-all duration-300 hover:border-emerald-500 hover:border-2"
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20 opacity-70">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                </div>
              }
              Icon={() => (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              )}
              description="Built for the coming wave of autonomous applications"
              href="#"
              cta="Learn more"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
