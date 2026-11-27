"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Shape from "../components/Shape";

const BG = ["#ffffff", "#0f3899", "#e2fd79", "#eef2fb"];
const COL = ["#0f3899", "#e2fd79", "#ffffff", "#0a1633"];
const SHAPES = [["circle", "Lingkaran"], ["square", "Kotak"], ["star", "Bintang"], ["tri", "Segitiga"]];
let zc = 10;
const uid = () => Math.random().toString(36).slice(2, 8);
const rnd = (a, b) => a + Math.random() * (b - a);
const START = [
  { id: "a", type: "circle", x: 52, y: 6, size: 150, rot: 0, color: "#e2fd79", z: 1 },
  { id: "b", type: "star", x: 8, y: 58, size: 120, rot: 12, color: "#0f3899", z: 2 },
  { id: "c", type: "text", x: 10, y: 28, size: 120, rot: -6, color: "#0f3899", text: "Haloow!", z: 3 },
];

export default function Poster() {
  const ref = useRef(null);
  const [items, setItems] = useState(START);
  const [bg, setBg] = useState(BG[0]);
  const [sel, setSel] = useState("c");
  const [txt, setTxt] = useState("Desain itu seru");
  const cur = items.find((i) => i.id === sel);

  const upd = (id, patch) => setItems((a) => a.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  const pick = (id) => { setSel(id); upd(id, { z: ++zc }); };
  const add = (type, extra = {}) => {
    const it = { id: uid(), type, x: rnd(15, 60), y: rnd(10, 65), size: rnd(90, 150), rot: Math.round(rnd(-20, 20)), color: COL[Math.floor(rnd(0, 3))], z: ++zc, ...extra };
    setItems((a) => [...a, it]); setSel(it.id);
  };
  const shuffle = () => setItems((a) => a.map((i) => ({ ...i, id: uid(), x: rnd(5, 65), y: rnd(5, 75), rot: Math.round(rnd(-30, 30)) })));
  const save = async () => {
    setSel(null);
    await new Promise((r) => setTimeout(r, 120));
    const { toPng } = await import("html-to-image");
    const url = await toPng(ref.current, { pixelRatio: 2 });
    const a = document.createElement("a"); a.download = "poster-erly.png"; a.href = url; a.click();
  };

  return (
    <main>
      <section className="page-top"><div className="wrap">
        <h1 className="sec-title big">Studio poster</h1>
        <p className="sec-sub">Susun bentuk dan teks jadi poster mini. Seret, putar, ganti warna, lalu simpan.</p>
        <div className="studio">
          <div ref={ref} className="pboard" style={{ background: bg }} onPointerDown={(e) => e.target === e.currentTarget && setSel(null)}>
            <AnimatePresence>
              {items.map((it) => (
                <motion.div key={it.id} className={`pitem ${sel === it.id ? "sel" : ""}`} drag dragConstraints={ref} dragMomentum={false} dragElastic={0.1}
                  onPointerDown={() => pick(it.id)} style={{ left: `${it.x}%`, top: `${it.y}%`, rotate: it.rot, zIndex: it.z }}
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} whileDrag={{ scale: 1.1 }} transition={{ type: "spring", damping: 12 }}>
                  {it.type === "text" ? <span style={{ fontSize: it.size / 2.4, color: it.color }}>{it.text}</span>
                    : <div style={{ width: it.size, height: it.size }}><Shape type={it.type} c={it.color} /></div>}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="panel">
            <div><h3>Latar poster</h3><div className="row2">{BG.map((c) => <button key={c} className={`sw ${bg === c ? "on" : ""}`} style={{ background: c }} onClick={() => setBg(c)} aria-label={`Latar ${c}`} />)}</div></div>
            <div><h3>Tambah bentuk</h3><div className="row2">{SHAPES.map(([t, l]) => <button key={t} className="mini" onClick={() => add(t)}>{l}</button>)}</div></div>
            <div><h3>Tambah teks</h3><div className="row2"><input type="text" value={txt} onChange={(e) => setTxt(e.target.value)} aria-label="Isi teks" /><button className="mini on" onClick={() => txt.trim() && add("text", { text: txt, size: 120 })}>Tambah</button></div></div>
            <div className="ctrl">
              {cur ? (
                <>
                  <h3>Atur elemen terpilih</h3>
                  <div className="row2">
                    <button className="mini" onClick={() => upd(cur.id, { size: Math.max(40, cur.size - 15) })}>Kecil</button>
                    <button className="mini" onClick={() => upd(cur.id, { size: Math.min(320, cur.size + 15) })}>Besar</button>
                    <button className="mini" onClick={() => upd(cur.id, { rot: cur.rot - 15 })}>Putar kiri</button>
                    <button className="mini" onClick={() => upd(cur.id, { rot: cur.rot + 15 })}>Putar kanan</button>
                  </div>
                  <div className="row2" style={{ margin: "14px 0" }}>{COL.map((c) => <button key={c} className={`sw ${cur.color === c ? "on" : ""}`} style={{ background: c }} onClick={() => upd(cur.id, { color: c })} aria-label={`Warna ${c}`} />)}</div>
                  <button className="mini" onClick={() => { setItems((a) => a.filter((i) => i.id !== cur.id)); setSel(null); }}>Hapus elemen</button>
                </>
              ) : <p>Klik elemen di poster untuk mengaturnya.</p>}
            </div>
            <div className="row2"><button className="mini" onClick={shuffle}>Acak posisi</button><button className="mini" onClick={() => { setItems([]); setSel(null); }}>Kosongkan</button><button className="mini on" onClick={save}>Simpan PNG</button></div>
          </div>
        </div>
      </div></section>
    </main>
  );
}
