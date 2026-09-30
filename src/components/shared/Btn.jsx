"use client";
/** components/shared/Btn.jsx — Styled button/link. */
import { Link } from "./Link";

export function Btn({ to, go, onClick, children, variant = "primary", type }) {
  if (to && go) {
    return <Link to={to} go={go} className={`btn btn-${variant}`}>{children}</Link>;
  }
  return (
    <button type={type || "button"} onClick={onClick} className={`btn btn-${variant}`}>
      {children}
    </button>
  );
}

