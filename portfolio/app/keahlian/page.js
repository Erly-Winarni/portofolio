"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SK = [
  { n: "Photoshop", v: 95, lv: "Mahir", c: "#0f3899", t: "#e2fd79", note: "Alat utamaku untuk editing foto, poster, dan manipulasi gambar." },
  { n: "Figma", v: 85, lv: "Lanjut", c: "#e2fd79", t: "#0f3899", note: "Dipakai untuk wireframe, desain UI, dan prototipe interaktif." },
  { n: "Clip Studio Paint", v: 72, lv: "Menengah ke atas", c: "#fff", t: "#0f3899", note: "Untuk ilustrasi dan gambar berbasis garis yang bersih." },
  { n: "Procreate", v: 62, lv: "Menengah", c: "#0f3899", t: "#e2fd79", note: "Sketsa cepat dan ilustrasi santai di tablet." },
  { n: "ibisPaint", v: 50, lv: "Cukup", c: "#e2fd79", t: "#0f3899", note: "Menggambar praktis dari ponsel." },
  { n: "MediBang", v: 40, lv: "Dasar", c: "#fff", t: "#0f3899", note: "Masih tahap mengenal fitur-fiturnya." },
];

function Tip({ c }) {
  return (
    <svg className="tip" viewBox="0 0 56 64" aria-hidden>
      <polygon points="0,2 56,32 0,62" fill="#fff" stroke="#0f3899" strokeWidth="3" strokeLinejoin="round" />
      <polygon points="38,24 56,32 38,40" fill={c === "#fff" ? "#0f3899" : c} stroke="#0f3899" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export default function Keahlian() {
  const [sel, setSel] = useState(SK[0]);
  const pick = async (s, e) => {
    setSel(s);
    const r = e.currentTarget.getBoundingClientRect();
    const confetti = (await import("canvas-confetti")).default;
    confetti({ particleCount: 40, spread: 70, startVelocity: 25, colors: ["#0f3899", "#e2fd79", "#ffffff"], origin: { x: (r.left + r.width / 2) / innerWidth, y: (r.top + 20) / innerHeight }, disableForReducedMotion: true });
  };
  return (
    <main>
      <section className="page-top"><div className="wrap">
        <h1 className="sec-title big">Keahlian aplikasi</h1>
        <p className="sec-sub">Semakin panjang pensilnya, semakin sering aku memakainya. Klik pensil untuk detail.</p>
        <div className="pencils">
          {SK.map((s, i) => (
            <motion.button key={s.n} className="pencil" style={{ "--w": `${30 + s.v * 0.7}%` }} aria-label={`${s.n}, ${s.v} persen`}
              initial={{ width: 0 }} whileInView={{ width: `${30 + s.v * 0.7}%` }} viewport={{ once: true }}
              transition={{ type: "spring", damping: 18, stiffness: 60, delay: i * 0.1 }}
              whileHover={{ rotate: -1.5, y: -4 }} whileTap={{ scale: 0.98 }} onClick={(e) => pick(s, e)}>
              <span className="eraser" /><span className="ferrule" />
              <span className="pbody" style={{ background: s.c, color: s.t }}><b>{s.n}</b><em>{s.v}%</em></span>
              <Tip c={s.c} />
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={sel.n} className="note" initial={{ scale: 0.7, rotate: -4, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: "spring", damping: 14 }}>
            <h3>{sel.n}</h3><span className="tag">{sel.lv}</span><p>{sel.note}</p>
          </motion.div>
        </AnimatePresence>
      </div></section>
    </main>
  );
}
