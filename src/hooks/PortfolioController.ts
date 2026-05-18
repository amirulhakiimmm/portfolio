

import { faqData } from "../data/Faqdata"
import type { FAQItem } from "../types/Faqitem"
import { aboutData } from "../data/Aboutdata";
import emailjs from "@emailjs/browser"
import type { Project } from "../types/Project";

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export interface BotMessage {
  id: string
  role: "user" | "bot"
  text: string
  timestamp: Date
}

export function matchFAQ(input: string): string {
  const lower = input.toLowerCase().trim()

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

export function groupSkillsByCategory(skills: { category: string; items: string[] }[]) {
  return skills.map((s) => ({
    ...s,
    count: s.items.length,
  }))
}
export function getHeroFeed() {
  return aboutData.feed;
}

export function getFeaturedProject(projects: Project[]) {
  return projects.find((p) => p.featured) ?? projects[0]
}

export function getSecondaryProjects(projects: Project[]) {
  return projects.filter((p) => !p.featured)
}

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

export async function submitForm(form: ContactForm): Promise<void> {
  const result = await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      from_name:  form.name,
      from_email: form.email,
      message:    form.message,
    },
    EMAILJS_PUBLIC_KEY
  )

  if (result.status !== 200) {
    throw new Error("Failed to send message.")
  }
}