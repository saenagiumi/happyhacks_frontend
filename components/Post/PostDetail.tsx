import Head from "next/head";
import { useRouter } from "next/router";
import { useFetch } from "hooks/useFetch";
import { API_URL } from "utils/const";
import { Post } from "./Post";

export const PostDetail = () => {
  const router = useRouter();
  const { data, error, isLoading } = useFetch(
    router.query.id ? `${API_URL}/posts/${router.query.id}` : null
  );
  
  if (isLoading) {
    return <div>ローディング中</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <Head>
        <title>{data.title}</title>
      </Head>
      <div>
        <Post
          title={data.title}
          body={data.body}
          name={data.name}
          iconSrc={data.picture}
          postedAt={data.created_at}
          comments_count={0}
        />
      </div>
    </div>
  );
};
