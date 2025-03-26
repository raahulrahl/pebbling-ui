"use client";

import React, { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { AnimatedGridPattern } from '@/components/Background'
import { cn } from '@/lib/utils'
import FeatureSection from '@/components/FeatureSection'
import { Footer } from '@/components/Footer'
import CTAContent from '@/components/CTAContent'
import OpenSourceSection from '@/components/OpenSourceSection'
import Timeline from '@/components/Timeline'
import NewsletterSection from '@/components/NewsletterSection'
import AnimatedElement from '@/components/AnimatedElement'
import BackToTop from '@/components/BackToTop'
import { motion } from 'framer-motion'

const Page = () => {
  // Add smooth scrolling behavior for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const targetId = anchor.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <>
      <BackToTop />
      <div className='mx-auto flex w-full max-w-[95%] flex-1 flex-col border-x border-gray-200'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
        </motion.div>
        
        <div className='relative'>
          <AnimatedElement variant="fadeIn" duration={0.8}>
            <Hero />
          </AnimatedElement>
          <div className='hidden sm:block'>
            <AnimatedGridPattern
              numSquares={30}
              maxOpacity={0.2}
              duration={3}
              className={cn(
                "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                "absolute inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 bg-pink-100/50"
              )}
            />
          </div>
        </div>
        
        <AnimatedElement variant="slideUp" delay={0.2} threshold={0.2}>
          <FeatureSection />
        </AnimatedElement>
        
        <AnimatedElement variant="scale" delay={0.1} threshold={0.2}>
          <CTAContent />
        </AnimatedElement>
        
        <AnimatedElement variant="slideRight" delay={0.1} threshold={0.2}>
          <OpenSourceSection />
        </AnimatedElement>
        
        <AnimatedElement variant="slideLeft" delay={0.1} threshold={0.2}>
          <Timeline />
        </AnimatedElement>
        
        <AnimatedElement variant="slideUp" delay={0.1} threshold={0.2}>
          <NewsletterSection />
        </AnimatedElement>
        
        <AnimatedElement variant="fadeIn" delay={0.2} threshold={0.1}>
          <Footer />
        </AnimatedElement>
      </div>
    </>
  )
}

export default Page
