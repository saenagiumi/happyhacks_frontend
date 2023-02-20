import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { API_URL } from "utils/const";
import { Textarea, TextInput, Button, UnstyledButton } from "@mantine/core";
import { createStyles, Paper, Group, Text } from "@mantine/core";

// Toast
import { showNotification } from "@mantine/notifications";
import { MdCheckCircle } from "react-icons/md";

type Post = {
  title: string;
  body: string;
  user_id: string;
};

const useStyles = createStyles((theme) => ({
  post: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },

  body: {
    paddingLeft: 7,
    paddingTop: 8,
    paddingBottom: 5,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));

const PostForm = ({ accessToken, postData, commentData }: any) => {
  
  // どちらかのpropsが渡ってくれば編集モード
  const submitMode = {
    mode: postData ? "postEditMode" : commentData ? "commentEditMode" : "default",
    data: postData || commentData || null,
  };

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();

  const onSubmit: SubmitHandler<Post> = (inputData) => {
    const PostData = {
      ...inputData,
    };
    switch (submitMode?.mode) {
      case "postEditMode":
        return updatePost(postData.id, PostData);
      case "commentEditMode":
        return updateComment(commentData.id, PostData);
      default:
        return createPost(PostData);
    }
  };

  const createPost = async (postInputData: Post) => {
    try {
      const response = await axios.post(
        `${API_URL}/posts`,
        { post: postInputData },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        router.push("/new");
        showNotification({
          title: "投稿完了",
          message: "質問を投稿しました",
          color: "green.4",
          icon: <MdCheckCircle size={30} />,
        });
        return response.data;
      }
    } catch (error) {
      let message;
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
      } else {
        message = String(error);
        console.error(message);
      }
    }
  };

  const updatePost = async (id: string, postInputData: Post) => {
    try {
      const response = await axios.patch(
        `${API_URL}/posts/${id}`,
        { post: postInputData },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        router.back();
        showNotification({
          title: "編集完了",
          message: "質問を更新しました",
          color: "green.4",
          icon: <MdCheckCircle size={30} />,
        });
        return response.data;
      }
    } catch (error) {
      let message;
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
      } else {
        message = String(error);
        console.error(message);
      }
    }
  };

  const updateComment = async (id: string, commentInputData: Post) => {
    try {
      const response = await axios.patch(
        `${API_URL}/comments/${id}`,
        { comment: commentInputData },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        router.back();
        showNotification({
          title: "編集完了",
          message: "回答を更新しました",
          color: "green.4",
          icon: <MdCheckCircle size={30} />,
        });
        return response.data;
      }
    } catch (error) {
      let message;
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
      } else {
        message = String(error);
        console.error(message);
      }
    }
  };

  const { classes } = useStyles();
  return (
    <div>
      <Paper p="xs" radius="xs" className={classes.post}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <TextInput
              defaultValue={submitMode.data?.title || ""}
              className=""
              classNames={{
                input: "pl-2.5 text-gray-600",
                label: "text-gray-500 font-bold mb-1",
              }}
              placeholder="次の日の大事な持ち物を忘れてしまう"
              label="タイトル"
              radius="xs"
              size="md"
              withAsterisk
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-xs font-bold text-red-400">
                質問のタイトルを入力してください
              </span>
            )}
          </div>
          <div className="mb-10">
            <Textarea
              defaultValue={submitMode.data?.body || ""}
              classNames={{
                input: "pl-2.5 px-2 text-gray-600",
                label: "text-gray-500 font-bold mb-1",
              }}
              placeholder="どんなシチュエーションで何に困っているのか、詳しく記載することで回答してもらいやすくなります"
              label="質問の内容"
              size="md"
              radius="xs"
              autosize
              minRows={6}
              maxRows={6}
              withAsterisk
              {...register("body", { required: true })}
            />
            {errors.body && (
              <span className="text-xs font-bold text-red-400">
                質問の内容を入力してください
              </span>
            )}
          </div>
          <div className="text-center">
            <UnstyledButton
              type="submit"
              className="w-[175px] h-[48px] rounded-[3px] text-center font-bold text-emerald-50 bg-main-green"
            >
              {postData || commentData ? "更新する" : "投稿する"}
            </UnstyledButton>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default PostForm;
