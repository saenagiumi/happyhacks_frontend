import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const useFetchArray = (url: string) => {
  const { data, error } = useSWR(
    url,
    fetcher
  );
  return {
    data,
    error,
    isLoading: !data && !error,
    isEmpty: data && data.length === 0,
  };
};