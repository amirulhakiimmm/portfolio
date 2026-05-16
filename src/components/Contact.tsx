import { motion } from "framer-motion"
import { useState } from "react"
import { Send, MapPin, Mail, CheckCircle, AlertCircle } from "lucide-react"
import { contactData } from "../data/Contactdata"
import { validateForm, submitForm } from "../hooks/PortfolioController"
import type { ContactForm, FormStatus } from "../hooks/PortfolioController"

interface ContactProps {
  darkMode: boolean
}

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: EASE },
})

// Inline SVGs — no lucide dependency for these icons
const iconMap: Record<string, React.ReactNode> = {
  GitHub: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  ),
  LinkedIn: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Twitter: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
}

const Contact = (_: ContactProps) => {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<FormStatus>("idle")
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    const validationError = validateForm(form)
    if (validationError) { setError(validationError); return }
    setStatus("sending")
    try {
      await submitForm(form)
      setStatus("success")
      setForm({ name: "", email: "", message: "" })
    } catch {
      setStatus("error")
      setError("Something went wrong. Please try again or email directly.")
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "0.85rem 1rem",
    borderRadius: "10px",
    border: "1px solid var(--border)",
    background: "var(--surface)",
    color: "var(--text)",
    fontSize: "0.9rem",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
    boxSizing: "border-box" as const,
  }

  return (
    <section
      id="contact"
      style={{ padding: "7rem 2rem", position: "relative" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Section label */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: "3.5rem" }}>
          <p
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.22em",
              color: "var(--accent)",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--accent)" }} />
            Get In Touch
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 700,
              color: "var(--text)",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Let's build something{" "}
            <span style={{ color: "var(--accent)" }}>great.</span>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem", alignItems: "start" }}>
          
          {/* LEFT — info */}
          <motion.div {...fadeUp(0.1)} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
              I'm currently open to full-time roles, freelance projects, and interesting collaborations. If you have a project in mind or just want to say hi — my inbox is always open.
            </p>

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--muted)", fontSize: "0.875rem" }}>
                <span
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent)",
                    flexShrink: 0,
                  }}
                >
                  <Mail size={15} />
                </span>
                <a href={`mailto:${contactData.email}`} style={{ color: "var(--muted)", textDecoration: "none" }}>
                  {contactData.email}
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--muted)", fontSize: "0.875rem" }}>
                <span
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent)",
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={15} />
                </span>
                {contactData.location}
              </div>
            </div>

            {/* Social links */}
            <div>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                Find me on
              </p>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                {contactData.socials.map(({ label, url }) => (
                  <motion.a
                    key={label}
                    href={url}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--muted)",
                      textDecoration: "none",
                      transition: "color 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent)"
                      e.currentTarget.style.borderColor = "var(--accent)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--muted)"
                      e.currentTarget.style.borderColor = "var(--border)"
                    }}
                  >
                    {iconMap[label]}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.div
            {...fadeUp(0.15)}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "2rem",
            }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  padding: "3rem 1rem",
                  textAlign: "center",
                }}
              >
                <CheckCircle size={40} color="var(--accent)" />
                <h3 style={{ color: "var(--text)", fontWeight: 600, margin: 0 }}>Message sent!</h3>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStatus("idle")}
                  style={{
                    padding: "0.6rem 1.4rem",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--muted)",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Send another
                </motion.button>
              </motion.div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.78rem", color: "var(--muted)", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>
                      NAME
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.78rem", color: "var(--muted)", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>
                      EMAIL
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", color: "var(--muted)", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>

                {/* Error */}
                {error && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f87171", fontSize: "0.85rem" }}>
                    <AlertCircle size={14} />
                    {error}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  style={{
                    padding: "0.85rem 1.5rem",
                    borderRadius: "10px",
                    background: status === "sending" ? "var(--border)" : "var(--accent)",
                    color: "#fff",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    border: "none",
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    fontFamily: "inherit",
                    transition: "background 0.2s",
                  }}
                >
                  {status === "sending" ? (
                    <>
                      <span style={{ width: "14px", height: "14px", border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          #contact > div > div:last-of-type {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          #contact > div > div:last-of-type > div:last-child > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Contact