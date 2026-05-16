import { motion } from "framer-motion";
import { aboutData } from "../data/Aboutdata";
import { groupSkillsByCategory, getHeroFeed } from "../hooks/PortfolioController";
import Lanyard from "./Lanyard";
import { SKILL_ICON, CATEGORY_META } from "../config/Skillsconfig";

interface AboutProps {
  darkMode: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: "-80px" },
  transition: { duration: 0.7, delay, ease: EASE },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease: EASE },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease: EASE },
});

const About = ({ darkMode }: AboutProps) => {
  const { breakingItems } = getHeroFeed();
  const skills = groupSkillsByCategory(aboutData.skills);

  return (
    <section
      id="about"
      style={{
        padding: "1rem 2rem",
        maxWidth: "1080px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* TOP TICKER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{
          border: "1px solid var(--border)",
          borderRadius: "16px",
          overflow: "hidden",
          marginBottom: "1rem",
          background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid var(--border)" }}>
          <div
            style={{
              padding: "0.85rem 1.2rem",
              background: "var(--accent)",
              color: "#000",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            LIVE
          </div>
          <div style={{ overflow: "hidden", flex: 1 }}>
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              style={{
                display: "inline-flex",
                whiteSpace: "nowrap",
                gap: "3rem",
                padding: "0.85rem 0",
                fontSize: "0.72rem",
                letterSpacing: "0.15em",
                fontFamily: "var(--font-mono, monospace)",
                color: "var(--muted)",
              }}
            >
              {[...breakingItems, ...breakingItems].map((item, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "1.5rem" }}>
                  {item}
                  <span style={{ color: "var(--accent)" }}>◆</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* HERO HEADING */}
      <motion.div {...fadeUp(0)} style={{ marginBottom: "5rem" }}>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            fontSize: "0.75rem",
            marginBottom: "1rem",
            fontFamily: "var(--font-mono, monospace)",
          }}
        >
          ABOUT ME
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            fontSize: "clamp(1.8rem, 6vw, 3.2rem)",
            lineHeight: 1.1,
            margin: 0,
            color: "var(--text)",
            fontWeight: 700,
          }}
        >
          Building digital
          <br />
          experiences with
          <span style={{ color: "var(--accent)" }}> purpose.</span>
        </motion.h2>
      </motion.div>

      {/* MAIN GRID */}
      <div className="about-grid">
        {/* LEFT — Lanyard (desktop) / Photo (mobile) */}
        <motion.div
          {...fadeLeft(0.1)}
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              borderRadius: "20px",
              border: "1px solid var(--border)",
              background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
              backdropFilter: "blur(20px)",
              padding: "2rem",
              boxShadow: darkMode
                ? "0 20px 80px rgba(0,0,0,0.35)"
                : "0 20px 80px rgba(0,0,0,0.08)",
            }}
          >
            {/* 3D Lanyard — hidden on mobile */}
            <div className="lanyard-desktop">
              <Lanyard />
            </div>

            {/* Static photo — shown on mobile only */}
            <img
              className="lanyard-mobile"
              src="/hakim.jpeg"
              alt="Muhammad Amirul Hakim"
              style={{
                display: "none",
                width: "100%",
                borderRadius: "12px",
                objectFit: "cover",
                aspectRatio: "3 / 4",
              }}
            />
          </div>
        </motion.div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <motion.div {...fadeRight(0.2)}>
            <p style={{ fontSize: "1rem", lineHeight: 2, color: "var(--muted)", margin: 0 }}>
              {aboutData.summary}
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "1rem" }}>
            {aboutData.highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: EASE }}
                style={{
                  padding: "1rem",
                  borderRadius: "16px",
                  border: "1px solid var(--border)",
                  background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    marginBottom: "0.8rem",
                  }}
                />
                <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7 }}>
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.2rem", marginTop: "5rem" }}
        className="stats-grid"
      >
        {aboutData.stats.map(({ num, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            style={{
              padding: "2rem",
              borderRadius: "16px",
              border: "1px solid var(--border)",
              background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
              backdropFilter: "blur(16px)",
              transition: "box-shadow 0.3s ease",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "2.5rem", color: "var(--text)", fontWeight: 800 }}>{num}</h3>
            <p style={{ marginTop: "0.5rem", marginBottom: 0, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>
              {label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* SKILLS */}
      <div style={{ marginTop: "6rem" }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}
        >
          <div style={{ width: "40px", height: "1px", background: "var(--accent)" }} />
          <p style={{ margin: 0, fontSize: "0.75rem", letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase", fontFamily: "var(--font-mono, monospace)" }}>
            Technical Skills
          </p>
        </motion.div>

        <div className="skills-grid">
          {skills.map(({ category, items }, i) => {
            const meta = CATEGORY_META[category] ?? { icon: "ti-code", color: "var(--accent)" };
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
                whileHover={{
                  y: -6,
                  boxShadow: darkMode ? "0 16px 48px rgba(0,0,0,0.4)" : "0 16px 48px rgba(0,0,0,0.08)",
                }}
                style={{
                  borderRadius: "16px",
                  padding: "1.8rem",
                  border: "1px solid var(--border)",
                  background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                  backdropFilter: "blur(18px)",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
                  <i className={`ti ${meta.icon}`} aria-hidden="true" style={{ fontSize: "1.1rem", color: meta.color }} />
                  <h3 style={{ margin: 0, fontSize: "1rem", color: "var(--text)" }}>{category}</h3>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem" }}>
                  {items.map((item, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false, margin: "-40px" }}
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.4, delay: i * 0.1 + idx * 0.05, ease: EASE }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        padding: "0.5rem 0.9rem",
                        borderRadius: "999px",
                        border: "1px solid var(--border)",
                        background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                        fontSize: "0.8rem",
                        color: "var(--muted)",
                        cursor: "default",
                      }}
                    >
                      {SKILL_ICON[item] && (
                        <i className={`ti ${SKILL_ICON[item]}`} aria-hidden="true" style={{ fontSize: "0.85rem", color: meta.color }} />
                      )}
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 5rem;
          align-items: center;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.3rem;
        }

        .stats-grid {
          width: 100%;
        }

        /* TABLET */
        @media (max-width: 980px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .skills-grid {
            grid-template-columns: 1fr;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* PHONE */
        @media (max-width: 640px) {
          section#about {
            padding: 5rem 1rem !important;
          }

          section#about h2 {
            font-size: clamp(1.8rem, 8vw, 3.2rem) !important;
            line-height: 1.1 !important;
          }

          /* swap lanyard → photo */
          

          .about-grid > div:first-child > div {
            max-width: 320px !important;
            padding: 1rem !important;
            border-radius: 24px !important;
            margin: 0 auto;
          }

          .about-grid p {
            font-size: 0.92rem !important;
            line-height: 1.9 !important;
          }

          .about-grid > div:last-child > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 0.8rem !important;
          }

          .about-grid > div:last-child > div:nth-child(2) > div {
            padding: 0.9rem !important;
            border-radius: 16px !important;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 0.8rem !important;
            margin-top: 3rem !important;
          }

          .stats-grid > div {
            padding: 1.2rem !important;
            border-radius: 18px !important;
          }

          .stats-grid h3 {
            font-size: 1.8rem !important;
          }

          .skills-grid {
            gap: 1rem !important;
          }

          .skills-grid > div {
            padding: 1.2rem !important;
            border-radius: 18px !important;
          }

          .skills-grid h3 {
            font-size: 0.95rem !important;
            margin-bottom: 1rem !important;
          }

          .skills-grid span {
            padding: 0.55rem 0.8rem !important;
            font-size: 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;