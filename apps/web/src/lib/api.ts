import type { Campaign, ContributionInput, FeePreview } from "@onda/shared";
import { fallbackCampaigns } from "./fallback";

export async function getCampaigns(): Promise<Campaign[]> {
  try {
    const response = await fetch("/api/campaigns");
    if (!response.ok) throw new Error("API indisponible");
    const data = await response.json();
    return data.items;
  } catch {
    return fallbackCampaigns;
  }
}

export async function getCampaign(id: string): Promise<Campaign | undefined> {
  try {
    const response = await fetch(`/api/campaigns/${id}`);
    if (!response.ok) throw new Error("Collecte introuvable");
    return response.json();
  } catch {
    return fallbackCampaigns.find((item) => item.id === id);
  }
}

export async function previewFees(
  amount: number,
  method: "mobile_money" | "card" = "mobile_money",
  currency: "XOF" | "EUR" | "USD" = "XOF",
): Promise<FeePreview> {
  try {
    const response = await fetch(`/api/fees?amount=${amount}&method=${method}&currency=${currency}`);
    if (!response.ok) throw new Error("Calcul indisponible");
    return response.json();
  } catch {
    const feeRate = .025;
    const feeAmount = Math.round(amount * feeRate * 100) / 100;
    return { amount, method, currency, feeRate, feeAmount, netAmount: amount - feeAmount };
  }
}

export async function prepareContribution(campaignId: string, input: ContributionInput) {
  const response = await fetch(`/api/campaigns/${campaignId}/contributions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error("Impossible de préparer la participation");
  return response.json();
}
