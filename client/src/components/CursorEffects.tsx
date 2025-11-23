"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";

export default function CursorEffects() {
  // Cursor position
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [clickRipple, setClickRipple] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Cursor glow element
    const cursor = document.createElement("div");
    cursor.id = "cursor-glow";
    cursor.style.position = "fixed";
    cursor.style.width = "28px";
    cursor.style.height = "28px";
    cursor.style.borderRadius = "50%";
    cursor.style.pointerEvents = "none";
    cursor.style.background =
      "radial-gradient(circle, rgba(0, 255, 255, 0.6), rgba(0,255,255,0))";
    cursor.style.boxShadow =
      "0 0 15px rgba(0,255,255,0.8), 0 0 30px rgba(0,255,255,0.5)";
    cursor.style.transform = "translate(-50%, -50%)";
    cursor.style.zIndex = "9999";
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsPointer(
        ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT", "LABEL"].includes(
          target.tagName
        ) || !!target.closest("a, button, input, textarea, select, label")
      );

      // Apply magnetic hover only to buttons, links, and cards
      if (target.closest(".magnetic, .card, button, a")) {
        gsap.to(cursor, { scale: 1.7, duration: 0.2 });
      } else {
        gsap.to(cursor, { scale: 1, duration: 0.2 });
      }
    };

    // 🌀 Click Ripple effect
    const handleClick = (e: MouseEvent) => {
      setClickRipple({ x: e.clientX, y: e.clientY });
      gsap.fromTo(
        "#click-ripple",
        { scale: 0.2, opacity: 0.7 },
        { scale: 2, opacity: 0, duration: 0.6, ease: "power2.out" }
      );
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("click", handleClick);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <>
      {/* 🌀 Click Ripple */}
      {clickRipple && (
        <div
          id="click-ripple"
          className="fixed rounded-full pointer-events-none z-[9998] border-2 border-cyan-300"
          style={{
            left: clickRipple.x,
            top: clickRipple.y,
            width: "60px",
            height: "60px",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </>
  );
}
