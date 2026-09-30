"use client";
import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("[VYOMA] ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", padding: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#D4AF37" }}>Something went wrong</h2>
          <p style={{ color: "#999", textAlign: "center" }}>This page encountered an error. Please refresh or go back.</p>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = "/"; }}
            style={{ padding: "10px 24px", background: "#D4AF37", color: "#000", borderRadius: "999px", fontWeight: "bold", border: "none", cursor: "pointer" }}
          >
            Return Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}