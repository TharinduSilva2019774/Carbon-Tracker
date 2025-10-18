import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Placement =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface TooltipProps {
  children: React.ReactElement; // single element to attach handlers to
  content: React.ReactNode;
  placement?: Placement;
  offset?: number;
  className?: string;
  id?: string;
  interactive?: boolean; // keep visible while hovering tooltip itself
}

export default function Tooltip({
  children,
  content,
  placement = "top",
  offset = 0,
  className = "",
  id,
  interactive = true,
}: TooltipProps) {
  const targetRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties | undefined>(
    undefined
  );
  const [mounted, setMounted] = useState(false);
  const hideTimer = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  const tooltipId = id ?? `tooltip-${Math.random().toString(36).slice(2, 9)}`;

  // portal root
  const portalRootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setMounted(true);
    if (typeof document === "undefined") return;
    const root = document.createElement("div");
    portalRootRef.current = root;
    document.body.appendChild(root);
    return () => {
      if (portalRootRef.current)
        document.body.removeChild(portalRootRef.current);
      portalRootRef.current = null;
    };
  }, []);

  const show = () => {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setVisible(true);
  };
  const hide = () => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    // short delay to allow moving pointer to tooltip
    hideTimer.current = window.setTimeout(() => setVisible(false), 10);
  };
  const toggle = () => setVisible((v) => !v);

  // compute position
  useEffect(() => {
    if (!visible) return;
    // Use rAF to avoid layout thrash when many scroll/resize events fire
    const schedule = () => {
      if (rafId.current != null) return;
      rafId.current = window.requestAnimationFrame(() => {
        rafId.current = null;
        compute();
      });
    };

    function compute() {
      const target = targetRef.current;
      const tip = tooltipRef.current;
      if (!target || !tip) return;

      const tRect = target.getBoundingClientRect();
      const tipRect = tip.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let top = 0;
      let left = 0;

      const centerX = tRect.left + tRect.width / 2 - tipRect.width / 2;
      const centerY = tRect.top + tRect.height / 2 - tipRect.height / 2;

      // helper to compute coordinates given a placement
      const coordsFor = (pl: Placement) => {
        switch (pl) {
          case "top":
            return {
              top: tRect.top - tipRect.height - offset,
              left: centerX,
            };
          case "bottom":
            return {
              top: tRect.bottom + offset,
              left: centerX,
            };
          case "left":
            return {
              top: centerY,
              left: tRect.left - tipRect.width - offset,
            };
          case "right":
            return {
              top: centerY,
              left: tRect.right + offset,
            };
          case "top-left":
            return {
              top: tRect.top - tipRect.height - offset,
              left: tRect.left,
            };
          case "top-right":
            return {
              top: tRect.top - tipRect.height - offset,
              left: tRect.right - tipRect.width,
            };
          case "bottom-left":
            return {
              top: tRect.bottom + offset,
              left: tRect.left,
            };
          case "bottom-right":
            return {
              top: tRect.bottom + offset,
              left: tRect.right - tipRect.width,
            };
          case "center":
          default:
            return { top: centerY, left: centerX };
        }
      };

      // Determine preferred and fallback placements
      const opposite: Record<Placement, Placement> = {
        top: "bottom",
        bottom: "top",
        left: "right",
        right: "left",
        center: "center",
        "top-left": "bottom-left",
        "top-right": "bottom-right",
        "bottom-left": "top-left",
        "bottom-right": "top-right",
      } as const;

      const fitsInViewport = (pos: { top: number; left: number }) => {
        return (
          pos.left >= 8 &&
          pos.left + tipRect.width <= vw - 8 &&
          pos.top >= 8 &&
          pos.top + tipRect.height <= vh - 8
        );
      };

      // Try preferred placement
      let chosen = coordsFor(placement);

      // If it doesn't fit, try opposite
      if (!fitsInViewport(chosen)) {
        const alt = coordsFor(opposite[placement]);
        if (fitsInViewport(alt)) {
          chosen = alt;
        } else {
          // If still doesn't fit, try left/right vs top/bottom depending on space
          const space = {
            top: tRect.top,
            bottom: vh - tRect.bottom,
            left: tRect.left,
            right: vw - tRect.right,
          };
          const verticalFirst =
            Math.max(space.top, space.bottom) >=
            Math.max(space.left, space.right);
          const candidates: Placement[] = verticalFirst
            ? ["top", "bottom", "left", "right"]
            : ["left", "right", "top", "bottom"];
          for (const cand of candidates) {
            const pos = coordsFor(cand);
            if (fitsInViewport(pos)) {
              chosen = pos;
              break;
            }
          }
        }
      }

      // Final clamp to keep fully inside viewport
      left = Math.min(Math.max(chosen.left, 8), vw - tipRect.width - 8);
      top = Math.min(Math.max(chosen.top, 8), vh - tipRect.height - 8);

      setStyle({
        left: Math.round(left), // fixed positioning uses viewport coords; no scroll offset
        top: Math.round(top),
      });
    }

    compute();

    // Observe tooltip and target size changes
    const ro = new ResizeObserver(() => schedule());
    if (targetRef.current) ro.observe(targetRef.current);
    if (tooltipRef.current) ro.observe(tooltipRef.current);

    // Recompute on any scroll (capture true to catch nested scroll containers)
    window.addEventListener("scroll", schedule, true);
    window.addEventListener("resize", schedule);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
      if (rafId.current != null) {
        window.cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [visible, placement, offset]);

  // close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setVisible(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // attach child ref safely
  const setChildRef = (node: HTMLElement | null) => {
    targetRef.current = node;
    const childRef = (child as { ref?: React.Ref<HTMLElement> }).ref;
    if (!childRef) return;
    if (typeof childRef === "function") childRef(node);
    else if (childRef && typeof childRef === "object") {
      try {
        (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
      } catch {
        // ignore
      }
    }
  };

  const child = React.Children.only(children) as React.ReactElement<
    Record<string, unknown>
  >;

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    show();
    const fn = child.props?.onMouseEnter as
      | ((e: React.MouseEvent<HTMLElement>) => void)
      | undefined;
    if (fn) fn(e);
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    hide();
    const fn = child.props?.onMouseLeave as
      | ((e: React.MouseEvent<HTMLElement>) => void)
      | undefined;
    if (fn) fn(e);
  };
  const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    show();
    const fn = child.props?.onFocus as
      | ((e: React.FocusEvent<HTMLElement>) => void)
      | undefined;
    if (fn) fn(e);
  };
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    hide();
    const fn = child.props?.onBlur as
      | ((e: React.FocusEvent<HTMLElement>) => void)
      | undefined;
    if (fn) fn(e);
  };
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    toggle();
    const fn = child.props?.onClick as
      | ((e: React.MouseEvent<HTMLElement>) => void)
      | undefined;
    if (fn) fn(e);
  };

  const injectedProps: Partial<React.HTMLAttributes<HTMLElement>> & {
    ref?: React.Ref<HTMLElement>;
  } = {
    ref: setChildRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onClick: handleClick,
    "aria-describedby": tooltipId,
  };

  const clonedChild = React.cloneElement(child, injectedProps as object);

  // tooltip element (keeps visible while hovered if interactive)
  const tooltipNode = visible ? (
    <div
      role="tooltip"
      id={tooltipId}
      ref={tooltipRef}
      className={`pointer-events-auto z-[9999] fixed max-w-xs rounded-md py-2 px-3 text-sm shadow-lg ring-1 ring-black/8 bg-slate-800  transition-opacity duration-150 ${className}`}
      style={style}
      onMouseEnter={() => interactive && show()}
      onMouseLeave={() => interactive && hide()}
      aria-hidden={!visible}
    >
      <div className="relative">
        <div className="text-sm leading-snug text-slate-900">{content}</div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {clonedChild}
      {mounted &&
        portalRootRef.current &&
        createPortal(tooltipNode, portalRootRef.current)}
    </>
  );
}
