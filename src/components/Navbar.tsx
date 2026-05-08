import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Menu, X } from "lucide-react"

interface NavbarProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { name: "Home",     href: "#home" },
    { name: "About",    href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact",  href: "#contact" },
  ]

  useEffect(() => {
    const sectionIds = navItems.map(item => item.name.toLowerCase())
    const observers: IntersectionObserver[] = []

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(obs => obs.disconnect())
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "0.85rem 1.5rem",
          pointerEvents: "none",   
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "0.55rem 0.75rem 0.55rem 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "16px",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            background: darkMode
              ? "rgba(12,12,18,0.75)"
              : "rgba(245,245,248,0.8)",
            border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
            boxShadow: scrolled
              ? darkMode
                ? "0 4px 32px rgba(0,0,0,0.5)"
                : "0 4px 24px rgba(0,0,0,0.1)"
              : "none",
            transition: "box-shadow 0.3s ease, background 0.3s ease",
            pointerEvents: "auto",   /* re-enable clicks on the pill */
          }}
        >
          {/* LOGO */}
          <div
            style={{
              fontWeight: 700,
              fontSize: "0.88rem",
              letterSpacing: "0.08em",
              color: "var(--text)",
              userSelect: "none",
            }}
          >
            A.HAKIM
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.15rem",
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.name.toLowerCase()
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveSection(item.name.toLowerCase())}
                  style={{
                    position: "relative",
                    padding: "0.4rem 0.95rem",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontSize: "0.83rem",
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? "var(--text)" : "var(--muted)",
                    background: isActive
                      ? darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"
                      : "transparent",
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "10px",
                        background: darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                </a>
              )
            })}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--muted)",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={darkMode ? "moon" : "sun"}
                  initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "flex" }}
                >
                  {darkMode ? <Moon size={16} strokeWidth={1.8} /> : <Sun size={16} strokeWidth={1.8} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <motion.button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              whileTap={{ scale: 0.9 }}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                display: "none",  
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--text)",
              }}
            >
              {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              style={{ position: "fixed", inset: 0, zIndex: 40 }}
            />
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{
                position: "fixed",
                top: "72px",
                right: "1.5rem",
                zIndex: 49,
                background: darkMode ? "rgba(12,12,18,0.97)" : "rgba(250,250,252,0.97)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                borderRadius: "14px",
                padding: "0.6rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
                minWidth: "160px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
              }}
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.name.toLowerCase()
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setActiveSection(item.name.toLowerCase())
                      setIsMenuOpen(false)
                    }}
                    style={{
                      textDecoration: "none",
                      color: isActive ? "var(--text)" : "var(--muted)",
                      fontSize: "0.88rem",
                      fontWeight: isActive ? 500 : 400,
                      padding: "0.55rem 0.85rem",
                      borderRadius: "8px",
                      background: isActive
                        ? darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)"
                        : "transparent",
                      transition: "background 0.15s, color 0.15s",
                    }}
                  >
                    {item.name}
                  </a>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        /* Reserve space so content isn't hidden under fixed nav */
        body { padding-top: 0; }

        .desktop-nav { display: flex; }
        .mobile-menu-btn { display: none !important; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}

export default Navbar