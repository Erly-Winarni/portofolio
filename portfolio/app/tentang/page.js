"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const FACTS = [
  { f: "Kuliah", b: "Sistem Informasi, angkatan 2024, Universitas Hasanuddin.", bg: "#0f3899", fg: "#e2fd79" },
  { f: "Suka bikin", b: "Ilustrasi digital, tampilan aplikasi, dan identitas visual.", bg: "#e2fd79", fg: "#0f3899" },
  { f: "Lagi dipelajari", b: "Menyatukan desain dengan kode: Next.js dan animasi web.", bg: "#fff", fg: "#0f3899" },
];
const STEPS = [
  ["2024", "Mulai kuliah Sistem Informasi di Universitas Hasanuddin."],
  ["Lalu", "Mengulik desain digital, dari menggambar di aplikasi seni sampai merancang UI di Figma."],
  ["Sekarang", "Mengumpulkan karya dan terbuka untuk proyek desain."],
];

function Flip({ x }) {
  const [on, setOn] = useState(false);
  return (
    <button className="flip" onClick={() => setOn(!on)} aria-label={`Balik kartu ${x.f}`}>
      <motion.div className="flip-in" animate={{ rotateY: on ? 180 : 0 }} transition={{ type: "spring", damping: 14 }}>
        <div className="face" style={{ background: x.bg, color: x.fg }}><h3>{x.f}</h3><small>klik untuk balik</small></div>
        <div className="face back" style={{ background: x.fg, color: x.bg === "#fff" ? "#fff" : x.bg }}><p>{x.b}</p></div>
      </motion.div>
    </button>
  );
}

export default function Tentang() {
  return (
    <main>
      <section className="page-top"><div className="wrap about">
        <div>
          <motion.h1 className="sec-title big" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            Halo, aku <span className="mark">Erly Winarni.</span>
          </motion.h1>
          <p className="lead">Mahasiswi Sistem Informasi angkatan 2024 di Universitas Hasanuddin.</p>
          <p>Aku suka mempertemukan dua dunia: logika sistem yang rapi dan visual yang enak dilihat. Di kampus aku belajar bagaimana sistem bekerja, di luar kelas aku menggambar dan mendesain supaya sistem itu terasa nyaman dipakai.</p>
          <p>Karyaku berkisar dari ilustrasi digital sampai desain antarmuka. Aku percaya desain yang bagus itu jelas, berani, dan punya karakter.</p>
          <div style={{ marginTop: 28 }}><Link className="btn" href="/keahlian">Lihat keahlianku</Link><Link className="btn alt" href="/coret">Coba coret-coret</Link></div>
        </div>
        <div className="photo-wrap">
          <div className="pf">
            <div className="pf-back" />
            <motion.div className="pf-box" whileHover={{ rotate: -1.5 }} initial={{ rotate: 2 }}>
              <div className="photo">
                {/* Ganti dengan <img src="/foto.jpg" alt="Erly Winarni" /> setelah menaruh foto di folder public */}
                <span>Taruh fotomu di sini</span>
              </div>
              <i className="hd tl" /><i className="hd tr" /><i className="hd bl" /><i className="hd br" />
              <span className="pf-label">Erly Winarni · 1080 × 1350</span>
            </motion.div>
            <motion.svg className="pf-spark" viewBox="0 0 100 100" animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }} aria-hidden>
              <polygon points="50,4 61,38 96,50 61,62 50,96 39,62 4,50 39,38" fill="#0f3899" />
            </motion.svg>
            <motion.div className="pf-cur" animate={{ x: [0, 14, 0], y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
              <svg viewBox="0 0 30 30" width="34" height="34" aria-hidden><path d="M4 4 L24 12 L14.5 15 L11 25 Z" fill="#e2fd79" stroke="#0f3899" strokeWidth="2.5" strokeLinejoin="round" /></svg>
              <span>Erly</span>
            </motion.div>
          </div>
          <motion.svg className="badge" viewBox="0 0 200 200" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} aria-hidden>
            <circle cx="100" cy="100" r="98" fill="#e2fd79" stroke="#0f3899" strokeWidth="3" />
            <defs><path id="c" d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0" /></defs>
            <text fontSize="17" fontWeight="800" fill="#0f3899" fontFamily="sans-serif"><textPath href="#c">Mahasiswi Sistem Informasi ✦ Unhas 2024 ✦ </textPath></text>
          </motion.svg>
        </div>
      </div></section>

      <section className="dark"><div className="wrap">
        <h2 className="sec-title">Sekilas tentangku</h2>
        <p className="sec-sub">Balik kartunya.</p>
        <div className="flips">{FACTS.map((x) => <Flip key={x.f} x={x} />)}</div>
      </div></section>

      <section><div className="wrap">
        <h2 className="sec-title">Perjalananku</h2>
        <div className="steps">
          {STEPS.map(([t, d], i) => (
            <motion.div key={t} className="step" initial={{ x: i % 2 ? 80 : -80, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", damping: 16 }}>
              <b>{t}</b><p>{d}</p>
            </motion.div>
          ))}
        </div>
      </div></section>
    </main>
  );
}
