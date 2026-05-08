// ─────────────────────────────────────────────
//  CONTROLLER — business logic, no UI here
// ─────────────────────────────────────────────

import { faqData } from "../data/portfolioData"
import type { FAQItem } from "../data/portfolioData"

// ── Bot Controller ──────────────────────────
export interface BotMessage {
  id: string
  role: "user" | "bot"
  text: string
  timestamp: Date
}

export function matchFAQ(input: string): string {
  const lower = input.toLowerCase().trim()

  // Find best matching FAQ by keyword count
  let bestMatch: FAQItem | null = null
  let bestScore = 0

  for (const faq of faqData) {
    const score = faq.keywords.filter((kw) => lower.includes(kw)).length
    if (score > bestScore) {
      bestScore = score
      bestMatch = faq
    }
  }

  if (bestMatch && bestScore > 0) return bestMatch.answer

  // Fallback
  return "Hmm, I'm not sure about that 🤔 Try asking about Hakim's skills, projects, experience, or how to contact him!"
}

export function createMessage(role: "user" | "bot", text: string): BotMessage {
  return {
    id: Math.random().toString(36).slice(2),
    role,
    text,
    timestamp: new Date(),
  }
}

export function getQuickReplies(): string[] {
  return [
    "What are his skills?",
    "Show me his projects",
    "Is he available for hire?",
    "How do I contact him?",
  ]
}

// ── About Controller ────────────────────────
export function groupSkillsByCategory(skills: { category: string; items: string[] }[]) {
  return skills.map((s) => ({
    ...s,
    count: s.items.length,
  }))
}

// ── Projects Controller ──────────────────────
export function getFeaturedProject(projects: typeof import("../data/portfolioData").projectsData) {
  return projects.find((p) => p.featured) ?? projects[0]
}

export function getSecondaryProjects(projects: typeof import("../data/portfolioData").projectsData) {
  return projects.filter((p) => !p.featured)
}

// ── Contact Controller ───────────────────────
export interface ContactForm {
  name: string
  email: string
  message: string
}

export type FormStatus = "idle" | "sending" | "success" | "error"

export function validateForm(form: ContactForm): string | null {
  if (!form.name.trim()) return "Name is required."
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    return "A valid email is required."
  if (!form.message.trim() || form.message.length < 10)
    return "Message must be at least 10 characters."
  return null
}

export async function submitForm(_form: ContactForm): Promise<void> {
  // Swap this for your actual API / EmailJS / Resend call
  await new Promise((res) => setTimeout(res, 1500))
  // throw new Error("API error") // uncomment to test error state
}