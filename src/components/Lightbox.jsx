import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import PlaceholderImage from "./PlaceholderImage";
import "./Lightbox.css";

export default function Lightbox({ label, onClose }) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {label && (
        <motion.div
          className="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="lightbox-frame"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <PlaceholderImage label={label} className="lightbox-image" />
            <button className="lightbox-close" onClick={onClose}>
              {t.lightbox.close}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
