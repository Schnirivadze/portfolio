import { useState } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import PlaceholderImage from "./PlaceholderImage";
import Lightbox from "./Lightbox";
import "leaflet/dist/leaflet.css";
import "./HikeModal.css";

export default function HikeModal({ hike, onClose }) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const h = t.hikes;
  const [lightboxLabel, setLightboxLabel] = useState(null);

  const tileUrl =
    theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  const center = hike.route[Math.floor(hike.route.length / 2)];
  const galleryLabels = Array.from({ length: 6 }, (_, i) => `${hike.name} #${i + 1}`);

  return (
    <motion.div
      className="hike-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        className="hike-modal"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="hike-modal-close" onClick={onClose}>
          &times;
        </button>

        <div className="hike-modal-map">
          <MapContainer center={center} zoom={11} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
            <TileLayer url={tileUrl} attribution="&copy; OpenStreetMap &copy; CARTO" />
            <Polyline positions={hike.route} pathOptions={{ color: "#ff6a3d", weight: 4 }} />
          </MapContainer>
        </div>

        <div className="hike-modal-body">
          <h2>{hike.name}</h2>
          <div className="hike-modal-meta">
            <span>{h.date}: {hike.date}</span>
            <span>{h.distance}: {hike.distance}</span>
            <span>{h.elevation}: {hike.elevation}</span>
          </div>
          <p className="hike-modal-story">{hike.story}</p>

          <div className="hike-gallery">
            {galleryLabels.map((label) => (
              <PlaceholderImage key={label} label={label} className="hike-gallery-image" onClick={() => setLightboxLabel(label)} />
            ))}
          </div>
        </div>
      </motion.article>

      <Lightbox label={lightboxLabel} onClose={() => setLightboxLabel(null)} />
    </motion.div>
  );
}
