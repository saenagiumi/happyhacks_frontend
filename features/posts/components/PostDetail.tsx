import { useRouter } from "next/router";
import { API_BASE_URL } from "const/const";
import { Post } from "./Post";
import { useFetch } from "hooks/useFetch";
import { NextSeo } from "next-seo";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "state/currentUser";
// import { TwitterIntentTweet } from "components/TwitterIntentTweet";

export const PostDetail = () => {
  const currentUser = useAtomValue(currentUserAtom);
  const router = useRouter();
  const { data: postData } = useFetch(
    router.query.id ? `${API_BASE_URL}/posts/${router.query.id}` : null
  );
  const { data: postUserData } = useFetch(
    router.query.id ? `${API_BASE_URL}/posts/${router.query.id}/user` : null
  );

  if (postData && postUserData) {
    return (
      <div className="pl-1.5 pt-3 pr-2">
        <NextSeo
          title={`${postData.title} | HappyHacks`}
          description={`${postData.title} | HappyHacks`}
          openGraph={{
            url: `https://www.happyhacks.app/posts/${postData.id}`,
            title: `${postData.title} | HappyHacks`,
            description: `${postData.title} | HappyHacks`,
          }}
        />
        <div>
          <Post
            id={postData.id}
            userId={postUserData.id}
            name={postUserData.name}
            iconSrc={postUserData.picture}
            title={postData.title}
            body={postData.body}
            postedAt={postData.created_at}
            comments_count={0}
          />
        </div>
        <div className="flex justify-center my-5 xs:my-6">
          {/* <TwitterIntentTweet
            text={postData.title}
            url={`https://www.happyhacks.app/posts/${postData.id}`}
            hashtags={["ADHD対策", "HappyHacks"]}
          /> */}
        </div>
      </div>
    );
  }
  return <></>;
};
