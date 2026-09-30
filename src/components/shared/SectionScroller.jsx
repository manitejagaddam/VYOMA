"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from "@/lib/utils";

export function SectionScroller() {
  const [direction, setDirection] = useState('down');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down a bit
      setIsVisible(window.scrollY > 100);

      // Check if we are at the bottom of the page
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      setDirection(isBottom ? 'up' : 'down');
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (direction === 'up') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const sections = Array.from(document.querySelectorAll('section, .section, .page-hero'));
    const currentScroll = window.scrollY + 100; 
    
    const nextSection = sections.find(section => {
      const rect = section.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      return absoluteTop > currentScroll;
    });

    if (nextSection) {
      const rect = nextSection.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      window.scrollTo({
        top: absoluteTop - 80,
        behavior: 'smooth'
      });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-6 right-6 z-[90]"
        >
          <button
            onClick={handleClick}
            className="group flex items-center justify-center w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 border border-transparent dark:border-white/20"
            aria-label={direction === 'up' ? "Scroll to top" : "Scroll to next section"}
          >
            <motion.svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              animate={{ y: direction === 'down' ? [0, 4, 0] : [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              {direction === 'down' ? (
                <polyline points="6 9 12 15 18 9"></polyline>
              ) : (
                <polyline points="18 15 12 9 6 15"></polyline>
              )}
            </motion.svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

