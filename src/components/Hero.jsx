import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import "./Hero.css";

const wordVariants = {
  hidden: { y: "110%" },
  visible: (i) => ({
    y: "0%",
    transition: { delay: 0.15 + i * 0.05, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

export default function Hero() {
  const { t } = useLanguage();
  const nameWords = t.hero.name.split(" ");

  const jumpTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="top" className="hero">
      <div className="hero-inner">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {t.hero.eyebrow}
        </motion.p>

        <h1 className="hero-name">
          {nameWords.map((word, i) => (
            <span className="hero-word-mask" key={word}>
              <motion.span
                className="hero-word"
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.h2
          className="hero-role"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {t.hero.role}
        </motion.h2>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <button className="btn btn-primary" onClick={() => jumpTo("contact")}>
            {t.hero.primaryButton}
          </button>
          <button className="btn btn-ghost" onClick={() => jumpTo("projects")}>
            {t.hero.secondaryButton}
          </button>
          <a className="btn btn-ghost hero-cv-link" href={t.hero.cvButtonHref} download>
            {t.hero.cvButton} {"\u2193"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
