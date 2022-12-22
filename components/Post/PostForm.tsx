import { useForm, SubmitHandler } from "react-hook-form";
import { Textarea, TextInput, Button } from "@mantine/core";
import { createStyles, Paper, Group, Text } from "@mantine/core";

type Form = {
  title: string;
  content: string;
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

interface PostProps {
  title: string;
  body: string;
  author: string;
  postedAt: string;
}

const PostForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Form>();
  const onSubmit: SubmitHandler<Form> = (data) => console.log(data);

  console.log(watch("title")); // watch input value by passing the name of it

  const { classes } = useStyles();
  return (
    <div>
      <Paper p="xs" radius="xs" className={classes.post}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            className="mb-4"
            classNames={{
              input: "pl-2.5 text-gray-600",
              label: "text-gray-500 font-bold mb-1",
            }}
            placeholder="次の日の大事な持ち物を忘れてしまう"
            label="タイトル"
            radius="xs"
            size="md"
            withAsterisk
          />
          <Textarea
            className="mb-10"
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
          />
          <div className="text-center">
            <Button classNames={{ root: "w-48"}} color="yellow" size="lg">
              投稿する
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default PostForm;
