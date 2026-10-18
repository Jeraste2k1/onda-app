import type { Campaign } from "@onda/shared";

export const campaigns: Campaign[] = [
  {
    id: "ecole-lumiere",
    title: "Une classe lumineuse pour 48 enfants",
    summary: "Rénover la toiture et installer l'énergie solaire avant la saison des pluies.",
    story:
      "À l'école du quartier, la classe ferme dès que le ciel s'assombrit. Notre collectif réunit parents et enseignants pour réparer la toiture, installer six panneaux solaires et acheter du mobilier durable. Chaque dépense sera publiée avec son justificatif.",
    category: "Éducation",
    location: "Porto-Novo, Bénin",
    raised: 5140000,
    goal: 7800000,
    supporters: 216,
    daysLeft: 18,
    verified: true,
    organizer: "Collectif Lumière",
    beneficiary: "École Les Amandiers",
    cover: "school",
    currency: "XOF",
    allocation: [
      { label: "Toiture", amount: 3100000 },
      { label: "Énergie solaire", amount: 2700000 },
      { label: "Mobilier", amount: 2000000 },
    ],
    updates: [
      {
        date: "14 oct.",
        title: "Le devis de la toiture est validé",
        body: "L'artisan peut démarrer dès que nous atteignons 70 % de l'objectif.",
      },
      {
        date: "7 oct.",
        title: "48 familles mobilisées",
        body: "Merci aux premiers donateurs et aux parents qui ont partagé la collecte.",
      },
    ],
  },
  {
    id: "atelier-debout",
    title: "Aidons Aïcha à rouvrir son atelier",
    summary: "Remplacer les machines endommagées et préserver quatre emplois.",
    story:
      "Après un dégât des eaux, l'atelier d'Aïcha est à l'arrêt. La collecte financera deux machines et la remise aux normes électriques. Les factures seront visibles dans le journal d'impact.",
    category: "Urgence",
    location: "Cotonou, Bénin",
    raised: 4620000,
    goal: 6000000,
    supporters: 384,
    daysLeft: 9,
    verified: true,
    organizer: "Nadia B.",
    beneficiary: "Atelier Aïcha",
    cover: "sun",
    currency: "XOF",
    allocation: [
      { label: "Machines", amount: 3850000 },
      { label: "Électricité", amount: 1400000 },
      { label: "Réouverture", amount: 750000 },
    ],
    updates: [
      {
        date: "16 oct.",
        title: "Première machine commandée",
        body: "Le fournisseur nous confirme une livraison sous dix jours.",
      },
    ],
  },
  {
    id: "jardin-partage",
    title: "Un jardin frais au cœur du quartier",
    summary: "Transformer un terrain vacant en potager partagé et accessible.",
    story:
      "Nous voulons créer un lieu vivant avec des bacs accessibles, une réserve d'eau et des ateliers gratuits. Le budget et les dépenses sont ouverts à tous.",
    category: "Communauté",
    location: "Abomey-Calavi, Bénin",
    raised: 2340000,
    goal: 4000000,
    supporters: 147,
    daysLeft: 27,
    verified: true,
    organizer: "Les Voisins du Baobab",
    beneficiary: "Association du quartier",
    cover: "garden",
    currency: "XOF",
    allocation: [
      { label: "Aménagement", amount: 1700000 },
      { label: "Eau", amount: 1300000 },
      { label: "Semences", amount: 1000000 },
    ],
    updates: [
      {
        date: "10 oct.",
        title: "Le terrain est prêt",
        body: "Le nettoyage collectif a réuni 32 voisins ce samedi.",
      },
    ],
  },
  {
    id: "soins-mila",
    title: "Des soins continus pour Mila",
    summary: "Financer six mois de rééducation et les déplacements médicaux.",
    story:
      "Mila progresse chaque semaine. Cette collecte couvre les séances de rééducation et les trajets vers le centre spécialisé. Un proche vérifié recevra directement les fonds.",
    category: "Santé",
    location: "Parakou, Bénin",
    raised: 7900000,
    goal: 10000000,
    supporters: 612,
    daysLeft: 12,
    verified: true,
    organizer: "Famille de Mila",
    beneficiary: "Mila R.",
    cover: "ocean",
    currency: "XOF",
    allocation: [
      { label: "Rééducation", amount: 7000000 },
      { label: "Transport", amount: 1750000 },
      { label: "Matériel", amount: 1250000 },
    ],
    updates: [
      {
        date: "15 oct.",
        title: "Un premier mois financé",
        body: "Les séances de novembre sont confirmées. Merci du fond du cœur.",
      },
    ],
  },
];
