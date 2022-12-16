import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const usePosts = () => {
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );
  return {
    data,
    error
  };
};