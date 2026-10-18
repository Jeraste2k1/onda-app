import type { Campaign } from "@onda/shared";
import { ArrowLeft, BadgeCheck, Check, Clock3, Heart, LockKeyhole, MapPin, MessageCircle, ReceiptText, Share2, ShieldCheck, Users, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CoverArt } from "../components/CoverArt";
import { getCampaign, prepareContribution } from "../lib/api";
import { formatMoney } from "../lib/fallback";

function DonationDialog({ campaign, dialogRef }: { campaign: Campaign; dialogRef: React.RefObject<HTMLDialogElement | null> }) {
  const [amount, setAmount] = useState(5000);
  const [paymentMethod, setPaymentMethod] = useState<"mtn_momo" | "moov_money" | "celtiis_cash" | "card">("mtn_momo");
  const [anonymous, setAnonymous] = useState(false);
  const [hideAmount, setHideAmount] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    try {
      await prepareContribution(campaign.id, {
        amount,
        currency: campaign.currency,
        paymentMethod,
        phone: String(data.get("phone") ?? ""),
        displayName: String(data.get("name")),
        email: String(data.get("email")),
        message: String(data.get("message") ?? ""),
        anonymous,
        hideAmount,
      });
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 450));
    } finally {
      setLoading(false);
      setDone(true);
    }
  }

  return (
    <dialog ref={dialogRef} className="m-auto w-[min(94vw,34rem)] rounded-[2rem] bg-[#fffdf8] p-0 text-[#17332f] shadow-2xl backdrop:bg-[#102f2b]/70" aria-labelledby="don-title">
      <div className="max-h-[90dvh] overflow-y-auto p-5 sm:p-7">
        <button type="button" aria-label="Fermer la fenêtre de participation" onClick={() => dialogRef.current?.close()} className="ml-auto grid size-11 place-items-center rounded-full bg-[#eef0e9]"><X className="size-5" /></button>
        {done ? (
          <div className="py-8 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#b9e6d3]"><Check className="size-8" /></span>
            <h2 id="don-title" className="font-display mt-5 text-2xl font-bold">Participation préparée</h2>
            <p className="mx-auto mt-3 max-w-sm leading-relaxed text-[#64736f]">Dans le produit final, la prochaine étape ouvrira le paiement sécurisé. Aucun débit n'a été effectué dans cette démo.</p>
            <button type="button" className="btn-primary mt-6 w-full" onClick={() => dialogRef.current?.close()}>Revenir à la collecte</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="text-sm font-bold text-[#b15b43]">Participation sécurisée</p>
            <h2 id="don-title" className="font-display mt-1 text-2xl font-bold">Soutenir cette collecte</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#64736f]">Aucun frais Onda n'est ajouté à votre don. L'organisateur verra votre identité pour prévenir la fraude.</p>

            <fieldset className="mt-6">
              <legend className="font-bold">Choisir un montant</legend>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {[1000, 2500, 5000, 10000].map((value) => <button key={value} type="button" className="chip justify-center" data-active={amount === value} aria-pressed={amount === value} onClick={() => setAmount(value)}>{value.toLocaleString("fr-FR")}</button>)}
              </div>
              <label htmlFor="custom-amount" className="mt-4 block text-sm font-bold">Autre montant</label>
              <div className="relative mt-2"><input id="custom-amount" className="field pr-20" type="number" min="100" max="20000000" inputMode="numeric" value={amount} onChange={(event) => setAmount(Number(event.target.value))} /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold">FCFA</span></div>
            </fieldset>

            <fieldset className="mt-5">
              <legend className="font-bold">Moyen de paiement</legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  ["mtn_momo", "MTN MoMo"],
                  ["moov_money", "Moov Money"],
                  ["celtiis_cash", "Celtiis Cash"],
                  ["card", "Visa / Mastercard"],
                ].map(([id, label]) => (
                  <label key={id} className={`flex min-h-14 items-center gap-2 rounded-2xl border p-3 font-bold ${paymentMethod === id ? "border-[#123f38] bg-[#eef7f2]" : "border-[#d9ddd4] bg-white"}`}>
                    <input type="radio" name="paymentMethod" value={id} checked={paymentMethod === id} onChange={() => setPaymentMethod(id as typeof paymentMethod)} className="size-5 accent-[#123f38]" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {paymentMethod !== "card" && (
              <label className="mt-4 block font-bold">Numéro mobile money
                <div className="mt-2 flex"><span className="grid min-h-12 place-items-center rounded-l-2xl border border-r-0 border-[#cfd6ce] bg-[#eef0e9] px-4 font-bold">+229</span><input className="field rounded-l-none font-normal" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" required placeholder="01 97 00 00 00" /></div>
              </label>
            )}

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="font-bold">Nom affiché<input className="field mt-2 font-normal" name="name" autoComplete="name" required minLength={2} placeholder="Votre nom ou pseudo" /></label>
              <label className="font-bold">E-mail<input className="field mt-2 font-normal" name="email" type="email" autoComplete="email" required placeholder="vous@exemple.com" /></label>
            </div>
            <label className="mt-4 block font-bold">Message <span className="font-normal text-[#72807c]">(facultatif)</span><textarea className="field mt-2 min-h-24 resize-y font-normal" name="message" maxLength={280} placeholder="Quelques mots de soutien" /></label>

            <div className="mt-5 grid gap-3">
              <label className="flex min-h-14 items-center gap-3 rounded-2xl border border-[#d9ddd4] bg-white p-3">
                <input type="checkbox" checked={anonymous} onChange={(event) => setAnonymous(event.target.checked)} className="size-5 accent-[#123f38]" />
                <span><span className="block font-bold">Anonyme publiquement</span><span className="block text-xs text-[#64736f]">Votre nom reste visible par l'organisateur vérifié.</span></span>
              </label>
              <label className="flex min-h-14 items-center gap-3 rounded-2xl border border-[#d9ddd4] bg-white p-3">
                <input type="checkbox" checked={hideAmount} onChange={(event) => setHideAmount(event.target.checked)} className="size-5 accent-[#123f38]" />
                <span><span className="block font-bold">Masquer le montant</span><span className="block text-xs text-[#64736f]">Visible uniquement par l'organisateur.</span></span>
              </label>
            </div>
            <div className="mt-5 flex items-start gap-2 rounded-2xl bg-[#eef7f2] p-4 text-sm leading-relaxed"><LockKeyhole className="mt-0.5 size-5 shrink-0 text-[#176555]" /><span>Paiement chiffré et confirmation avant débit. Vous pourrez demander un reçu depuis votre espace.</span></div>
            <p className="mt-4 text-xs leading-relaxed text-[#64736f]">Depuis l'étranger, choisissez Visa / Mastercard. Votre banque peut appliquer son propre taux de change, affiché avant confirmation.</p>
            <button className="btn-primary mt-5 w-full" disabled={loading || amount < 100}>{loading ? "Préparation…" : `Continuer avec ${formatMoney(amount, campaign.currency)}`}</button>
          </form>
        )}
      </div>
    </dialog>
  );
}

