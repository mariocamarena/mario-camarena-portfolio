// Site navigation
export const navigation = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
]

// Portfolio projects
export const portfolio = [
  {
    id: 1,
    title: "AD-SAM Urban Scene Segmentation",
    description:
      "Led custom AD-SAM dual-encoder effort achieving 29% improvement in urban-scene segmentation for autonomous driving. Implemented deformable decoder with hybrid loss (Focal, Dice, Lovász, Surface). Pending publication on IEEE-T-ITS.",
    stack: ["PyTorch", "Computer Vision", "SAM", "ResNet50", "CUDA"],
    github: "https://github.com/mariocamarena/AD-SAM",
    demo: "",
    paper: "https://arxiv.org/abs/2510.27047",
    image: "",
  },
  {
    id: 2,
    title: "STABLES - Campus Parking Management",
    description:
      "Led 4-person team delivering cross-platform mobile app managing 828 parking spots across 3 campus lots with simulated real-time updates. Features Mapbox integration, GPS positioning, atomic spot-claiming operations, and a Python simulation script with realistic occupancy patterns.",
    stack: ["Flutter", "Node.js", "PostgreSQL", "Python", "Express API", "Mapbox", "GPS"],
    github: "https://github.com/mariocamarena/Stables-The-Parking-App-for-Vaqueros",
    demo: "https://stables-utrgv-parking-app.web.app/",
    image: "",
  },
  {
    id: 3,
    title: "Hackathon 2025 WINNER - Coffee Outlier Detection",
    description:
      "Built an ML pipeline for detecting outlier coffee roast profiles using sensor data analysis. Completed in 24 hours including a 2-page research paper submission.",
    stack: ["Python", "Machine Learning", "Data Analysis", "Pandas"],
    github: "https://github.com/mariocamarena/HackR2025_coffee_outlier",
    demo: "",
    paper: "https://github.com/mariocamarena/HackR2025_coffee_outlier/blob/main/reports/submission_paper.pdf",
    image: "",
  },
  {
    id: 4,
    title: "AlexanderOnline - Freelance Work",
    description:
      "Commissioned to build a custom portfolio website inspired by early 2000s video game console UIs. Features retro-styled navigation menus, nostalgic visual effects, and interactive elements reminiscent of PlayStation 2 and Xbox dashboard interfaces, all built with modern web technologies.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    github: "",
    demo: "",
    image: "/assets/project_04/image.png",
  },
  {
    id: 5,
    title: "Custom PC Builds & Mobile Device Repair",
    description:
      "Independent consulting business providing custom PC assembly, component selection, and performance optimization services. Specialized in gaming builds, workstation configurations, and mobile device repair with focus on cost-effective solutions and customer education.",
    stack: ["Hardware Assembly", "System Optimization", "Troubleshooting", "Customer Consultation"],
    github: "",
    image: "",
  },
  {
    id: 6,
    title: "Interactive Portfolio Website",
    description:
      "This site! Built with a monochrome aesthetic featuring ASCII art backgrounds, text scramble animations, dithering shader effects, and terminal-styled components. Includes a PostgreSQL-backed contact form with an admin dashboard.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "PostgreSQL", "Shaders"],
    github: "https://github.com/mariocamarena",
    image: "/assets/project_06/1.png",
  },
]
