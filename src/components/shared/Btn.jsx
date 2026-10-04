"use client";
/** components/shared/Btn.jsx — Styled button/link. */
import { Link } from "./Link";

/**
 * @param {Object} props
 * @param {string} [props.to]
 * @param {Function} [props.onClick]
 * @param {React.ReactNode} props.children
 * @param {string} [props.variant="primary"]
 * @param {"button"|"submit"|"reset"} [props.type="button"]
 */
export function Btn({ to, onClick, children, variant = "primary", type = "button", ...rest }) {
  if (to) {
    // Always render as a navigable link when a destination is provided
    return <Link to={to} onClick={onClick} className={`btn btn-${variant}`} {...rest}>{children}</Link>;
  }
  return (
    <button type={type} onClick={onClick} className={`btn btn-${variant}`} {...rest}>
      {children}
    </button>
  );
}

