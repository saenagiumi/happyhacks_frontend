import useSWRImmutable from "swr/immutable";

type Url = string;

const fetcher = async (url: Url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const useFetchArray = (url: Url) => {
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