export function CampaignPage() {
  const { id = "" } = useParams();
  const [campaign, setCampaign] = useState<Campaign>();
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => { getCampaign(id).then(setCampaign); }, [id]);

  if (!campaign) return <div className="page-wrap py-20 text-center"><p className="font-bold">Chargement de la collecte…</p></div>;
  const progress = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));

  return (
    <>
      <section className="page-wrap py-6 md:py-10">
        <Link to="/explorer" className="inline-flex min-h-11 items-center gap-2 rounded-full font-bold"><ArrowLeft className="size-5" /> Retour aux causes</Link>
        <div className="mt-3 grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
          <div className="overflow-hidden rounded-[2rem]"><CoverArt variant={campaign.cover} /></div>
          <article className="surface rounded-[2rem] p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-[#64736f]"><span>{campaign.category}</span><span aria-hidden="true">·</span><span className="inline-flex items-center gap-1"><MapPin className="size-4" /> {campaign.location}</span></div>
            <h1 className="font-display mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{campaign.title}</h1>
            <p className="mt-3 leading-relaxed text-[#52635f]">{campaign.summary}</p>
            <div className="mt-6 progress-track" role="progressbar" aria-label={`${progress} % de l'objectif atteint`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
            <div className="mt-3 flex items-end justify-between gap-4"><div><p className="font-display text-2xl font-bold">{formatMoney(campaign.raised, campaign.currency)}</p><p className="text-sm text-[#64736f]">sur {formatMoney(campaign.goal, campaign.currency)}</p></div><p className="font-display text-xl font-bold">{progress}%</p></div>
            <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-[#eef0e9] p-4 text-sm font-bold"><span className="inline-flex items-center gap-2"><Users className="size-5" /> {campaign.supporters} soutiens</span><span className="inline-flex items-center gap-2"><Clock3 className="size-5" /> {campaign.daysLeft} jours</span></div>
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#17332f]/10 pt-5"><div><p className="text-xs text-[#64736f]">Organisée par</p><p className="inline-flex items-center gap-1 font-bold">{campaign.organizer} <BadgeCheck className="size-4 text-[#176555]" aria-label="Identité vérifiée" /></p></div><div className="flex gap-1"><button type="button" aria-label="Ajouter aux favoris" className="grid size-11 place-items-center rounded-full border border-[#d9ddd4]"><Heart className="size-5" /></button><button type="button" aria-label="Partager la collecte" className="grid size-11 place-items-center rounded-full border border-[#d9ddd4]"><Share2 className="size-5" /></button></div></div>
            <button type="button" onClick={() => dialogRef.current?.showModal()} className="btn-primary mt-5 w-full">Participer à la collecte</button>
          </article>
        </div>
      </section>

      <section className="page-wrap grid gap-6 pb-14 lg:grid-cols-[1.15fr_.85fr]">
        <div className="space-y-6">
          <article className="surface rounded-[2rem] p-5 sm:p-7"><h2 className="font-display text-2xl font-bold">Pourquoi cette collecte ?</h2><p className="mt-4 whitespace-pre-line text-base leading-8 text-[#52635f]">{campaign.story}</p><div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#eef7f2] p-4"><ShieldCheck className="size-6 text-[#176555]" /><div><p className="font-bold">Bénéficiaire vérifié</p><p className="text-sm text-[#64736f]">Les fonds sont destinés à {campaign.beneficiary}.</p></div></div></article>
          <article className="surface rounded-[2rem] p-5 sm:p-7"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[.14em] text-[#b15b43]">Journal d’impact</p><h2 className="font-display mt-1 text-2xl font-bold">Les dernières nouvelles</h2></div><MessageCircle className="size-7" /></div><div className="mt-6 space-y-5">{campaign.updates.map((update) => <div key={`${update.date}-${update.title}`} className="relative border-l-2 border-[#b9e6d3] pl-5"><p className="text-xs font-bold text-[#b15b43]">{update.date}</p><h3 className="mt-1 font-display text-lg font-bold">{update.title}</h3><p className="mt-1 leading-relaxed text-[#64736f]">{update.body}</p></div>)}</div></article>
        </div>
        <aside className="surface h-fit rounded-[2rem] p-5 sm:p-7"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-[#f4c95d]"><ReceiptText className="size-5" /></span><div><p className="text-sm text-[#64736f]">Budget public</p><h2 className="font-display text-xl font-bold">Où ira l’argent ?</h2></div></div><div className="mt-6 space-y-4">{campaign.allocation.map((item) => { const width = Math.round((item.amount / campaign.goal) * 100); return <div key={item.label}><div className="mb-2 flex justify-between gap-4 text-sm font-bold"><span>{item.label}</span><span>{formatMoney(item.amount, campaign.currency)}</span></div><div className="progress-track"><div className="h-full rounded-full bg-[#123f38]" style={{ width: `${width}%` }} /></div></div>; })}</div><div className="mt-6 rounded-2xl bg-[#f6f2e9] p-4 text-sm leading-relaxed text-[#52635f]"><strong className="text-[#17332f]">Engagement Onda :</strong> les frais et le montant net sont affichés avant tout retrait. Les justificatifs apparaissent ici après dépense.</div></aside>
      </section>
      <DonationDialog campaign={campaign} dialogRef={dialogRef} />
    </>
  );
}
