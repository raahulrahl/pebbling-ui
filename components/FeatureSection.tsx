"use client";
import React from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { LockIcon, PuzzleIcon, Brain, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

// Light-themed Feature Card component to match Webflow style
const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => {
  return (
    <motion.div
      className="bg-white p-5 rounded-sm border border-gray-100 hover:shadow-sm transition-shadow duration-300 h-full flex flex-col"
      variants={itemVariants} // Apply item animation variants
      whileHover={{ y: -4, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} // Apply hover animation
    >
      <div className="mb-4">
        {Icon && <Icon className="h-5 w-5 text-gray-700" />}
      </div>
      <h3 className="text-base font-medium text-gray-900 mb-1.5">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
      <div className="mt-auto">
        <button className="text-sm font-medium text-gray-900 flex items-center group hover:text-gray-700">
          Learn more
          <ArrowRightIcon className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Faster stagger for cards
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120 },
  },
};

const FeatureSection = () => {
  // Original Pebbling features organized into categories
  const categories = [
    {
      name: "Build",
      features: [
        {
          title: "Security First",
          description: "Built on mutual TLS (mTLS) for end-to-end trust",
          icon: LockIcon,
        },
        {
          title: "Framework-Agnostic",
          description: "Adapters bridge internal APIs across ecosystems",
          icon: PuzzleIcon,
        }
      ]
    },
    {
      name: "Manage",
      features: [
        {
          title: "Stateful by Default",
          description: "Maintain agent memory and cognition across requests",
          icon: Brain,
        },
        {
          title: "Blazing Fast",
          description: "Lightweight protocol optimized for distributed deployments",
          icon: Zap,
        }
      ]
    },
    {
      name: "Optimize",
      features: [
        {
          title: "Future-Proof",
          description: "Built for the coming wave of autonomous applications",
          icon: Sparkles,
        }
      ]
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-white"> {/* Changed to white background */}
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        {/* Section Header - Kept the gradient title */}
        <motion.div 
          className="flex flex-col items-start space-y-3 mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-red-700 via-red-500 to-orange-400 bg-clip-text text-transparent inline-block font-extrabold">Powerful Features</span>
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl">
            Our platform is built with cutting-edge technology to power your applications
          </p>
        </motion.div>

        {/* Feature Categories and Grid */}
        <div className="space-y-16">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-8">
              {/* Category Title */}
              <motion.h3 
                className="text-2xl font-bold text-gray-900"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * categoryIndex, duration: 0.4 }}
              >
                {category.name}
              </motion.h3>
              
              {/* Feature Card Grid */} 
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-6" // Simple 3-column grid
              >
                {/* Render Feature Cards */}
                {category.features.map((feature, featureIndex) => (
                  <FeatureCard
                    key={featureIndex} 
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                  />
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
