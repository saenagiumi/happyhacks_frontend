import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { API_BASE_URL } from "const/const";
import { Textarea, TextInput, UnstyledButton } from "@mantine/core";
import { createStyles, Paper } from "@mantine/core";
import { useSWRConfig } from "swr";

// Toast
import { showNotification } from "@mantine/notifications";
import { MdCheckCircle } from "react-icons/md";

type Props = {
  accessToken: string | undefined;
  userId: string | undefined;
  postId: string | string[] | undefined;
  modalHandlers: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  };
};

type Comment = {
  user_id: string | undefined;
  post_id: string | string[] | undefined;
  title: string;
  body: string;
};

const useStyles = createStyles((theme) => ({
  comment: {
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

const CommentForm = (props: Props) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Comment>();

  const onSubmit: SubmitHandler<Comment> = (InputData) => {
    const CommentData = {
      ...InputData,
      user_id: props.userId,
      post_id: props.postId,
    };
    createComment(CommentData);
  };

  const createComment = async (commentInputData: Comment) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/posts/${props.postId}/comments`,
        {
          comment: commentInputData,
        },
        {
          headers: {
            Authorization: `Bearer ${props.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        // モーダルを閉じる処理
        props.modalHandlers.close();

        // 一覧の更新処理
        mutate(`${API_BASE_URL}/posts/${props.postId}/comments`);

        router.push(`/posts/${props.postId}`);
        showNotification({
          title: "投稿完了",
          message: "回答を投稿しました",
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <TextInput
            data-autofocus
            className=""
            classNames={{
              input: "pl-2.5 text-gray-600",
              label: "text-gray-500 font-bold mb-1",
            }}
            placeholder="玄関のドアに持ち物リストを吊るしておく"
            label="対策を簡潔に説明すると？"
            radius="xs"
            size="md"
            withAsterisk
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
            placeholder="紐付きのホワイトボードに次の日の持ち物を記入し、前日のうちに玄関のドアノブに吊るしておくことで、次の日出かける前に必ず持ち物を確認する動線ができます。うまくいくといいですね💪"
            label="具体的な内容"
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
              回答の内容を入力してください
            </span>
          )}
        </div>
        <div className="text-center">
          <UnstyledButton
            type="submit"
            className="w-[175px] h-[48px] rounded-[3px] text-center font-bold text-emerald-50 bg-main-green"
          >
            投稿する
          </UnstyledButton>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
