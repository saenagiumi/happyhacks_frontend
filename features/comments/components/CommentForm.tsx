import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { Button, Textarea, TextInput, UnstyledButton } from "@mantine/core";

// Toast
import { showNotification } from "@mantine/notifications";
import { MdCheckCircle } from "react-icons/md";

import { useCreateComment } from "../hooks/useCreateComment";
import { CommentData } from "../types";

type Props = {
  userId: string | undefined;
  postId: string | string[] | undefined;
  modalHandlers: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  };
};

const CommentForm = (props: Props) => {
  const { createComment } = useCreateComment();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentData>();

  const onSubmit: SubmitHandler<CommentData> = async (inputData) => {
    const commentData: CommentData = {
      title: inputData.title,
      body: inputData.body,
      user_id: props.userId,
      post_id: props.postId,
    };

    const isSuccess = await createComment(props.postId, commentData);

    if (isSuccess) {
      showNotification({
        autoClose: 3000,
        title: "投稿完了",
        message: "回答を投稿しました",
        color: "green.4",
        icon: <MdCheckCircle size={30} />,
      });
      props.modalHandlers.close();
      router.replace(router.asPath);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <div className="flex justify-between items-center mb-5">
            <UnstyledButton
              className=" text-gray-600 underline"
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
                className="w-full text-[0.9rem] text-center font-bold text-emerald-50 bg-main-green"
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
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-xs font-bold text-red-400">
              回答のタイトルを入力してください
            </span>
          )}
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
            {...register("body", { required: true })}
          />
          {errors.body && (
            <span className="text-xs font-bold text-red-400">
              回答の内容を入力してください
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
