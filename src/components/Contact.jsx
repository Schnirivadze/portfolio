import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import "./Contact.css";

const ALERT_ENDPOINT = "/api/alert";

const STATUS = { IDLE: "idle", SENDING: "sending", SENT: "sent", ERROR: "error" };

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const [ref, visible] = useReveal();
  const [status, setStatus] = useState(STATUS.IDLE);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const updateField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(STATUS.SENDING);

    const message = `New portfolio contact\nFrom: ${form.name} <${form.email}>\n\n${form.message}`;

    try {
      const res = await fetch(ALERT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level: "info", message }),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus(STATUS.SENT);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus(STATUS.ERROR);
    }
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
          <input
            type="text"
            placeholder={c.namePlaceholder}
            value={form.name}
            onChange={updateField("name")}
            required
          />
          <input
            type="email"
            placeholder={c.emailPlaceholder}
            value={form.email}
            onChange={updateField("email")}
            required
          />
          <textarea
            rows={5}
            placeholder={c.messagePlaceholder}
            value={form.message}
            onChange={updateField("message")}
            required
          />
          <button className="btn btn-primary" type="submit" disabled={status === STATUS.SENDING}>
            {status === STATUS.SENDING ? c.sendingMessage : c.sendButton}
          </button>

          {status === STATUS.SENT && (
            <motion.p className="contact-sent" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              {c.sentMessage}
            </motion.p>
          )}
          {status === STATUS.ERROR && (
            <motion.p className="contact-error" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              {c.errorMessage}
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
