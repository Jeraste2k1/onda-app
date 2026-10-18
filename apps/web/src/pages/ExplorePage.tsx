import type { Campaign, Category } from "@onda/shared";
import { ListFilter, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CampaignCard } from "../components/CampaignCard";
import { getCampaigns } from "../lib/api";

const categories: Array<Category | "Toutes"> = ["Toutes", "Urgence", "Santé", "Éducation", "Communauté"];

export function ExplorePage() {
  const [items, setItems] = useState<Campaign[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("Toutes");
  const [sort, setSort] = useState("urgent");
  useEffect(() => { getCampaigns().then(setItems); }, []);

  const filtered = useMemo(() => {
    const q = query.toLocaleLowerCase("fr").trim();
    const result = items.filter((item) => (category === "Toutes" || item.category === category) && (!q || `${item.title} ${item.summary} ${item.location}`.toLocaleLowerCase("fr").includes(q)));
    return [...result].sort((a, b) => sort === "progress" ? (b.raised / b.goal) - (a.raised / a.goal) : sort === "support" ? b.supporters - a.supporters : a.daysLeft - b.daysLeft);
  }, [items, query, category, sort]);

  return (
    <section className="page-wrap py-8 md:py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[.16em] text-[#b15b43]">Explorer</p>
        <h1 className="font-display mt-2 text-4xl font-bold tracking-tight md:text-6xl">Trouvez une cause qui vous ressemble.</h1>
      </div>
      <div className="surface mt-8 rounded-3xl p-4 md:p-5">
        <label htmlFor="campaign-search" className="font-bold">Rechercher une collecte</label>
        <div className="relative mt-2">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#72807c]" aria-hidden="true" />
          <input id="campaign-search" className="field pl-12" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cause, ville ou mot-clé" />
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Filtrer par catégorie">
          {categories.map((item) => <button key={item} type="button" className="chip" data-active={category === item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
      </div>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="font-bold">{filtered.length} collecte{filtered.length > 1 ? "s" : ""}</p>
        <label className="flex min-h-11 items-center gap-2 rounded-full border border-[#d9ddd4] bg-white px-4 font-bold">
          <ListFilter className="size-4" aria-hidden="true" />
          <span className="sr-only">Trier les collectes</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="bg-transparent outline-none">
            <option value="urgent">Plus urgentes</option>
            <option value="progress">Objectif le plus proche</option>
            <option value="support">Plus soutenues</option>
          </select>
        </label>
      </div>
      {filtered.length ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} />)}</div>
      ) : (
        <div className="surface mt-5 rounded-3xl p-8 text-center"><h2 className="font-display text-xl font-bold">Aucune collecte trouvée</h2><p className="mt-2 text-[#64736f]">Essayez une autre catégorie ou un terme plus large.</p></div>
      )}
    </section>
  );
}
