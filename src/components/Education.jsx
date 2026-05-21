import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import DetailModal from "./DetailModal";
import "./Education.css";

export default function Education() {
  const { t } = useLanguage();
  const e = t.education;
  const [ref, visible] = useReveal();
  const [active, setActive] = useState(null);

  return (
    <section id="education" className="section" ref={ref}>
      <p className="eyebrow">{e.eyebrow}</p>
      <h2 className="education-title">{e.title}</h2>

      <div className="education-list">
        {e.items.map((item, i) => (
          <motion.button
            key={item.institution + item.period}
            className="education-item"
            onClick={() => setActive(item)}
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <span className="education-period">{item.period}</span>
            <span className="education-main">
              <span className="education-institution">{item.institution}</span>
              <span className="education-degree">{item.degree}</span>
            </span>
            <span className="education-arrow">&rarr;</span>
          </motion.button>
        ))}
      </div>

      <DetailModal
        open={!!active}
        onClose={() => setActive(null)}
        eyebrow={active?.location}
        title={active?.institution}
        meta={active ? [active.degree, active.period] : []}
        tagline={active?.summary}
        body={active?.details}
        tags={active?.courses}
      />
    </section>
  );
}
