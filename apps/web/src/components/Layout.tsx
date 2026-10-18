import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

export function Layout() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [location.pathname]);

  return (
    <div className="app-shell text-[#17332f]">
      <Header />
      <main ref={mainRef} id="main" tabIndex={-1} className="bottom-safe outline-none"><Outlet /></main>
      <MobileNav />
    </div>
  );
}
