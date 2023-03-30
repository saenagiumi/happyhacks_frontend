import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { Textarea, TextInput, Button, UnstyledButton } from "@mantine/core";
import { Paper } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { MdCheckCircle } from "react-icons/md";
import { usePost } from "../hooks/usePost";

type FormData = {
  title: string;
  body: string;
  user_id: string;
};

const PostForm = ({ postData, commentData, close }: any) => {
  // どちらかのpropsが渡ってくれば編集モード
  const submitMode = {
    mode: postData
      ? "postEditMode"
      : commentData
      ? "commentEditMode"
      : "createMode",
    data: postData || commentData || null,
  };

  const { createPost, updatePost, updateComment } = usePost();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (inputData) => {
    switch (submitMode?.mode) {
      case "postEditMode": {
        const isSuccess = await updatePost(postData.id, inputData);
        if (isSuccess) {
          showNotification({
            title: "編集完了",
            message: "投稿を編集しました",
            color: "green.4",
            icon: <MdCheckCircle size={30} />,
          });

          close();
        }
        break;
      }
      case "commentEditMode": {
        const isSuccess = await updateComment(commentData.id, inputData);
        if (isSuccess) {
          showNotification({
            title: "編集完了",
            message: "回答を編集しました",
            color: "green.4",
            icon: <MdCheckCircle size={30} />,
          });

          close();
          router.replace(router.asPath);
        }
        break;
      }
      case "createMode": {
        const isSuccess = await createPost(inputData);
        if (isSuccess) {
          showNotification({
            title: "投稿完了",
            message: "投稿が完了しました",
            color: "green.4",
            icon: <MdCheckCircle size={30} />,
          });

          close();
          router.push("/recent");
        }
        break;
      }
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto">
      <Paper p="0" radius="xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <div className="flex justify-between items-center">
              <UnstyledButton
                className=" text-gray-600 underline"
                onClick={() => close()}
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
                  {postData || commentData ? "編集完了" : "投稿する"}
                </Button>
              </div>
            </div>

            {postData || commentData ? null : (
              <div className="mt-5">
                <h3 className="text-md text-gray-600">質問内容の入力</h3>
                <p className="text-sm text-gray-600">
                  気軽に質問してみましょう
                </p>
              </div>
            )}
          </div>

          <div className="mb-4">
            <TextInput
              defaultValue={submitMode.data?.title || ""}
              classNames={{
                input: "pl-2.5 text-gray-600",
                label: "text-gray-500 font-bold mb-1",
              }}
              placeholder="次の日の大事な持ち物を忘れてしまう"
              label="タイトル"
              radius="xs"
              size="md"
              autoFocus
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-xs font-bold text-red-400">
                質問のタイトルを入力してください
              </span>
            )}
          </div>
          <div className="mb-5">
            <Textarea
              defaultValue={submitMode.data?.body || ""}
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
              {...register("body", { required: true })}
            />
            {errors.body && (
              <span className="text-xs font-bold text-red-400">
                質問の内容を入力してください
              </span>
            )}
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default PostForm;
