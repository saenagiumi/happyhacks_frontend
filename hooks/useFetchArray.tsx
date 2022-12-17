import useSWRImmutable from "swr/immutable";

const fetcher = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const useFetchArray = (url) => {
  const { data, error } = useSWRImmutable(
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