/**
 * components/ui/floating-dock.jsx
 * Aceternity UI — FloatingDock component.
 * Adapted from TSX → JSX for this Vite + React project.
 *
 * Desktop: magnetic dock anchored to mouse position.
 * Mobile:  expandable button-tray (shown on screens < md).
 */
"use client"; // harmless in Vite; kept for shadcn/ui portability

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────
   Root export — renders Desktop + Mobile variants together
───────────────────────────────────────────────────────── */
export const FloatingDock = ({ items, desktopClassName, mobileClassName }) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

/* ─────────────────────────────────────────────────────────
   Mobile tray (visible below md breakpoint)
───────────────────────────────────────────────────────── */
const FloatingDockMobile = ({ items, className }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: { delay: idx * 0.05 },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                      setOpen(false);
                    }
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   Desktop magnetic dock (visible above md breakpoint)
───────────────────────────────────────────────────────── */
const FloatingDockDesktop = ({ items, className }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-50 px-4 pb-3 md:flex dark:bg-neutral-900",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────
   Individual icon with spring-based magnetic scale effect
───────────────────────────────────────────────────────── */
function IconContainer({ mouseX, title, icon, href, menuComponent, onClick }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform  = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const widthIconTransform  = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightIconTransform = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const springConfig = { mass: 0.1, stiffness: 150, damping: 12 };
  const width       = useSpring(widthTransform,      springConfig);
  const height      = useSpring(heightTransform,     springConfig);
  const widthIcon   = useSpring(widthIconTransform,  springConfig);
  const heightIcon  = useSpring(heightIconTransform, springConfig);

  const [hovered, setHovered] = useState(false);

  return (
    <a 
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
      >
        {/* Tooltip or Megamenu */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0,  x: "-50%" }}
              exit={{ opacity: 0,   y: 2,   x: "-50%" }}
              className={cn(
                "absolute left-1/2 z-50",
                menuComponent 
                  ? "bottom-full mb-6 w-[600px] border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 rounded-xl overflow-hidden shadow-2xl" 
                  : "-top-8 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
              )}
            >
              {menuComponent ? menuComponent : title}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icon */}
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}

