import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { supabase } from "@/integrations/supabase/client";
import "leaflet/dist/leaflet.css";

// Fix default marker icon
const defaultIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,hsl(35,95%,55%),hsl(170,50%,40%));display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px rgba(217,157,43,0.4);border:3px solid rgba(255,255,255,0.2);">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const ParkMap = () => {
  const [parks, setParks] = useState<any[]>([]);
  const [userPos, setUserPos] = useState<[number, number]>([40.7580, -73.9855]);

  useEffect(() => {
    // Get user location
    navigator.geolocation?.getCurrentPosition(
      (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
      () => {} // Silently fail, use default
    );

    // Fetch parks
    supabase.from("parks").select("*").then(({ data }) => {
      if (data) setParks(data);
    });
  }, []);

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={userPos}
        zoom={13}
        className="w-full h-full"
        zoomControl={false}
        attributionControl={false}
        style={{ background: "hsl(230, 20%, 7%)" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* User location */}
        <Circle
          center={userPos}
          radius={200}
          pathOptions={{
            color: "hsl(35, 95%, 55%)",
            fillColor: "hsl(35, 95%, 55%)",
            fillOpacity: 0.15,
            weight: 2,
          }}
        />

        {/* Park markers */}
        {parks.map((park) => (
          <Marker
            key={park.id}
            position={[park.latitude, park.longitude]}
            icon={defaultIcon}
          >
            <Popup className="park-popup">
              <div className="p-2">
                <h3 className="font-bold text-sm">{park.name}</h3>
                <p className="text-xs text-gray-500">{park.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map overlay gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none z-[400]" />
    </div>
  );
};

export default ParkMap;
