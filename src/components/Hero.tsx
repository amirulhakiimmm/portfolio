import { motion } from "framer-motion"
import { MapPin, Briefcase, GraduationCap } from "lucide-react"
import { useState, useEffect } from "react"

interface HeroProps {
  darkMode: boolean
}

const roles = ["Frontend Developer", "Mobile Developer", "Backend Developer", "UI/UX Enthusiast"]

const Hero = ({ darkMode }: HeroProps) => {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75)
      return () => clearTimeout(t)
    }
    if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }
  }, [displayed, deleting, roleIndex])

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        padding: "0 2rem",
      }}
    >
      {/* ── BIG BACKGROUND NAME ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 0,
          userSelect: "none",
          transform: "translateY(-26.5%)",
        }}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            fontSize: "clamp(6rem, 22vw, 20rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: darkMode
              ? "0.6px rgba(255,255,255,0.18)"
              : "1px rgba(0,0,0,0.15)",
            fontFamily: "'Inter', sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          HAKIM
        </motion.span>
      </div>

      {/* ── MAIN 3-COLUMN LAYOUT ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "flex-end",   /* align bottoms so image anchors to baseline */
          gap: "2rem",
          paddingBottom: "0",
        }}
      >
        {/* ── LEFT COLUMN ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            paddingBottom: "3rem",   /* breathing room above bottom edge */
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.8rem",
                letterSpacing: "0.2em",
                color: "var(--muted)",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Hello, I'm
            </p>
            <h1
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                fontWeight: 700,
                color: "var(--text)",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Muhammad Amirul Hakim
            </h1>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--accent)",
                fontWeight: 500,
                marginTop: "0.4rem",
                letterSpacing: "0.02em",
                minHeight: "1.4em",
              }}
            >
              {displayed}
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "0.9em",
                  background: "var(--accent)",
                  marginLeft: "2px",
                  verticalAlign: "middle",
                  animation: "blink 1s step-end infinite",
                }}
              />
            </p>
          </div>

          {/* Info pills */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { icon: <MapPin size={14} />, text: "Kuala Lumpur, MY" },
              { icon: <GraduationCap size={14} />, text: "Bachelor Computer Science" },
              { icon: <Briefcase size={14} />, text: "Open to Work" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "var(--muted)",
                  fontSize: "0.85rem",
                }}
              >
                <span style={{ color: "var(--accent)" }}>{icon}</span>
                {text}
              </div>
            ))}
          </div>

          {/* Short bio */}
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--muted)",
              lineHeight: 1.7,
              maxWidth: "280px",
            }}
          >
            Building clean, fast, and beautiful interfaces. Passionate about user experience and modern web technologies.
          </p>
        </motion.div>

        {/* ── CENTER — PHOTO flush to bottom ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            /* no bottom padding — image sits on the section floor */
          }}
        >
          <div style={{ position: "relative", width: "clamp(200px, 24vw, 320px)" }}>
            {/* Glow blob */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "152%",
                height: "140%",
                borderRadius: "50%",
                background: darkMode
                  ? "radial-gradient(ellipse, rgba(99,102,241,0.35) 0%, rgba(59,130,246,0.18) 40%, transparent 70%)"
                  : "radial-gradient(ellipse, rgba(99,102,241,0.2) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)",
                filter: "blur(28px)",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
            {/* Image — no transform offset, just let it sit naturally */}
            <img
              src="/hakim_latest.png"
              alt="Hakim"
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                display: "block",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            alignItems: "flex-end",
            textAlign: "right",
            paddingBottom: "3rem",
          }}
        >
          {/* Tech stack */}
          <div>
            <p
              style={{
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                color: "var(--muted)",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Tech Stack
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                justifyContent: "flex-end",
              }}
            >
              {["React", "TypeScript", "Next.js", "Tailwind", "Framer"].map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: "0.3rem 0.75rem",
                    borderRadius: "999px",
                    fontSize: "0.78rem",
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                    background: "var(--surface)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "2rem" }}>
            {[
              { num: "3+", label: "Projects" },
              { num: "1+", label: "Years exp" },
            ].map(({ num, label }) => (
              <div key={label} style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  {num}
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    margin: "0.25rem 0 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "0.75rem", flexDirection: "column", alignItems: "flex-end" }}>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "0.65rem 1.4rem",
                borderRadius: "10px",
                background: "var(--accent)",
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "0.65rem 1.4rem",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
                fontSize: "0.85rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 768px) {
          #home > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto auto;
          }
          #home > div:nth-child(2) > div:first-child {
            order: 2;
            align-items: center !important;
            text-align: center !important;
          }
          #home > div:nth-child(2) > div:nth-child(2) {
            order: 1;
          }
          #home > div:nth-child(2) > div:last-child {
            order: 3;
            align-items: center !important;
            text-align: center !important;
          }
          #home > div:nth-child(2) > div:last-child * {
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero