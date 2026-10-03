"use client";
import React from "react";

export function AdminToast({ toast, onClose }) {
  if (!toast) return null;

  const isError = toast.type === "error";
  const isSuccess = toast.type === "success";

  const bg = isError
    ? "rgba(239, 68, 68, 0.15)"
    : isSuccess
    ? "rgba(34, 197, 94, 0.15)"
    : "rgba(79, 124, 255, 0.15)";
  const border = isError
    ? "rgba(239, 68, 68, 0.3)"
    : isSuccess
    ? "rgba(34, 197, 94, 0.3)"
    : "rgba(79, 124, 255, 0.3)";
  const text = isError ? "#f87171" : isSuccess ? "#4ade80" : "#93c5fd";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        background: "#161922",
        border: `1px solid ${border}`,
        borderRadius: "8px",
        padding: "12px 18px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        maxWidth: "400px",
        animation: "slideIn 0.2s ease-out",
        color: "#eef0f5",
        fontSize: "13px",
      }}
    >
      <div
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: bg,
          color: text,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "13px",
          fontWeight: "bold",
          flexShrink: 0,
        }}
      >
        {isError ? "✕" : isSuccess ? "✓" : "●"}
      </div>
      <div style={{ flex: 1, lineHeight: 1.4 }}>{toast.message}</div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#7a8394",
            cursor: "pointer",
            fontSize: "16px",
            lineHeight: 1,
            padding: "0 4px",
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
