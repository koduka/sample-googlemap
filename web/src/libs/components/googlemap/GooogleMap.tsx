import type { ReactNode } from "react";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";

import { useDeepCompareEffect } from "@/libs/hooks/googlemap";
import clsx from "clsx";

type GoogleMapProps = google.maps.MapOptions & {
  className?: string;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: ReactNode;
};

export function GoogleMap({
  onClick,
  onIdle,
  children,
  className,
  ...options
}: GoogleMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
        }),
      );
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName),
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} className={clsx(className)} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { map } as never);
        }
      })}
    </>
  );
}
