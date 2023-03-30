import { useRouter } from "next/router";
import { API_BASE_URL } from "const/const";
import { Post } from "./Post";
import { useFetch } from "hooks/useFetch";
import { NextSeo } from "next-seo";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "state/currentUser";
import { TwitterIntentTweet } from "components/TwitterIntentTweet";

export const PostDetail = () => {
  const currentUser = useAtomValue(currentUserAtom);
  const router = useRouter();
  const { data: postData } = useFetch(
    router.query.id ? `${API_BASE_URL}/posts/${router.query.id}` : null
  );

  if (postData) {
    return (
      <div className="pl-1.5 pt-3 pr-2">
        <NextSeo
          title={`${postData.post.title} | HappyHacks`}
          description={`${postData.post.title} | HappyHacks`}
          openGraph={{
            url: `https://www.happyhacks.app/posts/${postData.id}`,
            title: `${postData.post.title} | HappyHacks`,
            description: `${postData.post.title} | HappyHacks`,
          }}
        />
        <div>
          <Post
            id={postData.post.id}
            userId={postData.post.id}
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
            url={`https://www.happyhacks.app/posts/${postData.post.id}`}
            hashtags={["ADHD対策", "HappyHacks"]}
          />
        </div>
      </div>
    );
  }
  return <></>;
};
