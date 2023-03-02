import useSWR from "swr";

type Url = string;

const fetcher = async (url: Url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const usePostArray = (url: Url) => {
  const { data, error } = useSWR(
    url,
    fetcher
  );
  return {
    posts: data,
    postsError: error,
    postsIsLoading: !data && !error,
    postsIsEmpty: data && data.length === 0,
  };
};