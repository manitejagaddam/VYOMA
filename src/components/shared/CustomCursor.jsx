"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Use raw motion values for zero latency, bypassing spring physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      // Check if we are hovering over something interactive
      const target = e.target;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.classList.add("hide-default-cursor");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("hide-default-cursor");
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 1.2 : 1,
          rotate: isHovering ? -10 : 0,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-6 w-6 origin-top-left drop-shadow-md"
      >
        <svg
          stroke="url(#cursor-gradient)"
          fill="url(#cursor-gradient)"
          strokeWidth="1"
          strokeLinejoin="round"
          viewBox="0 0 32 32"
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cursor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--cursor-stop-1)" />
              <stop offset="50%" stopColor="var(--cursor-stop-2)" />
              <stop offset="100%" stopColor="var(--cursor-stop-3)" />
            </linearGradient>
          </defs>
          <path d="M 0 0 L 12 32 L 16 18 L 30 14 Z"></path>
        </svg>
      </motion.div>
    </motion.div>
  );
}

