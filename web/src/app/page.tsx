"use client";

import { GoogleMapProvider } from "@/libs/components/googlemap/GoogleMapProvider";
import { GoogleMap } from "@/libs/components/googlemap/GooogleMap";
import { Marker } from "@/libs/components/googlemap/Marker";
import { useState } from "react";

export default function Home() {
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = useState(3); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  return (
    <GoogleMapProvider>
      <GoogleMap
        center={center}
        onClick={onClick}
        onIdle={onIdle}
        zoom={zoom}
        className="h-full grow"
      >
        {clicks.map((latLng, i) => (
          <Marker key={i} position={latLng} />
        ))}
      </GoogleMap>
    </GoogleMapProvider>
  );
}
