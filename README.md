# OperonCore — FAQ SEO Content Hub + Outil intégré

Projet orienté **SEO-first éditorial** pour trafic organique + monétisation AdSense (future), avec l’outil FAQ/Schema en soutien.

## 1) Ce qui est prioritaire dans cette version

- Pages piliers enrichies (contenu plus dense et plus utile)
- Guides transformés en ressources actionnables
- Exemples métiers renforcés pour longue traîne
- Maillage interne sémantique (cluster/type/intention)
- Signaux de crédibilité éditoriale (auteur + dernière MAJ)
- Emplacements AdSense préparés de façon naturelle dans le flux de lecture
- Blocs de lecture enrichis: tableaux comparatifs, encadrés callout et checklists visuelles
- UX éditoriale renforcée: image hero, temps de lecture, sommaire automatique, bloc FAQ express

## 2) Architecture

```text
src/
  app/                    # logique outil + sécurité URL
  config/                 # branding / pricing / seo global
  content/pages.js        # contenu éditorial + métadonnées sémantiques
  render/site-renderer.js # template HTML + hero/sommaire/faq express + related links + tableaux/callouts/checklists + sitemap/robots
  lib/                    # analytics, stockage, quotas
  server.js               # routes API + routes SEO + page outil
public/
  tool.html               # page outil dédiée
  app.js                  # UX du builder
  styles.css              # style builder
  site.css                # style éditorial lecture longue
tests/
  content.test.js
  generator.test.js
  security.test.js
```

## 3) Routes clés

### Hub & piliers
- `/`
- `/resources`
- `/faq-seo`
- `/faq-json-ld`
- `/faq-schema`
- `/faq-examples`
- `/faq-local-seo`
- `/how-to-add-faq-schema`

### Guides
- `/guide-faq-page-service`
- `/guide-add-faq-schema-propre`
- `/guide-erreurs-faq-seo`
- `/guide-faq-utile-vs-artificielle`
- `/guide-when-use-faqpage-schema`
- `/guide-adapter-faq-search-intent`

### Exemples métier
- `/examples/plombier`
- `/examples/dentiste`
- `/examples/avocat`
- `/examples/agence-seo`
- `/examples/coach`
- `/examples/entreprise-locale`

### Outil
- `/tool` (alias `/builder`, `/generator`)

### Confiance
- `/about`
- `/contact`
- `/privacy`
- `/mentions`

### SEO technique
- `/robots.txt`
- `/sitemap.xml`

## 4) Maillage interne sémantique

Chaque page possède des métadonnées :
- `type` (hub / pillar / guide / example / support)
- `cluster` (faq-foundations, schema-implementation, local-seo, etc.)
- `intents` (informationnelle, pratique, locale, etc.)
- `updatedAt`, `author`

Le renderer calcule les pages liées selon ces signaux plutôt qu’un ordre arbitraire.

## 5) AdSense-ready (sans script pub)

Le template prévoit des emplacements explicites :
- `future-adsense-slot-top`
- `future-adsense-slot-middle`
- `future-adsense-slot-sidebar`

Ils sont placés à des points naturels de lecture pour préserver l’UX.

## 6) Lancer localement

```bash
npm install
npm test
npm run dev
# ouvrir http://localhost:3000
```

## 7) Déploiement VPS Ubuntu

```bash
apt update && apt upgrade -y
apt install -y nginx curl git
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm i -g pm2

cd /var/www
git clone <REPO_URL> operoncore-faq-content-hub
cd operoncore-faq-content-hub
npm install
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup

cp deploy/nginx-operoncore-faq.conf /etc/nginx/sites-available/operoncore-faq
ln -s /etc/nginx/sites-available/operoncore-faq /etc/nginx/sites-enabled/operoncore-faq
nginx -t && systemctl restart nginx
```

HTTPS:
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d faq-schema-aeo.votre-domaine.com
```

## 8) Variables d’environnement

- `PORT`
- `SITE_BASE_URL` (important pour canonical/sitemap)
- `ANALYTICS_ENABLED`
- `FREE_DAILY_LIMIT`
- `PRO_API_TOKEN`
- `ADMIN_TOKEN`
- `URL_FETCH_TIMEOUT_MS`
- `URL_FETCH_MAX_BYTES`
- `URL_FETCH_MAX_REDIRECTS`
- `JSON_BODY_LIMIT_BYTES`

## 9) Comment enrichir encore le site

### Ajouter 10 pages
1. Dupliquer un objet page dans `src/content/pages.js`.
2. Définir `slug/title/description/h1/intro/sections`.
3. Ajouter `type/cluster/intents` pour un maillage pertinent.
4. Relier la page dans `/resources` et dans au moins 1 page du même cluster.

### Ajouter 50 pages
- Créer des mini-clusters thématiques (ex: FAQ santé, FAQ juridique, FAQ artisanat).
- Pour chaque cluster, préparer 1 pilier + 4 guides + 6 exemples.
- Réutiliser une trame stable: définition -> erreurs -> checklist -> cas -> outil.

### Ajouter 100 pages
- Scinder `pages.js` en modules (`pillars.js`, `guides.js`, `examples.js`, `support.js`).
- Ajouter un mini process éditorial: brief -> rédaction -> relecture métier -> publication.
- Garder une mise à jour trimestrielle sur les pages à trafic élevé.
