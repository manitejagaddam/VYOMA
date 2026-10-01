"use client";
// components/shared/Link.jsx — Wrapper around Next.js Link for compatibility
import NextLink from "next/link";

export function Link({ to, href, onClick, children, className = "", ...props }) {
  const dest = to || href || "#";
  return (
    <NextLink href={dest} onClick={onClick} className={className} {...props}>
      {children}
    </NextLink>
  );
}