import Head from "next/head";
import { useRouter } from "next/router";
import { API_URL } from "utils/const";
import { Post } from "./Post";
import { usePost } from "features/posts/hooks/usePost";
import { usePostUser } from "features/posts/hooks/usePostUser";

type Props = {
  accessToken: string | undefined;
};

export const PostDetail = (props: Props) => {
  const router = useRouter();
  const { post, postError, postIsLoading } = usePost(
    router.query.id ? `${API_URL}/posts/${router.query.id}` : null
  );
  const { postUser, postUserError, postUserIsLoading } = usePostUser(
    router.query.id ? `${API_URL}/posts/${router.query.id}/user` : null
  );

  if (postIsLoading) {
    return <div>ローディング中</div>;
  }

  if (postError) {
    return <div>{postError.message}</div>;
  }

  if (post && postUser) {
    return (
      <div>
        <Head>
          <title>{post.title}</title>
        </Head>
        <div>
          <Post
            userId={postUser.id}
            name={postUser.name}
            iconSrc={postUser.picture}
            title={post.title}
            body={post.body}
            postedAt={post.created_at}
            comments_count={0}
            accessToken={props.accessToken}
          />
        </div>
      </div>
    );
  }
  return <></>;
};
