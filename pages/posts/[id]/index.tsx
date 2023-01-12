import { PostDetail } from "components/Post/PostDetail";

import { useFetch } from "hooks/useFetch";
import { useRouter } from "next/router";
import { API_URL } from "utils/const";

import { useDisclosure } from "@mantine/hooks";
import { Modal, Avatar } from "@mantine/core";
import CommentForm from "components/Comment/CommentForm";
import { CommentListByPostId } from "components/Comment/CommentListByPostId";
import { useState } from "react";

const PostsId = () => {
  const router = useRouter();
  const [opened, modalHandlers] = useDisclosure(false);

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
    <div className="mx-1.5">
      <PostDetail />
      <CommentListByPostId id={data.id} />
      <Modal centered opened={opened} onClose={() => modalHandlers.close()}>
        <CommentForm modalHandlers={modalHandlers} />
      </Modal>

      <div className="flex mt-4">
        <Avatar radius="xl" size="md" />
        <div
          onClick={() => modalHandlers.open()}
          className="w-full box-border ml-2 p-3 border-solid border border-gray-300 rounded-lg  text-gray-400"
        >
          回答する
        </div>
      </div>
    </div>
  );
};

export default PostsId;
