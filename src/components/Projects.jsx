import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import PlaceholderImage from "./PlaceholderImage";
import DetailModal from "./DetailModal";
import "./Projects.css";

function ProjectPanel({ project, index, onOpen, viewLabel }) {
  const [ref, visible] = useReveal(0.15);
  const reversed = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      className={`project-panel ${reversed ? "project-panel-reversed" : ""}`}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <PlaceholderImage
        label={project.name}
        className="project-panel-image"
        onClick={() => onOpen(project)}
      />
      <div className="project-panel-text">
        <span className="project-panel-period">{project.period}</span>
        <h3>{project.name}</h3>
        <p>{project.tagline}</p>
        <div className="skill-tags">
          {project.stack.slice(0, 4).map((s) => (
            <span key={s} className="skill-tag">
              {s}
            </span>
          ))}
        </div>
        <button className="project-panel-link" onClick={() => onOpen(project)}>
          {viewLabel} &rarr;
        </button>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const p = t.projects;
  const [active, setActive] = useState(null);

  return (
    <section id="projects" className="section">
      <p className="eyebrow">{p.eyebrow}</p>
      <h2 className="projects-title">{p.title}</h2>

      <div className="project-list">
        {p.items.map((project, i) => (
          <ProjectPanel key={project.name} project={project} index={i} onOpen={setActive} viewLabel={p.viewProject} />
        ))}
      </div>

      <DetailModal
        open={!!active}
        onClose={() => setActive(null)}
        eyebrow={active?.period}
        title={active?.name}
        tagline={active?.tagline}
        body={active?.description}
        tags={active?.stack}
        images={active ? [active.name] : []}
        githubUrl={active?.github}
        githubLabel={p.viewCode}
      />
    </section>
  );
}
