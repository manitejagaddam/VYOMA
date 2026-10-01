"use client";
/** components/shared/Btn.jsx — Styled button/link. */
import { Link } from "./Link";

export function Btn({ to, go, onClick, children, variant = "primary", type, ...rest }) {
  if (to) {
    // Always render as a navigable link when a destination is provided
    return <Link to={to} go={go} onClick={onClick} className={`btn btn-${variant}`} {...rest}>{children}</Link>;
  }
  return (
    <button type={type || "button"} onClick={onClick} className={`btn btn-${variant}`} {...rest}>
      {children}
    </button>
  );
}

