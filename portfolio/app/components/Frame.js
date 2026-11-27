import Shape from "./Shape";

const KEY = { "Social Media Design": "phone", "Poster Design": "poster", "Graphic Design": "graphic", "Digital Illustration": "sticker", "Web Design": "browser" };

// Bingkai berbeda tiap kategori; tinggi wadah mengikuti w x h proyek.
export default function Frame({ p, big = false }) {
  const k = KEY[p.cat] || "graphic";
  return (
    <div className="fr">
      <div className={`frame f-${k}`}>
        {k === "browser" && <div className="bar"><i /><i /><i /><u>erlywinarni.com/{p.slug}</u></div>}
        {k === "phone" && <b className="island" />}
        {k === "graphic" && <><s className="cm tl" /><s className="cm tr" /><s className="cm bl" /><s className="cm br" /></>}
        <div className="fv" style={{ background: p.bg, aspectRatio: `${p.w} / ${p.h}`, maxHeight: big ? "none" : 520 }}>
          {p.image ? <img src={p.image} alt={p.t} /> : <div className="ph"><Shape type={p.shape} c={p.fg} /></div>}
        </div>
      </div>
      <span className="sz">{p.label}</span>
    </div>
  );
}
