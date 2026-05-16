import type { Project } from "../types/Project";

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Clinic Queue System",
    description:
      "A mobile clinic queue management system with separate admin, doctor, and patient roles. Includes online queue registration, booking management, queue tracking, and real-time patient updates.",
    tags: ["Flutter", "Dart", "Firebase", "Firestore", "Authentication"],
    type: "Full Stack",
    typeColor: "#7B7FD4",
    year: "2025",
    githubUrl: "https://github.com/amirulhakiimmm",
    featured: true,
    coverImage: "/klinik_2.png",
    images: ["/klinik_2.png", "/Klinik_1.png"],
    longDescription:
      "A comprehensive clinic management ecosystem built on Flutter and Firebase. The system features three distinct user roles — Admin, Doctor, and Patient — each with a tailored interface. Admins can manage clinic settings, monitor live queue state, and generate reports. Doctors receive real-time patient updates and can update consultation status. Patients register online, track their queue position live, and receive push notifications when their turn approaches.",
    role: "Full Stack Mobile Developer",
    duration: "4 months",
    highlights: [
      "Real-time queue tracking with Firestore streams",
      "Role-based authentication & access control",
      "Push notifications for patient alerts",
      "Admin analytics dashboard",
    ],
  },
  {
    id: 2,
    title: "NDF Group Enterprise App",
    description:
      "A company profile mobile application developed for NDF Group Enterprise. Features booking forms integrated with Firestore database storage and direct WhatsApp communication for customer inquiries.",
    tags: ["Flutter", "Dart", "Firebase", "Firestore", "WhatsApp API"],
    type: "Mobile",
    typeColor: "#A0A4E8",
    year: "2025",
    githubUrl: "https://github.com/amirulhakiimmm",
    featured: false,
    coverImage: "/ndf_1.png",
    images: ["/ndf_1.png"],
    longDescription:
      "A polished company profile app for NDF Group Enterprise, designed to showcase services, capture client leads, and streamline communication. The app integrates a booking flow backed by Firestore for persistent storage, and connects directly to WhatsApp for instant customer inquiries — removing friction from the sales pipeline.",
    role: "Mobile Developer",
    duration: "2 months",
    highlights: [
      "WhatsApp deep-link integration for instant contact",
      "Firestore-backed booking form with validation",
      "Service showcase with rich media content",
      "Smooth onboarding flow",
    ],
  },
  {
    id: 3,
    title: "Industrial Management Learning Tool",
    description:
      "A responsive web and mobile learning platform developed for industrial management education. Includes forecasting tools, interactive learning modules, and mobile-friendly user experience.",
    tags: ["Flutter", "Dart", "Responsive Design", "Forecasting", "UI/UX"],
    type: "Education",
    typeColor: "#C8C9E8",
    year: "2024",
    githubUrl: "https://github.com/amirulhakiimmm",
    featured: false,
    coverImage: "/fyp_haziq1.png",
    images: ["/fyp_haziq1.png", "/haziq_fyp2.png"],
    longDescription:
      "An educational platform purpose-built for industrial management courses. The tool offers interactive modules that teach forecasting, inventory management, and operations planning with visual aids and hands-on exercises. Built responsively in Flutter, it runs seamlessly on both web and mobile — supporting students wherever they learn.",
    role: "UI/UX Designer & Developer",
    duration: "3 months",
    highlights: [
      "Interactive forecasting calculator with live charts",
      "Responsive layout for web and mobile",
      "Modular lesson structure with progress tracking",
    ],
  },
];