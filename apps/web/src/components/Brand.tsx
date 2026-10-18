import { Link } from "react-router-dom";

export function Brand() {
  return (
    <Link to="/" className="inline-flex min-h-11 items-center gap-2 rounded-xl" aria-label="Onda, accueil">
      <span className="grid size-10 place-items-center rounded-full bg-[#123f38] text-white" aria-hidden="true">
        <svg viewBox="0 0 40 40" className="size-7" fill="none">
          <path d="M8 22c4.5-8 9-8 13.5 0S30 30 34 21" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="10" cy="14" r="3" fill="#f4c95d" />
        </svg>
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-[#17332f]">onda</span>
    </Link>
  );
}
