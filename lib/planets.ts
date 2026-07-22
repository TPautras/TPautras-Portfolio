// lib/planets.ts
// -----------------------------------------------------------------------------
// SOURCE DE VÉRITÉ UNIQUE du portfolio — bilingue FR / EN.
//
// Tout texte lisible par un humain est un objet { fr, en } (type L).
// Les champs neutres (couleurs, orbites, slugs, URLs, noms de technos, années)
// restent des chaînes simples.
//
// Pour lire un champ dans un composant : t(champ, locale) → renvoie fr ou en.
// Les composants reçoivent `locale` depuis le segment de route [locale].
//
// Remplace les contenus d'exemple par les tiens ; garde la structure.
// -----------------------------------------------------------------------------

// ---- i18n ------------------------------------------------------------------

export type Locale = "fr" | "en";
export const LOCALES: Locale[] = ["fr", "en"];
export const DEFAULT_LOCALE: Locale = "fr";

/** Localized : une valeur par langue. */
export type L<T = string> = Record<Locale, T>;

/** Lit une valeur localisée. */
export const t = <T>(value: L<T>, locale: Locale): T => value[locale];

// ---- Types -----------------------------------------------------------------

export type Skill = { label: string; level?: number }; // label = nom de techno (non traduit)
export type SkillGroup = { group: L; items: Skill[] };

export type Metric = { label: L; value: string };

export type Project = {
  slug: string; // /projets/[slug] — neutre, langue-agnostique
  title: L;
  summary: L; // description courte (carte)
  stack: string[]; // technos, non traduites
  year?: string;
  href?: string; // démo
  repo?: string; // code
  // --- champs de la fiche dédiée ---
  subtitle?: L;
  data?: string; // ex "SDSS DR17" (neutre)
  role?: L; // ex "Solo" / "En équipe"
  status?: L; // ex "Terminé" / "Ongoing"
  problem?: L;
  approach?: L[]; // étapes
  finding?: { value: string; caption: L }; // résultat marquant
  metrics?: Metric[];
};

export type Experience = {
  role: L;
  org: string; // nom d'entreprise, non traduit
  period: L; // contient des mois → traduit
  description: L;
};

export type Education = {
  degree: L;
  school: string; // nom de l'école, non traduit
  period: L;
  detail?: L; // cours pertinents, mention…
  location?: string;
};

export type LinkItem = { label: L; href: string; value?: L };

// Ce qui décrit la planète DANS la scène 3D
export type OrbitConfig = {
  radius: number;
  size: number;
  speed: number;
  tilt?: number;
  texture: string;
  ring?: boolean;
};

// Ce qui s'affiche (nav, carte, overlay, constellation)
export type SectionContent = {
  id: string; // ancre + route
  label: L; // nom court (navbar + label planète)
  designation?: string; // ex "Survey-01" (neutre, optionnel)
  icon: string;
  headline: L;
  summary: L;
  accent: string; // couleur d'accent, réutilisée en 3D et en carte
  star: { x: number; y: number }; // position dans le viewBox 320×210 de la constellation
};

export type Planet = {
  content: SectionContent;
  orbit: OrbitConfig;
  body?: L;
  projects?: Project[];
  experiences?: Experience[];
  education?: Education[];
  skills?: SkillGroup[];
  links?: LinkItem[];
};

// ---- Le soleil = ton identité ----------------------------------------------

export const SUN = {
  name: "Thomas Pautras", // non traduit
  accent: "#ffc861",
  location: "Île-de-France, France",
  readout: "α 18ʰ36ᵐ · δ +38°47′ · type A0 · mag 0.03", // neutre
  title: {
    fr: "Étudiant ingénieur — Data & Intelligence Artificielle",
    en: "Engineering student — Data & Artificial Intelligence",
  } satisfies L,
  tagline: {
    fr: "Je cherche des structures dans le bruit — dans le ciel comme dans les données.",
    en: "I look for structure in the noise — in the sky as in the data.",
  } satisfies L,
  about: {
    fr: "Passionné de données et d'astronomie, je passe de l'entraînement d'un réseau de neurones au nettoyage d'un jeu de deux millions de lignes. Je cherche un stage de fin d'études en data science ou en machine learning.",
    en: "Data and astronomy enthusiast, I move from training a neural network to cleaning a two-million-row dataset. I'm looking for a final-year internship in data science or machine learning.",
  } satisfies L,
};

