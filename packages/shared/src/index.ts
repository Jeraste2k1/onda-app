export type Category = "Santé" | "Éducation" | "Urgence" | "Communauté";

export type Campaign = {
  id: string;
  title: string;
  summary: string;
  story: string;
  category: Category;
  location: string;
  raised: number;
  goal: number;
  supporters: number;
  daysLeft: number;
  verified: boolean;
  organizer: string;
  beneficiary: string;
  cover: "sun" | "ocean" | "garden" | "school";
  currency: "XOF" | "EUR" | "USD";
  allocation: Array<{ label: string; amount: number }>;
  updates: Array<{ date: string; title: string; body: string }>;
};

export type ContributionInput = {
  amount: number;
  currency: "XOF" | "EUR" | "USD";
  paymentMethod: "mtn_momo" | "moov_money" | "celtiis_cash" | "card";
  phone?: string;
  displayName: string;
  email: string;
  anonymous: boolean;
  hideAmount: boolean;
  message?: string;
};

export type FeePreview = {
  amount: number;
  method: "mobile_money" | "card";
  currency: "XOF" | "EUR" | "USD";
  feeRate: number;
  feeAmount: number;
  netAmount: number;
};
