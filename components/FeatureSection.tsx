"use client";
import React, { useRef } from "react";
import { LockIcon, PuzzleIcon, Brain, Zap, Sparkles, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  index: number;
  category: string;
}

const FeatureCard = ({ title, description, icon: Icon, index, category }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={cardRef}
      className="relative group rounded-xl bg-background p-6 sm:p-8 border border-border/50 overflow-hidden"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Gradient hover effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-indigo-400/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none" 
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Category label */}
      <div className="mb-4 inline-flex items-center bg-background/80 text-xs uppercase tracking-wider text-purple-600 font-medium">
        {category}
      </div>
      
      {/* Icon with gradient background */}
      <div className="mb-6 relative">
        <motion.div 
          className="absolute -inset-3 rounded-full bg-gradient-to-br from-purple-600/10 to-indigo-500/5 blur-md" 
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative bg-background/70 backdrop-blur-sm rounded-full p-3 inline-flex">
          {Icon && <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" strokeWidth={1.5} />}
        </div>
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm/relaxed mb-6">{description}</p>
      
      {/* Learn more button */}
      <motion.div 
        className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.button 
          className="text-xs sm:text-sm font-medium flex items-center gap-1 text-purple-600"
          whileHover={{ gap: "0.75rem" }}
          transition={{ duration: 0.3 }}
        >
          Learn more
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </motion.div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  return (
    <motion.h2
      ref={ref}
      className="text-xl md:text-2xl lg:text-3xl font-bold relative inline-block"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="relative z-10">{children}</span>
      <motion.span 
        className="absolute -bottom-2 left-0 h-3 bg-gradient-to-r from-purple-600/30 to-indigo-500/20 z-0" 
        initial={{ width: 0 }}
        animate={isInView ? { width: '100%' } : { width: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span 
        className="absolute -bottom-2 left-0 h-3 bg-purple-600/20 z-0" 
        initial={{ width: 0 }}
        animate={isInView ? { width: '40%' } : { width: 0 }}
        transition={{ duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.h2>
  );
};

const FeatureSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  
  // Original Pebbling features organized into categories
  const categories = [
    {
      name: "Build",
      description: "Powerful building blocks to create robust agent systems",
      features: [
        {
          title: "Security First",
          description: "Built on mutual TLS (mTLS) for end-to-end trust, ensuring your agent communications remain secure and authenticated.",
          icon: LockIcon,
        },
        {
          title: "Framework-Agnostic",
          description: "Adapters bridge internal APIs across ecosystems, allowing you to integrate with any existing technology stack.",
          icon: PuzzleIcon,
        }
      ]
    },
    {
      name: "Manage",
      description: "Tools to orchestrate and control your agent ecosystem",
      features: [
        {
          title: "Stateful by Default",
          description: "Maintain agent memory and cognition across requests, enabling complex multi-step reasoning and contextual awareness.",
          icon: Brain,
        },
        {
          title: "Blazing Fast",
          description: "Lightweight protocol optimized for distributed deployments with minimal latency, perfect for real-time applications.",
          icon: Zap,
        }
      ]
    },
    {
      name: "Optimize",
      description: "Fine-tune your agents for peak performance",
      features: [
        {
          title: "Future-Proof",
          description: "Built for the coming wave of autonomous applications with an architecture designed to evolve with AI advancements.",
          icon: Sparkles,
        }
      ]
    }
  ];

  // Count total features for animated counter
  const totalFeatures = categories.reduce((acc, category) => acc + category.features.length, 0);

  return (
    <section className="w-full py-24 md:py-32 bg-background relative overflow-hidden" ref={containerRef}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-0 -right-1/4 w-1/2 sm:w-1/3 md:w-1/2 h-1/2 bg-gradient-to-br from-purple-600/5 via-indigo-500/5 to-transparent blur-3xl rounded-full" 
          style={{ y }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 -left-1/4 w-1/2 sm:w-1/3 md:w-1/2 h-1/2 bg-gradient-to-tr from-purple-600/5 via-indigo-500/5 to-transparent blur-3xl rounded-full" 
          style={{ y: useTransform(scrollYProgress, [0, 1], ["10%", "0%"]) }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/3 w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 bg-gradient-to-br from-purple-500/3 via-indigo-400/3 to-transparent blur-xl rounded-full" 
          style={{ x: useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]) }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
      
      <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div 
          className="flex flex-col space-y-6 mb-24 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Feature count */}
          <motion.div 
            className="flex items-center gap-2 mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="h-px w-12 bg-purple-600/40"
              initial={{ width: 0 }}
              animate={{ width: "3rem" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <p className="text-sm font-medium text-muted-foreground">
              <motion.span 
                className="text-purple-600 font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {totalFeatures}
              </motion.span> Powerful Features
            </p>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent font-extrabold">
              Built for the future<br />of agent technology
            </span>
          </h2>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
            Lorem Ipsum gypsum phonum dfka jabfj sosmdc  cbdjs
          </p>
        </motion.div>

        {/* Feature Categories */}
        <div className="space-y-20 md:space-y-32">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-12">
              {/* Category Header */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8 items-start">
                <div className="md:col-span-4 space-y-4">
                  <SectionTitle>{category.name}</SectionTitle>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
                
                {/* Feature Cards */}
                <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {category.features.map((feature, featureIndex) => (
                    <FeatureCard
                      key={featureIndex} 
                      title={feature.title}
                      description={feature.description}
                      icon={feature.icon}
                      index={featureIndex + categoryIndex * 2} // Adjust indexing for animation delay
                      category={category.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
