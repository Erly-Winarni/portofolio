"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Shape from "./components/Shape";
import Orbit from "./components/Orbit";
import Stats from "./components/Stats";
import { PROJECTS } from "./data";

const NAME = "Erly Winarni";
const TOOLS = ["Photoshop", "Figma", "Clip Studio Paint", "Procreate", "ibisPaint", "MediBang"];
const MARQ = ["Branding", "UI/UX", "Ilustrasi", "Motion", "Tipografi", "Web Design", "Packaging"];

function Floater({ style, children, rot = 12, delay = 0 }) {
  return (
    <motion.div className="float" style={style} drag dragMomentum={false} whileDrag={{ scale: 1.15, zIndex: 5 }}
      initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0, y: [0, -14, 0] }}
      transition={{ scale: { type: "spring", delay: 0.4 + delay }, rotate: { type: "spring", delay: 0.4 + delay }, y: { duration: 4 + delay, repeat: Infinity, ease: "easeInOut" } }}>
      <motion.div animate={{ rotate: [-rot, rot, -rot] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>{children}</motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [open, setOpen] = useState(null);
  const [toast, setToast] = useState("Halo! 👋 Seret elemen desain di atas, semuanya bisa digeser.");

  useEffect(() => { const t = setTimeout(() => setToast(null), 5000); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const k = (e) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  const say = (m) => { setToast(m); setTimeout(() => setToast(null), 3500); };

  return (
    <main>

      <header className="hero">
        <Floater style={{ top: "20%", right: "8%" }}><div style={{ width: 120, height: 120 }}><Shape type="circle" c="#e2fd79" /></div></Floater>
        <Floater delay={1} rot={20} style={{ top: "52%", right: "22%" }}><div style={{ width: 90, height: 90 }}><Shape type="star" c="#0f3899" /></div></Floater>
        <Floater delay={2} style={{ top: "30%", right: "30%" }}>
          <div style={{ background: "#fff", border: "2px solid #0f3899", borderRadius: 14, padding: "10px 18px", boxShadow: "4px 4px 0 #0f3899", fontFamily: "var(--f-head)", fontSize: 44, color: "#0f3899" }}>Aa</div>
        </Floater>
        <Floater delay={1.5} rot={6} style={{ bottom: "16%", right: "6%" }}>
          <div style={{ display: "flex", border: "2px solid #0f3899", borderRadius: 14, overflow: "hidden", boxShadow: "4px 4px 0 #0f3899" }}>
            {["#0f3899", "#e2fd79", "#ffffff", "#0a1633"].map((c) => <div key={c} style={{ width: 44, height: 70, background: c }} />)}
          </div>
        </Floater>
        <Floater delay={0.5} style={{ bottom: "20%", left: "52%" }}>
          <svg width="80" height="80" viewBox="0 0 80 80"><path d="M10 70 L40 10 L70 70 Z M40 10 L40 45" fill="#fff" stroke="#0f3899" strokeWidth="4" strokeLinejoin="round" /><circle cx="40" cy="48" r="6" fill="#e2fd79" stroke="#0f3899" strokeWidth="3" /></svg>
        </Floater>
        <div className="wrap">
          <motion.h1 initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 80 }}>
            Haloow, yuk intip <span className="mark">portofolioku {"<3"}</span>
          </motion.h1>
          <p>Branding, antarmuka, dan ilustrasi yang rapi, berani, dan mudah diingat. Lihat karya terbaru saya di bawah.</p>
          <a className="btn" href="#karya">Lihat karya</a>
          <a className="btn alt" href="/tentang">Kenalan</a>
        </div>
        <span className="hint">Coba seret bentuk-bentuknya</span>
      </header>

      <div className="marquee" aria-hidden><div className="track">{[...MARQ, ...MARQ, ...MARQ, ...MARQ].map((m, i) => <span key={i}>{m}</span>)}</div></div>

      <section id="karya"><div className="wrap">
        <h2 className="sec-title">Karya pilihan</h2>
        <p className="sec-sub">Klik kartu untuk melihat detail proyek.</p>
        <div className="grid">
          {PROJECTS.slice(0, 6).map((p, i) => (
            <div className="orb" key={p.t}><Orbit /><motion.button className="card" onClick={() => setOpen(p)} whileHover={{ y: -8, rotate: i % 2 ? 1.2 : -1.2 }} whileTap={{ scale: 0.97 }}>
              <div className="thumb" style={{ background: p.bg }}><Shape type={p.shape} c={p.fg} /></div>
              <div className="info"><h3>{p.t}</h3>{p.tag.map((x) => <span className="tag" key={x}>{x}</span>)}</div>
            </motion.button></div>
          ))}
        </div>
        <div style={{ marginTop: 44 }}><a className="btn" href="/karya">Lihat semua karya</a></div>
      </div></section>

      <section id="alat" className="dark"><div className="wrap">
        <h2 className="sec-title">Alat favorit</h2>
        <p className="sec-sub">Klik salah satu, siapa tahu ada kejutan.</p>
        <div className="tools">
          {TOOLS.map((t, i) => (
            <motion.button key={t} className="chip" whileHover={{ scale: 1.12, rotate: i % 2 ? 4 : -4 }} whileTap={{ scale: 0.9 }} onClick={() => say(`${t}: salah satu andalan saya 💙`)}>{t}</motion.button>
          ))}
        </div>
        <div style={{ marginTop: 32 }}><a className="btn" style={{ boxShadow: "4px 4px 0 #fff" }} href="/keahlian">Lihat tingkat keahlian</a></div>
        <Stats />
      </div></section>

      <section id="kontak" className="contact"><div className="wrap">
        <h2>Punya proyek? <span className="mark">Ayo ngobrol.</span></h2>
        <div className="row">
          <a className="btn" href="mailto:halo@emailkamu.com">Kirim email</a>
          <a className="btn alt" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a className="btn alt" href="https://behance.net" target="_blank" rel="noreferrer">Behance</a>
        </div>
      </div></section>
      <footer>© 2026 {NAME}</footer>

      <AnimatePresence>
        {open && (
          <motion.div className="overlay" onClick={() => setOpen(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal" role="dialog" aria-modal="true" style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.6, rotate: -6, y: 80 }} animate={{ scale: 1, rotate: 0, y: 0 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ type: "spring", damping: 16 }}>
              <button className="x" onClick={() => setOpen(null)} aria-label="Tutup">✕</button>
              <div className="thumb" style={{ background: open.bg }}><Shape type={open.shape} c={open.fg} /></div>
              <div className="body">
                <h3>{open.t}</h3>
                <p>{open.d}</p>
                {open.tag.map((x) => <span className="tag" key={x}>{x}</span>)}
                <div style={{ marginTop: 22 }}><a className="btn alt" style={{ margin: "0 12px 12px 0" }} href={`/karya/${open.slug}`}>Buka halaman proyek</a><a className="btn" href="#kontak" onClick={() => setOpen(null)}>Diskusikan proyek serupa</a></div>
              </div>
            </motion.div>
          </motion.div>
        )}
        {toast && <motion.div className="toast" initial={{ x: -320, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -320, opacity: 0 }}>{toast}</motion.div>}
      </AnimatePresence>
    </main>
  );
}
