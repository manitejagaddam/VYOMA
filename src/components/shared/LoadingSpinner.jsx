"use client";
/** components/shared/LoadingSpinner.jsx */
export function LoadingSpinner({ label = "Loading…" }) {
  return (
    <div className="loading-spinner" role="status" aria-label={label}>
      <span className="spinner-ring" />
      <span className="spinner-label">{label}</span>
    </div>
  );
}

