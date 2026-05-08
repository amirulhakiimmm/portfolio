import { motion } from "framer-motion"
import { ExternalLink, ArrowUpRight } from "lucide-react"
import { projectsData } from "../model/portfolioData"
import { getFeaturedProject, getSecondaryProjects } from "../controllers/portfolioController"

interface ProjectsProps {
  darkMode: boolean
}

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: EASE },
})

const Projects = ({ darkMode }: ProjectsProps) => {
  const featured = getFeaturedProject(projectsData)
  const secondary = getSecondaryProjects(projectsData)

  return (
    <section
      id="projects"
      style={{
        padding: "7rem 2rem",
        background: darkMode ? "rgba(42,43,90,0.3)" : "rgba(228,228,248,0.3)",
        position: "relative",
      }}
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
            Selected Work
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
            Things I've{" "}
            <span style={{ color: "var(--accent)" }}>shipped.</span>
          </h2>
        </motion.div>

        {/* Featured project — large card */}
        <motion.div
          {...fadeUp(0.1)}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "2.5rem",
            marginBottom: "1.5rem",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          {/* Background accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${featured.typeColor}18 0%, transparent 70%)`,
              transform: "translate(30%, -30%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "2rem",
              alignItems: "start",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div>
              {/* Badge + year */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "999px",
                    background: `${featured.typeColor}18`,
                    color: featured.typeColor,
                    border: `1px solid ${featured.typeColor}30`,
                  }}
                >
                  {featured.type}
                </span>
                <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{featured.year}</span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    background: "var(--accent)",
                    color: "#fff",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                  }}
                >
                  Featured
                </span>
              </div>

              <h3
                style={{
                  fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                  fontWeight: 700,
                  color: "var(--text)",
                  margin: "0 0 0.75rem",
                  lineHeight: 1.2,
                }}
              >
                {featured.title}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.75, maxWidth: "520px", margin: "0 0 1.5rem" }}>
                {featured.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "0.25rem 0.65rem",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      border: "1px solid var(--border)",
                      color: "var(--muted)",
                      background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", paddingTop: "0.5rem" }}>
              <motion.a
                href={featured.liveUrl}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                <ArrowUpRight size={18} />
              </motion.a>
              <motion.a
                href={featured.githubUrl}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--muted)",
                  textDecoration: "none",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Secondary projects grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {secondary.map((project, i) => (
            <motion.div
              key={project.id}
              {...fadeUp(0.15 + i * 0.08)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "1.75rem",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${project.typeColor}12 0%, transparent 70%)`,
                  transform: "translate(30%, -30%)",
                  pointerEvents: "none",
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "999px",
                        background: `${project.typeColor}18`,
                        color: project.typeColor,
                        border: `1px solid ${project.typeColor}30`,
                      }}
                    >
                      {project.type}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{project.year}</span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <motion.a href={project.liveUrl} whileHover={{ scale: 1.1 }} style={{ color: "var(--muted)", textDecoration: "none" }}>
                      <ExternalLink size={15} />
                    </motion.a>
                    <motion.a href={project.githubUrl} whileHover={{ scale: 1.1 }} style={{ color: "var(--muted)", textDecoration: "none" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                    </motion.a>
                  </div>
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text)", margin: "0 0 0.6rem", lineHeight: 1.2 }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7, margin: "0 0 1.25rem" }}>
                  {project.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "0.2rem 0.55rem",
                        borderRadius: "999px",
                        fontSize: "0.72rem",
                        border: "1px solid var(--border)",
                        color: "var(--muted)",
                        background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #projects > div > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
          #projects > div > div:nth-child(3) > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Projects