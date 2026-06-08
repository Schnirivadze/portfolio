import { createContext, useContext, useState, useMemo } from "react";
import data from "../data/data.json";

const LanguageContext = createContext(null);

// every top-level key except "meta" is a locale - add a language by adding a block, nothing else
const LOCALES = Object.keys(data).filter((key) => key !== "meta");

function detectDefaultLocale() {
  const saved = localStorage.getItem("lang");
  if (saved && LOCALES.includes(saved)) return saved;

  const browserLang = navigator.language?.slice(0, 2);
  if (browserLang && LOCALES.includes(browserLang)) return browserLang;

  return LOCALES[0];
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectDefaultLocale);

  const setLang = (code) => {
    if (!LOCALES.includes(code)) return;
    setLangState(code);
    localStorage.setItem("lang", code);
  };

  const t = useMemo(() => data[lang], [lang]);

  const locales = useMemo(
    () => LOCALES.map((code) => ({ code, ...data.meta[code] })),
    []
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, locales }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
