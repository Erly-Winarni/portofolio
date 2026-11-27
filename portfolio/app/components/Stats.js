"use client";
import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";

// Ganti angka dan label sesuai data aslimu
const DATA = [
  { n: 50, suf: "+", l: "Proyek selesai", k: "pencil" },
  { n: 30, suf: "", l: "Klien puas", k: "heart" },
  { n: 4, suf: " th", l: "Pengalaman", k: "hourglass" },
  { n: 12, suf: "", l: "Penghargaan", k: "trophy" },
];

const ring = (n, a, b, pts = 120) => Array.from({ length: pts }, (_, i) => { const t = (i / pts) * Math.PI * 2, r = a + b * Math.cos(n * t); return `${(50 + r * Math.cos(t)).toFixed(1)},${(50 + r * Math.sin(t)).toFixed(1)}`; }).join(" ");
const burst = (n, a, b) => Array.from({ length: n * 2 }, (_, i) => { const t = (i / (n * 2)) * Math.PI * 2, r = i % 2 ? b : a; return `${(50 + r * Math.cos(t)).toFixed(1)},${(50 + r * Math.sin(t)).toFixed(1)}`; }).join(" ");

const I = { stroke: "#0f3899", strokeWidth: 3, strokeLinejoin: "round", strokeLinecap: "round" };
const pop = { rest: { scale: 0, opacity: 0 }, hover: { scale: [0, 1.2, 0.8, 1.2], opacity: 1, transition: { repeat: Infinity, duration: 1.1 } } };

function Art({ k }) {
  const shadow = { fill: "#0a1633", transform: "translate(4 4)" };
  if (k === "trophy") return (<>
    <polygon points={burst(12, 48, 39)} {...shadow} /><polygon points={burst(12, 48, 39)} fill="#e2fd79" {...I} />
    <motion.g variants={{ rest: { rotate: 0 }, hover: { rotate: [-8, 8, -8], transition: { repeat: Infinity, duration: 0.5 } } }} style={{ originX: "50px", originY: "60px" }}>
      <path d="M34 32 H24 C24 46 30 50 36 50 M66 32 H76 C76 46 70 50 64 50" fill="none" {...I} />
      <path d="M34 26 H66 V44 C66 56 58 62 50 62 C42 62 34 56 34 44 Z" fill="#fff" {...I} />
      <polygon points="50,32 53,40 61,40 55,45 57,53 50,48 43,53 45,45 39,40 47,40" fill="#0f3899" />
      <rect x="45" y="62" width="10" height="10" fill="#fff" {...I} /><rect x="36" y="72" width="28" height="8" rx="2" fill="#fff" {...I} />
    </motion.g>
    <motion.polygon variants={pop} points="86,14 89,22 97,22 91,27 93,35 86,30 79,35 81,27 75,22 83,22" fill="#0f3899" />
    <motion.polygon variants={pop} points="12,60 14,66 20,66 15,70 17,76 12,72 7,76 9,70 4,66 10,66" fill="#fff" stroke="#0f3899" strokeWidth="2" />
  </>);
  if (k === "hourglass") return (<>
    <path d="M10 96 V50 A40 40 0 0 1 90 50 V96 Z" {...shadow} /><path d="M10 96 V50 A40 40 0 0 1 90 50 V96 Z" fill="#fff" {...I} />
    <motion.g variants={{ rest: { rotate: 0 }, hover: { rotate: 180, transition: { type: "spring", damping: 8 } } }} style={{ originX: "50px", originY: "52px" }}>
      <path d="M34 28 H66 L50 52 L66 76 H34 L50 52 Z" fill="#e2fd79" {...I} /><path d="M30 28 H70 M30 76 H70" {...I} strokeWidth="5" />
    </motion.g>
    {[0, 1, 2].map((i) => <motion.circle key={i} cx={50} cy={50} r="2.2" fill="#0f3899" variants={{ rest: { opacity: 0 }, hover: { y: [0, 22], opacity: [1, 0], transition: { repeat: Infinity, duration: 0.8, delay: i * 0.25 } } }} />)}
  </>);
  if (k === "heart") return (<>
    <circle cx="50" cy="50" r="46" {...shadow} /><circle cx="50" cy="50" r="46" fill="#e2fd79" {...I} />
    <motion.path d="M50 74 C20 56 24 30 40 30 C46 30 50 34 50 38 C50 34 54 30 60 30 C76 30 80 56 50 74 Z" fill="#fff" {...I}
      variants={{ rest: { scale: 1 }, hover: { scale: [1, 1.18, 1], transition: { repeat: Infinity, duration: 0.7 } } }} style={{ originX: "50px", originY: "50px" }} />
    <motion.path d="M82 20 C76 14 70 20 76 26 L82 31 L88 26 C94 20 88 14 82 20 Z" fill="#0f3899" variants={{ rest: { y: 0, opacity: 0 }, hover: { y: [10, -10], opacity: [1, 0], transition: { repeat: Infinity, duration: 1 } } }} />
  </>);
  return (<>
    <polygon points={ring(6, 39, 6)} {...shadow} /><polygon points={ring(6, 39, 6)} fill="#fff" {...I} />
    <motion.g variants={{ rest: { rotate: 0 }, hover: { rotate: [0, -10, 6, 0], transition: { repeat: Infinity, duration: 0.8 } } }} style={{ originX: "50px", originY: "60px" }}>
      <g transform="rotate(-40 50 48)"><rect x="42" y="20" width="16" height="40" fill="#e2fd79" {...I} /><rect x="42" y="14" width="16" height="8" fill="#0f3899" {...I} /><polygon points="42,60 58,60 50,74" fill="#fff" {...I} /></g>
    </motion.g>
    <motion.path d="M22 82 Q32 70 42 82 T62 82 T80 82" fill="none" stroke="#0f3899" strokeWidth="3.5" strokeLinecap="round" variants={{ rest: { pathLength: 0 }, hover: { pathLength: 1, transition: { duration: 0.6 } } }} />
  </>);
}

function Count({ to, suf }) {
  const ref = useRef(null), seen = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => { if (!seen) return; const c = animate(0, to, { duration: 1.5, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) }); return () => c.stop(); }, [seen, to]);
  return <b ref={ref}>{v}{suf}</b>;
}

export default function Stats() {
  const boom = async (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const confetti = (await import("canvas-confetti")).default;
    confetti({ particleCount: 36, spread: 80, startVelocity: 22, colors: ["#e2fd79", "#ffffff", "#0f3899"], origin: { x: (r.left + r.width / 2) / innerWidth, y: (r.top + r.height / 3) / innerHeight }, disableForReducedMotion: true });
  };
  return (
    <div className="stats">
      {DATA.map((d, i) => (
        <motion.div key={d.l} className="sitem" initial="rest" animate="rest" whileHover="hover" whileTap={{ scale: 0.93 }}
          drag dragSnapToOrigin dragElastic={0.35} onClick={boom} role="button" tabIndex={0}
          style={{ rotate: i % 2 ? 3 : -3 }}>
          <motion.div initial={{ scale: 0, rotate: -120 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: "spring", damping: 11, delay: i * 0.12 }}>
            <svg viewBox="0 0 100 100" aria-hidden><Art k={d.k} /></svg>
          </motion.div>
          <Count to={d.n} suf={d.suf} />
          <span>{d.l}</span>
        </motion.div>
      ))}
    </div>
  );
}
