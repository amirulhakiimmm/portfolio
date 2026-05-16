import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"

const SECTIONS = [
  { id: "home",     label: "Home" },
  { id: "about",   label: "About" },
  { id: "projects",label: "Projects" },
  { id: "contact", label: "Contact" },
]

interface ScrollNavigatorProps {
  darkMode?: boolean
}

const ScrollNavigator = ({ darkMode = true }: ScrollNavigatorProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Focal line = 40% down the viewport.
      // The active section is the LAST one whose top edge has crossed
      // above that line — so a tall Projects section stays active even
      // when Contact is starting to peek in at the bottom.
      const focalY = window.innerHeight * 0.85

      let best = 0
      SECTIONS.forEach(({ id }, i) => {
        const el = document.getElementById(id)
        if (!el) return
        const top = el.getBoundingClientRect().top
        if (top <= focalY) best = i
      })

      setActiveIndex(best)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = useCallback(() => {
    const next = (activeIndex + 1) % SECTIONS.length
    const target = document.getElementById(SECTIONS[next].id)
    if (target) target.scrollIntoView({ behavior: "smooth" })
  }, [activeIndex])

  const R = 18
  const CIRC = 2 * Math.PI * R
  const isLast = activeIndex === SECTIONS.length - 1
  const progress = activeIndex / (SECTIONS.length - 1)
  const dashOffset = CIRC * (1 - progress)

  return (
    <>
      <div
        className="scroll-nav"
        style={{
          position: "fixed",
          right: "1.25rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {/* Dots */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "0.55rem",
            marginBottom: "1rem",
            position: "relative",
          }}
        >
          {SECTIONS.map(({ label }, i) => {
            const isActive = i === activeIndex
            return (
              <button
                key={label}
                onClick={() =>
                  document
                    .getElementById(SECTIONS[i].id)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                title={label}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  flexDirection: "row-reverse",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    right: "calc(100% + 10px)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: darkMode
                      ? "rgba(255,255,255,0.55)"
                      : "rgba(0,0,0,0.45)",
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateX(0)" : "translateX(6px)",
                    transition: "opacity 0.3s, transform 0.3s",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                  }}
                >
                  {label}
                </span>

                <motion.span
                  animate={{
                    width: isActive ? "20px" : "6px",
                    height: "6px",
                    borderRadius: "99px",
                    background: isActive
                      ? "var(--accent, #6366f1)"
                      : darkMode
                      ? "rgba(255,255,255,0.25)"
                      : "rgba(0,0,0,0.2)",
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "inline-block" }}
                />
              </button>
            )
          })}
        </div>

        {/* Circle progress button */}
        <button
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            all: "unset",
            cursor: "pointer",
            position: "relative",
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
          >
            <circle
              cx="22" cy="22" r={R} fill="none"
              stroke={darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
              strokeWidth="1.5"
            />
            <motion.circle
              cx="22" cy="22" r={R} fill="none"
              stroke="var(--accent, #6366f1)"
              strokeWidth="2" strokeLinecap="round"
              strokeDasharray={CIRC}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>

          <motion.span
            animate={{ rotate: isLast ? 180 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              display: "flex",
              color: hovered
                ? "var(--accent, #6366f1)"
                : darkMode
                ? "rgba(255,255,255,0.6)"
                : "rgba(0,0,0,0.5)",
              transition: "color 0.25s",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M2.5 4.5L6.5 8.5L10.5 4.5"
                stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .scroll-nav { display: none !important; }
        }
      `}</style>
    </>
  )
}

export default ScrollNavigator