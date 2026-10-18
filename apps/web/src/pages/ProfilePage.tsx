import { Bell, ChevronRight, CircleHelp, Globe2, Languages, LogOut, ShieldCheck, Smartphone } from "lucide-react";

export function ProfilePage() {
  const rows = [
    { icon: Smartphone, label: "Moyens de paiement", detail: "MTN MoMo" },
    { icon: ShieldCheck, label: "Identité", detail: "À vérifier" },
    { icon: Bell, label: "Notifications", detail: "Activées" },
    { icon: Languages, label: "Langue", detail: "Français" },
    { icon: Globe2, label: "Pays et devise", detail: "Bénin · FCFA" },
    { icon: CircleHelp, label: "Aide et sécurité", detail: "" },
  ];
  return <section className="page-wrap py-8 md:py-12"><div className="mx-auto max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.14em] text-[#b15b43]">Profil</p><h1 className="font-display mt-2 text-4xl font-bold">Votre espace Onda</h1><div className="surface mt-7 flex items-center gap-4 rounded-3xl p-5"><span className="grid size-14 place-items-center rounded-full bg-[#f4c95d] font-display text-xl font-bold">JE</span><div><p className="font-display text-xl font-bold">Joël Eraste</p><p className="text-sm text-[#64736f]">Compte de démonstration</p></div></div><div className="surface mt-5 overflow-hidden rounded-3xl">{rows.map(({ icon: Icon, label, detail }) => <button key={label} type="button" className="flex min-h-16 w-full items-center gap-3 border-b border-[#17332f]/10 px-5 text-left last:border-0 hover:bg-[#f6f2e9]"><Icon className="size-5" /><span className="flex-1 font-bold">{label}</span>{detail && <span className="text-sm text-[#64736f]">{detail}</span>}<ChevronRight className="size-4 text-[#72807c]" /></button>)}</div><button type="button" className="btn-quiet mt-5 w-full text-[#a53e30]"><LogOut className="size-5" /> Se déconnecter</button></div></section>;
}
