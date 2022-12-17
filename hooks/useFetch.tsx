import useSWRImmutable from "swr/immutable";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const useFetch = (url: string | null) => {
  const { data, error } = useSWRImmutable(
    url,
    fetcher
  );
  return {
    data,
    error,
    isLoading: !data && !error,
  };
};