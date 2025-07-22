export const colors = {
  dark: "#1a1a2e", // deep navy
  accent: "#ff6f61", // coral pop
  mint: "#a8e6cf", // calming mint
  cream: "#f8f4e3", // soft background
} as const



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
    title: "STABLES - Campus Parking Management",
    description:
      "Led 4-person team delivering cross-platform mobile app managing 828 parking spots across 3 campus lots with simulated real-time updates. Features Mapbox integration, GPS positioning, atomic spot-claiming operations, and a Python simulation script with realistic occupancy patterns.",
    stack: ["Flutter", "Node.js", "PostgreSQL", "Python", "Express API", "Mapbox", "GPS"],
    github: "https://github.com/mariocamarena/Stables-The-Parking-App-for-Vaqueros",
    demo: "https://stables-utrgv-parking-app.web.app/",
    image: "",
  },
  {
    id: 2,
    title: "FT-SAM Urban Scene Segmentation",
    description:
      "Spearheaded FT-SAM dual-encoder model combining SAM with ResNet50, achieving 29% performance improvement in urban scene segmentation for autonomous vehicle applications. Implemented deformable decoder with hybrid loss functions.",
    stack: ["PyTorch", "Computer Vision", "SAM", "ResNet50", "CUDA"],
    github: "https://github.com/mariocamarena/FT-SAM",
    demo: "",
    image: "",
  },
  {
    id: 3,
    title: "Interactive Portfolio Website",
    description:
      "**You're viewing this site right now!** Developed interactive portfolio featuring advanced animations, 3D effects, magnetic interactions, and real-time typewriter sequences. Includes submission analytics and performance-optimized animations.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/mariocamarena",
    image: "",
  },
  {
    id: 4,
    title: "Custom PC Builds & Mobile Device Repair",
    description:
      "Independent consulting business providing custom PC assembly, component selection, and performance optimization services. Specialized in gaming builds, workstation configurations, and mobile device repair with focus on cost-effective solutions and customer education.",
    stack: ["Hardware Assembly", "System Optimization", "Troubleshooting", "Customer Consultation"],
    github: "",
    image: "",
  },
]

export const projects = portfolio
