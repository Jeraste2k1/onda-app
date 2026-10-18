import { BadgeCheck, Check, ChevronLeft, ChevronRight, Eye, Globe2, LockKeyhole, ReceiptText, ShieldCheck } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { formatMoney } from "../lib/fallback";

const categories = ["Urgence", "Santé", "Éducation", "Communauté", "Événement", "Projet"];

export function CreatePage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ category: "", title: "", goal: 500000, story: "", visibility: "public", beneficiary: "" });
  const fee = useMemo(() => Math.round(form.goal * .025), [form.goal]);
  const update = (key: keyof typeof form, value: string | number) => setForm((current) => ({ ...current, [key]: value }));

  function submit(event: FormEvent) {
    event.preventDefault();
    if (step < 3) setStep((value) => value + 1);
    else setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (done) return (
    <section className="page-wrap grid min-h-[70dvh] place-items-center py-10">
      <div className="surface w-full max-w-xl rounded-[2rem] p-7 text-center sm:p-10">
        <span className="mx-auto grid size-18 place-items-center rounded-full bg-[#b9e6d3]"><Check className="size-9" /></span>
        <p className="mt-6 text-sm font-bold uppercase tracking-[.14em] text-[#b15b43]">Brouillon enregistré</p>
        <h1 className="font-display mt-2 text-3xl font-bold">Votre collecte prend forme.</h1>
        <p className="mt-3 leading-relaxed text-[#64736f]">La prochaine étape sera la vérification du bénéficiaire, puis un aperçu complet avant publication. Rien n'est public pour le moment.</p>
        <div className="mt-6 rounded-2xl bg-[#eef7f2] p-4 text-left text-sm"><p className="font-bold">Ce qui sera contrôlé</p><ul className="mt-2 space-y-2 text-[#52635f]"><li>• identité de l'organisateur et du bénéficiaire ;</li><li>• destination des fonds ;</li><li>• cohérence de l'objectif et des justificatifs.</li></ul></div>
        <Link to="/impact" className="btn-primary mt-6 w-full">Voir mon tableau de bord</Link>
      </div>
    </section>
  );

  return (
    <section className="page-wrap py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[.14em] text-[#b15b43]">Créer une collecte</p>
        <h1 className="font-display mt-2 text-4xl font-bold tracking-tight md:text-5xl">Racontez ce qui doit changer.</h1>
        <div className="mt-7" aria-label={`Étape ${step} sur 3`}>
          <div className="flex items-center justify-between text-sm font-bold"><span>Étape {step} sur 3</span><span>{step === 1 ? "L'essentiel" : step === 2 ? "L'histoire" : "Confiance & frais"}</span></div>
          <div className="mt-3 progress-track"><div className="h-full rounded-full bg-[#123f38] transition-[width]" style={{ width: `${step * 33.333}%` }} /></div>
        </div>

        <form onSubmit={submit} className="surface mt-6 rounded-[2rem] p-5 sm:p-8">
          {step === 1 && <div>
            <h2 className="font-display text-2xl font-bold">L’essentiel</h2>
            <p className="mt-2 text-[#64736f]">Commencez simplement. Vous pourrez tout modifier avant publication.</p>
            <fieldset className="mt-6"><legend className="font-bold">Catégorie</legend><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">{categories.map((item) => <label key={item} className={`flex min-h-14 items-center justify-center rounded-2xl border p-3 text-center font-bold ${form.category === item ? "border-[#123f38] bg-[#eef7f2]" : "border-[#d9ddd4]"}`}><input type="radio" name="category" className="sr-only" checked={form.category === item} onChange={() => update("category", item)} required />{item}</label>)}</div></fieldset>
            <label className="mt-5 block font-bold">Titre de la collecte<input className="field mt-2 font-normal" value={form.title} onChange={(event) => update("title", event.target.value)} minLength={6} maxLength={90} required placeholder="Ex. Une salle informatique pour notre lycée" /></label>
            <label className="mt-5 block font-bold">Objectif en FCFA<div className="relative mt-2"><input className="field pr-20 font-normal" type="number" inputMode="numeric" min="50000" step="5000" value={form.goal} onChange={(event) => update("goal", Number(event.target.value))} required /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold">FCFA</span></div><span className="mt-2 block text-sm font-normal text-[#64736f]">Minimum conseillé : 50 000 FCFA. Les dons internationaux seront convertis.</span></label>
          </div>}

          {step === 2 && <div>
            <h2 className="font-display text-2xl font-bold">L’histoire et le bénéficiaire</h2>
            <p className="mt-2 text-[#64736f]">Dites précisément pourquoi vous collectez et comment l'argent sera utilisé.</p>
            <label className="mt-6 block font-bold">Qui recevra les fonds ?<input className="field mt-2 font-normal" value={form.beneficiary} onChange={(event) => update("beneficiary", event.target.value)} required placeholder="Personne, collectif, école ou association" /></label>
            <label className="mt-5 block font-bold">Votre histoire<textarea className="field mt-2 min-h-52 resize-y font-normal leading-relaxed" value={form.story} onChange={(event) => update("story", event.target.value)} minLength={80} maxLength={5000} required placeholder="Expliquez le contexte, l'objectif et les étapes du projet…" /><span className="mt-2 block text-right text-sm font-normal text-[#64736f]">{form.story.length} / 5 000</span></label>
            <div className="mt-5 flex gap-3 rounded-2xl bg-[#eef7f2] p-4 text-sm leading-relaxed"><ReceiptText className="size-6 shrink-0 text-[#176555]" /><p><strong>Conseil :</strong> ajoutez un budget détaillé et publiez des nouvelles. Les collectes transparentes inspirent davantage confiance.</p></div>
          </div>}

          {step === 3 && <div>
            <h2 className="font-display text-2xl font-bold">Confiance, visibilité et frais</h2>
            <p className="mt-2 text-[#64736f]">Vous choisissez qui peut voir la collecte. Nous affichons les coûts avant de publier.</p>
            <fieldset className="mt-6"><legend className="font-bold">Visibilité</legend><div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className={`rounded-2xl border p-4 ${form.visibility === "public" ? "border-[#123f38] bg-[#eef7f2]" : "border-[#d9ddd4]"}`}><span className="flex items-center gap-2 font-bold"><input type="radio" name="visibility" value="public" checked={form.visibility === "public"} onChange={() => update("visibility", "public")} className="size-5 accent-[#123f38]" /><Globe2 className="size-5" /> Publique</span><span className="mt-2 block text-sm text-[#64736f]">Visible dans la recherche et partageable partout.</span></label>
              <label className={`rounded-2xl border p-4 ${form.visibility === "private" ? "border-[#123f38] bg-[#eef7f2]" : "border-[#d9ddd4]"}`}><span className="flex items-center gap-2 font-bold"><input type="radio" name="visibility" value="private" checked={form.visibility === "private"} onChange={() => update("visibility", "private")} className="size-5 accent-[#123f38]" /><LockKeyhole className="size-5" /> Privée</span><span className="mt-2 block text-sm text-[#64736f]">Accessible seulement avec le lien.</span></label>
            </div></fieldset>
            <div className="mt-6 rounded-3xl border border-[#17332f]/10 bg-[#f6f2e9] p-5"><div className="flex items-center gap-3"><ShieldCheck className="size-6 text-[#176555]" /><h3 className="font-display text-lg font-bold">Simulation transparente</h3></div><dl className="mt-5 space-y-3 text-sm"><div className="flex justify-between"><dt>Objectif</dt><dd className="font-bold">{formatMoney(form.goal)}</dd></div><div className="flex justify-between"><dt>Frais de service Onda (démo 2,5 %)</dt><dd className="font-bold">− {formatMoney(fee)}</dd></div><div className="flex justify-between border-t border-[#17332f]/10 pt-3 text-base"><dt className="font-bold">Net estimé</dt><dd className="font-display font-bold">{formatMoney(form.goal - fee)}</dd></div></dl><p className="mt-4 text-xs leading-relaxed text-[#64736f]">Les éventuels frais MTN MoMo, Moov Money, Celtiis Cash ou carte seront récupérés du prestataire et confirmés avant chaque opération. Aucun coût caché.</p></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">{[{ icon: BadgeCheck, text: "Identité vérifiée" }, { icon: Eye, text: "Budget public" }, { icon: ReceiptText, text: "Preuves après dépense" }].map(({ icon: Icon, text }) => <div key={text} className="flex items-center gap-2 rounded-2xl border border-[#d9ddd4] bg-white p-3 text-sm font-bold"><Icon className="size-5 text-[#176555]" />{text}</div>)}</div>
          </div>}

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-[#17332f]/10 pt-5">
            {step > 1 ? <button type="button" className="btn-quiet" onClick={() => setStep((value) => value - 1)}><ChevronLeft className="size-5" /> Retour</button> : <span />}
            <button type="submit" className="btn-primary">{step < 3 ? <>Continuer <ChevronRight className="size-5" /></> : <>Enregistrer le brouillon <Check className="size-5" /></>}</button>
          </div>
        </form>
      </div>
    </section>
  );
}
