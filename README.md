# Frontend EATECH

Site vitrine et réservation clients pour EATECH : présentation des services, studios, décors, prise de rendez-vous et panier.

## Rôle dans le projet

Ce dépôt est le **frontend public** de l’écosystème EATECH. Les clients y consultent les services, choisissent un décor et un créneau, et gèrent leur panier. Il s’appuie sur l’API du **backend_eatech**. Le **backoffice_eatech** est l’interface d’administration (séparée).

Chaque dépôt a son propre Git et peut être déployé séparément.

## Stack

- **React 19** — Vite 7
- **React Router** — routes (publique + protégées)
- **GSAP** — animations
- **Swiper** — carrousels
- **i18next / react-i18next** — internationalisation
- **Axios** — appels API (base URL via `VITE_API_BASE_URL`)
- **Lucide React** — icônes

## Structure du projet

```
frontend_eatech/
├── public/
├── src/
│   ├── components/
│   │   ├── calendar/     # Calendrier de réservation
│   │   ├── decors/       # Cartes décors, liste
│   │   ├── footer/, header/, hero/
│   │   ├── modal/        # Modales
│   │   ├── photographysets/
│   │   ├── portfolio/, services/, stepsIndicator/
│   │   ├── studios/      # Liste des studios
│   │   ├── timepicker/   # Sélection horaire
│   │   └── BookingButton.jsx, ProtectedRoute.jsx
│   ├── contexts/         # AuthContext, LanguageContext, ThemeContext
│   ├── data/             # services.json (données statiques)
│   ├── pages/            # Home, BookingPage, Cart, Login, Register, ForgotPassword, NotFound
│   ├── styles/           # variables.css
│   ├── utils/            # axiosInstance (API + intercepteurs JWT)
│   ├── App.jsx, main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── .env                  # VITE_API_BASE_URL
└── README.md
```

## Fonctionnalités principales

- **Vitrine** : accueil, services, studios, décors (sets photo), portfolio.
- **Réservation** : choix du décor, calendrier, créneau horaire, ajout au panier (BookingPage).
- **Panier** : affichage et gestion du panier (Cart).
- **Compte client** : inscription, connexion, mot de passe oublié (Register, Login, ForgotPassword).
- **Internationalisation** : langue (i18next).
- **Thème** : thème clair/sombre (ThemeContext).

## Installation et lancement

### Prérequis

- Node.js 18+ (recommandé 20+)
- Backend EATECH lancé et accessible (pour l’API)

### Étapes

1. Cloner le dépôt et se placer dans le dossier :
   ```bash
   cd frontend_eatech
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Créer un fichier `.env` à la racine avec l’URL de l’API :
   ```env
   VITE_API_BASE_URL=http://127.0.0.1:8000/api
   ```

4. Lancer en développement :
   ```bash
   npm run dev
   ```
   Le site est servi sur le port indiqué par Vite (souvent **http://localhost:5174** ou 5173 si un seul projet tourne).

5. Build de production :
   ```bash
   npm run build
   ```
   Sortie dans `dist/`. Déployer sur un hébergement statique ou un serveur web.

## Variables d’environnement

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | URL de base de l’API backend (ex. `http://127.0.0.1:8000/api`) |

## Ajustements recommandés

- **CORS** : le backend doit autoriser l’origine du frontend dans `CORS_ALLOWED_ORIGINS`.
- **HTTPS** : en production, utiliser `https://` pour l’API et le site.
- **i18n** : centraliser les clés de traduction et ajouter les langues nécessaires.
- **SEO** : métadonnées, balises titre et description par page ; éventuellement SSR (ex. Vite + React SSR) si besoin.

## Scripts

- `npm run dev` — serveur de développement
- `npm run build` — build de production
- `npm run preview` — prévisualisation du build
- `npm run lint` — ESLint

## Licence / usage

Projet EATECH — usage interne ou selon accord.
