import type { EffectCallback } from "react";

import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { createCustomEqual, deepEqual } from "fast-equals";
import { useEffect, useRef } from "react";

export const deepCompareEquals = createCustomEqual({
  createInternalComparator: () => (a: unknown, b: unknown) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a as google.maps.LatLng).equals(
        new google.maps.LatLng(b as google.maps.LatLng),
      );
    }
    return deepEqual(a, b);
  },
});

export function useDeepCompareMemoize(value: unknown) {
  const ref = useRef<unknown>();

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffect(
  callback: EffectCallback,
  dependencies: unknown[],
) {
  useEffect(callback, [callback, dependencies.map(useDeepCompareMemoize)]);
}
