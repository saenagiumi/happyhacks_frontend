import { Button, Textarea, TextInput, UnstyledButton } from "@mantine/core";
import { useForm } from "@mantine/form";
// Toast
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { MdCheckCircle } from "react-icons/md";

import { useCreateComment } from "../hooks/useCreateComment";
import { CommentData } from "../types";

type Props = {
  modalHandlers: {
    readonly close: () => void;
    readonly open: () => void;
    readonly toggle: () => void;
  };
  postId: string | string[] | undefined;
  userId: string | undefined;
};

const CommentForm = (props: Props) => {
  const { createComment } = useCreateComment();
  const router = useRouter();

  const commentForm = useForm<CommentData>({
    initialValues: {
      title: "",
      body: "",
      post_id: "",
      user_id: "",
    },
    validate: {
      title: (value) =>
        value.length <= 0 ? "タイトルを入力してください" : null,
      body: (value) => (value.length <= 0 ? "本文を入力してください" : null),
    },
  });

  const onSubmit = async (inputData: CommentData) => {
    const commentData: CommentData = {
      title: inputData.title,
      body: inputData.body,
      post_id: props.postId,
      user_id: props.userId,
    };

    const isSuccess = await createComment(props.postId, commentData);

    if (isSuccess) {
      showNotification({
        title: "投稿完了",
        autoClose: 3000,
        color: "green.4",
        icon: <MdCheckCircle size={30} />,
        message: "回答を投稿しました",
      });
      props.modalHandlers.close();
      router.replace(router.asPath);
    }
  };

  return (
    <div>
      <form onSubmit={commentForm.onSubmit((values) => onSubmit(values))}>
        <div className="mb-5">
          <div className="mb-5 flex items-center justify-between">
            <UnstyledButton
              className=" text-gray-600 underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              onClick={() => props.modalHandlers.close()}
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
                回答する
              </Button>
            </div>
          </div>
          <TextInput
            data-autofocus
            className=""
            classNames={{
              input: "pl-2.5 text-gray-600",
              label: "text-gray-500 font-bold mb-1",
            }}
            placeholder="例: 玄関に持ち物リストを設置する"
            label="対策を簡単に説明すると？"
            radius="xs"
            size="md"
            {...commentForm.getInputProps("title")}
          />
        </div>
        <div className="mb-8">
          <Textarea
            classNames={{
              input: "pl-2.5 px-2 text-gray-600",
              label: "text-gray-500 font-bold mb-1",
            }}
            placeholder="例: 紐付きのホワイトボードに翌日の持ち物リストを記入し、前日のうちに玄関のドアノブに吊るしておくことで、次の日出かける前に必ず持ち物を確認する動線ができます。よかったら試してみてください！"
            label="具体的な方法"
            size="md"
            radius="xs"
            autosize
            minRows={8}
            {...commentForm.getInputProps("body")}
          />
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
