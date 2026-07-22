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
        fr: "Ce que je construis quand je pointe le télescope vers un jeu de données.",
        en: "What I build when I point the telescope at a dataset.",
      },
      accent: "#7db4ff",
      star: { x: 58, y: 56 },
    },
    orbit: { radius: 8, size: 0.9, speed: 0.22, tilt: 0.05, texture: "/textures/earth.jpg" },
    projects: [
      {
        slug: "classifieur-de-galaxies",
        title: { fr: "Classifieur de galaxies", en: "Galaxy classifier" },
        subtitle: {
          fr: "Trier spirales, elliptiques et irrégulières à partir d'images de relevé.",
          en: "Sorting spiral, elliptical and irregular galaxies from survey images.",
        },
        summary: {
          fr: "Réseau convolutif qui trie les galaxies par morphologie sur des images SDSS. 94 % d'exactitude.",
          en: "Convolutional network sorting galaxies by morphology on SDSS images. 94% accuracy.",
        },
        stack: ["PyTorch", "CNN", "Python", "SDSS"],
        year: "2025",
        repo: "https://github.com/moncompte/galaxy-classifier",
        data: "SDSS DR17",
        role: { fr: "Solo", en: "Solo" },
        status: { fr: "Terminé", en: "Completed" },
        problem: {
          fr: "Les grands relevés capturent des centaines de millions de galaxies. Les classer à la main ne passe pas à l'échelle, et les catalogues collaboratifs restent bruités.",
          en: "Large surveys capture hundreds of millions of galaxies. Classifying them by hand doesn't scale, and crowd-sourced catalogs stay noisy.",
        },
        approach: [
          {
            fr: "Extraction et recadrage de 60 000 imagettes étiquetées depuis Galaxy Zoo + SDSS.",
            en: "Extracted and cropped 60,000 labeled thumbnails from Galaxy Zoo + SDSS.",
          },
          {
            fr: "Augmentation de données (rotations, symétries) — une galaxie n'a pas d'orientation privilégiée.",
            en: "Data augmentation (rotations, flips) — a galaxy has no preferred orientation.",
          },
          {
            fr: "Réseau convolutif compact entraîné avec early-stopping sur la perte de validation.",
            en: "Compact convolutional network trained with early-stopping on validation loss.",
          },
          {
            fr: "Calibration des probabilités pour transformer les scores en niveau de confiance exploitable.",
            en: "Probability calibration to turn scores into usable confidence levels.",
          },
        ],
        finding: {
          value: "94%",
          caption: {
            fr: "d'exactitude sur le jeu de validation, à parité avec les votes humains agrégés sur les cas nets.",
            en: "accuracy on the validation set, on par with aggregated human votes on clear-cut cases.",
          },
        },
        metrics: [
          { label: { fr: "F1 macro", en: "Macro F1" }, value: "0.92" },
          { label: { fr: "Paramètres", en: "Parameters" }, value: "1.2 M" },
          { label: { fr: "Inférence", en: "Inference" }, value: "3 ms" },
        ],
      },
      {
        slug: "detecteur-de-transits",
        title: { fr: "Détecteur de transits", en: "Transit detector" },
        subtitle: {
          fr: "Repérer des exoplanètes candidates dans les courbes de lumière Kepler.",
          en: "Spotting candidate exoplanets in Kepler light curves.",
        },
        summary: {
          fr: "Pipeline qui détecte les baisses de luminosité périodiques signalant une exoplanète.",
          en: "Pipeline detecting the periodic brightness dips that signal an exoplanet.",
        },
        stack: ["NumPy", "pandas", "scikit-learn", "astropy"],
        year: "2025",
        repo: "https://github.com/moncompte/transit-detector",
        data: "Kepler",
        role: { fr: "Solo", en: "Solo" },
        status: { fr: "Terminé", en: "Completed" },
        problem: {
          fr: "// À compléter : le problème que ce projet résout.",
          en: "// TODO: the problem this project solves.",
        },
        approach: [
          { fr: "// Étape 1", en: "// Step 1" },
          { fr: "// Étape 2", en: "// Step 2" },
        ],
      },
      {
        slug: "orbitfolio",
        title: { fr: "OrbitFolio — ce portfolio", en: "OrbitFolio — this portfolio" },
        subtitle: {
          fr: "Un système solaire interactif modélisé dans le navigateur.",
          en: "An interactive solar system modeled in the browser.",
        },
        summary: {
          fr: "Système solaire interactif ; cette page en est la version mobile.",
          en: "Interactive solar system; this page is its mobile version.",
        },
        stack: ["Next.js", "React Three Fiber", "TypeScript"],
        year: "2026",
        href: "https://mon-domaine.dev",
        repo: "https://github.com/moncompte/orbitfolio",
        role: { fr: "Solo", en: "Solo" },
        status: { fr: "En cours", en: "Ongoing" },
        problem: { fr: "// À compléter.", en: "// TODO." },
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
        href: "https://github.com/moncompte",
        value: { fr: "@moncompte", en: "@moncompte" },
      },
      {
        label: { fr: "LinkedIn", en: "LinkedIn" },
        href: "https://linkedin.com/in/moncompte",
        value: { fr: "/in/moncompte", en: "/in/moncompte" },
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