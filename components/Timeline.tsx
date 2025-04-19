"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import { RainbowButton } from "./RainbowButton";

type TimelineItem = {
  title: string;
  date: string;
  icon?: React.ReactNode;
};

export const Timeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const timelineItems: TimelineItem[] = [
    {
      title: "Bulk Link Actions",
      date: "Feb 20, 2025",
      icon: <CalendarIcon className="h-4 w-4" />,
    },
    {
      title: "Pebble Conversions Support for Stripe Payment Links",
      date: "Feb 18, 2025",
      icon: <CalendarIcon className="h-4 w-4" />,
    },
    {
      title: "UTM support in Pebble Analytics",
      date: "Jan 29, 2025",
      icon: <CalendarIcon className="h-4 w-4" />,
    },
    {
      title: "Launch Week Recap: Celebrating 1 year of Pebble",
      date: "Jan 17, 2025",
      icon: <CalendarIcon className="h-4 w-4" />,
    },
    {
      title: "Introducing Pebble Conversions",
      date: "Jan 14, 2025",
      icon: <CalendarIcon className="h-4 w-4" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100,
      scale: 0.8
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section className="w-full py-12 md:py-24 overflow-hidden bg-background text-foreground">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col space-y-8"
        >
          <motion.div
            custom={0}
            variants={itemVariants}
            className="flex flex-col space-y-4 items-center text-center w-full"
          >
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center my-2">
              <span className="bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block font-extrabold">We ship fast</span>
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl text-center">
              Check out our changelog to see what&apos;s new on Pebble.
            </p>
          </motion.div>

          <motion.div custom={1} variants={itemVariants} className="flex justify-center w-full">
            <RainbowButton onClick={() => window.open('#', '_blank')}>
              View full changelog
            </RainbowButton>
          </motion.div>

          <div className="mt-12 relative">
            {/* Vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-border origin-top"
            ></motion.div>

            {/* Timeline items */}
            <motion.div
              variants={containerVariants}
              className="space-y-16"
            >
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  className="relative"
                >
                  {/* Circle in the middle */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      delay: index * 0.2
                    }}
                    className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-card border-2 border-border rounded-full z-10"
                  ></motion.div>

                  <div className="grid grid-cols-2 gap-8 items-center">
                    {/* Left side - content */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: index % 2 === 0 ? -50 : 50
                      }}
                      animate={isInView ? {
                        opacity: 1,
                        x: 0
                      } : {
                        opacity: 0,
                        x: index % 2 === 0 ? -50 : 50
                      }}
                      transition={{
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 100
                      }}
                      className={`pr-12 ${index % 2 === 1 ? 'col-start-2 text-left' : 'col-start-1 text-right'}`}
                    >
                      <h3 className="font-medium text-lg">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.date}</p>
                    </motion.div>

                    {/* Right side - icon */}
                    <motion.div
                      initial={{
                        rotate: -180,
                        opacity: 0,
                        scale: 0.5
                      }}
                      animate={isInView ? {
                        rotate: 0,
                        opacity: 1,
                        scale: 1
                      } : {
                        rotate: -180,
                        opacity: 0,
                        scale: 0.5
                      }}
                      transition={{
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 200
                      }}
                      className={`${index % 2 === 0 ? 'col-start-2 pl-12' : 'col-start-1 pr-12 flex justify-end'}`}
                    >
                      <div className="flex items-center justify-center w-10 h-10 bg-card border border-border rounded-full shadow-sm">
                        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
