"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Kursor berbentuk panah membulat. Ujung panah ada di titik (4,4) pada SVG.
export default function Cursor() {
  const x = useMotionValue(-50), y = useMotionValue(-50);
  const sx = useSpring(x, { stiffness: 600, damping: 38 }), sy = useSpring(y, { stiffness: 600, damping: 38 });
  useEffect(() => {
    const m = (e) => { x.set(e.clientX - 4); y.set(e.clientY - 4); };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, [x, y]);
  return (
    <motion.div className="cursor" style={{ x: sx, y: sy }}>
      <svg viewBox="0 0 30 30" width="30" height="30" style={{ overflow: "visible" }} aria-hidden>
        <path d="M6.5 6.5 L26.5 14.5 L17 17.5 L13.5 27.5 Z" fill="#0f3899" stroke="#0f3899" strokeWidth="3" strokeLinejoin="round" />
        <path d="M4 4 L24 12 L14.5 15 L11 25 Z" fill="#e2fd79" stroke="#0f3899" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}