// ---- Les 5 planètes = les sections -----------------------------------------

export const PLANETS: Planet[] = [
  // 1 — PROJETS -------------------------------------------------------------
  {
    content: {
      id: "projets",
      label: { fr: "Projets", en: "Projects" },
      designation: "Survey-01",
      icon: "tools",
      headline: { fr: "Projets", en: "Projects" },
      summary: {
        fr: "Mes projets principaux, construits sur mon temps libre ou lors de mes etudes.",
        en: "My best projects, built during my free time, or during my studies.",
      },
      accent: "#7db4ff",
      star: { x: 58, y: 56 },
    },
    orbit: { radius: 8, size: 0.9, speed: 0.22, tilt: 0.05, texture: "/textures/earth.jpg" },
    projects: [
      {
        slug: "traducteur-lsf",
        title: {
          fr: "Traducteur de langue des signes",
          en: "Sign language translator",
        },
        subtitle: {
          fr: "Traduire la langue des signes française en direct, depuis la webcam.",
          en: "Translating French sign language live, from the webcam.",
        },
        summary: {
          fr: "Traducteur temps réel de langue des signes : MediaPipe extrait les points de la main, un modèle les classe, et le front React affiche la traduction image par image.",
          en: "Real-time sign language translator: MediaPipe extracts hand landmarks, a model classifies them, and the React front shows the translation frame by frame.",
        },
        stack: ["MediaPipe", "Python", "React"],
        problem: {
          fr: "Communiquer avec les personnes sourdes ou malentendantes reste difficile sans interprète ; les outils temps réel accessibles depuis un simple navigateur manquent.",
          en: "Communicating with deaf or hard-of-hearing people stays hard without an interpreter; real-time tools accessible from a plain browser are scarce.",
        },
        approach: [
          {
            fr: "Capture webcam et extraction des points de la main et du corps avec MediaPipe.",
            en: "Webcam capture and hand/body landmark extraction with MediaPipe.",
          },
          {
            fr: "Classification des signes par un modèle entraîné sur des séquences de points.",
            en: "Sign classification with a model trained on landmark sequences.",
          },
          {
            fr: "Front React qui affiche la traduction en direct.",
            en: "React front rendering the translation live.",
          },
        ],
      },
      {
        slug: "pharmatrack",
        title: { fr: "PharmaTrack", en: "PharmaTrack" },
        subtitle: {
          fr: "Prédire l'effet et les effets secondaires d'un médicament, patient par patient.",
          en: "Predicting a drug's effect and side effects, patient by patient.",
        },
        summary: {
          fr: "Application web qui personnalise la pharmacocinétique par apprentissage automatique : à partir du profil, des ressentis et de signaux de wearables, elle prédit quand un médicament agit et quand ses effets s'estompent.",
          en: "Web app personalizing pharmacokinetics with machine learning: from profile, feedback and wearable signals, it predicts when a drug kicks in and when its effects fade.",
        },
        stack: ["Python", "Machine Learning", "TypeScript", "React"],
        year: "2025",
        repo: "https://github.com/TPautras/Software-Engineering-Hanyang",
        href: "https://youtu.be/b3dNrxpm3H8",
        role: { fr: "En équipe", en: "Team" },
        status: { fr: "Terminé", en: "Completed" },
        problem: {
          fr: "Les modèles pharmacocinétiques standards visent un patient « moyen » et capturent mal la variabilité entre individus.",
          en: "Standard pharmacokinetic models target an \"average\" patient and poorly capture inter-individual variability.",
        },
        approach: [
          {
            fr: "Intégration de quatre sources : données PK classiques, profil biométrique, ressentis subjectifs et signaux de capteurs portés.",
            en: "Integrated four sources: classic PK data, biometric profile, subjective feedback and wearable bio-signals.",
          },
          {
            fr: "Modèle d'apprentissage produisant des prédictions temporelles de l'efficacité et des effets indésirables.",
            en: "Learning model producing time-series predictions of efficacy and adverse effects.",
          },
          {
            fr: "Interface web pour visualiser les fenêtres thérapeutiques et planifier sa journée.",
            en: "Web interface to visualize therapeutic windows and plan one's day.",
          },
        ],
      },
      {
        slug: "remodelun",
        title: { fr: "RemodelUN", en: "RemodelUN" },
        subtitle: {
          fr: "Préparer un Model United Nations avec une équipe d'agents IA.",
          en: "Preparing a Model United Nations with a team of AI agents.",
        },
        summary: {
          fr: "Pipeline multi-agents (CrewAI) qui automatise la préparation d'un MUN : recherche de documents, génération d'une fiche de synthèse et résumé de la position officielle d'un pays.",
          en: "Multi-agent pipeline (CrewAI) automating MUN prep: document research, cheat-sheet generation and a summary of a country's official position.",
        },
        stack: ["Python", "CrewAI", "LLM"],
        year: "2025",
        repo: "https://github.com/TPautras/RemodelUN",
        role: { fr: "Solo", en: "Solo" },
        problem: {
          fr: "Préparer un MUN demande de longues heures de recherche documentaire et de synthèse manuelle.",
          en: "Preparing for a MUN takes long hours of document research and manual synthesis.",
        },
        approach: [
          {
            fr: "Agents IA spécialisés orchestrés avec CrewAI, chacun avec un rôle (recherche, synthèse, position).",
            en: "Specialized AI agents orchestrated with CrewAI, each with a role (research, synthesis, position).",
          },
          {
            fr: "Outil de recherche web personnalisé pour collecter des sources fiables.",
            en: "Custom web-research tool to gather reliable sources.",
          },
          {
            fr: "Génération d'une cheat sheet structurée et d'un résumé de la position du pays.",
            en: "Generation of a structured cheat sheet and a country-position summary.",
          },
        ],
      },
      {
        slug: "livin-paris",
        title: { fr: "Livin'Paris", en: "Livin'Paris" },
        subtitle: {
          fr: "Une appli de livraison de repas, du schéma de base de données aux graphes du métro.",
          en: "A food-delivery app, from the database schema to the metro graphs.",
        },
        summary: {
          fr: "Application type UberEats en C#/.NET : conception d'une base de données relationnelle, requêtes SQL, et calcul d'itinéraires dans le métro parisien par algorithmes de graphes.",
          en: "UberEats-style app in C#/.NET: relational database design, SQL queries, and Paris-metro routing via graph algorithms.",
        },
        stack: ["C#", ".NET", "SQL"],
        year: "2025",
        repo: "https://github.com/TPautras/Livin-Paris2",
        role: { fr: "En équipe", en: "Team" },
        status: { fr: "Terminé", en: "Completed" },
        problem: {
          fr: "Relier clients, restaurants et livreurs tout en calculant le trajet le plus court dans le réseau du métro.",
          en: "Connecting customers, restaurants and couriers while computing the shortest path across the metro network.",
        },
        approach: [
          {
            fr: "Modélisation et peuplement d'une base de données relationnelle avec requêtes SQL.",
            en: "Modeled and populated a relational database with SQL queries.",
          },
          {
            fr: "Bibliothèque de graphes maison pour représenter le métro et calculer les plus courts chemins.",
            en: "In-house graph library to represent the metro and compute shortest paths.",
          },
          {
            fr: "Application C#/.NET reliant commandes, utilisateurs et livraisons.",
            en: "C#/.NET app tying together orders, users and deliveries.",
          },
        ],
      },
      {
        slug: "orbitfolio",
        title: { fr: "OrbitFolio: ce portfolio", en: "OrbitFolio: this portfolio" },
        subtitle: {
          fr: "Un système solaire interactif modélisé dans le navigateur.",
          en: "An interactive solar system modeled in the browser.",
        },
        summary: {
          fr: "Système solaire interactif construit avec React Three Fiber ; cette page en est la version mobile, bilingue avec next-intl.",
          en: "Interactive solar system built with React Three Fiber; this page is its mobile, next-intl-powered bilingual version.",
        },
        stack: ["Next.js", "React Three Fiber", "TypeScript", "next-intl"],
        year: "2026",
        href: "https://tpautras.fr",
        repo: "https://github.com/TPautras/TPautras-Portfolio",
        role: { fr: "Solo", en: "Solo" },
        status: { fr: "En cours", en: "Ongoing" },
      },
      {
        slug: "dotfiles",
        title: { fr: "Ma configuration NixOS", en: "My NixOS configuration"},
        subtitle: {
          fr: "Une configuration linux declarative, modulaire et faite avec amour, utilisee quotidiennement",
          en: "A declarative and modular linux configuration, crafted with love and daily driven",
        },
        summary: {
          fr: "Ce projet utilise la distribution NixOS pour faire une configuration entierement customisee, afin d'etre le plus efficace possible. Elle utilise le language Nix, Hyprland, lua et d'autres languages de configuration.",
          en: "This projecct uses the NixOS ditro in order to make an entirely custom configuration, in order to be as efficient as possible. This project leverages the Nix language, as well as lua and other configuration languages"
        },
        stack: ["Nix", "lua"],
        year: "2026",
        repo: "https://github.com/TPautras/dotfiles",
        role: { fr: "Solo", en: "Solo" },
        status: { fr: "En cours", en: "Ongoing"}
      },
    ],
  },

  // 2 — EXPÉRIENCES ---------------------------------------------------------
  {
    content: {
      id: "experiences",
      label: { fr: "Expériences", en: "Experience" },
      designation: "Mission-log",
      icon: "briefcase",
      headline: { fr: "Expériences", en: "Experience" },
      summary: {
        fr: "Les missions où j'ai appris à traiter des données pour de vrai.",
        en: "The missions where I learned to handle real data.",
      },
      accent: "#ff8360",
      star: { x: 262, y: 60 },
    },
    orbit: { radius: 12, size: 1.1, speed: 0.15, tilt: 0.03, texture: "/textures/mars.jpg" },
    experiences: [
      {
        role: { fr: "Stagiaire data scientist", en: "Data science intern" },
        org: "NomEntreprise SAS",
        period: { fr: "Juin – Août 2025", en: "June – Aug 2025" },
        description: {
          fr: "Nettoyage et modélisation d'un jeu de 2 M de lignes ; mise en production d'un modèle de prévision qui a réduit l'erreur de 18 %.",
          en: "Cleaned and modeled a 2M-row dataset; shipped a forecasting model that cut error by 18%.",
        },
      },
      {
        role: { fr: "Responsable pôle IA", en: "AI team lead" },
        org: "Club data de l'école",
        period: { fr: "2024 – aujourd'hui", en: "2024 – present" },
        description: {
          fr: "Animation de sessions Kaggle, encadrement de 10 étudiants, organisation d'un hackathon interne de 48 h.",
          en: "Ran Kaggle sessions, mentored 10 students, organized a 48-hour internal hackathon.",
        },
      },
      {
        role: { fr: "Tuteur en programmation", en: "Programming tutor" },
        org: "École d'ingénieurs XYZ",
        period: { fr: "2023 – 2024", en: "2023 – 2024" },
        description: {
          fr: "Python et statistiques auprès des étudiants de 1ʳᵉ année : TP, débogage, préparation aux examens.",
          en: "Python and statistics for first-year students: labs, debugging, exam prep.",
        },
      },
    ],
  },

  // 3 — FORMATION (nouvelle) ------------------------------------------------
  {
    content: {
      id: "formation",
      label: { fr: "Formation", en: "Education" },
      designation: "Origin",
      icon: "school",
      headline: { fr: "Formation", en: "Education" },
      summary: {
        fr: "Là où j'ai appris à penser en systèmes et en probabilités.",
        en: "Where I learned to think in systems and probabilities.",
      },
      accent: "#7ecb8f",
      star: { x: 160, y: 32 },
    },
    orbit: { radius: 10, size: 0.8, speed: 0.18, tilt: 0.04, texture: "/textures/moon.jpg" },
    education: [
      {
        degree: {
          fr: "Cycle ingénieur — spécialité Data & IA",
          en: "Engineering degree — Data & AI major",
        },
        school: "École d'ingénieurs XYZ",
        period: { fr: "2022 – 2025 (attendu)", en: "2022 – 2025 (expected)" },
        location: "Paris, France",
        detail: {
          fr: "Cours clés : apprentissage automatique, statistiques bayésiennes, systèmes distribués, traitement du signal.",
          en: "Key courses: machine learning, Bayesian statistics, distributed systems, signal processing.",
        },
      },
      {
        degree: { fr: "Classes préparatoires MP", en: "MP preparatory classes" },
        school: "Lycée XYZ",
        period: { fr: "2020 – 2022", en: "2020 – 2022" },
        detail: {
          fr: "Mathématiques, physique et informatique intensives.",
          en: "Intensive mathematics, physics and computer science.",
        },
      },
    ],
  },

  // 4 — COMPÉTENCES ---------------------------------------------------------
  {
    content: {
      id: "competences",
      label: { fr: "Compétences", en: "Skills" },
      designation: "Spectre",
      icon: "brain",
      headline: { fr: "Compétences", en: "Skills" },
      summary: {
        fr: "Mon spectre : les longueurs d'onde où je brille le plus.",
        en: "My spectrum: the wavelengths where I shine brightest.",
      },
      accent: "#b98bff",
      star: { x: 74, y: 168 },
    },
    orbit: { radius: 16, size: 1.4, speed: 0.1, tilt: 0.06, texture: "/textures/jupiter.jpg", ring: true },
    skills: [
      {
        group: { fr: "Langages", en: "Languages" },
        items: [
          { label: "Python", level: 0.92 },
          { label: "SQL", level: 0.75 },
          { label: "R", level: 0.5 },
          { label: "C++", level: 0.4 },
        ],
      },
      {
        group: { fr: "IA & données", en: "AI & data" },
        items: [
          { label: "pandas / NumPy", level: 0.9 },
          { label: "scikit-learn", level: 0.85 },
          { label: "PyTorch", level: 0.8 },
          { label: "Spark", level: 0.5 },
        ],
      },
      {
        group: { fr: "Outils", en: "Tools" },
        items: [
          { label: "Git", level: 0.85 },
          { label: "Linux", level: 0.7 },
          { label: "Docker", level: 0.6 },
        ],
      },
    ],
  },

  // 5 — CONTACT -------------------------------------------------------------
  {
    content: {
      id: "contact",
      label: { fr: "Contact", en: "Contact" },
      designation: "Signal",
      icon: "mail",
      headline: { fr: "Me contacter", en: "Get in touch" },
      summary: {
        fr: "Un signal met peu de temps à me parvenir.",
        en: "A signal doesn't take long to reach me.",
      },
      accent: "#47d6c0",
      star: { x: 250, y: 170 },
    },
    orbit: { radius: 20, size: 0.7, speed: 0.07, tilt: 0.04, texture: "/textures/neptune.jpg" },
    links: [
      {
        label: { fr: "Email", en: "Email" },
        href: "mailto:tpautras@gmail.com",
        value: { fr: "tpautras@gmail.com", en: "tpautras@gmail.com" },
      },
      {
        label: { fr: "GitHub", en: "GitHub" },
        href: "https://github.com/TPautras",
        value: { fr: "@TPautras", en: "@TPautras" },
      },
      {
        label: { fr: "LinkedIn", en: "LinkedIn" },
        href: "https://www.linkedin.com/in/thomas-pautras-215a4a28b/",
        value: { fr: "in/thomas-pautras-215a4a28b/", en: "in/thomas-pautras-215a4a28b/" },
      },
      {
        label: { fr: "CV", en: "Resume" },
        href: "/cv.pdf",
        value: { fr: "télécharger .pdf", en: "download .pdf" },
      },
    ],
  },
];

// ---- Dérivés pratiques ------------------------------------------------------

/** Les sections dans l'ordre — pour la navbar, la constellation, le fallback. */
export const SECTIONS = PLANETS.map((p) => p.content);

/** Tous les projets à plat — pour la route /projets et generateStaticParams. */
export const ALL_PROJECTS = PLANETS.flatMap((p) => p.projects ?? []);

/** Retrouve un projet par son slug. */
export const getProject = (slug: string) =>
  ALL_PROJECTS.find((p) => p.slug === slug);