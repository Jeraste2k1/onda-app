# Onda

> Un geste crée une onde.

Onda est un MVP mobile-first de cagnotte et de financement solidaire pensé d’abord pour le Bénin, tout en restant accessible à la diaspora et aux participants internationaux.

## Ce qui est déjà construit

- Accueil éditorial et catalogue de collectes.
- Recherche, catégories et tri par urgence, progression ou popularité.
- Page de collecte avec budget public, bénéficiaire vérifié et journal d’impact.
- Parcours de participation en FCFA avec MTN MoMo, Moov Money, Celtiis Cash et Visa/Mastercard.
- Réglages d’anonymat et de visibilité expliqués en langage clair.
- Création guidée en trois étapes avec visibilité publique/privée et simulation des frais.
- Tableau de bord d’impact et profil localisé Bénin/FCFA.
- API Elysia typée, données de démonstration et tests.
- PWA installable avec shell hors-ligne.
- Accessibilité : contrôles nommés, navigation clavier, focus visible, zones tactiles de 44 px minimum et réduction des animations.

Les transactions sont simulées. Aucun paiement réel n’est déclenché et aucune clé bancaire n’est incluse.

## Stack

- React 19 + TypeScript + React Router
- Tailwind CSS 4
- Vite
- ElysiaJS + Bun
- Monorepo Bun workspaces
- Lucide React pour les icônes

## Démarrage

```bash
bun install
bun run dev
```

- Application : `http://localhost:5173`
- API : `http://localhost:3001`

Commandes utiles :

```bash
bun run build
bun run typecheck
bun test
```

## Paiements : stratégie Bénin + international

L’interface place le mobile money en premier :

- MTN MoMo ;
- Moov Money ;
- Celtiis Cash ;
- Visa et Mastercard pour la diaspora et l’international.

L’API expose `/api/payment-methods` afin que les moyens soient déterminés par le pays plutôt que codés dans chaque écran. L’intégration prévue utilise un prestataire local comme FedaPay, avec environnement sandbox, intention de paiement côté serveur et validation finale par webhook.

Sources produit vérifiées : [FedaPay](https://www.fedapay.com/), [MTN MoMoPay](https://www.mtn.bj/momo/particuliers/momopay/), [Moov Money](https://www.moov-africa.bj/paiement-marchand/) et [Celtiis Cash](https://www.celtiis.bj/celtiis-cash).

Avant le passage en production :

1. créer et faire vérifier le compte marchand ;
2. définir les frais contractuels réels par canal ;
3. conserver les secrets uniquement côté serveur ;
4. vérifier les signatures des webhooks ;
5. rendre les traitements idempotents ;
6. effectuer KYC/KYB et revue réglementaire BCEAO/UEMOA ;
7. ajouter un PSP secondaire pour la continuité de service.

## API

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/api/health` | État du service |
| `GET` | `/api/payment-methods?country=BJ` | Moyens locaux ou internationaux |
| `GET` | `/api/campaigns` | Liste et recherche |
| `GET` | `/api/campaigns/:id` | Détail d’une collecte |
| `POST` | `/api/campaigns` | Création d’un brouillon |
| `POST` | `/api/campaigns/:id/contributions` | Préparation d’une participation |
| `GET` | `/api/fees` | Simulation transparente des frais |

## Principes produit

- Le donateur voit exactement qui peut voir son nom et son montant.
- Le créateur voit le net estimé avant de publier ou retirer.
- Toute collecte publique expose un budget et un bénéficiaire.
- Les dépenses importantes alimentent le journal d’impact.
- Les cartes internationales complètent les moyens locaux, elles ne les remplacent pas.

## Structure

```text
apps/
  api/       API ElysiaJS
  web/       PWA React/Tailwind
packages/
  shared/    Types partagés
design-system/
  onda/      Direction visuelle et règles UX
```

## État

MVP fonctionnel, prêt pour itération produit. La connexion à un PSP, l’authentification, la base de données et le stockage de justificatifs restent à brancher avant toute mise en production.
