import { useRouter } from "next/router";
import { API_BASE_URL } from "const/const";
import { Post } from "./Post";
import { useFetch } from "hooks/useFetch";
import { TwitterIntentTweet } from "components/TwitterIntentTweet";

export const PostDetail = () => {
  const router = useRouter();
  const { data: postData } = useFetch(
    router.query.id ? `${API_BASE_URL}/posts/${router.query.id}` : null
  );

  if (postData) {
    return (
      <div>
        <div className="pl-1.5 pt-3 pr-2">
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
              text={"\n\n対策のアイデアを募集しています\n#ADHDあるある"}
              url={`https://www.happyhacks.app/posts/${postData.post.id}`}
            />
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};
