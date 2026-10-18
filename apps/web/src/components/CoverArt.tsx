import { HeartHandshake, Leaf, School, Stethoscope } from "lucide-react";

const art = {
  school: { Icon: School, label: "Éducation", line: "48 enfants, une classe qui change tout" },
  sun: { Icon: HeartHandshake, label: "Urgence", line: "Préserver quatre emplois locaux" },
  garden: { Icon: Leaf, label: "Communauté", line: "Un terrain vivant pour le quartier" },
  ocean: { Icon: Stethoscope, label: "Santé", line: "Des soins suivis, des progrès visibles" },
} as const;

export function CoverArt({ variant, compact = false }: { variant: keyof typeof art; compact?: boolean }) {
  const { Icon, label, line } = art[variant];
  return (
    <div className={`cover-art cover-${variant} pattern-grid flex h-full min-h-44 flex-col justify-between p-5 text-[#17332f] ${compact ? "min-h-40" : "min-h-64 md:min-h-80"}`} role="img" aria-label={`Illustration ${label} : ${line}`}>
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-wider">{label}</span>
        <Icon className="size-8" strokeWidth={1.8} aria-hidden="true" />
      </div>
      <p className="font-display max-w-xs text-xl font-bold leading-tight md:text-2xl">{line}</p>
    </div>
  );
}
