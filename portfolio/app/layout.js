import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Cursor from "./components/Cursor";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"], variable: "--f-head" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--f-body" });

export const metadata = { title: "Erly Winarni | Portofolio Desain", description: "Portofolio desainer visual & UI/UX" };

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${syne.variable} ${jakarta.variable}`}><Cursor /><Nav />{children}</body>
    </html>
  );
}
