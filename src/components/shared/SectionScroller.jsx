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
          className="fixed bottom-6 right-6 z-[90] flex items-center gap-3"
        >
          {/* WhatsApp floating icon */}
          <a
            href="https://wa.me/919494785078?text=Hi%20VYOMA%20%F0%9F%91%8B%20I%27d%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="group flex items-center justify-center w-12 h-12 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
            style={{ background: "#25D366", boxShadow: "0 4px 16px rgba(37,211,102,0.45)" }}
          >
            <svg viewBox="0 0 24 24" fill="white" width="22" height="22" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.109.55 4.09 1.508 5.817L.057 23.885c-.07.317.224.603.537.52l6.244-1.64A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.98 9.98 0 01-5.092-1.393l-.364-.215-3.768.99.996-3.682-.236-.38A9.97 9.97 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
          </a>

          {/* Scroll up / down button */}
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

