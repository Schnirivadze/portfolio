import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import "./Header.css";

const SECTIONS = ["about", "education", "projects", "rides", "hikes", "contact"];

export default function Header() {
  const { t, lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jumpTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`header ${scrolled ? "header-scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <button className="header-brand" onClick={() => jumpTo("top")}>
          AS
        </button>

        <nav className="header-nav">
          {SECTIONS.map((id) => (
            <button key={id} onClick={() => jumpTo(id)}>
              {t.nav[id]}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button className="header-pill header-pill-lang" onClick={toggleLang}>
            {t.languageToggle[lang === "en" ? "de" : "en"]}
          </button>
          <button className="header-pill" onClick={toggleTheme}>
            {theme === "light" ? "\u2600" : "\u263E"}
          </button>
          <button className="header-burger" onClick={() => setMenuOpen(true)}>
            {"\u2630"}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="header-mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <button className="header-close" onClick={() => setMenuOpen(false)}>
              {"\u2715"}
            </button>
            {SECTIONS.map((id) => (
              <button key={id} onClick={() => jumpTo(id)}>
                {t.nav[id]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
