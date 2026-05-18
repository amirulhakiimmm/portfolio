import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Tag, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import type { Project } from "../types/Project"
import { projectsData } from "../data/Projectsdata"
import { getFeaturedProject, getSecondaryProjects } from "../hooks/PortfolioController"

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

const ProjectModal = ({
  project,
  darkMode,
  onClose,
}: {
  project: Project
  darkMode: boolean
  onClose: () => void
}) => {
  const [activeImg, setActiveImg] = useState(0)
  const images = project.images ?? []

  const prev = useCallback(() => setActiveImg((i) => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setActiveImg((i) => (i + 1) % images.length), [images.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose, prev, next])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.78)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        overflowY: "auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: darkMode ? "#13131f" : "#ffffff",
          borderRadius: "20px",
          maxWidth: "820px",
          width: "100%",
          overflow: "hidden",
          border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
          position: "relative",
          maxHeight: "92vh",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "1rem", right: "1rem", zIndex: 10,
            width: "36px", height: "36px", borderRadius: "50%",
            background: darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: darkMode ? "#fff" : "#000",
          }}
        >
          <X size={16} />
        </button>

        <div className="modal-gallery" style={{ position: "relative", background: "#0a0a14", overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImg}
              src={images[activeImg]}
              alt={`${project.title} screenshot ${activeImg + 1}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </AnimatePresence>

          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "120px",
              background: `linear-gradient(transparent, ${darkMode ? "#13131f" : "#ffffff"})`,
              pointerEvents: "none",
            }}
          />

          {images.length > 1 && (
            <>
              <button onClick={prev} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(0,0,0,0.45)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", backdropFilter: "blur(4px)" }}>
                <ChevronLeft size={15} />
              </button>
              <button onClick={next} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(0,0,0,0.45)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", backdropFilter: "blur(4px)" }}>
                <ChevronRight size={15} />
              </button>
            </>
          )}

          <div style={{ position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px" }}>
            {images.map((_, i) => (
              <button key={i} onClick={() => setActiveImg(i)} style={{ width: i === activeImg ? "20px" : "6px", height: "6px", borderRadius: "999px", background: i === activeImg ? project.typeColor : "rgba(255,255,255,0.35)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", padding: "0.75rem 1.25rem", overflowX: "auto", scrollbarWidth: "none" }}>
          {images.map((img, i) => (
            <button key={i} onClick={() => setActiveImg(i)} style={{ flexShrink: 0, width: "64px", height: "44px", borderRadius: "8px", overflow: "hidden", border: i === activeImg ? `2px solid ${project.typeColor}` : "2px solid transparent", cursor: "pointer", padding: 0, transition: "border-color 0.2s" }}>
              <img src={img} alt={`thumb ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </button>
          ))}
        </div>

        <div className="modal-content-pad">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.2rem 0.7rem", borderRadius: "999px", background: `${project.typeColor}20`, color: project.typeColor, border: `1px solid ${project.typeColor}35` }}>
                  {project.type}
                </span>
                <span style={{ fontSize: "0.78rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Calendar size={12} /> {project.year}
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(1.2rem, 4vw, 1.9rem)", fontWeight: 700, color: "var(--text)", margin: 0, lineHeight: 1.15 }}>
                {project.title}
              </h2>
            </div>

            <motion.a
              href={project.githubUrl}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", borderRadius: "10px", border: "1px solid var(--border)", background: "transparent", color: "var(--muted)", textDecoration: "none", fontSize: "0.78rem", fontWeight: 600 }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              Code
            </motion.a>
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", padding: "1rem", borderRadius: "12px", background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", border: "1px solid var(--border)", marginBottom: "1.5rem" }}>
            {[
              { label: "Role", value: project.role },
              { label: "Duration", value: project.duration },
              { label: "Stack", value: project.tags.slice(0, 2).join(", ") },
            ].map(({ label, value }) => (
              <div key={label} style={{ flex: "1 1 120px" }}>
                <p style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 2px" }}>{label}</p>
                <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text)", margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.85, margin: "0 0 1.75rem" }}>
            {project.longDescription}
          </p>

          {project.highlights?.length > 0 && (
            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: project.typeColor, marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ display: "inline-block", width: "18px", height: "1px", background: project.typeColor }} />
                Key Highlights
              </p>
              <div className="highlights-grid">
                {project.highlights.map((h) => (
                  <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", padding: "0.75rem 0.9rem", borderRadius: "10px", background: `${project.typeColor}0d`, border: `1px solid ${project.typeColor}25` }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: project.typeColor, flexShrink: 0, marginTop: "5px" }} />
                    <span style={{ fontSize: "0.82rem", color: "var(--text)", lineHeight: 1.55 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "1.5rem" }}>
            <Tag size={13} style={{ color: "var(--muted)", marginTop: "2px" }} />
            {project.tags.map((tag) => (
              <span key={tag} style={{ padding: "0.25rem 0.65rem", borderRadius: "999px", fontSize: "0.74rem", border: "1px solid var(--border)", color: "var(--muted)", background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const GithubIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
)

const Projects = ({ darkMode }: ProjectsProps) => {
  const featured = getFeaturedProject(projectsData)
  const secondary = getSecondaryProjects(projectsData)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section
      id="projects"
      style={{
        padding: "7rem 1.25rem",
        background: darkMode ? "rgba(42,43,90,0.3)" : "rgba(228,228,248,0.3)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <motion.div {...fadeUp(0)} style={{ marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.22em", color: "var(--accent)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--accent)" }} />
            Selected Work
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 3.2rem)", fontWeight: 700, color: "var(--text)", margin: 0, lineHeight: 1.1 }}>
            Things I've <span style={{ color: "var(--accent)" }}>shipped.</span>
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp(0.1)}
          onClick={() => setSelectedProject(featured)}
          style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: "20px", marginBottom: "1.25rem",
            position: "relative", overflow: "hidden", cursor: "pointer",
          }}
        >
          <div className="cover-img-wrap cover-img-wrap--featured" style={{ position: "relative", overflow: "hidden" }}>
            <img src={featured.coverImage} alt={featured.title} className="cover-img" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 30%, ${darkMode ? "#1a1b3a" : "#f8f8ff"} 100%)`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "1rem", left: "1rem", display: "flex", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.25rem 0.75rem", borderRadius: "999px", background: `${featured.typeColor}cc`, color: "#fff", backdropFilter: "blur(6px)", border: `1px solid ${featured.typeColor}` }}>
                {featured.type}
              </span>
              <span style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.25rem 0.75rem", borderRadius: "999px", background: "rgba(0,0,0,0.45)", color: "#fff", backdropFilter: "blur(6px)" }}>
                ✦ Featured
              </span>
            </div>
          </div>

          <div className="featured-body">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{featured.year}</span>
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--muted)" }} />
                <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{featured.duration}</span>
              </div>
              <motion.a
                href={featured.githubUrl}
                onClick={(e) => e.stopPropagation()}
                whileTap={{ scale: 0.9 }}
                style={{ width: "34px", height: "34px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", textDecoration: "none" }}
              >
                <GithubIcon size={14} />
              </motion.a>
            </div>

            <h3 className="featured-title" style={{ fontWeight: 700, color: "var(--text)", margin: "0 0 0.65rem", lineHeight: 1.2 }}>
              {featured.title}
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.75, margin: "0 0 1rem" }}>
              {featured.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {featured.tags.map((tag) => (
                <span key={tag} style={{ padding: "0.22rem 0.6rem", borderRadius: "999px", fontSize: "0.73rem", border: "1px solid var(--border)", color: "var(--muted)", background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}>
                  {tag}
                </span>
              ))}
            </div>

            <p style={{ marginTop: "1rem", marginBottom: 0, fontSize: "0.68rem", color: "var(--muted)", letterSpacing: "0.08em", opacity: 0.6 }}>
              Tap to explore →
            </p>
          </div>
        </motion.div>

        <div className="secondary-grid">
          {secondary.map((project, i) => (
            <motion.div
              key={project.id}
              {...fadeUp(0.15 + i * 0.08)}
              onClick={() => setSelectedProject(project)}
              style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: "16px", position: "relative", overflow: "hidden", cursor: "pointer",
              }}
            >
              
              <div className="cover-img-wrap cover-img-wrap--secondary" style={{ position: "relative", overflow: "hidden" }}>
                <img src={project.coverImage} alt={project.title} className="cover-img" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 40%, ${darkMode ? "#1a1b3a" : "#f8f8ff"} 100%)`, pointerEvents: "none" }} />
                <span style={{ position: "absolute", top: "0.75rem", left: "0.75rem", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "999px", background: `${project.typeColor}cc`, color: "#fff", backdropFilter: "blur(6px)" }}>
                  {project.type}
                </span>
              </div>

              <div style={{ padding: "1.1rem 1.25rem 1.5rem", position: "relative" }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: "120px", height: "120px", borderRadius: "50%", background: `radial-gradient(circle, ${project.typeColor}10 0%, transparent 70%)`, transform: "translate(30%, -30%)", pointerEvents: "none" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                  <span style={{ fontSize: "0.73rem", color: "var(--muted)" }}>{project.year}</span>
                  <motion.a href={project.githubUrl} onClick={(e) => e.stopPropagation()} whileTap={{ scale: 0.9 }} style={{ color: "var(--muted)", textDecoration: "none" }}>
                    <GithubIcon size={14} />
                  </motion.a>
                </div>

                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text)", margin: "0 0 0.45rem", lineHeight: 1.25 }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.65, margin: "0 0 0.85rem" }}>
                  {project.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={{ padding: "0.18rem 0.5rem", borderRadius: "999px", fontSize: "0.7rem", border: "1px solid var(--border)", color: "var(--muted)", background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} darkMode={darkMode} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <style>{`
        /* ── Image heights ── */
        .cover-img-wrap--featured  { height: clamp(160px, 45vw, 280px); }
        .cover-img-wrap--secondary { height: clamp(120px, 32vw, 170px); }
        .modal-gallery             { height: clamp(180px, 48vw, 340px); }

        /* ── CSS hover scale (pointer devices only) ── */
        @media (hover: hover) and (pointer: fine) {
          .cover-img-wrap:hover .cover-img { transform: scale(1.04); }
        }
        .cover-img { transition: transform 0.5s ease; }

        /* ── Featured card body ── */
        .featured-body {
          padding: 1.25rem 1.5rem 1.75rem;
        }
        .featured-title {
          font-size: clamp(1.2rem, 4vw, 2rem);
        }

        /* ── Secondary grid ── */
        .secondary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        /* ── Modal content padding ── */
        .modal-content-pad {
          padding: 0 1.5rem 2rem;
        }

        /* ── Highlights grid ── */
        .highlights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
        }

        /* ── MOBILE ── */
        @media (max-width: 640px) {
          /* Remove section side padding — control it only via inner div */
          #projects {
            padding: 4rem 0 !important;
          }

          /* Uniform 1rem on both sides for ALL content */
          #projects > div {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }

          /* Secondary: 1 column */
          .secondary-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }

          /* Featured card body — same 1rem horizontal as section */
          .featured-body {
            padding: 1rem 1rem 1.25rem !important;
          }

          /* Secondary card body — same 1rem horizontal */
          .secondary-grid > div > div:last-child {
            padding: 1rem 1rem 1.25rem !important;
          }

          /* Modal padding */
          .modal-content-pad {
            padding: 0 1rem 1.5rem !important;
          }

          /* Highlights: 1 column */
          .highlights-grid {
            grid-template-columns: 1fr !important;
          }

          /* Image heights */
          .cover-img-wrap--featured  { height: clamp(140px, 52vw, 220px) !important; }
          .cover-img-wrap--secondary { height: clamp(110px, 40vw, 160px) !important; }
          .modal-gallery             { height: clamp(160px, 52vw, 260px) !important; }
        }
      `}</style>
    </section>
  )
}

export default Projects