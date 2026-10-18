import { cors } from "@elysiajs/cors";
import { Elysia, t } from "elysia";
import { campaigns } from "./data";

export const app = new Elysia()
  .use(cors())
  .get("/api/health", () => ({ status: "ok", service: "onda-api" }))
  .get(
    "/api/payment-methods",
    ({ query }) => ({
      country: query.country ?? "BJ",
      currency: query.country === "BJ" || !query.country ? "XOF" : "EUR",
      gateway: "fedapay",
      live: false,
      methods:
        query.country === "BJ" || !query.country
          ? [
              { id: "mtn_momo", label: "MTN MoMo", type: "mobile_money" },
              { id: "moov_money", label: "Moov Money", type: "mobile_money" },
              { id: "celtiis_cash", label: "Celtiis Cash", type: "mobile_money" },
              { id: "card", label: "Visa / Mastercard", type: "card" },
            ]
          : [{ id: "card", label: "Visa / Mastercard", type: "card" }],
    }),
    { query: t.Object({ country: t.Optional(t.String({ minLength: 2, maxLength: 2 })) }) },
  )
  .get(
    "/api/campaigns",
    ({ query }) => {
      const term = query.q?.trim().toLocaleLowerCase("fr");
      const category = query.category;
      const result = campaigns.filter((campaign) => {
        const matchesTerm =
          !term ||
          [campaign.title, campaign.summary, campaign.location, campaign.organizer]
            .join(" ")
            .toLocaleLowerCase("fr")
            .includes(term);
        const matchesCategory = !category || category === "Toutes" || campaign.category === category;
        return matchesTerm && matchesCategory;
      });
      return { items: result, total: result.length };
    },
    {
      query: t.Object({
        q: t.Optional(t.String()),
        category: t.Optional(t.String()),
      }),
    },
  )
  .get(
    "/api/campaigns/:id",
    ({ params, status }) => {
      const campaign = campaigns.find((item) => item.id === params.id);
      return campaign ?? status(404, { message: "Collecte introuvable" });
    },
    { params: t.Object({ id: t.String() }) },
  )
  .post(
    "/api/campaigns",
    ({ body, status }) => {
      const id = body.title
        .toLocaleLowerCase("fr")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return status(201, {
        id,
        status: "draft",
        message: "Brouillon créé. La vérification sera demandée avant publication.",
      });
    },
    {
      body: t.Object({
        title: t.String({ minLength: 6, maxLength: 90 }),
        category: t.String(),
        goal: t.Number({ minimum: 100 }),
        story: t.String({ minLength: 80, maxLength: 5000 }),
        visibility: t.Union([t.Literal("public"), t.Literal("private")]),
      }),
    },
  )
  .post(
    "/api/campaigns/:id/contributions",
    ({ params, body, status }) => {
      const campaign = campaigns.find((item) => item.id === params.id);
      if (!campaign) return status(404, { message: "Collecte introuvable" });

      return status(201, {
        id: crypto.randomUUID(),
        campaignId: campaign.id,
        amount: body.amount,
        currency: body.currency,
        paymentMethod: body.paymentMethod,
        privacy: {
          anonymous: body.anonymous,
          hideAmount: body.hideAmount,
          organizerCanSeeIdentity: true,
        },
        status: "payment_required",
      });
    },
    {
      params: t.Object({ id: t.String() }),
      body: t.Object({
        amount: t.Number({ minimum: 1, maximum: 20000000 }),
        currency: t.Union([t.Literal("XOF"), t.Literal("EUR"), t.Literal("USD")]),
        paymentMethod: t.Union([
          t.Literal("mtn_momo"),
          t.Literal("moov_money"),
          t.Literal("celtiis_cash"),
          t.Literal("card"),
        ]),
        phone: t.Optional(t.String({ minLength: 8, maxLength: 20 })),
        displayName: t.String({ minLength: 2, maxLength: 80 }),
        email: t.String({ format: "email" }),
        anonymous: t.Boolean(),
        hideAmount: t.Boolean(),
        message: t.Optional(t.String({ maxLength: 280 })),
      }),
    },
  )
  .get(
    "/api/fees",
    ({ query }) => {
      const amount = Number(query.amount);
      const method = query.method === "card" ? "card" : "mobile_money";
      const feeRate = Number(process.env.PLATFORM_FEE_RATE ?? 0.025);
      const feeAmount = Math.round(amount * feeRate * 100) / 100;
      return {
        amount,
        method,
        currency: query.currency ?? "XOF",
        feeRate,
        feeAmount,
        netAmount: amount - feeAmount,
        note: "Estimation Onda, hors frais éventuels de l'opérateur confirmés avant validation.",
      };
    },
    {
      query: t.Object({
        amount: t.Numeric({ minimum: 0 }),
        method: t.Optional(t.Union([t.Literal("mobile_money"), t.Literal("card")])),
        currency: t.Optional(t.Union([t.Literal("XOF"), t.Literal("EUR"), t.Literal("USD")])),
      }),
    },
  )
  .listen(Number(process.env.PORT ?? 3001));

console.log(`Onda API prête sur http://${app.server?.hostname}:${app.server?.port}`);

export type App = typeof app;
