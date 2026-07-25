import { motion, useScroll } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import "./RouteThread.css";

const WAYPOINTS = [
  { id: "about", code: "AB" },
  { id: "education", code: "ED" },
  { id: "projects", code: "PR" },
//   { id: "rides", code: "RD" },
//   { id: "hikes", code: "HK" },
  { id: "contact", code: "CN" },
];

export default function RouteThread() {
  const { scrollYProgress } = useScroll();
  const { t } = useLanguage();

  const jumpTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="route-thread" aria-hidden="true">
      <div className="route-thread-track">
        <motion.div className="route-thread-fill" style={{ scaleY: scrollYProgress }} />
      </div>
      <div className="route-thread-nodes">
        {WAYPOINTS.map((w) => (
          <button
            key={w.id}
            className="route-thread-node"
            onClick={() => jumpTo(w.id)}
            title={t.nav[w.id] || w.code}
          >
            <span>{w.code}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
