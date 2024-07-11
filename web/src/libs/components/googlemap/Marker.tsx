"use client";

import { useEffect, useState } from "react";

type Props = google.maps.marker.AdvancedMarkerElementOptions;

export function Marker({ map, position }: Props) {
  const [marker, setMarker] =
    useState<google.maps.marker.AdvancedMarkerElement>();

  useEffect(() => {
    if (!marker) {
      setMarker(
        new google.maps.marker.AdvancedMarkerElement({
          map,
          position,
        }),
      );
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.map = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.position = position;
    }
  }, [marker, position]);

  return null;
}
