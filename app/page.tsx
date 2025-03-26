import React from 'react'
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

const Page = () => {
  return (
    <>
      <div className='mx-auto flex w-full max-w-[95%] flex-1 flex-col border-x border-gray-200'>
        <Navbar />
        <div className='relative'>
          <Hero />
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
        <FeatureSection />
        <CTAContent />
        <OpenSourceSection />
        <Timeline />
        <NewsletterSection />
        <Footer />
      </div>
    </>
  )
}

export default Page
