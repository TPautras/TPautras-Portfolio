// lib/planets.ts
// -----------------------------------------------------------------------------
// SOURCE DE VÉRITÉ UNIQUE du portfolio.
// La scène 3D, la navbar ET le fallback mobile (cartes) consomment ce seul
// fichier. Ajouter une section = ajouter un objet dans PLANETS, rien d'autre.
// Les contenus ci-dessous sont des exemples réalistes : remplace-les par les tiens.
// -----------------------------------------------------------------------------

// ---- Types -----------------------------------------------------------------

export type Skill = { label: string; level?: number }; // level 0..1 → longueur de barre

export type Project = {
  title: string;
  slug: string;
  stack: string[];
  description: string;
  problem: string;
  approach: string[];
  metrics: { label: string; value: string }[];
  finding?: { value: string; caption: string };
  href?: string; // démo / site en ligne
  repo?: string; // dépôt GitHub
  year?: string;
};

export type Experience = {
  role: string;
  org: string;
  period: string;
  description: string;
};

// Ce qui décrit la planète DANS la scène 3D
export type OrbitConfig = {
  radius: number; // distance au soleil (unités de la scène)
  size: number; // rayon de la planète
  speed: number; // vitesse angulaire (rad/s) — plus petit = plus lent
  tilt?: number; // inclinaison de l'orbite (radians)
  texture: string; // chemin dans /public, ex: /textures/earth.jpg
  ring?: boolean; // anneaux type Saturne
};

// Ce qui s'affiche (overlay 3D au clic + carte mobile)
export type SectionContent = {
  id: string; // ancre + route : /#projets ou /projets
  label: string; // nom court (navbar + label planète)
  icon: string; // nom d'icône (ex. Tabler / lucide) pour la carte mobile
  headline: string; // titre de la section
  summary: string; // 1-2 phrases (survol planète + carte)
  accent: string; // couleur d'accent (hex) réutilisée en 3D ET en carte
  star: { x: number; y: number }
};

export type Planet = {
  content: SectionContent;
  orbit: OrbitConfig;
  // Charge utile spécifique à la section (une seule des suivantes est remplie)
  body?: string;
  projects?: Project[];
  experiences?: Experience[];
  skills?: { group: string; items: Skill[] }[];
  links?: { label: string; href: string }[];
};

// ---- Le soleil = ton identité (centre de la scène) --------------------------

export const SUN = {
  name: "Prénom Nom",
  title: "Étudiant ingénieur — informatique & systèmes embarqués",
  school: "École d'ingénieurs XYZ · 2ᵉ année du cycle ingénieur",
  tagline: "Je conçois des systèmes qui tournent en boucle, comme les planètes.",
  location: "Île-de-France, France",
  accent: "#ffcc33",
  about:
    "Passionné de bas niveau et de web créatif, je passe de l'écriture d'un pilote " +
    "capteur en C au prototypage d'interfaces 3D dans le navigateur. Je cherche un " +
    "stage de fin d'études autour du logiciel embarqué ou du temps réel.",
};

// ---- Les planètes = les sections du site ------------------------------------

