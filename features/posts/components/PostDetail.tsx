import { useRouter } from "next/router";
import { API_BASE_URL } from "const/const";
import { Post } from "./Post";
import { useFetch } from "hooks/useFetch";
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
  // const { data: postData } = useFetch(
  //   router.query.id ? `${API_BASE_URL}/posts/${router.query.id}` : null
  // );

  if (props?.postData) {
    return (
      <div>
        <div className="pl-1.5 pt-3 pr-2">
          <div>
            <Post
              id={props.postData.post.id}
              userId={props.postData.post.user_id}
              name={props.postData.name}
              iconSrc={props.postData.picture}
              title={props.postData.post.title}
              body={props.postData.post.body}
              postedAt={props.postData.post.created_at}
              comments_count={0}
            />
          </div>
          <div className="flex justify-center my-5 xs:my-6">
            <TwitterIntentTweet
              text={"\n\n対策のアイデアを募集しています \n#ADHDあるある"}
              url={`https://www.happyhacks.app/posts/${props.postData.post.id}`}
            />
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};
