import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import "./Contact.css";

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const [ref, visible] = useReveal();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // no backend wired up yet - just a friendly confirmation for now
    setSent(true);
  };

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="contact-grid">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="contact-title">{c.title}</h2>
          <p className="contact-subtitle">{c.subtitle}</p>

          <div className="contact-info">
            <a href={`mailto:${c.email}`}>{c.email}</a>
            <span>{c.location}</span>
            <a href="https://linkedin.com/in/andrii-seleznov" target="_blank" rel="noreferrer">
              {c.linkedin}
            </a>
          </div>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <input type="text" placeholder={c.namePlaceholder} required />
          <input type="email" placeholder={c.emailPlaceholder} required />
          <textarea rows={5} placeholder={c.messagePlaceholder} required />
          <button className="btn btn-primary" type="submit">
            {c.sendButton}
          </button>
          {sent && (
            <motion.p
              className="contact-sent"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {c.sentMessage}
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
