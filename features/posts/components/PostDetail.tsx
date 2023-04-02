import { useRouter } from "next/router";
import { API_BASE_URL } from "const/const";
import { Post } from "./Post";
import { useFetch } from "hooks/useFetch";
import { NextSeo } from "next-seo";
import { TwitterIntentTweet } from "components/TwitterIntentTweet";

type Props = {
  postId: string;
  postData: {
    post: {
      id: string;
      title: string;
      body: string;
      user_id: string;
      created_at: string;
      updated_at: string;
    };
    name: string;
    picture: string;
  };
};

export const PostDetail = (props: Props) => {
  const router = useRouter();
  const { data: postData } = useFetch(
    router.query.id ? `${API_BASE_URL}/posts/${router.query.id}` : null
  );

  if (postData) {
    return (
      <div>
        <div className="pl-1.5 pt-3 pr-2">
          <NextSeo
            title={`${props.postData.post.title} | HappyHacks`}
            description={`${props.postData.post.title} | HappyHacks`}
            openGraph={{
              url: `https://www.happyhacks.app/posts/${props.postId}`,
              title: `${props.postData.post.title} | HappyHacks`,
              description: `${props.postData.post.title} | HappyHacks`,
            }}
          />
          <div>
            <Post
              id={postData.post.id}
              userId={postData.post.user_id}
              name={postData.name}
              iconSrc={postData.picture}
              title={postData.post.title}
              body={postData.post.body}
              postedAt={postData.post.created_at}
              comments_count={0}
            />
          </div>
          <div className="flex justify-center my-5 xs:my-6">
            <TwitterIntentTweet
              text={postData.post.title}
              // url={`https://www.happyhacks.app/posts/${postData.post.id}`}
              hashtags={["ADHD対策"]}
            />
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};
