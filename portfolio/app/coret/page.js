"use client";
import { useEffect, useRef, useState } from "react";

const COL = ["#0f3899", "#e2fd79", "#0a1633", "#ffffff"];

export default function Coret() {
  const cv = useRef(null);
  const drawing = useRef(false);
  const [color, setColor] = useState(COL[0]);
  const [size, setSize] = useState(10);
  const [mode, setMode] = useState("pena");
  const [used, setUsed] = useState(false);

  const clear = () => { const c = cv.current, x = c.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0, 0, c.width, c.height); setUsed(false); };
  useEffect(clear, []);
  const pos = (e) => { const r = cv.current.getBoundingClientRect(); return [(e.clientX - r.left) * (cv.current.width / r.width), (e.clientY - r.top) * (cv.current.height / r.height)]; };
  const stamp = (x, y) => {
    const c = cv.current.getContext("2d"), r = size * 3 + 10, k = Math.floor(Math.random() * 3);
    c.fillStyle = color; c.strokeStyle = "#0f3899"; c.lineWidth = 4; c.beginPath();
    if (k === 0) c.arc(x, y, r, 0, 7);
    else if (k === 1) c.rect(x - r, y - r, r * 2, r * 2);
    else { c.moveTo(x, y - r); c.lineTo(x + r, y + r); c.lineTo(x - r, y + r); c.closePath(); }
    c.fill(); c.stroke();
  };
  const down = (e) => {
    const [x, y] = pos(e); setUsed(true);
    if (mode === "stempel") return stamp(x, y);
    drawing.current = true; const c = cv.current.getContext("2d");
    c.lineCap = c.lineJoin = "round"; c.lineWidth = size; c.strokeStyle = color; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 0.1, y); c.stroke();
  };
  const move = (e) => { if (!drawing.current) return; const [x, y] = pos(e), c = cv.current.getContext("2d"); c.lineTo(x, y); c.stroke(); };
  const save = () => { const a = document.createElement("a"); a.download = "coretan-erly.png"; a.href = cv.current.toDataURL(); a.click(); };

  return (
    <main>
      <section className="page-top"><div className="wrap">
        <h1 className="sec-title big">Coret-coret</h1>
        <p className="sec-sub">Papan gambar kecil. Gambar bebas, pakai stempel bentuk, lalu simpan hasilnya.</p>
        <div className="tools-bar">
          <div className="grp">{COL.map((c) => <button key={c} className={`sw ${color === c ? "on" : ""}`} style={{ background: c }} onClick={() => setColor(c)} aria-label={`Warna ${c}`} />)}</div>
          <label className="grp">Ukuran <input type="range" min="2" max="40" value={size} onChange={(e) => setSize(+e.target.value)} /></label>
          <div className="grp">
            <button className={`mini ${mode === "pena" ? "on" : ""}`} onClick={() => setMode("pena")}>Pena</button>
            <button className={`mini ${mode === "stempel" ? "on" : ""}`} onClick={() => setMode("stempel")}>Stempel</button>
          </div>
          <div className="grp"><button className="mini" onClick={clear}>Hapus semua</button><button className="mini on" onClick={save}>Simpan PNG</button></div>
        </div>
        <div className="board">
          <canvas ref={cv} width="1100" height="560" onPointerDown={down} onPointerMove={move} onPointerUp={() => (drawing.current = false)} onPointerLeave={() => (drawing.current = false)} />
          {!used && <div className="ghost">Mulai coret di sini ✎</div>}
        </div>
      </div></section>
    </main>
  );
}
