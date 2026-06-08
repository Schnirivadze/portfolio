import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import "./Header.css";

const SECTIONS = ["about", "education", "projects", "rides", "hikes", "contact"];

export default function Header() {
  const { t, lang, setLang, locales } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jumpTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const pickLocale = (code) => {
    setLang(code);
    setPickerOpen(false);
  };

  const currentFlag = locales.find((l) => l.code === lang)?.flag;

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

        <div className="header-nav-slot">
          <AnimatePresence mode="wait">
            {pickerOpen ? (
              <motion.div
                key="picker"
                className="header-nav header-locale-picker"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {locales.map((l) => (
                  <button key={l.code} onClick={() => pickLocale(l.code)} title={l.label} className="header-flag-btn">
                    {l.flag}
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.nav
                key="nav"
                className="header-nav"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {SECTIONS.map((id) => (
                  <button key={id} onClick={() => jumpTo(id)}>
                    {t.nav[id]}
                  </button>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>

        <div className="header-actions">
          <button
            className="header-pill header-pill-lang"
            onClick={() => setPickerOpen((v) => !v)}
          >
            {currentFlag}
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
            <div className="header-mobile-locales">
              {locales.map((l) => (
                <button
                  key={l.code}
                  className={`header-flag-btn ${l.code === lang ? "header-flag-btn-active" : ""}`}
                  onClick={() => setLang(l.code)}
                  title={l.label}
                >
                  {l.flag}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
