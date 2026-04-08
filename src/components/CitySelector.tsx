"use client";

import { useState } from "react";
import type { CityData } from "@/lib/locations";

type CitySelectorProps = {
  cities: CityData[];
};

export default function CitySelector({ cities }: CitySelectorProps) {
  const [activeCity, setActiveCity] = useState<string | null>(null);

  const selectedCity = cities.find((c) => c.city === activeCity);

  return (
    <div className="city-selector">
      <div className="category-row" style={{ marginTop: "8px" }}>
        {cities.map((city) => (
          <button
            key={city.city}
            className={`pill pill-city ${activeCity === city.city ? "pill-active" : ""}`}
            onClick={() =>
              setActiveCity(activeCity === city.city ? null : city.city)
            }
          >
            📍 {city.city}
          </button>
        ))}
      </div>

      {selectedCity && (
        <div className="city-areas-panel">
          <div className="city-areas-header">
            <h3>
              Areas in {selectedCity.city}
              <span className="muted" style={{ fontSize: "0.85rem", fontWeight: 400, marginLeft: "8px" }}>
                {selectedCity.state}
              </span>
            </h3>
            <button
              className="city-areas-close"
              onClick={() => setActiveCity(null)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="city-areas-grid">
            {selectedCity.areas.map((area) => (
              <span key={area} className="area-chip">
                {area}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
