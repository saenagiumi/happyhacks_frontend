// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import useSWR from "swr";

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
      <ol>
        {data?.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ol>
    </div>
  );
}
