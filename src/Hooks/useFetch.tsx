import React from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetch = <T,>(
  url: RequestInfo | URL | null,
  options?: RequestInit,
): FetchState<T> => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const abortControllerRef = React.useRef<AbortController | null>(null);
  const optionsRef = React.useRef(options);
  optionsRef.current = options;

  React.useEffect(() => {
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    async function request() {
      setError(null);
      setData(null);
      if (!url) return;

      setLoading(true);

      let response: Response | null;
      let json: T | null;

      try {
        response = await fetch(url, {
          ...optionsRef.current,
          signal: abortController.signal,
        });
        if (!response.ok) throw new Error("Error: " + response.status);
        json = await response.json();
        if (!abortController.signal.aborted) setData(json);
      } catch (err) {
        if (!abortController.signal.aborted && err instanceof Error)
          setError(err.message);
        setData(null);
        response = null;
        json = null;
      } finally {
        setLoading(false);
      }
    }
    request();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetch;
