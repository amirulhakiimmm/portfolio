import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { matchFAQ, createMessage, getQuickReplies } from "../controllers/portfolioController"
import type { BotMessage } from "../controllers/portfolioController"

interface ChatBotProps {
  darkMode: boolean
}

const ChatBot = ({ darkMode }: ChatBotProps) => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<BotMessage[]>([
    createMessage("bot", "Hey! 👋 I'm Hakim's portfolio assistant. Ask me anything about his skills, projects, or how to hire him!"),
  ])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const quickReplies = getQuickReplies()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const sendMessage = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg = createMessage("user", trimmed)
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const answer = matchFAQ(trimmed)
      const botMsg = createMessage("bot", answer)
      setMessages((prev) => [...prev, botMsg])
      setTyping(false)
    }, 700 + Math.random() * 400)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setOpen((p) => !p)}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          background: "var(--accent)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          zIndex: 1000,
          boxShadow: "0 8px 32px rgba(123,127,212,0.35)",
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={20} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread dot */}
        {!open && (
          <span
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#4ade80",
              border: "2px solid var(--accent)",
            }}
          />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              bottom: "6rem",
              right: "2rem",
              width: "clamp(300px, 90vw, 360px)",
              height: "480px",
              background: darkMode ? "#1A1B3A" : "#F8F8FC",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              zIndex: 999,
              overflow: "hidden",
              boxShadow: darkMode
                ? "0 24px 64px rgba(0,0,0,0.5)"
                : "0 24px 64px rgba(30,31,75,0.15)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "1rem 1.25rem",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "var(--surface)",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                <Bot size={18} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 600, color: "var(--text)" }}>
                  Hakim's Assistant
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                  <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                scrollbarWidth: "thin",
                scrollbarColor: "var(--border) transparent",
              }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "82%",
                      padding: "0.65rem 0.9rem",
                      borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                      background: msg.role === "user" ? "var(--accent)" : "var(--surface)",
                      border: msg.role === "user" ? "none" : "1px solid var(--border)",
                      color: msg.role === "user" ? "#fff" : "var(--text)",
                      fontSize: "0.85rem",
                      lineHeight: 1.55,
                    }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <div
                    style={{
                      padding: "0.65rem 1rem",
                      borderRadius: "12px 12px 12px 2px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "var(--muted)",
                          display: "inline-block",
                          animation: `typingDot 1.2s ${i * 0.2}s ease-in-out infinite`,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Quick replies — show only at start */}
              {messages.length === 1 && !typing && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
                  {quickReplies.map((qr) => (
                    <motion.button
                      key={qr}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => sendMessage(qr)}
                      style={{
                        padding: "0.5rem 0.85rem",
                        borderRadius: "999px",
                        border: "1px solid var(--border)",
                        background: "transparent",
                        color: "var(--muted)",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                        textAlign: "left",
                        fontFamily: "inherit",
                        transition: "border-color 0.2s, color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--accent)"
                        e.currentTarget.style.color = "var(--accent)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)"
                        e.currentTarget.style.color = "var(--muted)"
                      }}
                    >
                      {qr}
                    </motion.button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              style={{
                padding: "0.75rem 1rem",
                borderTop: "1px solid var(--border)",
                display: "flex",
                gap: "0.5rem",
                background: "var(--surface)",
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                style={{
                  flex: 1,
                  padding: "0.65rem 0.85rem",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                  color: "var(--text)",
                  fontSize: "0.85rem",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || typing}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: input.trim() ? "var(--accent)" : "var(--border)",
                  border: "none",
                  cursor: input.trim() ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  flexShrink: 0,
                  transition: "background 0.2s",
                }}
              >
                <Send size={14} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  )
}

export default ChatBot