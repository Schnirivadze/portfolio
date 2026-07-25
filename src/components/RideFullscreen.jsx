import { useRef, useState } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker } from "react-leaflet";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import PlaceholderImage from "./PlaceholderImage";
import Lightbox from "./Lightbox";
import "./RideFullscreen.css";

export default function RideFullscreen({ ride, onClose }) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const r = t.rides;
  const [highlighted, setHighlighted] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const photoRefs = useRef({});

  const tileUrl =
    theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  const jumpToPhoto = (imageIndex) => {
    const el = photoRefs.current[imageIndex];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setHighlighted(imageIndex);
    setTimeout(() => setHighlighted(null), 1200);
  };

  const center = ride.route[Math.floor(ride.route.length / 2)];

  return (
    <motion.div
      className="ride-fullscreen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className="ride-fullscreen-close" onClick={onClose}>
        &times;
      </button>

      <div className="ride-fullscreen-map">
        <MapContainer center={center} zoom={10} style={{ height: "100%", width: "100%" }}>
          <TileLayer url={tileUrl} attribution="&copy; OpenStreetMap &copy; CARTO" />
          <Polyline positions={ride.route} pathOptions={{ color: "#ff6a3d", weight: 4 }} />
          {ride.photoPoints?.map((p, i) => (
            <CircleMarker
              key={i}
              center={p.coord}
              radius={9}
              pathOptions={{ color: "#fff", weight: 2, fillColor: "#ff6a3d", fillOpacity: 1 }}
              eventHandlers={{ click: () => jumpToPhoto(p.image) }}
            />
          ))}
        </MapContainer>
      </div>

      <div className="ride-fullscreen-panel">
        <h2>{ride.name}</h2>
        <div className="ride-fullscreen-meta">
          <span>{r.date}: {ride.date}</span>
          <span>{r.distance}: {ride.distance}</span>
          <span>{r.elevation}: {ride.elevation}</span>
        </div>
        <p className="ride-fullscreen-summary">{ride.summary}</p>
        <p className="ride-fullscreen-story">{ride.story}</p>

        <h3>{r.photosLabel}</h3>
        <div className="ride-photo-list">
          {ride.photoPoints?.map((p, i) => {
            const label = `${ride.name} #${p.image + 1}`;
            return (
              <div key={i} ref={(el) => (photoRefs.current[p.image] = el)}>
                <PlaceholderImage
                  src={p.src}
                  label={label}
                  className={`ride-photo ${highlighted === p.image ? "ride-photo-highlighted" : ""}`}
                  onClick={() => setLightboxImage({ src: p.src, label })}
                />
              </div>
            );
          })}
        </div>
      </div>

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </motion.div>
  );
}
