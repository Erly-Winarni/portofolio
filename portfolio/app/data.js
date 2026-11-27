// Ganti isi proyek di sini.
// w & h = lebar x tinggi desain aslimu (px, atau mm untuk poster). Wadah karya otomatis menyesuaikan rasio ini.
// label = teks ukuran yang tampil (kosongkan untuk otomatis "w × h px").
// Untuk gambar asli: taruh file di public/karya/ lalu isi image: "/karya/nama.jpg"
export const CATEGORIES = ["Social Media Design", "Poster Design", "Graphic Design", "Digital Illustration", "Web Design"];

const STEPS = {
  "Social Media Design": ["Menentukan pesan dan format konten", "Membuat layout dan visual", "Menyesuaikan ukuran untuk tiap platform"],
  "Poster Design": ["Riset tema dan audiens", "Sketsa komposisi dan tipografi", "Finishing dan persiapan cetak"],
  "Graphic Design": ["Memahami kebutuhan klien", "Eksplorasi konsep dan warna", "Finalisasi dan penyerahan file"],
  "Digital Illustration": ["Mengumpulkan referensi", "Sketsa dan line art", "Pewarnaan dan finishing"],
  "Web Design": ["Menyusun struktur halaman", "Desain layout dan tipografi", "Prototipe dan penyesuaian responsif"],
};
const ROLE = { "Social Media Design": "Desainer konten", "Poster Design": "Desainer poster", "Graphic Design": "Desainer grafis", "Digital Illustration": "Ilustrator", "Web Design": "Web designer" };

const mk = (slug, t, cat, w, h, shape, bg, fg, tools, d, x = {}) => ({
  slug, t, cat, w, h, shape, bg, fg, tools, d, tag: [cat], label: `${w} × ${h} px`, year: "2025",
  role: ROLE[cat], steps: STEPS[cat], image: null, gallery: [null, null, null], ...x,
});

export const PROJECTS = [
  mk("carousel-edukasi", "Carousel Edukasi Sistem Informasi", "Social Media Design", 1080, 1440, "square", "#0f3899", "#e2fd79", ["Figma", "Photoshop"], "Rangkaian slide edukasi bergaya ilustratif untuk feed Instagram, dibuat agar mudah dibaca dan enak digeser."),
  mk("infografis-panjang", "Infografis Panjang Hari Mahasiswa", "Social Media Design", 1080, 4320, "star", "#e2fd79", "#0f3899", ["Figma"], "Infografis vertikal panjang yang dibaca dengan menggulir, berisi data dan ilustrasi ikon."),
  mk("poster-festival", "Poster Festival Musik", "Poster Design", 297, 420, "star", "#ffffff", "#0f3899", ["Photoshop", "Procreate"], "Poster bergaya geometris untuk festival musik tahunan, siap cetak ukuran A3.", { label: "A3 · 297 × 420 mm" }),
  mk("poster-seminar", "Poster Seminar Teknologi", "Poster Design", 297, 420, "tri", "#eef2fb", "#0f3899", ["Photoshop", "Figma"], "Poster seminar dengan tipografi besar dan blok warna tegas.", { label: "A3 · 297 × 420 mm" }),
  mk("kopi-senja", "Brand Identity Kopi Senja", "Graphic Design", 3000, 2500, "circle", "#e2fd79", "#0f3899", ["Photoshop", "Figma"], "Identitas visual untuk kedai kopi lokal: logo, palet warna, kemasan, dan panduan merek.", { tag: ["Graphic Design", "Branding"] }),
  mk("spanduk-pameran", "Spanduk Pameran Kampus", "Graphic Design", 2000, 1000, "tri", "#0f3899", "#ffffff", ["Photoshop"], "Spanduk horizontal untuk pameran kampus, dibaca jelas dari jarak jauh."),
  mk("karakter-mingguan", "Ilustrasi Karakter Mingguan", "Digital Illustration", 1080, 1920, "circle", "#0f3899", "#ffffff", ["Clip Studio Paint", "Procreate"], "Proyek pribadi: satu karakter baru setiap minggu untuk melatih konsistensi gaya dan ekspresi."),
  mk("studio-arsitek", "Website Studio Arsitek", "Web Design", 1440, 900, "tri", "#eef2fb", "#0f3899", ["Figma"], "Desain website portofolio dengan transisi halaman dan animasi mikro yang halus."),
  mk("landing-dompetku", "Landing Page Dompetku", "Web Design", 1440, 2600, "square", "#e2fd79", "#0f3899", ["Figma"], "Landing page panjang untuk aplikasi keuangan pribadi, dari hero sampai ajakan mengunduh."),
];