export const PLANETS: Planet[] = [
  {
    content: {
      id: "projets",
      label: "Projets",
      icon: "tools",
      headline: "Projets",
      summary: "Ce que je construis quand on me laisse un clavier et du temps libre.",
      accent: "#4f9dde",
      star: {
        x: 0,
        y: 0
      }
    },
    orbit: { radius: 8, size: 0.9, speed: 0.22, tilt: 0.05, texture: "/textures/earth.jpg" },
    projects: [
      {
        title: "OrbitFolio — ce portfolio",
        stack: ["Next.js", "React Three Fiber", "TypeScript", "Tailwind"],
        slug: "orbitfolio",

        description: "Landing page en système solaire interactif : orbites simulées à la main, " +
          "perturbations gravitationnelles au passage d'astéroïdes, fallback en cartes sur mobile.",
        repo: "https://github.com/moncompte/orbitfolio",
        href: "https://mon-domaine.dev",
        year: "2026",
        problem: "",
        approach: [],
        metrics: []
      },
      {
        title: "Station météo LoRa autonome",
        stack: ["C", "STM32", "FreeRTOS", "LoRaWAN"],
        description: "Capteur basse consommation alimenté par panneau solaire, transmission LoRa " +
          "toutes les 15 min, autonomie supérieure à 6 mois sur batterie.",
        repo: "https://github.com/moncompte/lora-weather",
        year: "2025",
        slug: "",
        problem: "",
        approach: [],
        metrics: []
      },
      {
        title: "Pathfinding visualizer",
        stack: ["React", "Canvas", "algorithmes"],
        description: "Outil pédagogique qui anime A*, Dijkstra et BFS sur une grille éditable, " +
          "réalisé pour un exposé en théorie des graphes.",
        repo: "https://github.com/moncompte/pathviz",
        href: "https://pathviz.mon-domaine.dev",
        year: "2025",
        slug: "",
        problem: "",
        approach: [],
        metrics: []
      },
    ],
  },
  {
    content: {
      id: "experiences",
      label: "Expériences",
      icon: "briefcase",
      headline: "Expériences",
      summary: "Stages, associatif et jobs où j'ai appris pour de vrai.",
      accent: "#e0662b",
      star: {
        x: 0,
        y: 0
      }
    },
    orbit: { radius: 12, size: 1.1, speed: 0.15, tilt: 0.03, texture: "/textures/mars.jpg" },
    experiences: [
      {
        role: "Stagiaire développeur embarqué",
        org: "NomEntreprise SAS",
        period: "Juin – Août 2025",
        description:
          "Portage d'un pilote capteur sur RTOS, réduction de 30 % de la consommation CPU. " +
          "Mise en place de tests d'intégration automatisés sur banc matériel.",
      },
      {
        role: "Responsable technique",
        org: "Association robotique de l'école",
        period: "2024 – aujourd'hui",
        description:
          "Encadrement de 8 étudiants pour la Coupe de France de robotique. Architecture " +
          "logicielle du robot sous ROS 2, gestion du dépôt et des revues de code.",
      },
      {
        role: "Tuteur en programmation",
        org: "École d'ingénieurs XYZ",
        period: "2023 – 2024",
        description:
          "Accompagnement d'étudiants de 1ʳᵉ année en C et Python : TP, débogage, " +
          "préparation aux examens.",
      },
    ],
  },
  {
    content: {
      id: "competences",
      label: "Compétences",
      icon: "brain",
      headline: "Compétences",
      summary: "Les outils que je manie, du plus solide au « je m'y mets ».",
      accent: "#8b6fc9",
      star: {
        x: 0,
        y: 0
      }
    },
    orbit: { radius: 16, size: 1.4, speed: 0.1, tilt: 0.06, texture: "/textures/jupiter.jpg", ring: true },
    skills: [
      {
        group: "Langages",
        items: [
          { label: "C / C++", level: 0.85 },
          { label: "Python", level: 0.8 },
          { label: "TypeScript / JS", level: 0.7 },
          { label: "Rust", level: 0.4 },
        ],
      },
      {
        group: "Frameworks & libs",
        items: [
          { label: "React / Next.js", level: 0.75 },
          { label: "Three.js / R3F", level: 0.5 },
          { label: "ROS 2", level: 0.6 },
          { label: "FreeRTOS", level: 0.65 },
        ],
      },
      {
        group: "Outils",
        items: [
          { label: "Git / GitHub", level: 0.85 },
          { label: "Docker", level: 0.6 },
          { label: "Linux / Bash", level: 0.75 },
          { label: "KiCad", level: 0.45 },
        ],
      },
      {
        group: "Transverses",
        items: [
          { label: "Travail en équipe" },
          { label: "Gestion de projet" },
          { label: "Anglais (C1)" },
          { label: "Vulgarisation" },
        ],
      },
    ],
  },
  {
    content: {
      id: "contact",
      label: "Contact",
      icon: "mail",
      headline: "Me contacter",
      summary: "Un stage, un projet, une question ? Le signal met peu de temps à arriver.",
      accent: "#3fb7a5",
      star: {
        x: 0,
        y: 0
      }
    },
    orbit: { radius: 20, size: 0.7, speed: 0.07, tilt: 0.04, texture: "/textures/neptune.jpg" },
    links: [
      { label: "Email", href: "mailto:prenom.nom@email.com" },
      { label: "GitHub", href: "https://github.com/moncompte" },
      { label: "LinkedIn", href: "https://linkedin.com/in/moncompte" },
      { label: "CV (PDF)", href: "/cv.pdf" },
    ],
  },
];

// Pratique pour la navbar et le fallback : la liste des sections dans l'ordre.
export const SECTIONS = PLANETS.map((p) => p.content);