import type { Campaign } from "@onda/shared";
import { ArrowUpRight, BadgeCheck, Clock3, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { formatMoney } from "../lib/fallback";
import { CoverArt } from "./CoverArt";

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const progress = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));

  return (
    <article className="surface lift overflow-hidden rounded-[1.6rem]">
      <Link to={`/collecte/${campaign.id}`} className="block focus-visible:outline-offset-[-3px]" aria-label={`Voir la collecte ${campaign.title}`}>
        <CoverArt variant={campaign.cover} compact />
        <div className="p-5">
          <div className="mb-3 flex items-center justify-between gap-3 text-xs font-bold text-[#64736f]">
            <span>{campaign.location}</span>
            {campaign.verified && <span className="inline-flex items-center gap-1 text-[#176555]"><BadgeCheck className="size-4" /> Vérifiée</span>}
          </div>
          <h3 className="font-display min-h-14 text-lg font-bold leading-snug text-[#17332f]">{campaign.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#64736f]">{campaign.summary}</p>
          <div className="mt-5 progress-track" aria-label={`${progress} % de l'objectif atteint`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              <p className="font-display text-lg font-bold">{formatMoney(campaign.raised, campaign.currency)}</p>
              <p className="text-xs text-[#72807c]">sur {formatMoney(campaign.goal, campaign.currency)} · {progress}%</p>
            </div>
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </div>
          <div className="mt-4 flex gap-4 border-t border-[#17332f]/10 pt-4 text-xs font-bold text-[#64736f]">
            <span className="inline-flex items-center gap-1"><Users className="size-4" /> {campaign.supporters} soutiens</span>
            <span className="inline-flex items-center gap-1"><Clock3 className="size-4" /> {campaign.daysLeft} jours</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
