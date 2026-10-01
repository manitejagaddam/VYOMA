"use client";
import Image from "next/image";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CarouselProps {
  items: React.ReactNode[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialScroll]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "mx-auto max-w-7xl", // remove max-w-4xl if you want the carousel to span the full width of its container
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-10 flex justify-end gap-2">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
      <BackgroundImagePreloader items={items} />
    </CarouselContext.Provider>
  );
};

const BackgroundImagePreloader = ({ items }: { items: unknown[] }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Delay preloading slightly to avoid blocking initial render
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  const imagesToPreload = items
    .map((item) => (item as { props?: { card?: { src?: string } } })?.props?.card?.src)
    .filter(Boolean);

  return (
    <div className="absolute w-[1px] h-[1px] overflow-hidden opacity-0 pointer-events-none z-[-1]" aria-hidden="true">
      {imagesToPreload.map((src, i) => (
        // Because of the exact sizes string matching, this triggers Next.js to fetch 
        // and cache the exact same optimized image URL that the cards will use.
        <BlurImage key={i} src={src} priority={true} alt="preload" />
      ))}
    </div>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => { window.removeEventListener('keydown', onKeyDown); document.body.style.overflow = 'auto'; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useOutsideClick(containerRef as React.RefObject<HTMLDivElement>, () => handleClose());

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white p-4 font-sans md:p-10 dark:bg-neutral-900"
            >
              <button
                className="absolute top-6 right-6 md:top-8 md:right-8 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 hover:bg-black/80 dark:bg-white/20 dark:hover:bg-white/40 backdrop-blur-sm z-50 transition-colors"
                onClick={handleClose}
                aria-label="Close"
              >
                <IconX className="h-5 w-5 text-white dark:text-white" />
              </button>

              <div className="text-center px-4 md:px-12 pt-4 md:pt-8">
                <motion.p
                  layoutId={layout ? `category-${card.category}` : undefined}
                  className="text-sm md:text-base font-medium text-neutral-500 dark:text-neutral-400 mb-4 uppercase tracking-widest"
                >
                  {card.category}
                </motion.p>
                <motion.p
                  layoutId={layout ? `title-${card.title}` : undefined}
                  className="text-3xl md:text-5xl font-bold text-neutral-800 dark:text-white tracking-tight leading-tight"
                >
                  {card.title}
                </motion.p>
              </div>

              <div className="w-full max-w-4xl mx-auto mt-10 md:mt-14 mb-8 h-[250px] md:h-[400px] relative rounded-3xl overflow-hidden shadow-2xl">
                <BlurImage src={card.src} alt={card.title} className="object-cover" />
              </div>

              <div className="pb-10 max-w-4xl mx-auto">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="relative z-10 flex h-[28rem] w-80 flex-col items-start justify-start overflow-hidden rounded-xl bg-white md:h-[32rem] md:w-96 dark:bg-[#0a0b0f] border border-black/10 dark:border-white/10 p-6 md:p-8 group hover:border-black/20 dark:hover:border-white/20 transition-all text-left"
      >
        <div className="relative w-full h-48 md:h-52 rounded-xl overflow-hidden mb-6 shrink-0 shadow-sm dark:shadow-none">
          <BlurImage
            src={card.src}
            alt={card.title}
            priority={index < 3}
            className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col flex-grow w-full">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-left font-sans text-xs md:text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3 uppercase tracking-widest"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-left font-sans text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-100 line-clamp-3 leading-snug"
          >
            {card.title}
          </motion.p>
        </div>
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  priority,
  ...rest
}: React.ComponentProps<typeof Image>) => {
  const [isLoading, setLoading] = useState(true);
  if (!src || typeof src !== "string") return <div className={cn("h-full w-full bg-neutral-200 dark:bg-neutral-800", className)} />;
  const isFill = !width && !height;
  return (
    <Image
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src as string}
      loading={priority ? undefined : "lazy"}
      priority={priority}
      decoding="async"
      alt={alt ? alt : "Background of a beautiful view"}
      {...(isFill ? { fill: true, sizes: "(max-width: 768px) 100vw, 50vw" } : { width, height })}
      {...rest}
    />
  );
};









