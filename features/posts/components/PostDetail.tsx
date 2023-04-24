import { TwitterIntentTweet } from "components/TwitterIntentTweet";
import { API_BASE_URL } from "const/const";
import { useFetch } from "hooks/useFetch";
import Image from "next/image";
import { useRouter } from "next/router";

import { Post } from "./Post";

export const PostDetail = () => {
  const router = useRouter();
  const { data: postData } = useFetch(
    router.query.id ? `${API_BASE_URL}/posts/${router.query.id}` : ""
  );

  if (postData) {
    return (
      <div>
        <div className="px-5 pt-3">
          <div className="text-[14px]">
            <Post
              id={postData.post.id}
              userId={postData.post.user_id}
              name={postData.post.name}
              picture={postData.post.picture}
              title={postData.post.title}
              body={postData.post.body}
              postedAt={postData.post.created_at}
              comments_count={0}
            />
          </div>
          <div className="my-5 flex justify-center xs:my-6">
            <TwitterIntentTweet
              className="flex h-[40px] w-[184px] items-center justify-center rounded-full bg-blue-400 py-2 pl-1 pr-2 font-sans text-[15px] font-[600] text-sky-50 no-underline"
              text={`\n\n${postData.post.title}\n`}
              url={`https://www.happyhacks.app/posts/${postData.post.id}`}
            >
              <Image
                className="mr-2"
                src="/tw-logo-white.svg"
                width="16"
                height="16"
                alt="twitterのロゴ"
                priority={true}
              />
              対策を募集する
            </TwitterIntentTweet>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};
