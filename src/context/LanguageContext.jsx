import { createContext, useContext, useState, useMemo } from "react";
import data from "../data/data.json";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("lang");
    if (saved) return saved;
    return navigator.language?.startsWith("de") ? "de" : "en";
  });

  const toggleLang = () => {
    const next = lang === "en" ? "de" : "en";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  // t is just the whole language tree, components destructure what they need
  const t = useMemo(() => data[lang], [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
