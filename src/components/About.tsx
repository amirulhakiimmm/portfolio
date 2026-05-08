import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { aboutData } from "../data/portfolioData";
import { groupSkillsByCategory } from "../controllers/portfolioController";
import Lanyard from "./Lanyard";

interface AboutProps {
  darkMode: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const breakingItems = [
  "STRICT MODE ADVOCATE",
  "POSTGRESQL & REDIS POWER USER",
  "DOCKER CONTAINER ENTHUSIAST",
  "TYPE-SAFE EVERYTHING",
  "OPEN SOURCE CONTRIBUTOR",
];

const statusItems = [
  "COMMITS: 312",
  "CORE WEB VITALS: ALL GREEN",
  "BUNDLE SIZE: -12% VS LAST SPRINT",
  "LAST DEPLOY: 2H AGO",
  "UPTIME: 99.9%",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: EASE },
});

const About = ({ darkMode }: AboutProps) => {
  const skills = groupSkillsByCategory(aboutData.skills);
  const clockRef = useRef<HTMLSpanElement>(null);
  return (
    <section
      id="about"
      style={{
        padding: "7rem 2rem",
        maxWidth: "1100px",
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 16px",
          borderBottom: "1px solid var(--border)",
          fontSize: "10px",
          letterSpacing: "0.18em",
          color: "var(--muted)",
          fontFamily: "var(--font-mono, monospace)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            color: "var(--text)",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#e04040",
              animation: "blink 1.2s ease-in-out infinite",
              display: "inline-block",
            }}
          />
          LIVE PORTFOLIO FEED
        </div>
        <span>EST. 2024 · FULL-STACK ENGINEER</span>
        <span
          ref={clockRef}
          style={{ color: "var(--accent)", letterSpacing: "0.2em" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          borderBottom: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "var(--accent)",
            color: "#000",
            fontFamily: "var(--font-mono, monospace)",
            fontWeight: 600,
            fontSize: "11px",
            letterSpacing: "0.18em",
            padding: "7px 14px",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          BREAKING
        </div>
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
            style={{
              display: "inline-flex",
              gap: "3rem",
              whiteSpace: "nowrap",
              fontSize: "11px",
              letterSpacing: "0.16em",
              color: "var(--text)",
              padding: "7px 0",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            {[...breakingItems, ...breakingItems].map((item, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "1.5rem",
                }}
              >
                {item}
                <span style={{ color: "var(--accent)" }}>◆</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div {...fadeUp(0)}>
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 700,
            color: "var(--text)",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Crafting digital experiences
          <br />
          <span style={{ color: "var(--accent)" }}>with purpose.</span>
        </h2>
      </motion.div>

      <div className="about-grid">
        <motion.div
          {...fadeUp(0.1)}
          style={{
            position: "relative",
            width: "100%",
            minHeight: "520px",
            overflow: "visible",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "visible",
            }}
          >
            <Lanyard />
          </div>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <motion.p
            {...fadeUp(0.15)}
            style={{
              fontSize: "0.95rem",
              color: "var(--muted)",
              lineHeight: 1.85,
            }}
          >
            {aboutData.summary}
          </motion.p>

          <motion.div
            {...fadeUp(0.2)}
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
          >
            {aboutData.highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0.65rem",
                  fontSize: "0.875rem",
                  color: "var(--muted)",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    marginTop: "0.45rem",
                    flexShrink: 0,
                  }}
                />
                {h}
              </div>
            ))}
          </motion.div>

          <motion.div
            {...fadeUp(0.25)}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
              borderTop: "1px solid var(--border)",
              paddingTop: "1rem",
            }}
          >
            {aboutData.stats.map(({ num, label }) => (
              <div key={label}>
                <p
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    margin: 0,
                  }}
                >
                  {num}
                </p>
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div style={{ padding: "18px 20px 0" }}>
        {skills.map(({ category, items }, i) => (
          <div
            key={category}
            style={{ overflow: "hidden", marginBottom: "10px" }}
          >
            <div
              style={{
                fontSize: "9px",
                letterSpacing: "0.2em",
                color: "var(--accent)",
                textTransform: "uppercase",
                marginBottom: "6px",
                borderLeft: "2px solid var(--accent)",
                paddingLeft: "8px",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              {category}
            </div>
            <div style={{ overflow: "hidden" }}>
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 18 + i * 3,
                  ease: "linear",
                }}
                style={{
                  display: "flex",
                  whiteSpace: "nowrap",
                  width: "max-content",
                }}
              >
                {[...items, ...items, ...items, ...items].map((item, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "4px 14px",
                      border: "1px solid var(--border)",
                      borderRadius: "999px",
                      fontSize: "10px",
                      letterSpacing: "0.06em",
                      color: "var(--muted)",
                      background: darkMode
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(0,0,0,0.03)",
                      fontFamily: "var(--font-mono, monospace)",
                      flexShrink: 0, 
                    }}
                  >
                    <span
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "var(--accent)",
                        marginRight: "6px",
                      }}
                    />
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: "18px",
          borderTop: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
          style={{
            display: "inline-flex",
            gap: "3rem",
            whiteSpace: "nowrap",
            fontSize: "9px",
            letterSpacing: "0.18em",
            color: "var(--muted)",
            padding: "7px 0",
            alignItems: "center",
            fontFamily: "var(--font-mono, monospace)",
          }}
        >
          {[...statusItems, ...statusItems].map((item, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "1.5rem",
              }}
            >
              {item}
              <span style={{ color: "var(--accent)" }}>◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
