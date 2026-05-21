import { useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useReveal } from "../hooks/useReveal";
import RideFullscreen from "./RideFullscreen";
import "leaflet/dist/leaflet.css";
import "./BikeMap.css";

const MUNICH_CENTER = [48.05, 11.9];

export default function BikeMap() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const r = t.rides;
  const [ref, visible] = useReveal(0.1);
  const [activeRide, setActiveRide] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const tileUrl =
    theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  return (
    <section id="rides" className="section" ref={ref}>
      <p className="eyebrow">{r.eyebrow}</p>
      <h2 className="rides-title">{r.title}</h2>
      <p className="rides-subtitle">{r.subtitle}</p>

      <motion.div
        className="bike-map-frame"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={visible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7 }}
      >
        <MapContainer center={MUNICH_CENTER} zoom={8} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
          <TileLayer url={tileUrl} attribution="&copy; OpenStreetMap &copy; CARTO" />
          {r.items.map((ride) => (
            <Polyline
              key={ride.id}
              positions={ride.route}
              pathOptions={{
                color: "#ff6a3d",
                weight: hoveredId === ride.id ? 6 : 3,
                opacity: hoveredId === ride.id ? 1 : 0.65,
              }}
              eventHandlers={{
                click: () => setActiveRide(ride),
                mouseover: () => setHoveredId(ride.id),
                mouseout: () => setHoveredId(null),
              }}
            />
          ))}
        </MapContainer>
      </motion.div>

      <div className="ride-chip-row">
        {r.items.map((ride) => (
          <button key={ride.id} className="ride-chip" onClick={() => setActiveRide(ride)}>
            {ride.name} <span>{ride.distance}</span>
          </button>
        ))}
      </div>

      {activeRide && <RideFullscreen ride={activeRide} onClose={() => setActiveRide(null)} />}
    </section>
  );
}
