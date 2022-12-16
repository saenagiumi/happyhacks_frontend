import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const useFetch = (url) => {
  const { data, error } = useSWR(
    url,
    fetcher
  );
  return {
    data,
    error,
    isLoading: !data && !error,
  };
};