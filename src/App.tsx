import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import AOS from 'aos'
import 'aos/dist/aos.css'
import Hero from "./components/Hero"
import About from "./components/About"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import ChatBot from "./components/ChatBot"
import ScrollNavigator from "./components/ScrollNavigator"

const App = () => {
    const [darkMode, setDarkMode] = useState(true)

    const toggleDarkMode = () => setDarkMode(prev => !prev)

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            offset: 100
        })
    }, [])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.removeAttribute('data-theme')
        } else {
            document.documentElement.setAttribute('data-theme', 'light')
        }
    }, [darkMode])
    

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: 'var(--bg)',
                color: 'var(--text)',
            }}
        >
            <Navbar
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
            />
            <Hero darkMode={darkMode} />
            <About darkMode={darkMode} />
            <Projects darkMode={darkMode} />
            <Contact darkMode={darkMode} />
            <ChatBot darkMode={darkMode} />
            <ScrollNavigator darkMode={darkMode} />

          
        </div>
    )
}

export default App