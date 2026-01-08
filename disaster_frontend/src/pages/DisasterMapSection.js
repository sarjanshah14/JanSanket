import { useEffect, useState } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const getDisasterIcon = (type) => {
  const iconMap = {
    flood: "marker-flood.png",
    fire: "marker-fire.png",
    earthquake: "marker-earthquake.png",
    cyclone: "marker-cyclone.png",
    landslide: "marker-landslide.png",
    drought: 'marker-drought.png',
    "storm/hurricane": 'marker-stormy.png',
    tornado: 'marker-tornado.png',
    tsunami: 'marker-tsunami.png',
    "volcanic eruption": 'marker-volcanic_eruption.png',
    other: 'marker-others.png',
  };

  const iconFilename = iconMap[type.toLowerCase()] || "marker-flood.png";

  return new L.Icon({
    iconUrl: `/marker-icons/${iconFilename}`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -36],
    className: "disaster-marker-icon",
  });
};

function FlyToLocation({ lat, lng, onZoomComplete }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 15, { duration: 3 });
      // fire onZoomComplete when animation ends
      map.once("moveend", () => {
        onZoomComplete(true);
      });
    }
  }, [lat, lng, map, onZoomComplete]);
  return null;
}

function CurrentLocationMarker({ lat, lng }) {
  return (
    <CircleMarker
      center={[lat, lng]}
      radius={7}
      pathOptions={{ color: "#3399ff", fillColor: "#3399ff", fillOpacity: 0.7 }}
    >
      <Popup>You are here</Popup>
    </CircleMarker>
  );
}

const DisasterMapSection = () => {
  const [disasters, setDisasters] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/disasters/")
      .then((res) => setDisasters(res.data))
      .catch((err) => console.error("Error fetching disasters:", err));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.warn("Geolocation error:", err);
        }
      );
    }
  }, []);

  // initial center and zoom:
  const center = userLocation ? [userLocation.lat, userLocation.lng] : [23.0225, 72.5714];
  const zoomLevel = userLocation ? 6 : 6; // always start at 6 to avoid jump on first render

  return (
    <div className="col-lg-12" style={{ height: "400px", marginBottom: "100px" }}>
      <div className="card border-0 shadow-lg animate-slide-in-right">
        <div className="card-body">
          <div className="rounded-3 mb-3">
            <MapContainer
              center={center}
              zoom={zoomLevel}
              scrollWheelZoom={true}
              style={{ height: "400px", width: "100%", borderRadius: "0.5rem" }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {userLocation && !mapReady && (
                <FlyToLocation lat={userLocation.lat} lng={userLocation.lng} onZoomComplete={setMapReady} />
              )}

              {/* Show blue dot only after zoom animation is done */}
              {userLocation && mapReady && (
                <CurrentLocationMarker lat={userLocation.lat} lng={userLocation.lng} />
              )}

              {disasters
                .filter(
                  (disaster) =>
                    disaster.latitude !== null &&
                    disaster.longitude !== null &&
                    !isNaN(parseFloat(disaster.latitude)) &&
                    !isNaN(parseFloat(disaster.longitude))
                )
                .map((disaster) => (
                  <Marker
                    key={disaster.id}
                    position={[parseFloat(disaster.latitude), parseFloat(disaster.longitude)]}
                    icon={getDisasterIcon(disaster.type)}
                  >
                    <Popup maxWidth={300} minWidth={200}>
                      <div
                        style={{
                          padding: "12px 14px",
                          backgroundColor: "#f9f9f9",
                          borderRadius: "12px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          fontFamily: "Segoe UI, sans-serif",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "1rem",
                            fontWeight: "bold",
                            marginBottom: "8px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              backgroundColor:
                                disaster.type.toLowerCase() === "fire"
                                  ? "#ffcccc"
                                  : disaster.type.toLowerCase() === "flood"
                                  ? "#cce5ff"
                                  : disaster.type.toLowerCase() === "earthquake"
                                  ? "#ffe0b2"
                                  : "#e0e0e0",
                              color: "#333",
                              padding: "4px 8px",
                              borderRadius: "6px",
                              fontSize: "0.85rem",
                            }}
                          >
                            {disaster.type.toUpperCase()}
                          </span>
                        </div>

                        <div style={{ fontSize: "0.9rem", marginBottom: "8px", color: "#444" }}>
                          📋 <strong>Status:</strong> {disaster.description}
                        </div>

                        <div style={{ fontSize: "0.85rem", marginBottom: "6px", color: "#555" }}>
                          📍 <strong>Location:</strong> {disaster.address}
                        </div>

                        <div style={{ fontSize: "0.8rem", color: "#777" }}>
                          ⏱️ <strong>Time:</strong> {new Date(disaster.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterMapSection;
