export const site = {
  defaultHero: {
    src:
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" role="img" aria-label="OperonCore FAQ Hub">
          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stop-color="#eef3ff"/>
              <stop offset="100%" stop-color="#dce8ff"/>
            </linearGradient>
          </defs>
          <rect width="1200" height="630" fill="url(#g)"/>
          <text x="70" y="250" font-family="Inter,Arial,sans-serif" font-size="54" fill="#1a2540" font-weight="700">OperonCore FAQ Content Hub</text>
          <text x="70" y="330" font-family="Inter,Arial,sans-serif" font-size="28" fill="#46608f">Guides, exemples métier et outil FAQ + Schema + AEO</text>
        </svg>` )
  },
  baseUrl: process.env.SITE_BASE_URL || 'https://faq-schema-aeo.operoncore.com',
  siteName: 'OperonCore FAQ Content Hub',
  description:
    'Guides, exemples et outil FAQ JSON-LD pour améliorer vos pages SEO sans complexité technique.',
  editorialTeam: 'OperonCore Editorial Team'
};

export const nav = [
  { href: '/', label: 'Accueil' },
  { href: '/resources', label: 'Resources' },
  { href: '/faq-seo', label: 'FAQ SEO' },
  { href: '/faq-examples', label: 'Exemples métier' },
  { href: '/tool', label: 'Outil gratuit' }
];

function meta(data) {
  return {
    type: data.type,
    cluster: data.cluster,
    intents: data.intents || [],
    updatedAt: data.updatedAt || '2026-03-13',
    author: data.author || site.editorialTeam
  };
}

export const pages = [
  {
    slug: '/',
    title: 'FAQ SEO Hub: guides, exemples métier et outil JSON-LD',
    description:
      'Un site éditorial SEO-first sur les FAQ, le schema JSON-LD et les cas métier pour PME, freelances et agences.',
    h1: 'Le hub éditorial pour créer des FAQ utiles et indexables',
    hero: {
      alt: 'Hub éditorial OperonCore dédié aux FAQ SEO, schema JSON-LD et contenus longue traîne'
    },
    quickFaq: [
      { q: 'À qui s’adresse ce hub ?', a: 'Aux PME, freelances et agences qui veulent publier des FAQ utiles et maintenables.' },
      { q: 'Que trouve-t-on ici ?', a: 'Des guides piliers, des exemples métiers et un outil pour générer FAQ + JSON-LD + HTML.' },
      { q: 'Quel est le but principal ?', a: 'Produire des pages plus utiles, plus crédibles et plus faciles à faire évoluer.' }
    ],
    intro:
      'Ce site combine des guides détaillés, des exemples par métier et un générateur gratuit pour accélérer la mise en production. L’objectif: produire des pages utiles pour les utilisateurs, crédibles pour Google et faciles à maintenir dans le temps.',
    ...meta({ type: 'hub', cluster: 'core', intents: ['informationnelle', 'pratique'] }),
    sections: [
      {
        h2: 'Pourquoi ce hub existe',
        paragraphs: [
          'La plupart des FAQ SEO publiées en ligne sont soit trop génériques, soit trop artificielles. Nous avons construit ce hub pour proposer une approche pragmatique: partir des vraies questions clients, structurer les réponses, puis baliser proprement.',
          'Vous trouverez ici une méthode réutilisable, des templates métier et des checklists simples pour éviter les erreurs classiques de publication.'
        ]
      },
      {
        h2: 'Parcours recommandé (30 minutes)',
        bullets: [
          'Lire la page pilier FAQ SEO pour comprendre la logique globale',
          'Passer au guide “ajouter un schema FAQ propre” pour la mise en œuvre',
          'Consulter un exemple métier proche de votre activité',
          'Utiliser l’outil pour générer une première base puis relire avant publication'
        ],
        links: [
          { href: '/faq-seo', label: 'Page pilier FAQ SEO' },
          { href: '/guide-add-faq-schema-propre', label: 'Guide implémentation propre' },
          { href: '/faq-examples', label: 'Bibliothèque d’exemples métier' },
          { href: '/tool', label: 'Lancer l’outil gratuit' }
        ]
      }
    ]
  },
  {
    slug: '/resources',
    title: 'Resources FAQ SEO: piliers, guides pratiques et templates',
    description: 'Centre de ressources structuré pour piloter une stratégie FAQ SEO durable.',
    h1: 'Centre de ressources FAQ + Schema',
    hero: {
      alt: 'Centre de ressources FAQ SEO avec piliers, guides pratiques et exemples métiers'
    },
    quickFaq: [
      { q: 'Par où commencer ?', a: 'Commencez par la page pilier FAQ SEO, puis passez au guide schema et aux exemples métier.' },
      { q: 'À quoi sert cette page ?', a: 'À centraliser tous les contenus et accélérer la navigation interne.' },
      { q: 'Quelle logique suivre ?', a: 'Pilier → guide → exemple → outil.' }
    ],
    intro:
      'Utilisez cette page comme table des matières éditoriale. Chaque bloc répond à une intention de recherche spécifique et renvoie vers des contenus complémentaires.',
    ...meta({ type: 'hub', cluster: 'core', intents: ['navigation', 'informationnelle'] }),
    sections: [
      {
        h2: 'Piliers stratégiques',
        list: ['/faq-seo', '/faq-json-ld', '/faq-schema', '/faq-examples', '/faq-local-seo', '/how-to-add-faq-schema']
      },
      {
        h2: 'Guides actionnables',
        list: [
          '/guide-faq-page-service',
          '/guide-add-faq-schema-propre',
          '/guide-erreurs-faq-seo',
          '/guide-faq-utile-vs-artificielle',
          '/guide-when-use-faqpage-schema',
          '/guide-adapter-faq-search-intent'
        ]
      },
      {
        h2: 'Exemples longue traîne par métier',
        list: [
          '/examples/plombier',
          '/examples/dentiste',
          '/examples/avocat',
          '/examples/agence-seo',
          '/examples/coach',
          '/examples/entreprise-locale',
          '/examples/kinesitherapeute',
          '/examples/osteopathe',
          '/examples/electricien',
          '/examples/couvreur',
          '/examples/notaire',
          '/examples/comptable',
          '/examples/agent-immobilier',
          '/examples/paysagiste'
        ]
      },
      {
        h2: 'Longue traîne par usage/intention/schema',
        list: [
          '/faq-page-devis',
          '/faq-page-contact',
          '/faq-landing-page-locale',
          '/faq-page-service-urgence',
          '/faq-page-prestation-premium',
          '/faq-rassurer-avant-rdv',
          '/faq-reduire-objections-prix',
          '/faq-ameliorer-page-service-locale',
          '/faq-convertir-page-seo-locale',
          '/json-ld-page-service-locale',
          '/json-ld-prestataire-freelance',
          '/checklist-faq-schema-anti-duplication-villes'
        ]
      }
    ]
  },

  {
    slug: '/faq-seo',
    title: 'FAQ SEO: méthode complète, checklist et erreurs à éviter',
    description: 'Guide pilier FAQ SEO: définition, utilité, cadre d’usage, erreurs, checklist et cas concret.',
    h1: 'FAQ SEO: construire un bloc utile, crédible et performant',
    hero: {
      alt: 'Guide complet sur la création de FAQ SEO utiles, crédibles et orientées conversion'
    },
    quickFaq: [
      { q: 'Combien de questions faut-il ?', a: 'En général 4 à 8 questions fortes suffisent.' },
      { q: 'Quel est le principal objectif ?', a: 'Lever les objections réelles avant la prise de contact.' },
      { q: 'Quelle erreur revient le plus ?', a: 'Publier des questions artificielles ou dupliquer le même bloc partout.' }
    ],
    intro:
      'Une FAQ SEO performante ne sert pas à “faire du volume”, mais à répondre aux vraies questions qui bloquent la décision. Cette page vous donne une méthode complète pour construire une FAQ lisible, utile et maintenable, avec un cadre éditorial réellement exploitable en PME, freelance ou agence.',
    keyTakeaways: [
      'Une FAQ forte répond à des objections réelles, pas à des mots-clés isolés.',
      '4 à 8 questions solides valent mieux que 20 questions faibles.',
      'La cohérence entre contenu visible, FAQ et schema est essentielle.',
      'La maintenance trimestrielle fait la différence sur la durée.'
    ],
    ...meta({ type: 'pillar', cluster: 'faq-foundations', intents: ['informationnelle', 'semi-transactionnelle'] }),
    sections: [
      {
        h2: 'Résumé rapide (si vous avez 2 minutes)',
        callout: {
          kind: 'info',
          title: 'Résumé rapide',
          text: 'Commencez par lister les questions réellement posées en vente/support. Conservez 4 à 8 questions, répondez de façon concrète, puis validez la cohérence avec la page avant publication.'
        }
      },
      {
        h2: 'Définition pratique: à quoi sert une FAQ SEO',
        paragraphs: [
          'Une FAQ SEO sert à lever les frictions de compréhension juste avant la conversion: prix, délai, conditions, zone, processus, garanties. Elle ne doit pas répéter la page principale mot pour mot.',
          'Sur une page service, la FAQ joue souvent le rôle de “pont de décision” entre la découverte et la prise de contact. Sur une page locale, elle clarifie la réalité opérationnelle (zones desservies, disponibilité, délais).'
        ],
        table: {
          headers: ['Type de FAQ', 'Objectif principal', 'Risque si mal fait'],
          rows: [
            ['FAQ informative', 'Clarifier le sujet', 'Rester trop théorique'],
            ['FAQ service', 'Lever objections avant contact', 'Réponses vagues sans cadre concret'],
            ['FAQ locale', 'Préciser disponibilité géographique', 'Duplication massive sans adaptation']
          ]
        }
      },
      {
        h2: 'Quand utiliser / quand éviter',
        bullets: [
          'Utiliser: pages service, pages locales, pages offres à forte question client',
          'Utiliser: pages où le support reçoit des questions répétitives',
          'Éviter: pages trop courtes sans matière',
          'Éviter: pages temporaires où les réponses changent chaque semaine'
        ],
        callout: {
          kind: 'warning',
          title: 'Quand éviter absolument',
          text: 'Si vous n’avez pas au moins 4 questions légitimes issues du terrain, ne forcez pas une FAQ.'
        }
      },
      {
        h2: 'Erreurs fréquentes qui réduisent l’impact',
        bullets: [
          'Copier-coller la même FAQ sur de nombreuses pages',
          'Rédiger des réponses de 8 lignes sans information opérationnelle',
          'Créer des questions “SEO” jamais posées par les clients',
          'Publier un schema qui diverge du contenu visible'
        ],
        links: [{ href: '/guide-erreurs-faq-seo', label: 'Guide détaillé des erreurs FAQ SEO' }]
      },
      {
        h2: 'Questions prioritaires à traiter (framework)',
        table: {
          headers: ['Thème', 'Question type', 'Impact business'],
          rows: [
            ['Prix', 'Comment est calculé le tarif ?', 'Réduit objections budgétaires'],
            ['Délai', 'Quel délai réaliste ?', 'Évite attentes irréalistes'],
            ['Périmètre', 'Que comprend la prestation ?', 'Améliore qualité des leads'],
            ['Local', 'Intervenez-vous dans ma zone ?', 'Augmente conversion locale']
          ]
        }
      },
      {
        h2: 'Cas concret: page service locale',
        paragraphs: [
          'Exemple: une page “Dépannage électrique Nantes”. Les questions les plus utiles concernent la disponibilité soir/week-end, le délai selon quartier, la politique de majoration et les normes couvertes.',
          'Une FAQ structurée sur ces points augmente le taux de contact qualifié et réduit les appels non pertinents.'
        ],
        links: [
          { href: '/examples/electricien', label: 'Exemple électricien renforcé' },
          { href: '/faq-page-service-urgence', label: 'FAQ service urgence' }
        ]
      },
      {
        h2: 'Checklist finale avant publication',
        checklist: [
          '4 à 8 questions maximum, toutes utiles',
          'Réponses courtes et concrètes (1-3 phrases)',
          'Validation métier (vente, support ou opérationnel)',
          'Cohérence totale avec le contenu visible',
          'Plan de mise à jour trimestriel'
        ],
        links: [
          { href: '/guide-faq-page-service', label: 'Tutoriel page service' },
          { href: '/tool', label: 'Générer une première base FAQ' }
        ]
      }
    ]
  },
  {
    slug: '/faq-json-ld',
    title: 'FAQ JSON-LD: structure propre, validation et maintenance',
    description: 'Page pilier sur le balisage FAQPage JSON-LD avec méthode de contrôle qualité.',
    h1: 'FAQ JSON-LD: structurer correctement sans dette technique',
    hero: {
      alt: 'Structure propre de balisage FAQ JSON-LD avec validation et maintenance'
    },
    quickFaq: [
      { q: 'Quel principe suivre ?', a: 'Le JSON-LD doit refléter exactement le contenu visible.' },
      { q: 'Quel est le meilleur process ?', a: 'Source unique FAQ puis génération HTML + script.' },
      { q: 'Quel est le plus gros risque ?', a: 'La divergence entre la FAQ affichée et le balisage publié.' }
    ],
    intro:
      'Le JSON-LD FAQPage doit refléter exactement ce que l’utilisateur lit. Cette page vous donne une méthode robuste: structure minimale, contrôles qualité, maintenance et gestion des erreurs en équipe.',
    keyTakeaways: [
      'Le JSON-LD est une représentation fidèle du contenu visible.',
      'Une source de vérité unique réduit les écarts au fil du temps.',
      'Validation avant et après déploiement = gain de temps.',
      'La maintenance régulière est aussi importante que l’implémentation initiale.'
    ],
    ...meta({ type: 'pillar', cluster: 'schema-implementation', intents: ['informationnelle', 'technique'] }),
    sections: [
      {
        h2: 'Résumé rapide',
        callout: {
          kind: 'info',
          title: 'En bref',
          text: 'Rédigez la FAQ visible, générez le JSON-LD depuis cette source, validez la syntaxe et la cohérence, puis contrôlez la version live.'
        }
      },
      {
        h2: 'Structure minimale à respecter',
        paragraphs: [
          'Conservez une structure claire: @context, @type FAQPage, mainEntity[] de Question/acceptedAnswer. Évitez d’ajouter des champs non maîtrisés.',
          'La lisibilité du JSON compte: un script propre facilite les audits et les corrections futures.'
        ],
        table: {
          headers: ['Champ', 'Rôle', 'Erreur fréquente'],
          rows: [
            ['@context', 'Définir le vocabulaire schema.org', 'Oublier ou mal orthographier la valeur'],
            ['mainEntity', 'Lister les Q/R', 'Inclure des questions invisibles dans la page'],
            ['acceptedAnswer.text', 'Réponse canonique', 'Texte différent de la FAQ affichée']
          ]
        }
      },
      {
        h2: 'Quand utiliser / quand éviter',
        bullets: [
          'Utiliser: pages stables avec vraies Q/R',
          'Utiliser: pages service evergreen',
          'Éviter: pages ultra volatiles',
          'Éviter: pages où la FAQ n’est pas encore qualifiée'
        ]
      },
      {
        h2: 'Erreurs qui coûtent du temps',
        bullets: [
          'Modifier la FAQ HTML sans mettre à jour le JSON-LD',
          'Laisser des caractères spéciaux non échappés',
          'Réutiliser un script identique entre pages non équivalentes',
          'Publier sans contrôle post-déploiement'
        ],
        callout: {
          kind: 'warning',
          title: 'Point critique',
          text: 'Le plus gros risque n’est pas la syntaxe: c’est la divergence entre ce que vous affichez et ce que vous balisez.'
        }
      },
      {
        h2: 'Process de maintenance recommandé',
        checklist: [
          'Définir une source FAQ unique (JSON interne ou bloc éditorial)',
          'Générer script depuis cette source',
          'Valider syntaxe + cohérence',
          'Contrôler la page live après publication',
          'Auditer trimestriellement les pages sensibles'
        ],
        links: [
          { href: '/guide-add-faq-schema-propre', label: 'Guide maintenance propre' },
          { href: '/json-ld-page-service-locale', label: 'Exemple JSON-LD local' },
          { href: '/tool', label: 'Générer JSON-LD propre' }
        ]
      }
    ]
  },
  {
    slug: '/faq-schema',
    title: 'FAQ Schema: cadre d’usage, limites et bonnes pratiques',
    description: 'Comprendre quand utiliser FAQPage schema et éviter les implémentations faibles.',
    h1: 'FAQ Schema: usage intelligent dans une stratégie éditoriale',
    hero: {
      alt: 'Bonnes pratiques pour utiliser FAQPage schema dans une stratégie éditoriale SEO'
    },
    quickFaq: [
      { q: 'Le schema suffit-il à lui seul ?', a: 'Non, il ne compense jamais un contenu faible.' },
      { q: 'Quand faut-il l’utiliser ?', a: 'Quand la page contient un vrai bloc questions-réponses stable et utile.' },
      { q: 'Quand faut-il l’éviter ?', a: 'Sur les pages faibles, volatiles ou sans FAQ légitime.' }
    ],
    intro:
      'Le schema FAQPage renforce la lisibilité machine de votre contenu, mais il ne compense jamais un texte faible. L’essentiel reste la qualité des questions-réponses publiées.',
    ...meta({ type: 'pillar', cluster: 'schema-implementation', intents: ['informationnelle'] }),
    sections: [
      {
        h2: 'Quand l’utiliser',
        paragraphs: [
          'Sur des pages où les questions sont stables et directement utiles à la décision utilisateur: services, prestations locales, offres B2B, pages de support evergreen.',
          'Si votre page change chaque semaine avec des promotions temporaires, le maintien du schema devient plus coûteux et moins fiable.'
        ]
      },
      {
        h2: 'Limites à connaître',
        bullets: [
          'Le schema ne garantit pas un affichage enrichi',
          'Le balisage ne rattrape pas une faible pertinence éditoriale',
          'Une FAQ artificielle peut dégrader la confiance utilisateur'
        ]
      },
      {
        h2: 'Recommandation éditoriale',
        paragraphs: [
          'Traitez votre FAQ comme une mini base de connaissance métier. Mettez-la à jour quand les délais, prix, garanties ou modalités évoluent.',
          'Créez une routine trimestrielle d’audit FAQ + schema pour éviter les contenus obsolètes.'
        ],
        links: [
          { href: '/guide-when-use-faqpage-schema', label: 'Guide: quand utiliser FAQPage' },
          { href: '/guide-faq-utile-vs-artificielle', label: 'Différencier utile vs artificiel' }
        ]
      }
    ]
  },
  {
    slug: '/faq-examples',
    title: 'Exemples FAQ SEO par métier: modèles, variantes et conseils',
    description: 'Bibliothèque d’exemples FAQ par secteur pour capter la longue traîne.',
    h1: 'Exemples FAQ par métier: base prête à adapter',
    hero: {
      alt: 'Bibliothèque d’exemples FAQ SEO par métier pour adaptation locale et sectorielle'
    },
    quickFaq: [
      { q: 'Peut-on copier-coller ces exemples ?', a: 'Non, ils servent de structure de départ seulement.' },
      { q: 'Que faut-il adapter en priorité ?', a: 'Le fond métier, la zone, les délais et les modalités réelles.' },
      { q: 'Quel bénéfice principal ?', a: 'Accélérer la production sans partir de zéro.' }
    ],
    intro:
      'Cette page est votre hub opérationnel pour transformer des modèles FAQ en versions réellement publiables. L’objectif: gagner du temps sans tomber dans le copier-coller artificiel.',
    keyTakeaways: [
      'Les exemples servent de trame, pas de texte final.',
      'Chaque secteur a ses objections spécifiques.',
      'La personnalisation locale/métier est obligatoire.',
      'Un bon exemple accélère la production sans dégrader la qualité.'
    ],
    ...meta({ type: 'pillar', cluster: 'examples', intents: ['informationnelle', 'semi-transactionnelle'] }),
    sections: [
      {
        h2: 'Comment tirer de la valeur des exemples',
        paragraphs: [
          'Commencez par identifier 5 questions réellement posées par vos prospects. Comparez-les avec les exemples disponibles puis adaptez les réponses à vos conditions réelles.',
          'Un modèle devient performant seulement quand il intègre votre zone, vos délais, votre process et vos limites.'
        ],
        callout: {
          kind: 'info',
          title: 'Règle simple',
          text: 'Copier la structure, réécrire le fond.'
        }
      },
      {
        h2: 'Tableau d’adaptation rapide',
        table: {
          headers: ['Type de page', 'Ce que vous adaptez', 'Résultat attendu'],
          rows: [
            ['Artisan local', 'Zone + délai + majoration', 'Leads mieux qualifiés'],
            ['Profession libérale', 'Cadre rendez-vous + documents', 'Moins d’incertitude avant contact'],
            ['Agence/service B2B', 'Périmètre + livrables + KPI', 'Meilleure conversion commerciale']
          ]
        }
      },
      {
        h2: 'Bibliothèque d’exemples disponibles',
        list: ['/examples/plombier','/examples/dentiste','/examples/avocat','/examples/agence-seo','/examples/coach','/examples/entreprise-locale','/examples/kinesitherapeute','/examples/osteopathe','/examples/electricien','/examples/couvreur','/examples/notaire','/examples/comptable','/examples/agent-immobilier','/examples/paysagiste']
      },
      {
        h2: 'Erreurs fréquentes sur les pages exemples',
        bullets: [
          'Publier des modèles non adaptés',
          'Ignorer les contraintes locales',
          'Réponses trop génériques',
          'Aucune relecture métier avant publication'
        ]
      },
      {
        h2: 'Checklist finale de personnalisation',
        checklist: [
          'Ajouter au moins 2 réponses locales/métier spécifiques',
          'Préciser prix/délais/process quand possible',
          'Relire avec un profil opérationnel',
          'Valider JSON-LD si vous publiez le balisage'
        ],
        links: [
          { href: '/faq-seo', label: 'Pilier FAQ SEO' },
          { href: '/guide-faq-page-service', label: 'Guide page service' },
          { href: '/tool', label: 'Créer un brouillon à partir de votre contenu' }
        ]
      }
    ]
  },
  {
    slug: '/faq-local-seo',
    title: 'FAQ Local SEO: stratégie locale, exemples et checklist',
    description: 'Construire une FAQ locale crédible pour entreprises de proximité.',
    h1: 'FAQ Local SEO: capter l’intention géographique sans sur-optimiser',
    hero: {
      alt: 'Stratégie FAQ Local SEO pour entreprises de proximité avec contrôle de duplication'
    },
    quickFaq: [
      { q: 'Quel est le risque principal en local SEO ?', a: 'Dupliquer la même FAQ sur plusieurs pages villes.' },
      { q: 'Que faut-il prioriser ?', a: 'Zone réelle, délai réaliste et conditions pratiques de service.' },
      { q: 'Combien de questions locales spécifiques viser ?', a: 'Au moins 2 questions propres à la zone.' }
    ],
    intro:
      'Le local SEO récompense la précision. Une FAQ locale premium doit répondre aux contraintes concrètes d’un visiteur: zone, délai, disponibilité, prix indicatif et conditions de service.',
    keyTakeaways: [
      'La précision locale prime sur la quantité de questions.',
      'La duplication entre pages villes est le principal risque.',
      'Les réponses doivent refléter la réalité opérationnelle.',
      'Le maintien trimestriel est indispensable sur les pages locales.'
    ],
    ...meta({ type: 'pillar', cluster: 'local-seo', intents: ['informationnelle', 'locale'] }),
    sections: [
      {
        h2: 'Questions locales à privilégier',
        bullets: [
          'Dans quelles villes/quartiers intervenez-vous ?',
          'Quel délai moyen selon la zone ?',
          'Y a-t-il un surcoût en urgence ?',
          'Comment réserver rapidement ?'
        ]
      },
      {
        h2: 'Quand utiliser / quand éviter',
        bullets: [
          'Utiliser: pages service locales avec activité réelle dans la zone',
          'Utiliser: pages où les utilisateurs demandent des infos logistiques',
          'Éviter: pages locales créées sans offre réelle',
          'Éviter: pages où aucune variable locale n’existe'
        ]
      },
      {
        h2: 'Tableau anti-duplication locale',
        table: {
          headers: ['Composant FAQ', 'Ce qui doit varier', 'Ce qui peut rester stable'],
          rows: [
            ['Disponibilité', 'Délais selon secteur', 'Process de prise de rendez-vous'],
            ['Tarif', 'Majoration locale éventuelle', 'Logique de calcul'],
            ['Zone', 'Villes/quartiers desservis', 'Périmètre global de service']
          ]
        }
      },
      {
        h2: 'Erreurs fréquentes à corriger',
        bullets: [
          'Même FAQ copiée sur 20 pages ville',
          'Promesses de délai non tenables localement',
          'Incohérence entre FAQ et fiche établissement',
          'Absence de lien vers contact local'
        ],
        links: [{ href: '/checklist-faq-schema-anti-duplication-villes', label: 'Checklist anti-duplication complète' }]
      },
      {
        h2: 'Cas concret: entreprise multi-zones',
        paragraphs: [
          'Pour une entreprise intervenant sur 12 villes, créez un noyau commun de 3 questions + 2 questions spécifiques par ville.',
          'Ce modèle limite la duplication et améliore l’utilité réelle de chaque page locale.'
        ]
      },
      {
        h2: 'Checklist finale locale',
        checklist: [
          'Au moins 2 questions spécifiques à la zone',
          'Délais réalistes et vérifiés',
          'FAQ alignée avec opérations terrain',
          'Lien vers contact/devis local',
          'Contrôle trimestriel de validité'
        ],
        links: [
          { href: '/faq-landing-page-locale', label: 'FAQ landing locale' },
          { href: '/faq-convertir-page-seo-locale', label: 'FAQ conversion locale' },
          { href: '/tool', label: 'Générer une FAQ locale' }
        ]
      }
    ]
  },
  {
    slug: '/how-to-add-faq-schema',
    title: 'Comment ajouter FAQ Schema: tutoriel complet étape par étape',
    description: 'Tutoriel détaillé pour passer de la FAQ visible au JSON-LD validé et publié.',
    h1: 'Comment ajouter FAQ Schema sans erreur de mise en ligne',
    hero: {
      alt: 'Tutoriel étape par étape pour ajouter un schema FAQ propre et valide'
    },
    quickFaq: [
      { q: 'Quelle est la première étape ?', a: 'Rédiger d’abord une FAQ visible réellement utile.' },
      { q: 'Que faut-il vérifier ensuite ?', a: 'La cohérence entre HTML affiché et JSON-LD généré.' },
      { q: 'Quelle dernière étape ne pas oublier ?', a: 'Le contrôle post-déploiement.' }
    ],
    intro:
      'Ce tutoriel vous guide de la rédaction à la validation finale, avec un cadre simple pour déployer rapidement sans casser la cohérence éditoriale.',
    ...meta({ type: 'pillar', cluster: 'schema-implementation', intents: ['pratique', 'technique'] }),
    sections: [
      {
        h2: 'Étape 1 — cadrer la FAQ visible',
        paragraphs: [
          'Rédigez d’abord la version que l’utilisateur lira. Si la FAQ n’est pas utile en texte brut, elle ne le sera pas en JSON-LD.',
          'Commencez par 4 à 8 questions. Chaque réponse doit être courte, précise et vérifiable.'
        ]
      },
      {
        h2: 'Étape 2 — générer le JSON-LD',
        paragraphs: [
          'Générez le script à partir de votre FAQ finale, puis vérifiez manuellement les accents, apostrophes et caractères spéciaux.',
          'Conservez la même wording entre H3/P et les propriétés name/text du JSON-LD.'
        ]
      },
      {
        h2: 'Étape 3 — valider et publier',
        bullets: [
          'Valider le balisage dans un outil de test',
          'Déployer sur un environnement stable',
          'Contrôler la page rendue après mise en production',
          'Planifier une relecture mensuelle pour les contenus sensibles'
        ],
        links: [
          { href: '/guide-add-faq-schema-propre', label: 'Guide avancé de maintenance' },
          { href: '/tool', label: 'Générer votre FAQ + JSON-LD' }
        ]
      }
    ]
  },

  {
    slug: '/guide-faq-page-service',
    title: 'Guide: créer une FAQ utile pour une page service',
    description: 'Tutoriel structuré pour rédiger des FAQ orientées conversion douce.',
    h1: 'Créer une FAQ utile pour une page service: méthode pratique',
    hero: {
      alt: 'Méthode pratique pour créer une FAQ utile sur une page service'
    },
    quickFaq: [
      { q: 'Quelle source utiliser ?', a: 'Les questions réelles reçues en vente, support ou rendez-vous.' },
      { q: 'Quel ton adopter ?', a: 'Court, concret, utile et non défensif.' },
      { q: 'Quand mettre à jour ?', a: 'Tous les 2 à 3 mois selon les retours terrain.' }
    ],
    intro:
      'Ce guide transforme une page service “classique” en page plus performante grâce à une FAQ qui répond aux objections avant devis. Vous trouverez une méthode pas-à-pas applicable immédiatement.',
    keyTakeaways: [
      'Commencer par les questions vente/support réelles.',
      'Regrouper par thèmes de décision (prix, délai, process, garanties).',
      'Rédiger des réponses courtes, opérationnelles et vérifiables.',
      'Tester puis itérer selon les questions reçues après publication.'
    ],
    ...meta({ type: 'guide', cluster: 'faq-foundations', intents: ['pratique', 'semi-transactionnelle'] }),
    sections: [
      {
        h2: 'Étape 1 — collecter la matière utile',
        paragraphs: [
          'Recueillez les questions auprès des commerciaux, du support et des rendez-vous clients. Cette matière terrain est votre meilleure source.',
          'Classez ensuite les questions par intention: compréhension, comparaison, décision.'
        ],
        checklist: [
          'Collecter 15 à 25 questions brutes',
          'Supprimer doublons et questions hors sujet',
          'Conserver 4 à 8 questions décisives'
        ]
      },
      {
        h2: 'Étape 2 — rédiger des réponses décisionnelles',
        table: {
          headers: ['Type de réponse', 'Version faible', 'Version forte'],
          rows: [
            ['Prix', 'Cela dépend.', 'Le prix dépend de X/Y; estimation après diagnostic.'],
            ['Délai', 'On intervient vite.', 'Délai moyen + facteurs de variation.'],
            ['Périmètre', 'On gère tout.', 'Liste explicite des inclus/exclus.']
          ]
        }
      },
      {
        h2: 'Étape 3 — valider la crédibilité métier',
        paragraphs: [
          'Faites relire la FAQ par un profil opérationnel. Une réponse qui sonne bien mais ne tient pas en exécution crée de la dette commerciale.',
          'Ajoutez des formulations conditionnelles quand nécessaire pour rester honnête et précis.'
        ],
        callout: {
          kind: 'warning',
          title: 'Point critique',
          text: 'La FAQ doit rester alignée avec la capacité réelle de livraison.'
        }
      },
      {
        h2: 'Étape 4 — publier et itérer',
        bullets: [
          'Observer les questions reçues après publication',
          'Retirer les questions peu utiles',
          'Renforcer les réponses qui génèrent encore des doutes',
          'Mettre à jour tous les 2-3 mois'
        ]
      },
      {
        h2: 'Checklist finale page service',
        checklist: [
          'FAQ visible, claire et courte',
          'Réponses actionnables, sans jargon inutile',
          'Aucune promesse non tenable',
          'Lien naturel vers contact/devis',
          'JSON-LD validé si utilisé'
        ],
        links: [
          { href: '/faq-page-devis', label: 'FAQ page devis' },
          { href: '/faq-page-contact', label: 'FAQ page contact' },
          { href: '/tool', label: 'Créer un brouillon FAQ depuis la page service' }
        ]
      }
    ]
  },
  {
    slug: '/guide-add-faq-schema-propre',
    title: 'Guide: ajouter un schema FAQ propre et maintenable',
    description: 'Méthode durable pour implémenter et maintenir FAQPage JSON-LD.',
    h1: 'Ajouter un schema FAQ propre: la méthode sans dette',
    hero: {
      alt: 'Guide pour implémenter et maintenir un schema FAQ propre sans dette technique'
    },
    quickFaq: [
      { q: 'Quel principe central ?', a: 'Une source FAQ unique pour générer l’affichage et le balisage.' },
      { q: 'Quels contrôles faut-il garder ?', a: 'Validation JSON, cohérence HTML/JSON-LD et contrôle live.' },
      { q: 'Quelle fréquence de maintenance ?', a: 'Audit trimestriel au minimum sur les pages critiques.' }
    ],
    intro:
      'Ce guide est conçu pour éviter les implémentations fragiles. Vous allez structurer une méthode stable: source unique, contrôles qualité, publication et maintenance continue.',
    keyTakeaways: [
      'Source unique FAQ -> HTML + JSON-LD.',
      'Validation technique et éditoriale avant publication.',
      'Contrôle post-déploiement obligatoire.',
      'Maintenance planifiée pour éviter l’obsolescence.'
    ],
    ...meta({ type: 'guide', cluster: 'schema-implementation', intents: ['technique', 'pratique'] }),
    sections: [
      {
        h2: 'Étape 1 — définir une source de vérité',
        paragraphs: [
          'Ne maintenez pas deux versions séparées de la FAQ. Centralisez le contenu puis générez l’affichage et le JSON-LD à partir de cette source.',
          'Cette discipline réduit les divergences après plusieurs itérations éditoriales.'
        ],
        callout: {
          kind: 'success',
          title: 'Bon réflexe',
          text: 'Si un éditeur modifie une réponse, le script JSON-LD doit être regénéré automatiquement ou via checklist.'
        }
      },
      {
        h2: 'Étape 2 — contrôles qualité indispensables',
        table: {
          headers: ['Contrôle', 'But', 'Fréquence'],
          rows: [
            ['Validation JSON', 'Éviter erreurs syntaxe', 'À chaque publication'],
            ['Cohérence HTML/JSON-LD', 'Éviter divergence', 'À chaque modification FAQ'],
            ['Contrôle live', 'Vérifier rendu final', 'Post-déploiement']
          ]
        }
      },
      {
        h2: 'Étape 3 — erreurs les plus coûteuses',
        bullets: [
          'FAQ visible modifiée sans MAJ du schema',
          'Scripts dupliqués entre pages non équivalentes',
          'Absence de revue éditoriale',
          'Pas de journal de mise à jour'
        ]
      },
      {
        h2: 'Étape 4 — routine de maintenance',
        checklist: [
          'Audit trimestriel des pages clés',
          'Revue des réponses sensibles (prix/délais)',
          'Vérification des pages locales anti-duplication',
          'Mise à jour de la date de révision'
        ],
        links: [
          { href: '/faq-json-ld', label: 'Pilier FAQ JSON-LD' },
          { href: '/checklist-faq-schema-anti-duplication-villes', label: 'Checklist anti-duplication villes' },
          { href: '/tool', label: 'Générer FAQ + JSON-LD propre' }
        ]
      }
    ]
  },
  {
    slug: '/guide-erreurs-faq-seo',
    title: 'Guide: erreurs FAQ SEO à éviter',
    description: 'Diagnostic détaillé des erreurs qui affaiblissent les pages FAQ.',
    h1: 'Erreurs FAQ SEO: comment les repérer et les corriger vite',
    intro: 'Une FAQ peut nuire à la page si elle est artificielle, hors contexte ou obsolète.',
    ...meta({ type: 'guide', cluster: 'faq-foundations', intents: ['diagnostic', 'pratique'] }),
    sections: [
      {
        h2: 'Erreur 1 — questions hors intention',
        paragraphs: [
          'Si une question n’aide pas l’utilisateur à avancer, retirez-la. Le volume n’est pas un indicateur de qualité.',
          'Vérifiez l’alignement avec l’intention dominante de la page (information, comparaison, décision).'
        ]
      },
      {
        h2: 'Erreur 2 — réponses trop vagues',
        paragraphs: [
          'Les réponses généralistes (“cela dépend”) sans contexte concret créent de la frustration. Ajoutez un cadre: facteurs, délais, exemples réalistes.',
          'Une réponse courte peut rester précise si elle intègre des conditions claires.'
        ]
      },
      {
        h2: 'Erreur 3 — duplication massive',
        bullets: [
          'Même FAQ recopiée sur des pages différentes',
          'Même wording dans plusieurs villes sans adaptation locale',
          'Aucune maintenance après publication'
        ],
        links: [{ href: '/faq-local-seo', label: 'Voir la stratégie FAQ locale' }]
      }
    ]
  },
  {
    slug: '/guide-faq-utile-vs-artificielle',
    title: 'Guide: FAQ utile vs FAQ artificielle',
    description: 'Critères concrets pour distinguer un bloc FAQ utile d’un bloc décoratif.',
    h1: 'FAQ utile vs FAQ artificielle: grille d’évaluation rapide',
    intro: 'Ce guide vous aide à auditer vos FAQ en 10 minutes avant publication.',
    ...meta({ type: 'guide', cluster: 'faq-foundations', intents: ['diagnostic', 'informationnelle'] }),
    sections: [
      {
        h2: 'Signes d’une FAQ utile',
        bullets: [
          'Question issue d’un vrai échange client',
          'Réponse immédiatement exploitable',
          'Lien clair avec l’offre ou la page',
          'Formulation lisible sans jargon inutile'
        ]
      },
      {
        h2: 'Signes d’une FAQ artificielle',
        bullets: [
          'Question “SEO-friendly” mais jamais posée',
          'Réponse générique sans valeur pratique',
          'Ton trop promotionnel',
          'Bloc long qui répète le contenu principal'
        ]
      },
      {
        h2: 'Comment corriger',
        paragraphs: [
          'Supprimez les questions faibles au lieu de les réécrire à l’infini. Une FAQ plus courte mais solide est préférable.',
          'Ajoutez une relecture par profil métier pour valider la crédibilité de chaque réponse.'
        ]
      }
    ]
  },
  {
    slug: '/guide-when-use-faqpage-schema',
    title: 'Guide: quand utiliser FAQPage schema (et quand éviter)',
    description: 'Aide à la décision pour déployer FAQPage selon le type de page.',
    h1: 'Quand utiliser FAQPage schema: cadre de décision simple',
    intro: 'Ce guide évite les implémentations systématiques sans valeur.',
    ...meta({ type: 'guide', cluster: 'schema-implementation', intents: ['pratique', 'informationnelle'] }),
    sections: [
      {
        h2: 'Utilisez FAQPage si…',
        bullets: ['La page contient déjà un bloc Q/R réel', 'Les réponses sont stables dans le temps', 'La page traite une intention claire']
      },
      {
        h2: 'Évitez FAQPage si…',
        bullets: ['Pas de questions explicites', 'Page trop volatile', 'Contenu très court ou peu qualifié']
      },
      {
        h2: 'Arbitrage pratique',
        paragraphs: [
          'Si vous hésitez, commencez sans schema et observez la performance éditoriale. Ajoutez le balisage quand la FAQ a fait ses preuves.',
          'Cette approche évite d’investir du temps sur des pages qui n’ont pas encore de maturité contenu.'
        ]
      }
    ]
  },
  {
    slug: '/guide-adapter-faq-search-intent',
    title: 'Guide: adapter une FAQ à l’intention de recherche',
    description: 'Méthode pour aligner FAQ et intentions utilisateur réelles.',
    h1: 'Adapter votre FAQ à l’intention de recherche: méthode par étape',
    intro: 'Une FAQ performante suit l’intention dominante de la page, puis les intentions secondaires.',
    ...meta({ type: 'guide', cluster: 'faq-foundations', intents: ['pratique', 'informationnelle'] }),
    sections: [
      {
        h2: 'Étape 1 — qualifier l’intention dominante',
        paragraphs: [
          'Informationnelle: l’utilisateur veut comprendre. Semi-transactionnelle: il compare des options. Décisionnelle: il veut agir vite.',
          'La FAQ doit refléter cette étape du parcours, sinon elle paraît déconnectée.'
        ]
      },
      {
        h2: 'Étape 2 — mapper vos questions',
        bullets: [
          'Découverte: définition, méthode, périmètre',
          'Comparaison: différence, avantages, limites',
          'Décision: prix, délais, modalités, contact'
        ]
      },
      {
        h2: 'Étape 3 — ajuster le ton et la profondeur',
        paragraphs: [
          'Sur une page haute intention, privilégiez la clarté opérationnelle. Sur une page pédagogique, ajoutez contexte et exemples.',
          'La cohérence ton + intention améliore l’engagement et limite les rebonds.'
        ]
      }
    ]
  },

  {
    slug: '/examples/plombier',
    title: 'Exemples FAQ plombier: urgences, délais, devis et zones',
    description: 'Exemples longue traîne FAQ pour plombier local avec conseils d’adaptation.',
    h1: 'Exemples FAQ pour plombier: version réellement exploitable',
    intro: 'En plomberie, les visiteurs cherchent surtout rapidité, transparence et fiabilité.',
    ...meta({ type: 'example', cluster: 'local-business', intents: ['locale', 'semi-transactionnelle'] }),
    sections: [
      {
        h2: 'Contexte métier',
        paragraphs: [
          'Les recherches plomberie sont souvent urgentes. Votre FAQ doit donc répondre vite aux questions de disponibilité, de zone et de devis.',
          'Évitez les réponses trop techniques si elles ne sont pas utiles à la décision immédiate.'
        ]
      },
      {
        h2: 'Questions prioritaires à traiter',
        bullets: [
          'Intervenez-vous en urgence le soir ou le week-end ?',
          'Quel est le délai moyen d’intervention ?',
          'Le devis déplacement est-il gratuit ?',
          'Dans quelles communes intervenez-vous ?'
        ]
      },
      {
        h2: 'Erreurs fréquentes du secteur',
        bullets: ['Promesses de délai irréalistes', 'Absence de précision sur les surcoûts urgence', 'Zone d’intervention trop large et peu crédible']
      },
      {
        h2: 'Conseils d’adaptation',
        paragraphs: [
          'Ajoutez des plages horaires réalistes, des conditions de devis et une zone d’intervention précise. Mieux vaut une promesse limitée mais tenue.',
          'Si vous avez plusieurs services (fuite, débouchage, chauffe-eau), créez une mini FAQ dédiée par service principal.'
        ],
        links: [{ href: '/guide-faq-page-service', label: 'Guide page service' }, { href: '/tool', label: 'Créer une base FAQ plombier' }]
      }
    ]
  },
  {
    slug: '/examples/dentiste',
    title: 'Exemples FAQ dentiste: urgences, rendez-vous, remboursements',
    description: 'FAQ dentiste prêtes à adapter avec cadre de conformité éditoriale.',
    h1: 'Exemples FAQ pour dentiste: rassurer avant la prise de rendez-vous',
    intro: 'Le contexte dentaire exige clarté, pédagogie et prudence sur les promesses médicales.',
    ...meta({ type: 'example', cluster: 'health-services', intents: ['locale', 'informationnelle'] }),
    sections: [
      {
        h2: 'Questions utiles pour les patients',
        bullets: [
          'Prenez-vous les urgences dentaires ?',
          'Comment se déroule une première consultation ?',
          'Quels soins sont remboursés ?',
          'Quels documents apporter ?'
        ]
      },
      {
        h2: 'Points de vigilance',
        bullets: [
          'Ne pas formuler de promesse médicale absolue',
          'Rester précis sur l’organisation du cabinet',
          'Donner des informations administratives claires'
        ]
      },
      {
        h2: 'Variantes à tester',
        paragraphs: [
          'Créez une variante FAQ “première visite” et une variante “urgence” selon les pages ciblées. Cette segmentation améliore la pertinence pour la longue traîne.',
          'Gardez une version centrale à jour pour éviter des contradictions entre pages.'
        ],
        links: [{ href: '/guide-adapter-faq-search-intent', label: 'Adapter à l’intention de recherche' }, { href: '/tool', label: 'Générer une base FAQ dentiste' }]
      }
    ]
  },
  {
    slug: '/examples/avocat',
    title: 'Exemples FAQ avocat: honoraires, rendez-vous, dossier',
    description: 'Exemples FAQ pour cabinet d’avocat orientés clarté et crédibilité.',
    h1: 'Exemples FAQ avocat: clarifier le cadre avant premier contact',
    intro: 'Une FAQ juridique doit rester claire, prudente et orientée information pratique.',
    ...meta({ type: 'example', cluster: 'professional-services', intents: ['semi-transactionnelle', 'informationnelle'] }),
    sections: [
      {
        h2: 'Questions clés',
        bullets: ['Comment se déroule le premier rendez-vous ?', 'Quels sont vos honoraires ?', 'Proposez-vous un forfait ?', 'Quels documents apporter ?']
      },
      {
        h2: 'Erreurs à éviter',
        bullets: ['Promettre un résultat', 'Réponses trop vagues sur les honoraires', 'Absence d’explication sur le déroulé du dossier']
      },
      {
        h2: 'Conseils pratiques',
        paragraphs: [
          'Précisez le périmètre d’intervention (droit du travail, famille, immobilier…) dans les réponses pour éviter les demandes hors champ.',
          'Ajoutez une FAQ complémentaire par spécialité si votre site cible plusieurs segments.'
        ],
        links: [{ href: '/guide-faq-utile-vs-artificielle', label: 'Évaluer la qualité FAQ' }, { href: '/tool', label: 'Créer une FAQ avocat' }]
      }
    ]
  },
  {
    slug: '/examples/agence-seo',
    title: 'Exemples FAQ agence SEO: délais, KPI, méthode',
    description: 'FAQ pour agence SEO avec focus crédibilité commerciale.',
    h1: 'Exemples FAQ pour agence SEO: structurer la confiance',
    intro: 'Pour une agence SEO, la FAQ doit cadrer attentes, méthode et indicateurs.',
    ...meta({ type: 'example', cluster: 'marketing-services', intents: ['semi-transactionnelle', 'comparative'] }),
    sections: [
      {
        h2: 'Questions qui convertissent le mieux',
        bullets: ['En combien de temps voir des résultats ?', 'Quels KPI suivez-vous ?', 'Travaillez-vous le SEO local ?', 'Comment se déroule l’onboarding ?']
      },
      {
        h2: 'Erreurs fréquentes des pages agence',
        bullets: ['Promesses de position garantie', 'Jargon sans pédagogie', 'Absence de processus concret', 'Manque de transparence sur le reporting']
      },
      {
        h2: 'Variantes recommandées',
        paragraphs: [
          'Créez une FAQ “PME locale” et une FAQ “e-commerce” pour répondre à des objections différentes.',
          'Reliez chaque FAQ à un exemple de livrable pour matérialiser votre approche.'
        ],
        links: [{ href: '/faq-seo', label: 'Pilier FAQ SEO' }, { href: '/tool', label: 'Générer une FAQ agence SEO' }]
      }
    ]
  },
  {
    slug: '/examples/coach',
    title: 'Exemples FAQ coach: formats, objectifs, suivi',
    description: 'Exemples FAQ pour coachs avec angle confiance et clarté.',
    h1: 'Exemples FAQ coach: rassurer et qualifier les prospects',
    intro: 'Une FAQ coach efficace filtre les demandes et clarifie les modalités d’accompagnement.',
    ...meta({ type: 'example', cluster: 'professional-services', intents: ['semi-transactionnelle', 'informationnelle'] }),
    sections: [
      {
        h2: 'Questions utiles',
        bullets: ['Proposez-vous des séances en ligne ?', 'Quelle fréquence recommandez-vous ?', 'Comment définissez-vous les objectifs ?', 'Quels résultats attendre au début ?']
      },
      {
        h2: 'Conseils d’adaptation',
        paragraphs: [
          'Distinguez coaching individuel, groupe et programme intensif dans vos réponses. La clarté du format augmente la qualité des prises de contact.',
          'Précisez les limites de l’accompagnement pour éviter les attentes irréalistes.'
        ]
      },
      {
        h2: 'Liens utiles',
        links: [{ href: '/guide-faq-page-service', label: 'Guide FAQ page service' }, { href: '/tool', label: 'Générer une FAQ coach' }]
      }
    ]
  },
  {
    slug: '/examples/entreprise-locale',
    title: 'Exemples FAQ entreprise locale: zone, délais, tarifs',
    description: 'Base FAQ longue traîne pour entreprises locales multi-services.',
    h1: 'Exemples FAQ pour entreprise locale: version scalable',
    intro: 'Cette structure convient aux TPE/PME locales qui veulent standardiser leurs réponses sans perdre en précision.',
    ...meta({ type: 'example', cluster: 'local-business', intents: ['locale', 'semi-transactionnelle'] }),
    sections: [
      {
        h2: 'Structure recommandée',
        bullets: ['Zone desservie', 'Délais moyens', 'Tarification indicative', 'Modalités de rendez-vous', 'Moyens de paiement']
      },
      {
        h2: 'Erreurs fréquentes',
        bullets: ['Réponses identiques sur toutes les pages ville', 'Informations obsolètes', 'Absence de contact direct en fin de FAQ']
      },
      {
        h2: 'Comment scaler proprement',
        paragraphs: [
          'Utilisez un noyau commun de 3-4 questions, puis ajoutez 2-3 questions spécifiques par zone ou service.',
          'Mettez à jour trimestriellement les réponses sensibles (délais, zones, conditions).' 
        ],
        links: [{ href: '/faq-local-seo', label: 'Pilier FAQ local SEO' }, { href: '/tool', label: 'Créer un brouillon FAQ locale' }]
      }
    ]
  },

  {
    slug: '/examples/kinesitherapeute',
    title: 'Exemples FAQ kinésithérapeute: séances, douleur, remboursements',
    description: 'FAQ kiné orientée réassurance patient, déroulé de séance et cadre administratif.',
    h1: 'Exemples FAQ pour kinésithérapeute',
    intro: 'Une FAQ kiné utile répond aux questions pratiques avant la première séance et réduit les appels répétitifs.',
    ...meta({ type: 'example', cluster: 'health-services', intents: ['locale', 'informationnelle'] }),
    sections: [
      { h2: 'Questions prioritaires', bullets: ['Faut-il une ordonnance ?', 'Combien de séances sont nécessaires ?', 'La séance est-elle remboursée ?', 'Comment se déroule une première consultation ?'] },
      { h2: 'Erreurs à éviter', bullets: ['Promesses thérapeutiques absolues', 'Réponses vagues sur remboursement', 'Absence de cadre sur durée des séances'] },
      { h2: 'Conseil d’adaptation', paragraphs: ['Ajoutez vos spécialités (sport, dos, rééducation post-opératoire) et votre organisation locale pour améliorer la pertinence longue traîne.'], links: [{ href: '/guide-adapter-faq-search-intent', label: 'Guide intention de recherche' }, { href: '/tool', label: 'Créer une FAQ kiné' }] }
    ]
  },
  {
    slug: '/examples/osteopathe',
    title: 'Exemples FAQ ostéopathe: indications, contre-indications, rythme',
    description: 'FAQ ostéopathe pour informer clairement sur déroulé, sécurité et suivi.',
    h1: 'Exemples FAQ pour ostéopathe',
    intro: 'Une FAQ ostéo doit informer avec pédagogie et prudence, sans sur-promesse.',
    ...meta({ type: 'example', cluster: 'health-services', intents: ['informationnelle', 'locale'] }),
    sections: [
      { h2: 'Questions utiles', bullets: ['Quand consulter un ostéopathe ?', 'Combien de temps dure une séance ?', 'Y a-t-il des contre-indications ?', 'Faut-il ramener des examens ?'] },
      { h2: 'Points de vigilance', bullets: ['Éviter les formulations médicales définitives', 'Préciser le périmètre de prise en charge', 'Différencier urgence médicale vs consultation ostéo'] },
      { h2: 'Lien pratique', links: [{ href: '/faq-examples', label: 'Revenir à la bibliothèque d’exemples' }, { href: '/tool', label: 'Générer une FAQ ostéopathe' }] }
    ]
  },
  {
    slug: '/examples/electricien',
    title: 'Exemples FAQ électricien: urgence, conformité, devis',
    description: 'FAQ électricien orientée sécurité, délais et transparence de devis.',
    h1: 'Exemples FAQ pour électricien',
    intro:
      'Les visiteurs qui cherchent un électricien veulent surtout savoir si vous êtes disponible rapidement, si l’intervention est sécurisée et comment le coût est cadré. Cette page aide à structurer une FAQ réellement utile avant prise de contact.',
    ...meta({ type: 'example', cluster: 'local-business', intents: ['locale', 'semi-transactionnelle'] }),
    sections: [
      {
        h2: 'Questions recommandées sur une page électricien',
        bullets: [
          'Intervenez-vous en urgence le soir et week-end ?',
          'Réalisez-vous des mises aux normes ?',
          'Quel est votre délai moyen selon la zone ?',
          'Comment est calculé le devis (déplacement, main-d’œuvre, matériel) ?'
        ],
        callout: {
          kind: 'warning',
          title: 'Erreur fréquente',
          text: 'Promettre des délais très courts sans préciser la zone réelle d’intervention.'
        }
      },
      {
        h2: 'Tableau de formulation utile',
        table: {
          caption: 'Transformer les questions vagues en réponses exploitables.',
          headers: ['Question client', 'Objectif de la réponse', 'Réponse attendue'],
          rows: [
            ['Intervenez-vous vite ?', 'Cadrer attente délai', 'Donner un délai moyen + conditions de variation'],
            ['Combien ça coûte ?', 'Réduire flou tarifaire', 'Expliquer structure de prix (diagnostic, déplacement, pièces)'],
            ['Êtes-vous certifié ?', 'Rassurer sur la sécurité', 'Préciser qualifications et périmètre couvert']
          ]
        }
      },
      {
        h2: 'Checklist avant publication',
        checklist: [
          'Mentionner les zones exactes couvertes',
          'Distinguer urgence et rendez-vous planifié',
          'Éviter les promesses absolues de délai',
          'Ajouter un canal de contact immédiat'
        ],
        links: [
          { href: '/faq-local-seo', label: 'Pilier FAQ local SEO' },
          { href: '/faq-page-service-urgence', label: 'FAQ page service urgence' },
          { href: '/tool', label: 'Créer une FAQ électricien' }
        ]
      }
    ]
  },
  {
    slug: '/examples/couvreur',
    title: 'Exemples FAQ couvreur: fuite, diagnostic, travaux toiture',
    description: 'FAQ couvreur pour capter les requêtes urgentes et saisonnières.',
    h1: 'Exemples FAQ pour couvreur',
    intro: 'Une FAQ couvreur doit clarifier urgence, diagnostic et durabilité des travaux.',
    ...meta({ type: 'example', cluster: 'local-business', intents: ['locale', 'semi-transactionnelle'] }),
    sections: [
      { h2: 'Questions longue traîne', bullets: ['Intervenez-vous après intempéries ?', 'Proposez-vous un diagnostic toiture ?', 'Quel délai pour réparer une fuite ?', 'Y a-t-il une garantie travaux ?'] },
      { h2: 'Conseils', paragraphs: ['Mettez en avant les conditions météo, le type de toiture et le niveau d’urgence pour des réponses crédibles.'] },
      { h2: 'Liens utiles', links: [{ href: '/guide-faq-page-service', label: 'Guide FAQ page service' }, { href: '/tool', label: 'Générer une FAQ couvreur' }] }
    ]
  },
  {
    slug: '/examples/notaire',
    title: 'Exemples FAQ notaire: délais, coûts, pièces à fournir',
    description: 'FAQ notaire orientée pédagogie administrative et attentes clients.',
    h1: 'Exemples FAQ pour notaire',
    intro: 'Les clients attendent de la clarté sur les étapes et documents.',
    ...meta({ type: 'example', cluster: 'professional-services', intents: ['informationnelle', 'semi-transactionnelle'] }),
    sections: [
      { h2: 'Questions clés', bullets: ['Quels documents préparer ?', 'Combien de temps prend le dossier ?', 'Comment sont calculés les frais ?', 'Quand faut-il prendre rendez-vous ?'] },
      { h2: 'Erreur à éviter', bullets: ['Confondre frais de notaire et honoraires', 'Ne pas distinguer selon le type d’acte'] },
      { h2: 'Approfondir', links: [{ href: '/guide-faq-utile-vs-artificielle', label: 'Guide qualité FAQ' }, { href: '/tool', label: 'Créer une FAQ notaire' }] }
    ]
  },
  {
    slug: '/examples/comptable',
    title: 'Exemples FAQ comptable: missions, suivi et honoraires',
    description: 'FAQ comptable pour TPE/freelances: organisation, obligations et accompagnement.',
    h1: 'Exemples FAQ pour comptable',
    intro:
      'Pour un cabinet comptable, la FAQ doit clarifier le périmètre des missions, le rythme de suivi et les modalités d’échange. Une FAQ bien structurée augmente la qualité des leads et réduit les demandes hors périmètre.',
    ...meta({ type: 'example', cluster: 'professional-services', intents: ['informationnelle', 'semi-transactionnelle'] }),
    sections: [
      {
        h2: 'Questions qui filtrent les bons prospects',
        bullets: [
          'Accompagnez-vous auto-entrepreneurs, TPE et sociétés ?',
          'Que comprend exactement votre mission ? ',
          'À quelle fréquence faire le point ?',
          'Quels outils utilisez-vous pour collaborer ?'
        ],
        callout: {
          kind: 'info',
          title: 'Bon usage',
          text: 'Une FAQ comptable efficace évite les réponses juridiques définitives et reste centrée sur le cadre d’accompagnement.'
        }
      },
      {
        h2: 'Comparatif des réponses à fort impact',
        table: {
          headers: ['Thème', 'Réponse faible', 'Réponse robuste'],
          rows: [
            ['Honoraires', 'Cela dépend.', 'Honoraires selon volume, forme juridique et périmètre; estimation après diagnostic.'],
            ['Suivi', 'On se parle régulièrement.', 'Point mensuel/trimestriel planifié + canal prioritaire.'],
            ['Périmètre', 'On s’occupe de votre compta.', 'Préciser tenue, déclarations, pilotage, conseil et limites.']
          ]
        }
      },
      {
        h2: 'Mini checklist éditoriale',
        checklist: [
          'Distinguer clairement ce qui est inclus/exclu',
          'Préciser fréquence de suivi',
          'Ajouter délais de réponse moyens',
          'Inclure un CTA de pré-qualification'
        ],
        links: [
          { href: '/faq-page-devis', label: 'FAQ page devis' },
          { href: '/guide-faq-page-service', label: 'Guide FAQ page service' },
          { href: '/tool', label: 'Générer une FAQ comptable' }
        ]
      }
    ]
  },
  {
    slug: '/examples/agent-immobilier',
    title: 'Exemples FAQ agent immobilier: mandat, estimation, délai de vente',
    description: 'FAQ agent immobilier pour traiter les objections vendeurs/acquéreurs.',
    h1: 'Exemples FAQ pour agent immobilier',
    intro:
      'Les pages immobilières convertissent mieux quand la FAQ traite explicitement mandat, estimation, frais et délai de vente. Cette structure aide à répondre aux objections les plus fréquentes sans discours flou.',
    ...meta({ type: 'example', cluster: 'professional-services', intents: ['comparative', 'semi-transactionnelle'] }),
    sections: [
      {
        h2: 'Questions prioritaires vendeur / acquéreur',
        bullets: [
          'Quelle différence entre mandat simple et exclusif ?',
          'Comment se déroule une estimation ?',
          'Quels frais prévoir réellement ?',
          'Quel délai moyen selon le type de bien ?'
        ]
      },
      {
        h2: 'Tableau de clarification mandat',
        table: {
          headers: ['Sujet', 'Ce qu’il faut expliquer', 'Erreur à éviter'],
          rows: [
            ['Mandat simple', 'Souplesse mais coordination moins forte', 'Le présenter comme systématiquement meilleur'],
            ['Mandat exclusif', 'Pilotage unifié et stratégie plus lisible', 'Promettre une vente rapide sans conditions'],
            ['Frais', 'Qui paie quoi et à quel moment', 'Masquer les conditions de facturation']
          ]
        }
      },
      {
        h2: 'Checklist de crédibilité',
        checklist: [
          'Segmenter les réponses vendeur vs acquéreur',
          'Cadrer les délais avec des variables (prix, zone, état du bien)',
          'Expliquer les étapes de mandat',
          'Ajouter un lien vers prise de contact'
        ],
        callout: {
          kind: 'warning',
          title: 'Attention',
          text: 'Les promesses de délai trop agressives font baisser la confiance et génèrent des leads déceptifs.'
        },
        links: [
          { href: '/faq-reduire-objections-prix', label: 'FAQ objections prix' },
          { href: '/guide-adapter-faq-search-intent', label: 'Guide intention de recherche' },
          { href: '/tool', label: 'Créer une FAQ agent immobilier' }
        ]
      }
    ]
  },
  {
    slug: '/examples/paysagiste',
    title: 'Exemples FAQ paysagiste: entretien, création, budget',
    description: 'FAQ paysagiste pour projets saisonniers et prestations récurrentes.',
    h1: 'Exemples FAQ pour paysagiste',
    intro: 'Une FAQ paysagiste doit clarifier saisonnalité, périmètre de chantier et suivi.',
    ...meta({ type: 'example', cluster: 'local-business', intents: ['locale', 'semi-transactionnelle'] }),
    sections: [
      { h2: 'Questions utiles', bullets: ['Intervenez-vous toute l’année ?', 'Faites-vous création + entretien ?', 'Quel budget prévoir ?', 'Combien de temps dure un chantier ?'] },
      { h2: 'Conseils pratiques', paragraphs: ['Distinguez projet ponctuel et contrat d’entretien pour mieux qualifier les prospects.'] },
      { h2: 'Liens', links: [{ href: '/faq-local-seo', label: 'FAQ local SEO' }, { href: '/tool', label: 'Générer une FAQ paysagiste' }] }
    ]
  },

  {
    slug: '/faq-page-devis',
    title: 'FAQ pour page devis: clarifier prix, périmètre et délais',
    description: 'Construire une FAQ orientée demande de devis avec objections réelles.',
    h1: 'FAQ pour page devis: réduire les abandons',
    intro:
      'La page devis est un point critique de conversion: si le visiteur ne comprend pas ce qu’il va obtenir, il quitte. Une FAQ dédiée doit cadrer le processus, le délai de réponse et la logique tarifaire.',
    ...meta({ type: 'guide', cluster: 'page-usage', intents: ['semi-transactionnelle', 'conversion'] }),
    sections: [
      {
        h2: 'Questions indispensables',
        bullets: [
          'Le devis est-il gratuit ?',
          'Quel délai de réponse ?',
          'Quelles informations fournir pour une estimation fiable ?',
          'Le prix est-il ferme ou ajustable ?'
        ]
      },
      {
        h2: 'Tableau devis: à faire vs à éviter',
        table: {
          headers: ['Élément', 'À faire', 'À éviter'],
          rows: [
            ['Délai', 'Donner une fourchette réaliste', 'Promettre une réponse immédiate sans capacité'],
            ['Tarif', 'Expliquer ce qui influence le prix', 'Réponses floues de type “cela dépend”'],
            ['Périmètre', 'Lister inclus/exclus', 'Laisser ambigu les limites de prestation']
          ]
        }
      },
      {
        h2: 'Checklist actionnable',
        checklist: [
          'Réponse au devis en moins de X heures clairement annoncée',
          'Formulaire avec champs minimaux mais utiles',
          'FAQ placée juste avant ou après le formulaire',
          'CTA secondaire pour contact direct si urgence'
        ],
        callout: {
          kind: 'success',
          title: 'À retenir',
          text: 'Une FAQ devis bien faite améliore à la fois le taux de conversion et la qualité des demandes reçues.'
        },
        links: [
          { href: '/faq-page-contact', label: 'FAQ page contact' },
          { href: '/guide-faq-page-service', label: 'Guide FAQ page service' },
          { href: '/tool', label: 'Générer une FAQ page devis' }
        ]
      }
    ]
  },
  {
    slug: '/faq-page-contact',
    title: 'FAQ pour page contact: rassurer et orienter la prise de contact',
    description: 'FAQ dédiée page contact pour réduire les hésitations avant message/appel.',
    h1: 'FAQ pour page contact: réponses courtes, impact direct',
    intro:
      'La page contact concentre les derniers doutes. Une FAQ brève mais précise peut réduire les hésitations et orienter vers le bon canal de contact.',
    ...meta({ type: 'guide', cluster: 'page-usage', intents: ['conversion', 'semi-transactionnelle'] }),
    sections: [
      {
        h2: 'Questions clés à couvrir',
        bullets: [
          'Sous quel délai répondez-vous ?',
          'Quel canal privilégier selon la demande ?',
          'Faut-il préparer des documents avant contact ?',
          'Intervenez-vous dans ma zone ?'
        ]
      },
      {
        h2: 'Comparatif canaux de contact',
        table: {
          headers: ['Canal', 'Usage recommandé', 'Délai cible affiché'],
          rows: [
            ['Téléphone', 'Urgence / besoin immédiat', 'Dans la journée'],
            ['Formulaire', 'Demande structurée', '24-48h'],
            ['Email direct', 'Demande détaillée + pièces jointes', '24-72h']
          ]
        }
      },
      {
        h2: 'Checklist anti-friction',
        checklist: [
          'Afficher un délai de réponse clair',
          'Ajouter un message pour urgences',
          'Limiter le formulaire aux champs essentiels',
          'Placer une FAQ courte près du CTA contact'
        ],
        callout: {
          kind: 'info',
          title: 'Bon usage',
          text: 'La FAQ contact doit rester courte: 4 à 6 questions maximum.'
        },
        links: [
          { href: '/faq-rassurer-avant-rdv', label: 'FAQ pour rassurer avant RDV' },
          { href: '/faq-page-service-urgence', label: 'FAQ urgence' },
          { href: '/tool', label: 'Créer une FAQ page contact' }
        ]
      }
    ]
  },
  {
    slug: '/faq-landing-page-locale',
    title: 'FAQ pour landing page locale: structure et bonnes questions',
    description: 'FAQ locale pour landing pages ville/quartier orientées conversion.',
    h1: 'FAQ pour landing page locale',
    intro: 'Sur une landing locale, la FAQ doit répondre aux contraintes géographiques réelles.',
    ...meta({ type: 'guide', cluster: 'local-seo', intents: ['locale', 'conversion'] }),
    sections: [
      { h2: 'Questions locales à prioriser', bullets: ['Zone précise desservie', 'Temps d’intervention moyen', 'Disponibilité week-end', 'Modalités de devis local'] },
      { h2: 'Erreur fréquente', paragraphs: ['Dupliquer la même FAQ sur toutes les villes sans adaptation locale nuit à la crédibilité.'] },
      { h2: 'Ressources liées', links: [{ href: '/faq-local-seo', label: 'Pilier local SEO' }, { href: '/checklist-faq-schema-anti-duplication-villes', label: 'Checklist anti-duplication' }] }
    ]
  },
  {
    slug: '/faq-page-service-urgence',
    title: 'FAQ pour page service urgence: délai, coût, disponibilité',
    description: 'FAQ orientée urgence pour services critiques (plomberie, électricité, serrurerie...).',
    h1: 'FAQ pour page service urgence',
    intro:
      'Sur une page urgence, la FAQ doit répondre en quelques secondes aux questions de disponibilité, délai réel et coût d’intervention. La transparence est la clé pour éviter les appels non qualifiés.',
    ...meta({ type: 'guide', cluster: 'page-usage', intents: ['urgence', 'conversion'] }),
    sections: [
      {
        h2: 'Questions de décision immédiate',
        bullets: [
          'Intervention 24/7 ?',
          'Délai moyen réel selon quartier/ville ?',
          'Tarif majoré la nuit / dimanche ?',
          'Zone couverte en urgence ?'
        ],
        callout: {
          kind: 'warning',
          title: 'Erreur fréquente',
          text: 'Annoncer “intervention immédiate” sans préciser conditions de charge et localisation.'
        }
      },
      {
        h2: 'Tableau délai/prix: formulation recommandée',
        table: {
          headers: ['Point sensible', 'Réponse recommandée', 'Pourquoi'],
          rows: [
            ['Délai', 'Fourchette réaliste + facteurs de variation', 'Réduit déception et appels agressifs'],
            ['Majoration', 'Règle simple nuit/week-end', 'Renforce confiance'],
            ['Zone', 'Liste claire des secteurs couverts', 'Améliore qualification des leads']
          ]
        }
      },
      {
        h2: 'Checklist publication',
        checklist: [
          'Préciser les horaires effectifs d’astreinte',
          'Rendre visible la politique de majoration',
          'Ajouter un numéro/contact prioritaire',
          'Lier à une FAQ locale si multi-zones'
        ],
        links: [
          { href: '/examples/electricien', label: 'Exemple FAQ électricien' },
          { href: '/faq-local-seo', label: 'Pilier local SEO' },
          { href: '/tool', label: 'Générer FAQ urgence' }
        ]
      }
    ]
  },
  {
    slug: '/faq-page-prestation-premium',
    title: 'FAQ pour page prestation premium: valeur, preuves et process',
    description: 'FAQ premium pour justifier un positionnement prix élevé avec crédibilité.',
    h1: 'FAQ pour page prestation premium',
    intro: 'Une FAQ premium doit expliquer la valeur créée, pas seulement le tarif.',
    ...meta({ type: 'guide', cluster: 'page-usage', intents: ['semi-transactionnelle', 'comparative'] }),
    sections: [
      { h2: 'Questions à traiter', bullets: ['Pourquoi cette offre est plus chère ?', 'Quel niveau d’accompagnement ?', 'Quels livrables précis ?', 'Quels résultats attendre ?'] },
      { h2: 'Erreur fréquente', paragraphs: ['Se limiter à des promesses vagues sans démontrer méthode et périmètre.'] },
      { h2: 'Approfondir', links: [{ href: '/faq-reduire-objections-prix', label: 'Traiter objections prix' }, { href: '/tool', label: 'Créer FAQ prestation premium' }] }
    ]
  },

  {
    slug: '/faq-rassurer-avant-rdv',
    title: 'FAQ pour rassurer avant prise de rendez-vous',
    description: 'FAQ orientée réassurance pour augmenter la prise de rendez-vous.',
    h1: 'FAQ pour rassurer avant prise de rendez-vous',
    intro: 'Cette FAQ cible les doutes émotionnels et pratiques juste avant la réservation.',
    ...meta({ type: 'guide', cluster: 'conversion-intent', intents: ['conversion', 'informationnelle'] }),
    sections: [
      { h2: 'Questions de réassurance', bullets: ['Comment se passe le premier rendez-vous ?', 'Combien de temps dure-t-il ?', 'Y a-t-il un engagement ?', 'Quel est le délai pour obtenir un créneau ?'] },
      { h2: 'Astuce conversion', paragraphs: ['Ajoutez une réponse claire sur ce qui se passe après le premier contact pour réduire l’incertitude.'] },
      { h2: 'Liens', links: [{ href: '/faq-page-contact', label: 'FAQ page contact' }, { href: '/tool', label: 'Générer FAQ réassurance' }] }
    ]
  },
  {
    slug: '/faq-reduire-objections-prix',
    title: 'FAQ pour réduire les objections prix sans dévaloriser l’offre',
    description: 'FAQ de conversion pour répondre aux objections budgétaires avec pédagogie.',
    h1: 'FAQ pour réduire les objections prix',
    intro:
      'L’objectif n’est pas de défendre un prix à tout prix, mais d’expliquer la valeur, le périmètre et les conditions. Une FAQ bien calibrée réduit les frictions sans dégrader le positionnement.',
    ...meta({ type: 'guide', cluster: 'conversion-intent', intents: ['conversion', 'comparative'] }),
    sections: [
      {
        h2: 'Objections les plus fréquentes',
        bullets: [
          'Pourquoi ce tarif est-il plus élevé que d’autres ?',
          'Existe-t-il des options plus légères ?',
          'Que comprend précisément l’offre ?',
          'Y a-t-il des frais cachés ?'
        ]
      },
      {
        h2: 'Tableau objection -> réponse attendue',
        table: {
          headers: ['Objection', 'Réponse faible', 'Réponse forte'],
          rows: [
            ['C’est trop cher', 'Nos prix sont justifiés.', 'Expliquer périmètre, niveau de service et risques évités.'],
            ['Je veux moins cher', 'On peut faire un geste.', 'Proposer une option allégée clairement délimitée.'],
            ['Je ne comprends pas le prix', 'C’est notre grille.', 'Détailler postes inclus/exclus et livrables.']
          ]
        }
      },
      {
        h2: 'Checklist anti-dévalorisation',
        checklist: [
          'Ne jamais répondre de façon défensive',
          'Toujours relier prix et périmètre',
          'Proposer des alternatives cadrées',
          'Conserver un ton pédagogique'
        ],
        callout: {
          kind: 'success',
          title: 'À retenir',
          text: 'Une FAQ prix efficace augmente la conversion sur les prospects réellement qualifiés, pas sur tous les visiteurs.'
        },
        links: [
          { href: '/faq-page-prestation-premium', label: 'FAQ prestation premium' },
          { href: '/faq-page-devis', label: 'FAQ page devis' },
          { href: '/tool', label: 'Générer FAQ anti-objection prix' }
        ]
      }
    ]
  },
  {
    slug: '/faq-ameliorer-page-service-locale',
    title: 'FAQ pour améliorer une page service locale',
    description: 'Checklist FAQ pour renforcer pertinence locale et expérience utilisateur.',
    h1: 'Améliorer une page service locale avec une FAQ ciblée',
    intro: 'Une FAQ locale pertinente augmente la compréhension, la confiance et la conversion.',
    ...meta({ type: 'guide', cluster: 'local-seo', intents: ['locale', 'pratique'] }),
    sections: [
      { h2: 'Éléments locaux clés', bullets: ['Zone d’intervention précise', 'Délais réalistes', 'Spécificités locales (stationnement, accès)', 'Canal de contact local'] },
      { h2: 'Mini checklist', bullets: ['Questions spécifiques à la ville', 'Réponses opérationnelles', 'Lien vers contact local', 'Pas de duplication brute'] },
      { h2: 'Liens', links: [{ href: '/faq-local-seo', label: 'Pilier local SEO' }, { href: '/tool', label: 'Générer FAQ locale' }] }
    ]
  },
  {
    slug: '/faq-convertir-page-seo-locale',
    title: 'FAQ pour convertir sur une page SEO locale',
    description: 'Construire une FAQ locale orientée conversion sans perdre la qualité éditoriale.',
    h1: 'Convertir sur une page SEO locale grâce à une FAQ utile',
    intro: 'La conversion locale vient d’une FAQ qui anticipe les objections logistiques et tarifaires.',
    ...meta({ type: 'guide', cluster: 'conversion-intent', intents: ['locale', 'conversion'] }),
    sections: [
      { h2: 'Questions conversion locale', bullets: ['Intervenez-vous dans mon quartier ?', 'Quel délai réel ?', 'Quel budget moyen ?', 'Comment confirmer le rendez-vous ?'] },
      { h2: 'Structure recommandée', paragraphs: ['Placez la FAQ après la preuve de service (avis, cas client) puis avant le CTA contact/devis.'] },
      { h2: 'Liens utiles', links: [{ href: '/faq-landing-page-locale', label: 'FAQ landing page locale' }, { href: '/tool', label: 'Créer FAQ conversion locale' }] }
    ]
  },

  {
    slug: '/json-ld-page-service-locale',
    title: 'Exemple JSON-LD pour page service locale',
    description: 'Modèle FAQPage JSON-LD adapté aux pages services géolocalisées.',
    h1: 'Exemple JSON-LD pour page service locale',
    intro: 'Ce modèle montre comment garder une cohérence entre FAQ visible locale et balisage FAQPage.',
    ...meta({ type: 'guide', cluster: 'schema-implementation', intents: ['technique', 'locale'] }),
    sections: [
      { h2: 'Structure recommandée', paragraphs: ['Conservez des questions liées à la zone, au délai et aux modalités locales. N’ajoutez pas de questions non visibles sur la page.'] },
      { h2: 'Erreur fréquente', paragraphs: ['Dupliquer le même JSON-LD sur toutes les villes sans ajuster les réponses locales.'] },
      { h2: 'Liens', links: [{ href: '/faq-json-ld', label: 'Pilier FAQ JSON-LD' }, { href: '/tool', label: 'Générer JSON-LD local' }] }
    ]
  },
  {
    slug: '/json-ld-prestataire-freelance',
    title: 'Exemple JSON-LD pour prestataire freelance',
    description: 'Exemple FAQPage JSON-LD pour solo-freelance avec offre de service.',
    h1: 'Exemple JSON-LD pour prestataire freelance',
    intro: 'Les freelances ont besoin d’un balisage simple, clair et aligné sur une offre limitée mais précise.',
    ...meta({ type: 'guide', cluster: 'schema-implementation', intents: ['technique', 'semi-transactionnelle'] }),
    sections: [
      { h2: 'Questions à inclure', bullets: ['Délais de livraison', 'Périmètre mission', 'Modalités de collaboration', 'Révisions'] },
      { h2: 'Conseil de maintien', paragraphs: ['Conservez une FAQ compacte et mettez à jour le JSON-LD dès changement d’offre.'] },
      { h2: 'Liens', links: [{ href: '/guide-add-faq-schema-propre', label: 'Guide schema propre' }, { href: '/tool', label: 'Créer FAQ + JSON-LD freelance' }] }
    ]
  },
  {
    slug: '/checklist-faq-schema-anti-duplication-villes',
    title: 'Checklist FAQ schema: éviter la duplication entre pages villes',
    description: 'Checklist opérationnelle pour éviter les FAQ dupliquées en local SEO.',
    h1: 'Checklist anti-duplication FAQ entre pages villes',
    intro:
      'Quand un site local scale sur plusieurs villes, la duplication FAQ devient un risque SEO et éditorial majeur. Cette page donne un cadre concret pour maintenir des variantes utiles sans produire 50 pages quasi identiques.',
    ...meta({ type: 'guide', cluster: 'local-seo', intents: ['locale', 'technique'] }),
    sections: [
      {
        h2: 'Pourquoi la duplication pose problème',
        paragraphs: [
          'Des FAQ trop proches d’une ville à l’autre réduisent la valeur perçue des pages locales et compliquent la différenciation thématique.',
          'Le risque principal n’est pas seulement SEO: c’est aussi la perte de crédibilité pour l’utilisateur local qui ne retrouve aucune information spécifique.'
        ],
        callout: {
          kind: 'warning',
          title: 'Signal faible à surveiller',
          text: 'Si vos réponses restent identiques en remplaçant seulement le nom de ville, la page est probablement trop générique.'
        }
      },
      {
        h2: 'Tableau de contrôle ville par ville',
        table: {
          headers: ['Contrôle', 'Minimum recommandé', 'Exemple concret'],
          rows: [
            ['Questions spécifiques', '2 minimum par ville', 'Stationnement, délais quartier, zones d’accès'],
            ['Différences opérationnelles', '1 section locale', 'Créneaux, équipe locale, contraintes logistiques'],
            ['Mise à jour', 'Trimestrielle', 'Vérifier délais et conditions selon saison']
          ]
        }
      },
      {
        h2: 'Checklist anti-duplication',
        checklist: [
          'Au moins 2 questions propres à la ville',
          'Réponses ancrées sur des données locales réelles',
          'JSON-LD parfaitement aligné au texte visible',
          'Date de mise à jour notée par page',
          'Relecture éditoriale avant publication'
        ]
      },
      {
        h2: 'Quand utiliser / quand éviter',
        bullets: [
          'Utiliser: quand vous avez des différences locales réelles à expliquer',
          'Éviter: quand aucune donnée locale spécifique n’existe encore',
          'Prioriser d’abord les villes à plus fort volume de demandes'
        ],
        links: [
          { href: '/faq-local-seo', label: 'Pilier FAQ local' },
          { href: '/json-ld-page-service-locale', label: 'Exemple JSON-LD local' },
          { href: '/tool', label: 'Générer une base FAQ locale' }
        ]
      }
    ]
  },


  {
    slug: '/about',
    title: 'À propos du hub éditorial OperonCore',
    description: 'Vision éditoriale, méthodologie et standards qualité du projet.',
    h1: 'À propos de ce site',
    hero: {
      alt: 'Présentation du hub éditorial OperonCore et de sa méthodologie FAQ SEO'
    },
    quickFaq: [
      { q: 'Quelle est la mission du site ?', a: 'Publier des ressources FAQ utiles et maintenables sur le long terme.' },
      { q: 'Quel angle éditorial est privilégié ?', a: 'Pratique, clair et orienté mise en œuvre.' },
      { q: 'À qui s’adresse le projet ?', a: 'PME, freelances, agences et équipes éditoriales.' }
    ],
    intro: 'Ce hub est conçu comme un actif éditorial long terme, pas comme une simple démo technique.',
    ...meta({ type: 'support', cluster: 'trust', intents: ['trust'] }),
    sections: [
      {
        h2: 'Notre ligne éditoriale',
        paragraphs: [
          'Nous privilégions des contenus pratiques, orientés mise en œuvre et maintenables en contexte réel PME/freelance/agence.',
          'Chaque page est pensée pour répondre à une intention claire avec un lien logique vers des ressources complémentaires.'
        ]
      },
      {
        h2: 'Standards qualité',
        bullets: ['Contenu lisible et actionnable', 'Mise à jour régulière', 'Cohérence entre conseils et implémentation technique', 'Transparence sur les limites']
      }
    ]
  },
  {
    slug: '/contact',
    title: 'Contact OperonCore FAQ Hub',
    description: 'Contact éditorial, suggestions de sujets et partenariats.',
    h1: 'Contact éditorial',
    intro: 'Vous pouvez proposer un sujet, signaler une amélioration ou demander un partenariat de contenu.',
    ...meta({ type: 'support', cluster: 'trust', intents: ['trust'] }),
    sections: [
      { h2: 'Email principal', paragraphs: ['support@operoncore.local'] },
      { h2: 'Sujets acceptés', bullets: ['Proposition de guide', 'Demande de correction', 'Partenariat éditorial', 'Feedback outil'] }
    ]
  },
  {
    slug: '/privacy',
    title: 'Politique de confidentialité — OperonCore FAQ Hub',
    description: 'Politique de confidentialité et traitement des données.',
    h1: 'Politique de confidentialité',
    intro: 'Nous collectons uniquement ce qui est nécessaire à l’exploitation et l’amélioration du site.',
    ...meta({ type: 'support', cluster: 'trust', intents: ['trust'] }),
    sections: [
      { h2: 'Données collectées', bullets: ['Logs techniques', 'Événements analytics anonymisés', 'Emails envoyés via formulaire'] },
      { h2: 'Finalité', paragraphs: ['Mesurer la performance du contenu, améliorer l’outil et répondre aux messages entrants.'] },
      { h2: 'Conservation', paragraphs: ['Les données sont conservées de façon proportionnée à leur utilité opérationnelle.'] }
    ]
  },
  {
    slug: '/mentions',
    title: 'Mentions utiles et informations légales',
    description: 'Informations de transparence et crédibilité du site.',
    h1: 'Mentions utiles',
    intro: 'Cette page centralise les informations de transparence et d’édition.',
    ...meta({ type: 'support', cluster: 'trust', intents: ['trust'] }),
    sections: [
      { h2: 'Éditeur', paragraphs: ['OperonCore'] },
      { h2: 'Objet du site', paragraphs: ['Publication de ressources SEO éditoriales et mise à disposition d’un outil FAQ/JSON-LD.'] },
      { h2: 'Contact', paragraphs: ['support@operoncore.local'] }
    ]
  }
];

export const pageMap = new Map(pages.map((p) => [p.slug, p]));
