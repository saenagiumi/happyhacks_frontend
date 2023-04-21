import useSWR from "swr";

const fetcher = (url: string, accessToken?: string) => async () => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await response.json();
  return json;
};

export const useFetchArray = (url: string, accessToken?: string) => {
  const { data, error } = useSWR(url, fetcher(url, accessToken));

  return {
    data,
    error,
    isEmpty: data && data.length === 0,
    isLoading: !data && !error,
  };
};
