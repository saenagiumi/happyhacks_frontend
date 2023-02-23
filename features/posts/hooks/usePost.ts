import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const usePost = (url: string | null) => {
  const { data, error } = useSWR(
    url,
    fetcher
  );
  return {
    post: data,
    postError: error,
    postIsLoading: !data && !error,
  };
};