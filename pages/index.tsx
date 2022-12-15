import useSWR from "swr";
import { Header } from "../components/Header/Header";

const fetcher = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const usePosts = () => {
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher
  );
  return {
    data,
    error
  };
};

export default function Home() {
  const { data } = usePosts();

  return (
    <div>
      <Header />
      <ol>
        {data?.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ol>
    </div>
  );
}
