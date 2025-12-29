import React from "react";
const API_URL = "https://nominatim.openstreetmap.org/search?format=json&q=";

type CityReponse = {
  lat: string;
  lon: string;
  name: string;
  display_name: string;
};

export type CityInfo = {
  lat: string;
  lon: string;
  name: string;
  fullName: string;
};

const useGeocode = () => {
  const [data, setData] = React.useState<CityInfo[] | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const abortControllerRef = React.useRef<AbortController | null>(null);

  const abortController = new AbortController();
  abortControllerRef.current = abortController;

  async function request(city: string) {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(API_URL + city, {
        signal: abortController.signal,
      });

      if (!response.ok) throw new Error("Error: " + response.status);

      const cityResponse: CityReponse[] = await response.json();

      const cityInfo: CityInfo[] = cityResponse.map((item) => {
        return {
          lat: item.lat,
          lon: item.lon,
          name: item.name,
          fullName: item.display_name,
        };
      });

      if (!abortController.signal.aborted) setData(cityInfo);
    } catch (err) {
      if (!abortController.signal.aborted && err instanceof Error)
        setError(err.message);

      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return {
    request,
    data,
    setData,
    loading,
    error,
  };
};

export default useGeocode;
