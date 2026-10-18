import { ArrowRight, BadgeCheck, HandCoins, ReceiptText, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Campaign } from "@onda/shared";
import { CampaignCard } from "../components/CampaignCard";
import { getCampaigns } from "../lib/api";

export function HomePage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => { getCampaigns().then(setCampaigns); }, []);

  return (
    <>
      <section className="page-wrap grid gap-8 py-8 md:grid-cols-[1.05fr_.95fr] md:items-center md:py-14">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#17332f]/10 bg-white/70 px-3 py-2 text-sm font-bold">
            <Sparkles className="size-4 text-[#b15b43]" /> Un geste crée une onde
          </div>
          <h1 className="font-display max-w-3xl text-[clamp(2.6rem,9vw,5.3rem)] font-bold leading-[.98] tracking-[-.055em]">
            Donner, suivre, <span className="text-[#d85e49]">voir l’impact.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#52635f]">
            Pensée au Bénin, ouverte au monde. Mobile money en premier, carte pour la diaspora, frais clairs et nouvelles qui comptent.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/explorer" className="btn-primary">Découvrir les causes <ArrowRight className="size-5" /></Link>
            <Link to="/creer" className="btn-quiet">Lancer une collecte</Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-[#52635f]">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-[#176555]" /> MTN, Moov, Celtiis & cartes</span>
            <span className="inline-flex items-center gap-2"><BadgeCheck className="size-4 text-[#176555]" /> Identités vérifiées</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="surface relative overflow-hidden rounded-[2rem] p-4 sm:p-6">
            <div className="cover-art cover-school pattern-grid min-h-72 rounded-[1.4rem] p-6">
              <span className="rounded-full bg-white/75 px-3 py-2 text-xs font-bold uppercase tracking-wider">Projet du jour</span>
              <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-[#fffdf8]/94 p-4 backdrop-blur">
                <p className="font-display text-lg font-bold">Une classe lumineuse pour 48 enfants</p>
                <div className="mt-3 progress-track"><div className="progress-fill w-[65%]" /></div>
                <div className="mt-2 flex justify-between text-sm font-bold"><span>5,14 M FCFA collectés</span><span>66%</span></div>
              </div>
            </div>
          </div>
          <div className="surface absolute -bottom-5 -left-2 flex items-center gap-3 rounded-2xl p-3 sm:-left-8">
            <span className="grid size-10 place-items-center rounded-full bg-[#b9e6d3]"><ReceiptText className="size-5" /></span>
            <div><p className="text-xs text-[#64736f]">Dernière preuve</p><p className="text-sm font-bold">Devis toiture validé</p></div>
          </div>
        </div>
      </section>

      <section className="page-wrap py-12" aria-labelledby="causes-title">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.16em] text-[#b15b43]">À portée de main</p>
            <h2 id="causes-title" className="font-display mt-2 text-3xl font-bold tracking-tight md:text-4xl">Des causes concrètes</h2>
          </div>
          <Link to="/explorer" className="hidden min-h-11 items-center gap-2 font-bold sm:inline-flex">Tout explorer <ArrowRight className="size-4" /></Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {campaigns.slice(0, 4).map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} />)}
        </div>
      </section>

      <section className="mt-8 bg-[#123f38] py-14 text-white">
        <div className="page-wrap">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[.16em] text-[#f4c95d]">La confiance par les faits</p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-5xl">Chaque euro garde une histoire.</h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {[
              { icon: HandCoins, title: "Frais annoncés tôt", text: "Le net reçu est visible avant de publier ou de retirer." },
              { icon: ShieldCheck, title: "Vérification lisible", text: "Vous savez qui a été contrôlé, pourquoi et à quel moment." },
              { icon: ReceiptText, title: "Journal d’impact", text: "Actualités, factures et résultats réunis au même endroit." },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-3xl border border-white/15 bg-white/7 p-6">
                <Icon className="size-7 text-[#f4c95d]" />
                <h3 className="font-display mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 leading-relaxed text-white/70">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
