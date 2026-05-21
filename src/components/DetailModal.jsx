import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PlaceholderImage from "./PlaceholderImage";
import Lightbox from "./Lightbox";
import "./DetailModal.css";

export default function DetailModal({
  open,
  onClose,
  eyebrow,
  title,
  meta, // array of small strings: period, location...
  tagline,
  body,
  tags, // stack or courses
  images, // array of string labels
  githubUrl,
  githubLabel,
}) {
  const [lightboxLabel, setLightboxLabel] = useState(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="detail-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            className="detail-modal"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="detail-modal-close" onClick={onClose}>
              &times;
            </button>

            <div className="detail-modal-inner">
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              <h2>{title}</h2>

              {meta?.length > 0 && (
                <div className="detail-modal-meta">
                  {meta.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              )}

              {tagline && <p className="detail-modal-tagline">{tagline}</p>}

              {images?.length > 0 && (
                <div className="detail-modal-images">
                  {images.map((label) => (
                    <PlaceholderImage
                      key={label}
                      label={label}
                      className="detail-modal-image"
                      onClick={() => setLightboxLabel(label)}
                    />
                  ))}
                </div>
              )}

              {body && <p className="detail-modal-body">{body}</p>}

              {tags?.length > 0 && (
                <div className="skill-tags">
                  {tags.map((tag) => (
                    <span key={tag} className="skill-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {githubUrl !== undefined && (
                <a
                  className="btn btn-ghost detail-modal-github"
                  href={githubUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => !githubUrl && e.preventDefault()}
                >
                  {githubLabel}
                </a>
              )}
            </div>
          </motion.article>
        </motion.div>
      )}
      <Lightbox label={lightboxLabel} onClose={() => setLightboxLabel(null)} />
    </AnimatePresence>
  );
}
