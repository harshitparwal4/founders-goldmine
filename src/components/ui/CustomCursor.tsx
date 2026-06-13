"use client";

import React, { useEffect, useState, useRef } from "react";

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);

      // Move core dot instantly
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animateRing = () => {
      // Smoothly interpolate the outer ring for lag inertia
      const ease = 0.15;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      requestAnimationFrame(animateRing);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive-hover")
      ) {
        ring.style.width = "48px";
        ring.style.height = "48px";
        ring.style.borderColor = "rgba(168, 85, 247, 0.8)";
        ring.style.backgroundColor = "rgba(168, 85, 247, 0.05)";
        dot.style.transform = "translate(-50%, -50%) scale(0.5)";
      } else {
        ring.style.width = "30px";
        ring.style.height = "30px";
        ring.style.borderColor = "rgba(168, 85, 247, 0.3)";
        ring.style.backgroundColor = "transparent";
        dot.style.transform = "translate(-50%, -50%) scale(1)";
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    const animId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
};
