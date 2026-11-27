"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";

const LINKS = [["/", "Beranda"], ["/tentang", "Tentang"], ["/keahlian", "Keahlian"], ["/karya", "Karya"], ["/coret", "Coret-coret"], ["/poster", "Poster"]];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <nav className="nav" aria-label="Navigasi utama">
        <Link href="/" className="brand">EW</Link>
        <div className="links">
          {LINKS.map(([h, l]) => (
            <Link key={h} href={h} className={path === h || (h !== "/" && path.startsWith(h + "/")) ? "on" : ""}>
              {(path === h || (h !== "/" && path.startsWith(h + "/"))) && <motion.span layoutId="pill" className="pill" transition={{ type: "spring", damping: 20 }} />}
              <span>{l}</span>
            </Link>
          ))}
          <Link href="/#kontak" className="cta">Hubungi</Link>
        </div>
        <button className={`burger ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label="Buka menu" aria-expanded={open}>
          <i /><i /><i />
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div className="menu" initial={{ clipPath: "circle(0% at 90% 5%)" }} animate={{ clipPath: "circle(150% at 90% 5%)" }} exit={{ clipPath: "circle(0% at 90% 5%)" }} transition={{ duration: 0.5 }}>
            {[...LINKS, ["/#kontak", "Hubungi"]].map(([h, l], i) => (
              <motion.div key={h} initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.07 }}>
                <Link href={h} className={path === h ? "on" : ""}>{l}</Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
