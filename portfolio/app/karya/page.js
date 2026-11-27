"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Frame from "../components/Frame";
import Orbit from "../components/Orbit";
import { PROJECTS, CATEGORIES } from "../data";

export default function Karya() {
  const [cat, setCat] = useState("Semua");
  const list = PROJECTS.filter((p) => cat === "Semua" || p.cat === cat);
  const count = (c) => PROJECTS.filter((p) => p.cat === c).length;
  return (
    <main>
      <section className="page-top"><div className="wrap">
        <h1 className="sec-title big">Semua karya</h1>
        <p className="sec-sub">Tiap karya tampil dengan bingkai dan ukuran aslinya. Arahkan kursor ke karya panjang untuk melihat isinya menggulir.</p>
        <div className="filters">
          {["Semua", ...CATEGORIES].map((c) => (
            <motion.button key={c} className={`mini ${cat === c ? "on" : ""}`} whileTap={{ scale: 0.9 }} onClick={() => setCat(c)}>
              {c} {c !== "Semua" && <small>({count(c)})</small>}
            </motion.button>
          ))}
        </div>
        <div className="masonry">
          <AnimatePresence>
            {list.map((p, i) => (
              <motion.div key={p.slug} className="orb mitem" initial={{ scale: 0.7, opacity: 0, rotate: -4 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ type: "spring", damping: 16 }}>
                <Orbit />
                <Link href={`/karya/${p.slug}`} className="mlink">
                  <Frame p={p} />
                  <h3>{p.t}</h3>
                  {p.tag.map((x) => <span className="tag" key={x}>{x}</span>)}
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div></section>
    </main>
  );
}
