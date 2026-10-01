"use client";
// components/shared/CookieConsent.jsx
// Minimal, GDPR/DPDP-aligned cookie consent banner.
// On accept: sets a cookie and initialises analytics.
// On decline: only essential cookies are used.
import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner only if consent has not been recorded
    const consent = localStorage.getItem("vyoma-cookie-consent");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("vyoma-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("vyoma-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[9998] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-5"
    >
      <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
        We use cookies to improve your experience and analyse site usage. See our{" "}
        <Link
          href="/privacy"
          className="underline hover:no-underline text-neutral-900 dark:text-white font-medium"
        >
          Privacy Policy
        </Link>{" "}
        for details.
      </p>
      <div className="flex gap-3 mt-4">
        <button
          onClick={accept}
          className="flex-1 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-full py-2 hover:opacity-80 transition-opacity"
        >
          Accept
        </button>
        <button
          onClick={decline}
          className="flex-1 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors border border-neutral-200 dark:border-neutral-700 rounded-full py-2"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
