import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import "./About.css";

export default function About() {
  const { t } = useLanguage();
  const a = t.about;
  const [ref, visible] = useReveal();

  return (
    <section id="about" className="section about" ref={ref}>
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
      >
        {a.eyebrow}
      </motion.p>

      <div className="about-grid">
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: -24 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <h2>{a.title}</h2>
          <p>{a.paragraphOne}</p>
          <p>{a.paragraphTwo}</p>
        </motion.div>

        <motion.div
          className="about-side"
          initial={{ opacity: 0, x: 24 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="about-card">
            <h3>{a.languagesTitle}</h3>
            <ul className="language-list">
              {a.languages.map((l) => (
                <li key={l.name}>
                  <span>{l.name}</span>
                  <span className="language-level">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-card">
            <h3>{a.skillsTitle}</h3>
            <div className="skill-tags">
              {a.skills.map((s) => (
                <span key={s} className="skill-tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
