"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "Design matters.",
    description: "Business outcomes matter more than technology choices. Design and engineering are not separate phases — they're the same work.",
    content: (
      <div className="flex flex-col gap-4 h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white text-3xl font-display font-bold text-center p-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
        <span>FORM & FUNCTION</span>
      </div>
    ),
  },
  {
    title: "Engineering matters.",
    description: "Products should be maintainable by the people who inherit them. Honest estimates build better client relationships than optimistic ones.",
    content: (
      <div className="flex flex-col gap-4 h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--pink-500),var(--indigo-500))] text-white text-3xl font-display font-bold text-center p-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        <span>ROBUST SYSTEMS</span>
      </div>
    ),
  },
  {
    title: "AI should create actual value.",
    description: "AI creates leverage when it's applied to the right problem. The best agency work leaves a team more capable, not more dependent.",
    content: (
      <div className="flex flex-col gap-4 h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white text-3xl font-display font-bold text-center p-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        <span>APPLIED INTELLIGENCE</span>
      </div>
    ),
  },
  {
    title: "Products should be built to last.",
    description: "Software should earn its place: by making a product clearer, a business more capable, or a customer experience more useful.",
    content: (
      <div className="flex flex-col gap-4 h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--blue-500),var(--cyan-500))] text-white text-3xl font-display font-bold text-center p-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span>ENDURING IMPACT</span>
      </div>
    ),
  },
];

export default function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
