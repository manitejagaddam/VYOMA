"use client";
/** components/shared/SectionKicker.jsx */
export function SectionKicker({ left, right }) {
  return (
    <div className="section-kicker">
      <span>{left}</span>
      {right && <span>{right}</span>}
    </div>
  );
}

