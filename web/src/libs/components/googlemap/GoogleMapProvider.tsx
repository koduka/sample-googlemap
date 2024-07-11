"use client";

import type { Status } from "@googlemaps/react-wrapper";
import type { ReactNode } from "react";

import { Wrapper } from "@googlemaps/react-wrapper";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

type Props = {
  children: ReactNode;
};

export function GoogleMapProvider({ children }: Props) {
  return (
    <div className="flex h-full">
      <Wrapper
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}
        render={render}
        libraries={["marker"]}
      >
        {children}
      </Wrapper>
    </div>
  );
}
