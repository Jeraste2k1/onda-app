import { Activity, Compass, Home, Plus, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/explorer", label: "Explorer", icon: Compass },
  { to: "/creer", label: "Créer", icon: Plus, primary: true },
  { to: "/impact", label: "Impact", icon: Activity },
  { to: "/profil", label: "Profil", icon: UserRound },
];

export function MobileNav() {
  return (
    <nav aria-label="Navigation mobile" className="fixed inset-x-0 bottom-0 z-50 border-t border-[#17332f]/10 bg-[#fffdf8]/95 px-2 pb-[max(.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden">
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {items.map(({ to, label, icon: Icon, primary }) => (
          <li key={to}>
            <NavLink to={to} className={({ isActive }) => `flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[.7rem] font-bold ${isActive ? "text-[#123f38]" : "text-[#72807c]"}`}>
              <span className={`grid size-8 place-items-center rounded-full ${primary ? "bg-[#f4c95d] text-[#17332f]" : ""}`}><Icon className="size-5" strokeWidth={2.2} /></span>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
