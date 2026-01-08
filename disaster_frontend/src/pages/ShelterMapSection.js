/* eslint-disable react-hooks/rules-of-hooks */
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
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// ✅ Custom house icon
const customHouseIcon = new L.Icon({
  iconUrl: "/assets/hm.png",
  iconSize: [32, 45],
  iconAnchor: [19, 45],
  popupAnchor: [0, -45],
  shadowUrl: markerShadow,
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

function FlyToLocation({ lat, lng, onZoomComplete }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 15, { duration: 3 });
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

const ShelterMapSection = () => {
  const [shelters, setShelters] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/shelters/")
      .then((res) => setShelters(res.data))
      .catch((err) => console.error("Error fetching Shelters:", err));
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

  // Use userLocation if available, otherwise fallback center
  const center = userLocation ? [userLocation.lat, userLocation.lng] : [23.0225, 72.5714];
  const zoomLevel = 6; // Start zoom low to avoid big circle marker, flyTo zooms later

  return (
    <div className="col-lg-12" style={{ height: "400px", marginBottom: "100px" }}>
      <div className="card border-0 shadow-lg animate-slide-in-right">
        <div className="card-body">
          <div className="rounded-3 mb-3">
            <MapContainer
              center={center}
              zoom={zoomLevel}
              scrollWheelZoom={true}
              style={{
                height: "400px",
                width: "100%",
                borderRadius: "0.5rem",
              }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {userLocation && !mapReady && (
                <FlyToLocation lat={userLocation.lat} lng={userLocation.lng} onZoomComplete={setMapReady} />
              )}

              {userLocation && mapReady && (
                <CurrentLocationMarker lat={userLocation.lat} lng={userLocation.lng} />
              )}

              {shelters
                .filter(
                  (shelter) =>
                    shelter.latitude !== null &&
                    shelter.longitude !== null &&
                    !isNaN(parseFloat(shelter.latitude)) &&
                    !isNaN(parseFloat(shelter.longitude))
                )
                .map((shelter) => (
                  <Marker
                    key={shelter.id}
                    position={[parseFloat(shelter.latitude), parseFloat(shelter.longitude)]}
                    icon={customHouseIcon}
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
                        {/* Title */}
                        <div style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "8px" }}>
                          <span
                            style={{
                              backgroundColor: "#e3f2fd",
                              color: "#0d47a1",
                              padding: "4px 8px",
                              borderRadius: "6px",
                              fontSize: "1rem",
                            }}
                          >
                            {shelter.name}
                          </span>
                        </div>

                        {/* Type */}
                        <div style={{ fontSize: "0.85rem", marginBottom: "6px", color: "#444" }}>
                          🏠 <strong>Type:</strong> {shelter.shelter_type || "Shelter"}
                        </div>
                        {/* Location */}
                        <div style={{ fontSize: "0.85rem", marginBottom: "6px", color: "#444" }}>
                          📍 <strong>Location:</strong> {shelter.location || "Unknown"}
                        </div>
                        
                        {/* Status / Description */}
                        <div style={{ fontSize: "0.85rem", color: "#444" }}>
                          📋 <strong>Status:</strong> {shelter.description || "No details"}
                        </div>
                        <div style={{ fontSize: "0.85rem", marginBottom: "6px", color: "#444" }}>
                          🍽 <strong>Food Needed:</strong> { shelter.predictions?.food_needed ?? 0 } Meals
                        </div>
                        <div style={{ fontSize: "0.85rem", marginBottom: "6px", color: "#444" }}>
                          💧 <strong>Water Required:</strong> {shelter.predictions?.water_required ?? 0} L
                        </div>
                        <div style={{ fontSize: "0.85rem", marginBottom: "6px", color: "#444" }}>
                          🩺 <strong>Medical Kits:</strong> {shelter.predictions?.medical_kits ?? 0} Kits
                        </div>
                        <div style={{ fontSize: "0.85rem", marginBottom: "6px", color: "#444" }}>
                          🙋 <strong>Volunteers Required:</strong> {shelter.predictions?.Volunteers_required ?? 0} Volunteers
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

export default ShelterMapSection;
