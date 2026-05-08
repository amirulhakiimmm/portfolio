// ─────────────────────────────────────────────
//  MODEL — all static data lives here
//  Change content here, UI updates automatically
// ─────────────────────────────────────────────

export const aboutData = {
  summary:
    "I'm a Full Stack Developer based in Kuala Lumpur, passionate about building scalable backends, polished mobile apps, and seamless web experiences. I care about clean architecture, performance, and shipping products that actually work.",
  highlights: [
    "3+ years building production-grade web & mobile apps",
    "Strong in backend systems, REST APIs & database design",
    "Cross-platform mobile with Flutter & React Native",
    "Always learning — currently exploring system design & DevOps",
  ],
  skills: [
    { category: "Backend",  items: ["Node.js", "Python", "Go", "FastAPI", "Express"] },
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { category: "Mobile",   items: ["Flutter", "React Native", "Dart"] },
    { category: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "MySQL"] },
    { category: "DevOps",   items: ["Docker", "AWS", "GitHub Actions", "Vercel"] },
  ],
  stats: [
    { num: "3+",  label: "Years Exp" },
    { num: "20+", label: "Projects" },
    { num: "10+", label: "Technologies" },
    { num: "5+",  label: "Happy Clients" },
  ],
}

export const projectsData = [
  {
    id: 1,
    title: "TaskFlow SaaS",
    description:
      "A real-time project management platform with role-based access, live collaboration, and analytics. Built to handle 10k+ concurrent users.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Redis", "WebSocket"],
    type: "Full Stack",
    typeColor: "#7B7FD4",
    year: "2024",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "PayStream API",
    description:
      "High-throughput payment microservice with webhook support, idempotency keys, fraud scoring, and full PCI-DSS compliant audit logging.",
    tags: ["Go", "gRPC", "PostgreSQL", "Docker", "AWS"],
    type: "Backend",
    typeColor: "#A0A4E8",
    year: "2024",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 3,
    title: "MarketMate App",
    description:
      "Cross-platform e-commerce mobile app with offline support, push notifications, and native payment integration. 4.8★ on both stores.",
    tags: ["Flutter", "Dart", "Firebase", "Stripe"],
    type: "Mobile",
    typeColor: "#C8C9E8",
    year: "2023",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
]

export const contactData = {
  email: "amirulhakim@email.com",
  location: "Kuala Lumpur, Malaysia",
  socials: [
    { label: "GitHub",   url: "https://github.com/",   handle: "@amirulhakim" },
    { label: "LinkedIn", url: "https://linkedin.com/",  handle: "Muhammad Amirul Hakim" },
    { label: "Twitter",  url: "https://twitter.com/",   handle: "@amirulhakim" },
  ],
}

// ─────────────────────────────────────────────
//  FAQ BOT DATA
// ─────────────────────────────────────────────
export interface FAQItem {
  keywords: string[]
  question: string
  answer: string
}

export const faqData: FAQItem[] = [
  {
    keywords: ["hi", "hello", "hey", "sup", "salam", "assalamualaikum"],
    question: "Hi there!",
    answer: "Hey! 👋 I'm Hakim's portfolio bot. Ask me anything about his skills, projects, experience, or how to get in touch!",
  },
  {
    keywords: ["who", "about", "yourself", "introduce", "hakim"],
    question: "Who is Hakim?",
    answer: "Muhammad Amirul Hakim is a Full Stack Developer from Kuala Lumpur with 3+ years of experience building backends, web apps, and mobile applications. He specialises in Node.js, Go, Flutter, and React.",
  },
  {
    keywords: ["skill", "tech", "stack", "know", "language", "framework"],
    question: "What are his skills?",
    answer: "Hakim's core stack: Backend (Node.js, Python, Go), Frontend (React, Next.js, TypeScript), Mobile (Flutter, React Native), Databases (PostgreSQL, MongoDB, Redis), and DevOps (Docker, AWS).",
  },
  {
    keywords: ["project", "work", "built", "portfolio", "app"],
    question: "What projects has he built?",
    answer: "Key projects: 1) TaskFlow SaaS — real-time project management platform 2) PayStream API — payment microservice with fraud detection 3) MarketMate — cross-platform mobile e-commerce app (4.8★). Check the Projects section for details!",
  },
  {
    keywords: ["experience", "year", "long", "senior", "junior"],
    question: "How much experience does he have?",
    answer: "Hakim has 3+ years of professional experience, working across SaaS platforms, microservices, and mobile apps. He's shipped 20+ production projects.",
  },
  {
    keywords: ["hire", "available", "freelance", "work", "open", "job", "opportunity"],
    question: "Is he available for hire?",
    answer: "Yes! Hakim is open to full-time roles, freelance projects, and interesting collaborations. Reach out at amirulhakim@email.com or check the Contact section.",
  },
  {
    keywords: ["contact", "email", "reach", "message", "dm"],
    question: "How can I contact him?",
    answer: "You can reach Hakim at amirulhakim@email.com, or via LinkedIn and GitHub. He usually replies within 24 hours. 📬",
  },
  {
    keywords: ["location", "where", "based", "country", "kl", "malaysia"],
    question: "Where is he based?",
    answer: "Hakim is based in Kuala Lumpur, Malaysia 🇲🇾. He's open to remote opportunities worldwide.",
  },
  {
    keywords: ["education", "degree", "study", "university", "college"],
    question: "What's his educational background?",
    answer: "Hakim holds a Bachelor's degree in Computer Science. Combined with hands-on experience building real products, he bridges theory and practical engineering.",
  },
  {
    keywords: ["mobile", "flutter", "react native", "ios", "android", "app"],
    question: "Does he do mobile development?",
    answer: "Absolutely! Hakim builds cross-platform mobile apps using Flutter and React Native — shipped to both App Store and Google Play with real users.",
  },
]