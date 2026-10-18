import { Bell, CircleUserRound } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Brand } from "./Brand";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#17332f]/10 bg-[#f6f2e9]/92 backdrop-blur-xl" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="page-wrap flex h-18 items-center justify-between gap-4">
        <Brand />
        <nav aria-label="Navigation principale" className="hidden items-center gap-6 md:flex">
          <NavLink to="/explorer" className={({ isActive }) => `font-bold ${isActive ? "text-[#17332f]" : "text-[#64736f] hover:text-[#17332f]"}`}>Explorer</NavLink>
          <NavLink to="/impact" className={({ isActive }) => `font-bold ${isActive ? "text-[#17332f]" : "text-[#64736f] hover:text-[#17332f]"}`}>Mon impact</NavLink>
          <Link to="/creer" className="btn-primary">Créer une collecte</Link>
        </nav>
        <div className="flex items-center gap-1 md:gap-2">
          <button type="button" aria-label="Ouvrir les notifications" className="grid size-11 place-items-center rounded-full hover:bg-white"><Bell className="size-5" /></button>
          <Link to="/profil" aria-label="Ouvrir le profil" className="grid size-11 place-items-center rounded-full hover:bg-white"><CircleUserRound className="size-6" /></Link>
        </div>
      </div>
    </header>
  );
}
