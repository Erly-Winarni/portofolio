"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Shape from "../../components/Shape";
import Frame from "../../components/Frame";
import { PROJECTS } from "../../data";

export default function Detail({ params }) {
  const i = PROJECTS.findIndex((x) => x.slug === params.slug);
  const [zoom, setZoom] = useState(null);
  useEffect(() => {
    const k = (e) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  if (i < 0) notFound();
  const p = PROJECTS[i], ratio = p.w / p.h, next = PROJECTS[(i + 1) % PROJECTS.length];
  const Visual = ({ n, big }) => (
    <div className="gal-in" style={{ background: n % 2 ? "#e2fd79" : p.bg }}>
      {p.gallery[n] ? <img src={p.gallery[n]} alt={`${p.t} ${n + 1}`} /> : <Shape type={p.shape} c={n % 2 ? p.fg : p.fg} />}
    </div>
  );
  return (
    <main>
      <section className="page-top"><div className="wrap">
        <Link href="/karya" className="back" aria-label="Kembali ke semua karya">&lt;</Link>
        <motion.h1 className="sec-title big" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{p.t}</motion.h1>
        <div>{p.tag.map((x) => <span className="tag" key={x}>{x}</span>)}</div>
        <div style={{ margin: "36px auto 44px", maxWidth: ratio < 0.8 ? 320 : ratio < 1 ? 460 : "100%" }}><Frame p={p} big /></div>
        <div className="meta">
          <div><b>Kategori</b>{p.cat}</div>
          <div><b>Ukuran</b>{p.label}</div>
          <div><b>Tahun</b>{p.year}</div>
          <div><b>Peran</b>{p.role}</div>
          <div><b>Alat</b>{p.tools.join(", ")}</div>
        </div>
        <p className="lead" style={{ maxWidth: 640 }}>{p.d}</p>
      </div></section>

      <section className="dark"><div className="wrap">
        <h2 className="sec-title">Proses</h2>
        <div className="steps">
          {p.steps.map((s, k) => (
            <motion.div key={s} className="step" style={{ color: "var(--ink)", background: "#fff" }} initial={{ x: -60, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: k * 0.1, type: "spring", damping: 16 }}>
              <b>Tahap {k + 1}</b><p>{s}</p>
            </motion.div>
          ))}
        </div>
      </div></section>

      <section><div className="wrap">
        <h2 className="sec-title">Galeri</h2>
        <p className="sec-sub">Klik gambar untuk memperbesar.</p>
        <div className="gallery">
          {p.gallery.map((g, n) => (
            <motion.button key={n} className="gal" style={{ aspectRatio: Math.min(2.2, Math.max(0.5, ratio)) }} whileHover={{ rotate: n % 2 ? 1.5 : -1.5, y: -6 }} onClick={() => setZoom(n)} aria-label={`Perbesar gambar ${n + 1}`}><Visual n={n} /></motion.button>
          ))}
        </div>
        <Link href={`/karya/${next.slug}`} className="btn" style={{ marginTop: 48 }}>Karya berikutnya: {next.t}</Link>
      </div></section>

      <AnimatePresence>
        {zoom !== null && (
          <motion.div className="overlay" onClick={() => setZoom(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="lightbox" style={{ aspectRatio: ratio, height: `min(86vh, ${900 / ratio}px)`, width: "auto", maxWidth: "100%" }} initial={{ scale: 0.5, rotate: -8 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ type: "spring", damping: 15 }} onClick={(e) => e.stopPropagation()}>
              <button className="x" onClick={() => setZoom(null)} aria-label="Tutup">✕</button>
              <Visual n={zoom} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
