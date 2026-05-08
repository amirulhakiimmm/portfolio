// ─────────────────────────────────────────────
//  MODEL — all static data lives here
//  Change content here, UI updates automatically
// ─────────────────────────────────────────────

export const aboutData = {
  hero: {
    title: "Building modern digital experiences.",
    subtitle: "Fresh Graduate Full Stack Developer",
  },

  feed: {
    breakingItems: [
      "FRESH GRADUATE FULL STACK DEVELOPER",
      "BUILDING WEB & MOBILE APPLICATIONS",
      "FOCUSED ON CLEAN UI & UX",
      "REST API & DATABASE EXPERIENCE",
      "CONTINUOUS LEARNER",
    ],

    statusItems: [
      "OPEN TO PROTAGE AND JUNIOR ROLES",
      "WEB & MOBILE DEVELOPMENT EXPERIENCE",
      "INTERNSHIP & ACADEMIC PROJECT EXPERIENCE",
      "BASED IN KUALA LUMPUR, MALAYSIA",
      "AVAILABLE FOR REMOTE & ONSITE WORK",
    ],
  },
  summary:
  "I'm a Computer Science graduate and freelance Full Stack Developer based in Kuala Lumpur, focused on building modern web and mobile applications. I enjoy turning ideas into real, usable products by combining clean UI design with solid backend architecture. My work often involves React, TypeScript, and mobile development, with a strong emphasis on performance, usability, and maintainable code. I’m constantly improving my skills through freelance projects, personal builds, and exploring new technologies in the full-stack ecosystem.",
highlights: [
  "Fresh graduate with hands-on experience in web & mobile development",
  "Experienced in REST APIs, database integration & responsive UI design",
  "Skilled in Flutter, React, Node.js, Firebase & modern development tools",
  "Fast learner who enjoys exploring new technologies and solving real-world problems",
],
  skills: [
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "PHP",
      "Java",
      "REST API",
      "Firebase Functions",
      "Postman",
      "JWT Authentication",
    ],
  },

  {
    category: "Frontend",
    items: [
      "React",
      "Vue.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Responsive Design",
    ],
  },

  {
    category: "Mobile",
    items: [
      "Flutter",
      "React Native",
      "Dart",
      "Android Studio",
      "Firebase Integration",
    ],
  },

  {
    category: "Database",
    items: [
      "MongoDB",
      "MySQL",
      "Firebase",
      "Firestore",
      "SQL",
      "Database Design",
    ],
  },

  {
    category: "Tools & Platforms",
    items: [
      "Git",
      "GitHub",
      "Figma",
      "VS Code",
      "Docker",
      "GitHub Actions",
      "Vercel",
      "Netlify",
    ],
  },

  
],
  stats: [
    { num: "1+",  label: "Years Exp" },
    { num: "2+", label: "Projects" },
    { num: "10+", label: "Technologies" },
    { num: "2+",  label: "Happy Clients" },
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
    keywords: ["hi", "hello", "hey", "sup", "salam", "assalamualaikum", "asalam"],
    question: "Hi there!",
    answer:
      "Hey! 👋 I'm Hakim's portfolio assistant. Feel free to ask about his skills, projects, internship experience, or how to get in touch!",
  },

  {
    keywords: ["who", "about", "yourself", "introduce", "hakim"],
    question: "Who is Hakim?",
    answer:
      "Muhammad Amirul Hakim is a fresh graduate Full Stack Developer based in Kuala Lumpur, Malaysia. He enjoys building modern web and mobile applications while continuously learning new technologies and improving his development skills.",
  },

  {
    keywords: ["skill", "tech", "stack", "know", "language", "framework"],
    question: "What are his skills?",
    answer:
      "Hakim works with technologies such as React, TypeScript, Node.js, PHP, Java, Flutter, Dart, Firebase, MongoDB, MySQL, Tailwind CSS, REST APIs, and Git. He also has experience with responsive UI design, API integration, and backend development.",
  },

  {
    keywords: ["project", "work", "built", "portfolio", "app"],
    question: "What projects has he built?",
    answer:
      "Hakim has developed several academic and personal projects including web systems, mobile applications, e-commerce platforms, and queue management systems. He also created modern portfolio websites and Firebase-integrated applications.",
  },

  {
    keywords: ["experience", "internship", "practical", "training"],
    question: "Does he have internship experience?",
    answer:
      "Yes! During his internship, Hakim gained hands-on experience in frontend and backend development, REST API integration, debugging, system testing, database management, and collaborating with development teams using Git workflows.",
  },

  {
    keywords: ["hire", "available", "freelance", "work", "open", "job", "opportunity"],
    question: "Is he available for opportunities?",
    answer:
      "Yes! Hakim is currently open to internship opportunities, junior developer roles, freelance work, and collaborations where he can continue growing as a software developer.",
  },

  {
    keywords: ["contact", "email", "reach", "message", "dm"],
    question: "How can I contact him?",
    answer:
      "You can contact Hakim through email, LinkedIn, or GitHub from the Contact section of this portfolio. 📬",
  },

  {
    keywords: ["location", "where", "based", "country", "kl", "malaysia"],
    question: "Where is he based?",
    answer:
      "Hakim is based in Kuala Lumpur, Malaysia 🇲🇾 and is open to both onsite and remote opportunities.",
  },

  {
    keywords: ["education", "degree", "study", "university", "college"],
    question: "What's his educational background?",
    answer:
      "Hakim is a Computer Science student from Universiti Tun Hussein Onn Malaysia (UTHM) with a strong interest in software engineering, web development, and mobile app development.",
  },

  {
    keywords: ["mobile", "flutter", "react native", "ios", "android", "app"],
    question: "Does he do mobile development?",
    answer:
      "Yes! Hakim develops cross-platform mobile applications using Flutter and React Native, with experience integrating Firebase services and creating responsive mobile interfaces.",
  },

  {
    keywords: ["backend", "api", "rest api", "server", "database"],
    question: "Does he work on backend systems?",
    answer:
      "Definitely. Hakim has experience building backend systems using Node.js and PHP, creating REST APIs, managing databases, handling authentication, and integrating frontend applications with backend services.",
  },
]