import { Comment } from "components/Comment/Comment";
import { PostDetail } from "components/Post/PostDetail";

import { useFetch } from "hooks/useFetch";
import { useRouter } from "next/router";
import { API_URL } from "utils/const";

import { Modal, Avatar } from "@mantine/core";
import { useState } from "react";
import CommentForm from "components/Comment/CommentForm";
import { CommentListByPostId } from "components/Comment/CommentListByPostId";

const PostsId = () => {
  const router = useRouter();

  const { data, error, isLoading } = useFetch(
    router.query.id ? `${API_URL}/posts/${router.query.id}` : null
  );

  const [opened, setOpened] = useState(false);

  if (isLoading) {
    return <div>ローディング中</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="mx-2">
      <PostDetail />
      <h2 className="font-medium text-gray-600 my-4 ml-1">２件の提案</h2>   
      <CommentListByPostId id={data.id} />
      <Modal centered opened={opened} onClose={() => setOpened(false)}>
        <CommentForm />
      </Modal>

      <div className="flex mt-4">
        <Avatar radius="xl" size="md"/>
        <div
          onClick={() => setOpened(true)}
          className="w-full box-border ml-2 p-3 border-solid border border-gray-300 rounded-lg  text-gray-400"
        >
          回答する
        </div>
      </div>
    </div>
  );
};

export default PostsId;
