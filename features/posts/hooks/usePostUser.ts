import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const usePostUser = (url: string | null) => {
  const { data, error } = useSWR(
    url,
    fetcher
  );
  return {
    postUser: data,
    postUserError: error, 
    postUserIsLoading: !data && !error,
  };
};