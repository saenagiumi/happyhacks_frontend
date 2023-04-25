import {
  Button,
  Paper,
  Textarea,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { TargetComment } from "features/comments/types";
import { useRouter } from "next/router";
import { MdCheckCircle } from "react-icons/md";

import { usePost } from "../hooks/usePost";
import { PostType, TargetPost } from "../types";

type FormData = {
  title?: string;
  body?: string;
};
type Props = {
  close: () => void;
  commentData?: TargetComment;
  postData?: TargetPost;
};

const PostForm = ({ close, commentData, postData }: Props) => {
  // どちらかのpropsが渡ってくれば編集モード
  const submitMode = {
    data: postData || commentData || null,
    mode: postData
      ? "postEditMode"
      : commentData
      ? "commentEditMode"
      : "createPostMode",
  };

  const { createPost, updateComment, updatePost } = usePost();
  const router = useRouter();

  const postForm = useForm<FormData>({
    initialValues: {
      title: submitMode.data ? submitMode.data.title : "",
      body: submitMode.data ? submitMode.data.body : "",
    },
    validate: {
      title: (value) =>
        value !== undefined && value.length <= 0
          ? "タイトルを入力してください"
          : null,
      body: (value) =>
        value !== undefined && value.length <= 0
          ? "本文を入力してください"
          : null,
    },
  });

  const onSubmit = async (inputData: FormData) => {
    switch (submitMode?.mode) {
      case "postEditMode": {
        if (postData) {
          const isSuccess = await updatePost(postData.id.toString(), inputData);
          if (isSuccess) {
            showNotification({
              title: "編集完了",
              autoClose: 3000,
              color: "green.4",
              icon: <MdCheckCircle size={30} />,
              message: "投稿を編集しました",
            });

            close();
          }
          break;
        }
      }

      case "commentEditMode": {
        if (commentData) {
          const isSuccess = await updateComment(
            commentData.id.toString(),
            inputData
          );
          if (isSuccess) {
            showNotification({
              title: "編集完了",
              autoClose: 3000,
              color: "green.4",
              icon: <MdCheckCircle size={30} />,
              message: "回答を編集しました",
            });

            close();
            router.replace(router.asPath);
          }
          break;
        }
      }

      case "createPostMode": {
        const isSuccess = await createPost(inputData);
        if (isSuccess) {
          showNotification({
            title: "投稿完了",
            autoClose: 3000,
            color: "green.4",
            icon: <MdCheckCircle size={30} />,
            message: "投稿が完了しました",
          });

          close();
          router.push(`/posts/${isSuccess.id}`);
        }
        break;
      }
    }
  };

  return (
    <div className="mx-auto max-w-screen-xs">
      <Paper p="0" radius="xs">
        <form onSubmit={postForm.onSubmit((values) => onSubmit(values))}>
          <div className="mb-5">
            <div className="flex items-center justify-between">
              <UnstyledButton
                className=" text-gray-600 underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                onClick={close}
              >
                キャンセル
              </UnstyledButton>
              <div>
                <Button
                  radius="xl"
                  size="sm"
                  type="submit"
                  color="green.4"
                  className="w-full bg-main-green text-center text-[0.9rem] font-bold text-emerald-50"
                >
                  {postData || commentData ? "編集完了" : "投稿する"}
                </Button>
              </div>
            </div>

            {postData || commentData ? null : (
              <div className="mt-5">
                <h3 className="text-md text-gray-600">質問内容の入力</h3>
              </div>
            )}
          </div>

          <div className="mb-4">
            <TextInput
              classNames={{
                input: "pl-2.5 text-gray-600",
                label: "text-gray-500 font-bold mb-1",
              }}
              placeholder="次の日の大事な持ち物を忘れてしまう"
              label="タイトル"
              radius="xs"
              size="md"
              {...postForm.getInputProps("title")}
            />
          </div>

          <div className="mb-5">
            <Textarea
              classNames={{
                input: "pl-2.5 px-2 text-gray-600",
                label: "text-gray-500 font-bold mb-1",
              }}
              placeholder="どんなシチュエーションで何に困っているのか、詳しく記載することで回答してもらいやすくなります"
              label="本文の内容"
              size="md"
              radius="xs"
              autosize
              minRows={8}
              {...postForm.getInputProps("body")}
            />
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default PostForm;
