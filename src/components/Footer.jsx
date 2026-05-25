import { useLanguage } from "../context/LanguageContext";
import "./Footer.css";

export default function Footer() {
  const { t } = useLanguage();

  const jumpToTop = () => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="footer">
      <span>{t.footer.builtWith}</span>
      <button onClick={jumpToTop}>{t.footer.backToTop}</button>
    </footer>
  );
}
