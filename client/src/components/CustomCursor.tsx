import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;
    let lastTrailTime = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isClickable =
        ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT", "LABEL"].includes(
          target.tagName
        ) || !!target.closest("a, button, input, textarea, select, label");
      setIsPointer(isClickable);

      // Throttle trail (every 45ms)
      const now = Date.now();
      if (now - lastTrailTime > 45) {
        setTrails((prev) => {
          const newTrail = { x: e.clientX, y: e.clientY, id: trailId++ };
          return [...prev.slice(-6), newTrail]; // Keep last 6 trails only
        });
        lastTrailTime = now;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* 🔹 Animated Hover Trails */}
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="trail-circle"
            style={{
              animation: "trailFade 0.5s ease-out forwards",
            }}
          />
        </div>
      ))}

      {/* 🔵 Main Neon Cursor Halo */}
      <div
        className="fixed pointer-events-none z-[10000]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%)`,
        }}
      >
        <div
          className={`cursor-halo ${isPointer ? "scale-150" : "scale-100"}`}
        />
      </div>

      {/* 🔹 Core Cursor Dot */}
      <div
        className="fixed pointer-events-none z-[10001]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`cursor-core ${isPointer ? "scale-150" : "scale-100"}`}
        />
      </div>

      {/* ✨ Animations & Styling */}
      <style>{`
        .cursor-core {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,255,255,1), rgba(0,255,255,0.6));
          transition: transform 0.15s ease-out;
        }

        .cursor-halo {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2px solid rgba(0,255,255,0.6);
          background: radial-gradient(circle, rgba(0,255,255,0.25) 20%, rgba(0,255,255,0) 70%);
          box-shadow: 0 0 12px rgba(0,255,255,0.8),
                      0 0 24px rgba(0,255,255,0.4),
                      0 0 36px rgba(0,255,255,0.2);
          transition: transform 0.2s ease-out;
        }

        .trail-circle {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid rgba(0,255,255,0.4);
          background: radial-gradient(circle, rgba(0,255,255,0.2), transparent);
        }

        @keyframes trailFade {
          from {
            opacity: 0.6;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(2);
          }
        }
      `}</style>
    </>
  );
}
