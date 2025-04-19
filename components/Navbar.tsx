"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RainbowButton } from './RainbowButton'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'

// A custom component to fetch and display GitHub stars
const GitHubStars = () => {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    fetch('https://api.github.com/repos/Pebbling-ai/pebble')
      .then(response => response.json())
      .then(data => {
        setStars(data.stargazers_count)
      })
      .catch(error => console.error('Error fetching star count:', error))
  }, [])

  return (
    <Link
      href="https://github.com/Pebbling-ai/pebble"
      className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-md px-2 py-1 hover:border-primary transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* GitHub Logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-foreground"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.824 1.102.824 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
      <span>{stars !== null ? stars : '0'}</span>
    </Link>
  )
}

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`border-b border-border py-3 md:py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-background'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center overflow-hidden rounded-md transition-transform group-hover:scale-105">
            <Image
              src="/pebbling-penguin.jpeg"
              alt="Pebbling Penguin Logo"
              width={48}
              height={48}
              className="rounded-md object-cover"
              priority
            />
          </div>
          <span className="text-lg md:text-xl font-bold text-foreground whitespace-nowrap">Pebbling AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <GitHubStars />
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            COMMUNITY
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            BLOG
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline">
            DOCS
          </Button>
          
          {isSignedIn ? (
            <UserButton 
              afterSignOutUrl="/"
              userProfileMode="navigation"
              userProfileUrl="/user-profile"
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-10 w-10",
                  userButtonTrigger: "focus:shadow-none focus:ring-2 focus:ring-primary",
                },
              }}
            />
          ) : (
            <SignInButton mode="modal">
              <RainbowButton>
                Sign in
              </RainbowButton>
            </SignInButton>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-secondary transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
          >
            {isMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute w-full bg-background z-50 border-b border-border shadow-lg transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <div className="flex justify-center">
            <GitHubStars />
          </div>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-foreground py-2 text-center"
          >
            COMMUNITY
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-foreground py-2 text-center"
          >
            BLOG
          </Link>
          <Button variant="outline" className="w-full">
            DOCS
          </Button>
          
          {isSignedIn ? (
            <Button 
              onClick={() => window.location.href = "/user-profile"}
              className="w-full"
            >
              My Profile
            </Button>
          ) : (
            <SignInButton mode="modal">
              <Button className="w-full">
                Sign in
              </Button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
