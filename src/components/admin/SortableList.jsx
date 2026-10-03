"use client";
import React, { useEffect, useRef } from "react";
import Sortable from "sortablejs";

/**
 * GripHandle (⋮⋮)
 * Two columns of three dots for a modern, tactile drag handle.
 */
export function GripHandle({ disabled = false }) {
  return (
    <div
      className="drag-handle"
      title={disabled ? "Reordering disabled" : "Drag to reorder"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "28px",
        height: "36px",
        cursor: disabled ? "not-allowed" : "grab",
        color: disabled ? "#2e3545" : "#616b80",
        flexShrink: 0,
        borderRadius: "4px",
        transition: "color 0.15s, background 0.15s",
        touchAction: "none", // Essential for mobile / tablet drag gestures
        userSelect: "none",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.color = "#eef0f5";
          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.color = "#616b80";
          e.currentTarget.style.background = "transparent";
        }
      }}
    >
      <svg width="14" height="18" viewBox="0 0 14 18" fill="currentColor">
        <circle cx="4" cy="3" r="1.5" />
        <circle cx="10" cy="3" r="1.5" />
        <circle cx="4" cy="9" r="1.5" />
        <circle cx="10" cy="9" r="1.5" />
        <circle cx="4" cy="15" r="1.5" />
        <circle cx="10" cy="15" r="1.5" />
      </svg>
    </div>
  );
}

/**
 * Reusable SortableList Component
 * Wraps list items with SortableJS, enforces drag-by-handle only,
 * supports touch, animations, optimistic updates, and error rollbacks.
 */
export function SortableList({
  items = [],
  onReorder,
  renderItem,
  isSortable = true,
  disabled = false,
  isSaving = false,
  filterActive = false,
  emptyState = null,
}) {
  const containerRef = useRef(null);
  const sortableInstanceRef = useRef(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;
  const onReorderRef = useRef(onReorder);
  onReorderRef.current = onReorder;

  // Initialize SortableJS on container once when sortable
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isSortable) return;

    // Destroy existing instance if any
    try {
      if (sortableInstanceRef.current) {
        sortableInstanceRef.current.destroy();
        sortableInstanceRef.current = null;
      }
    } catch {
      // Ignore cleanup error if DOM detached
    }

    const sortable = Sortable.create(el, {
      handle: ".drag-handle",
      animation: 180, // Smooth transition animation in ms
      easing: "cubic-bezier(0.2, 0, 0, 1)",
      ghostClass: "vyoma-sortable-ghost",
      chosenClass: "vyoma-sortable-chosen",
      dragClass: "vyoma-sortable-drag",
      disabled: disabled || isSaving || filterActive,
      touchStartThreshold: 3, // Prevent accidental drags on touch tap
      onStart: (evt) => {
        const handle = evt.item.querySelector(".drag-handle");
        if (handle) handle.style.cursor = "grabbing";
      },
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt;
        const handle = evt.item.querySelector(".drag-handle");
        if (handle) handle.style.cursor = "grab";

        // Skip if position did not change
        if (oldIndex === undefined || newIndex === undefined || oldIndex === newIndex) {
          return;
        }

        // Compute new items array top-to-bottom from fresh ref
        const currentItems = itemsRef.current || [];
        const updated = [...currentItems];
        const [movedItem] = updated.splice(oldIndex, 1);
        updated.splice(newIndex, 0, movedItem);

        const newIds = updated.map((item) => item.id);

        // Defer onReorder so SortableJS completes its drop event lifecycle
        // before React triggers state updates and re-renders
        setTimeout(() => {
          if (onReorderRef.current) {
            onReorderRef.current(updated, newIds, oldIndex, newIndex);
          }
        }, 0);
      },
    });

    sortableInstanceRef.current = sortable;

    return () => {
      try {
        if (sortableInstanceRef.current) {
          sortableInstanceRef.current.destroy();
          sortableInstanceRef.current = null;
        }
      } catch {
        // Ignore unmount error if already cleaned up
      }
    };
  }, [isSortable]); // Do not re-create Sortable on every items or state change!

  // Update disabled state dynamically without destroying instance
  useEffect(() => {
    if (sortableInstanceRef.current) {
      sortableInstanceRef.current.option("disabled", disabled || isSaving || filterActive);
    }
  }, [disabled, isSaving, filterActive]);

  if (!items || items.length === 0) {
    return emptyState || null;
  }

  return (
    <>
      <style jsx global>{`
        .vyoma-sortable-ghost {
          opacity: 0.45 !important;
          background: rgba(79, 124, 255, 0.08) !important;
          border: 1px dashed rgba(79, 124, 255, 0.5) !important;
        }
        .vyoma-sortable-chosen {
          background: rgba(255, 255, 255, 0.03) !important;
        }
        .vyoma-sortable-drag {
          background: #161922 !important;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6) !important;
          border: 1px solid rgba(79, 124, 255, 0.3) !important;
        }
      `}</style>

      {filterActive && isSortable && (
        <div
          style={{
            padding: "8px 20px",
            background: "rgba(245, 158, 11, 0.08)",
            borderBottom: "1px solid rgba(245, 158, 11, 0.2)",
            fontSize: "12px",
            color: "#fbbf24",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>⚠</span>
          <span>Reordering is paused while filters/search are active. Clear filter to reorder all records.</span>
        </div>
      )}

      {isSaving && (
        <div
          style={{
            padding: "6px 20px",
            background: "rgba(79, 124, 255, 0.1)",
            borderBottom: "1px solid rgba(79, 124, 255, 0.2)",
            fontSize: "12px",
            color: "#93c5fd",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⟳</span>
          <span>Saving new display order to database…</span>
        </div>
      )}

      <div ref={containerRef} style={{ width: "100%" }}>
        {items.map((item, index) => (
          <div key={item.id} data-id={item.id}>
            {renderItem(item, index, {
              gripHandle: isSortable ? (
                <GripHandle disabled={disabled || isSaving || filterActive} />
              ) : null,
            })}
          </div>
        ))}
      </div>
    </>
  );
}
