import type { FAQItem } from "../types/Faqitem";

export const faqData: FAQItem[] = [
  // ── Greetings ──────────────────────────────────────────────────────────────
  {
    keywords: ["hi", "hello", "hey", "sup", "salam", "assalamualaikum", "asalam", "howdy", "greetings", "yo"],
    question: "Hi there!",
    answer:
      "Hey! 👋 I'm Hakim's portfolio assistant. Feel free to ask about his skills, projects, internship experience, or how to get in touch!",
  },

  // ── About / Identity ───────────────────────────────────────────────────────
  {
    keywords: ["who", "about", "yourself", "introduce", "hakim", "person", "background", "bio"],
    question: "Who is Hakim?",
    answer:
      "Muhammad Amirul Hakim is a fresh graduate Full Stack Developer based in Kuala Lumpur, Malaysia. He enjoys building modern web and mobile applications while continuously learning new technologies and improving his development skills.",
  },
  {
    keywords: ["full name", "name", "real name", "what is his name"],
    question: "What is his full name?",
    answer:
      "His full name is Muhammad Amirul Hakim. Most people just call him Hakim! 😊",
  },
  {
    keywords: ["age", "old", "born", "birthday", "year"],
    question: "How old is he?",
    answer:
      "Hakim is in his early 20s, having recently graduated from university. He's at the exciting start of his professional development career!",
  },
  {
    keywords: ["personality", "like", "hobby", "hobbies", "interest", "interests", "free time", "passion"],
    question: "What are his hobbies and interests?",
    answer:
      "Outside of coding, Hakim is passionate about exploring new technologies, UI/UX design trends, and open-source projects. He also enjoys problem-solving challenges and keeping up with the latest in software development.",
  },
  {
    keywords: ["goal", "goals", "ambition", "dream", "aspire", "future", "vision"],
    question: "What are his career goals?",
    answer:
      "Hakim aspires to grow into a well-rounded software engineer, contributing to impactful products and eventually leading development teams. He's passionate about building scalable, user-friendly applications that solve real-world problems.",
  },

  // ── Location ───────────────────────────────────────────────────────────────
  {
    keywords: ["location", "where", "based", "country", "kl", "malaysia", "city", "live"],
    question: "Where is he based?",
    answer:
      "Hakim is based in Kuala Lumpur, Malaysia 🇲🇾 and is open to both onsite and remote opportunities.",
  },
  {
    keywords: ["relocate", "move", "willing", "onsite", "remote", "hybrid", "travel"],
    question: "Is he willing to relocate or work remotely?",
    answer:
      "Yes! Hakim is open to remote work, hybrid arrangements, and relocation opportunities depending on the role. He's flexible and adaptable to different working environments.",
  },

  // ── Education ──────────────────────────────────────────────────────────────
  {
    keywords: ["education", "degree", "study", "university", "college", "uthm", "graduate", "qualification", "academic"],
    question: "What's his educational background?",
    answer:
      "Hakim graduated with a degree in Computer Science from Universiti Tun Hussein Onn Malaysia (UTHM), with a strong focus on software engineering, web development, and mobile app development.",
  },
  {
    keywords: ["cgpa", "gpa", "result", "grade", "score", "pointer", "academic result"],
    question: "How was his academic performance?",
    answer:
      "Hakim maintained a solid academic record throughout his studies at UTHM, consistently performing well in software engineering, programming, and computer science subjects.",
  },
  {
    keywords: ["course", "subject", "module", "study what", "major", "minor", "specialization"],
    question: "What did he study?",
    answer:
      "He studied Computer Science at UTHM, covering subjects such as software engineering, data structures, algorithms, database systems, web development, mobile development, networking, and computer architecture.",
  },

  // ── Skills & Tech Stack ────────────────────────────────────────────────────
  {
    keywords: ["skill", "tech", "stack", "know", "language", "framework", "technology", "tools"],
    question: "What are his skills?",
    answer:
      "Hakim works with technologies such as React, TypeScript, Node.js, PHP, Java, Flutter, Dart, Firebase, MongoDB, MySQL, Tailwind CSS, REST APIs, and Git. He also has experience with responsive UI design, API integration, and backend development.",
  },
  {
    keywords: ["frontend", "ui", "interface", "react", "html", "css", "tailwind", "design", "component"],
    question: "What frontend technologies does he use?",
    answer:
      "On the frontend, Hakim is proficient with React, TypeScript, Tailwind CSS, HTML5, and CSS3. He focuses on building responsive, accessible, and visually polished user interfaces with smooth animations using Framer Motion.",
  },
  {
    keywords: ["backend", "api", "rest api", "server", "database", "php", "node", "express"],
    question: "Does he work on backend systems?",
    answer:
      "Definitely. Hakim has experience building backend systems using PHP and Node.js with Express, creating REST APIs, managing relational and non-relational databases, handling authentication, and integrating frontend applications with backend services.",
  },
  {
    keywords: ["mobile", "flutter", "react native", "ios", "android", "app", "dart", "cross platform"],
    question: "Does he do mobile development?",
    answer:
      "Yes! Hakim develops cross-platform mobile applications using Flutter and Dart, with experience integrating Firebase services like Firestore, Authentication, and Storage, creating responsive and native-feeling mobile interfaces.",
  },
  {
    keywords: ["database", "sql", "mysql", "mongodb", "firebase", "nosql", "storage", "query"],
    question: "What databases does he work with?",
    answer:
      "Hakim has experience with both SQL and NoSQL databases — including MySQL for relational data management and MongoDB and Firebase Firestore for flexible, document-based storage. He's comfortable writing queries, designing schemas, and optimizing data models.",
  },
  {
    keywords: ["git", "github", "version control", "workflow", "collaboration", "ci", "devops"],
    question: "Does he use Git and version control?",
    answer:
      "Yes! Hakim uses Git and GitHub regularly for version control, collaborating on team projects with branching strategies, pull requests, and code reviews. He follows standard Git workflows used in professional development environments.",
  },
  {
    keywords: ["ui design", "ux", "figma", "design tool", "prototype", "wireframe", "user experience"],
    question: "Does he have UI/UX design skills?",
    answer:
      "Hakim has a solid eye for design and experience using Figma for wireframing and prototyping. He focuses on clean, intuitive interfaces and applies UI/UX best practices in all his projects.",
  },
  {
    keywords: ["java", "oop", "object oriented", "programming", "c++", "python", "language"],
    question: "What programming languages does he know?",
    answer:
      "Hakim is proficient in JavaScript, TypeScript, PHP, Java, and Dart. He also has foundational knowledge in Python and C++. He applies object-oriented and functional programming principles depending on the project needs.",
  },
  {
    keywords: ["testing", "debug", "qa", "quality", "unit test", "bug", "error"],
    question: "Does he have experience with testing and debugging?",
    answer:
      "Yes! During his internship and personal projects, Hakim gained hands-on experience with system testing, debugging, and quality assurance processes. He focuses on writing clean, maintainable code to minimize bugs from the ground up.",
  },

  // ── Projects ───────────────────────────────────────────────────────────────
  {
    keywords: ["project", "work", "built", "portfolio", "app", "develop", "create", "make"],
    question: "What projects has he built?",
    answer:
      "Hakim has developed several academic and personal projects including web systems, mobile applications, e-commerce platforms, and queue management systems. He also created modern portfolio websites and Firebase-integrated applications.",
  },
  {
    keywords: ["ecommerce", "e-commerce", "shop", "store", "shopping", "online", "sell"],
    question: "Has he built e-commerce projects?",
    answer:
      "Yes! Hakim has developed e-commerce platforms with product listings, cart functionality, order management, and payment flow integrations, applying both frontend and backend skills.",
  },
  {
    keywords: ["firebase", "realtime", "authentication", "auth", "login", "signup", "firestore"],
    question: "Has he worked with Firebase?",
    answer:
      "Absolutely! Hakim has integrated Firebase across multiple projects — including Firebase Authentication for user login/signup, Firestore for real-time data, and Firebase Storage for file uploads.",
  },
  {
    keywords: ["portfolio", "this website", "this site", "who made", "built this"],
    question: "Who built this portfolio?",
    answer:
      "Hakim built this portfolio himself! 🎨 It's developed using React, TypeScript, Tailwind CSS, and Framer Motion — showcasing his frontend skills, attention to design detail, and ability to create smooth, interactive web experiences.",
  },
  {
    keywords: ["open source", "github project", "contribution", "repo", "repository"],
    question: "Does he have public projects on GitHub?",
    answer:
      "Yes! You can find Hakim's public repositories and contributions on his GitHub profile, accessible through the Contact section of this portfolio. His repos include web apps, mobile apps, and various experiments.",
  },

  // ── Experience ─────────────────────────────────────────────────────────────
  {
    keywords: ["experience", "internship", "practical", "training", "industrial", "placement"],
    question: "Does he have internship experience?",
    answer:
      "Yes! During his internship, Hakim gained hands-on experience in frontend and backend development, REST API integration, debugging, system testing, database management, and collaborating with development teams using Git workflows.",
  },
  {
    keywords: ["work experience", "professional", "years", "how long", "junior", "senior"],
    question: "How much professional experience does he have?",
    answer:
      "Hakim is a fresh graduate with 6+ months of hands-on internship experience alongside numerous academic and personal projects. He's actively building his professional experience and is eager to grow in a full-time role.",
  },
  {
    keywords: ["team", "teamwork", "collaborate", "agile", "scrum", "communication", "group"],
    question: "Can he work in a team?",
    answer:
      "Absolutely! Hakim has collaborated in team environments during his internship and academic projects. He's experienced with Agile-style workflows, team communication, using Git for collaboration, and contributing effectively to shared codebases.",
  },

  // ── Availability & Opportunities ───────────────────────────────────────────
  {
    keywords: ["hire", "available", "freelance", "work", "open", "job", "opportunity", "recruit", "position", "vacancy"],
    question: "Is he available for opportunities?",
    answer:
      "Yes! Hakim is currently open to junior developer roles, full-time positions, freelance work, and collaborations where he can continue growing as a software developer. Feel free to reach out!",
  },
  {
    keywords: ["salary", "rate", "pay", "compensation", "expect", "charge", "cost"],
    question: "What is his expected salary or rate?",
    answer:
      "Hakim is open to discussing compensation based on the role, scope of work, and company. Feel free to reach out directly to discuss — he's flexible and looking for the right opportunity to grow.",
  },
  {
    keywords: ["start", "when", "available when", "notice", "join", "start date"],
    question: "When is he available to start?",
    answer:
      "Hakim is currently available and can start relatively soon depending on the opportunity. Reach out via the Contact section to discuss timelines! 📅",
  },

  // ── Contact ────────────────────────────────────────────────────────────────
  {
    keywords: ["contact", "email", "reach", "message", "dm", "connect", "get in touch"],
    question: "How do I contact him?",
    answer:
      "You can contact Hakim through email, LinkedIn, or GitHub from the Contact section of this portfolio. He typically responds within 24–48 hours. 📬",
  },
  {
    keywords: ["linkedin", "social", "media", "network", "professional profile"],
    question: "Is he on LinkedIn?",
    answer:
      "Yes! Hakim is active on LinkedIn where you can view his professional profile, experience, and connect with him. You can find the link in the Contact section of this portfolio.",
  },
  {
    keywords: ["github", "code", "repository", "source", "open source"],
    question: "Where can I find his GitHub?",
    answer:
      "Hakim's GitHub profile is linked in the Contact section of this portfolio. You can browse his repositories, see his contributions, and check out his latest projects there.",
  },
  {
    keywords: ["resume", "cv", "curriculum vitae", "download", "pdf"],
    question: "Can I download his resume or CV?",
    answer:
      "Yes! Hakim's resume/CV is available for download from this portfolio. Look for the download button in the hero or contact section. 📄",
  },

  // ── This Portfolio / Assistant ─────────────────────────────────────────────
  {
    keywords: ["what can you do", "help", "assist", "what do you know", "ask", "question", "capability"],
    question: "What can I ask you?",
    answer:
      "You can ask me anything about Hakim! Try asking about his skills, projects, education, internship experience, tech stack, contact info, availability, or anything else you'd like to know. I'm here to help! 🤖",
  },
  {
    keywords: ["who are you", "what are you", "bot", "assistant", "ai", "chatbot", "robot"],
    question: "Who are you?",
    answer:
      "I'm a portfolio assistant built into Hakim's portfolio website! 🤖 I'm here to answer your questions about Hakim — his skills, projects, experience, and more. Ask away!",
  },
  {
    keywords: ["thank", "thanks", "appreciate", "great", "awesome", "nice", "good", "cool"],
    question: "Thanks!",
    answer:
      "You're welcome! 😊 Feel free to ask anything else about Hakim. I'm happy to help!",
  },
  {
    keywords: ["bye", "goodbye", "see you", "later", "take care", "ciao", "peace"],
    question: "Goodbye!",
    answer:
      "Goodbye! 👋 Thanks for visiting Hakim's portfolio. Don't hesitate to reach out if you'd like to connect or collaborate. Have a great day!",
  },
];