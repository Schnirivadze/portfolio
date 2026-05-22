import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import PlaceholderImage from "./PlaceholderImage";
import HikeModal from "./HikeModal";
import "./Hikes.css";

export default function Hikes() {
  const { t } = useLanguage();
  const h = t.hikes;
  const [ref, visible] = useReveal(0.1);
  const [active, setActive] = useState(null);

  return (
    <section id="hikes" className="section" ref={ref}>
      <p className="eyebrow">{h.eyebrow}</p>
      <h2 className="hikes-title">{h.title}</h2>
      <p className="hikes-subtitle">{h.subtitle}</p>

      <div className="hike-grid">
        {h.items.map((hike, i) => (
          <motion.button
            key={hike.id}
            className="hike-card"
            onClick={() => setActive(hike)}
            initial={{ opacity: 0, y: 24 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <PlaceholderImage label={hike.name} className="hike-card-image" />
            <div className="hike-card-body">
              <h3>{hike.name}</h3>
              <div className="hike-card-meta">
                <span>{hike.distance}</span>
                <span>{hike.elevation}</span>
              </div>
              <p>{hike.summary}</p>
              <span className="hike-card-cta">{h.openHike} &rarr;</span>
            </div>
          </motion.button>
        ))}
      </div>

      {active && <HikeModal hike={active} onClose={() => setActive(null)} />}
    </section>
  );
}
