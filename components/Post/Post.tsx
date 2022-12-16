import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
} from "@mantine/core";

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

interface PostProps {
  postedAt: string;
  body: string;
  author: {
    name: string;
    image: string;
  };
}

export const Post = ({ postedAt, body, user }: PostProps) => {
  const { classes } = useStyles();
  return (
    <Paper
      shadow="sm"
      radius="xs"
      p="xs"
      withBorder
      className={classes.comment}
    >
      <Text className="pl-1.5 pt-1.5 text-gray-600 font-bold" size="lg">
        ここには質問のタイトルが入ります。多少長くなることもあるでしょう
      </Text>

      <TypographyStylesProvider className={classes.body}>
        <div className="w-full break-all text-gray-500">
          質問の内容が入ります質問の内容が入ります質問の内容が入ります質問の内容が入ります質問の内容が入ります質問の内容が入ります質問の内容が入ります質問の内容が入ります質問の内容が入ります
        </div>
      </TypographyStylesProvider>
      <Group position="apart">
        <Group spacing="xs">
          <Avatar alt={user} radius="xl" />
          <Text className="text-gray-600" size="sm">
            {user}
          </Text>
        </Group>
        <Group className="pr-2">
          <Text size="sm" color="dimmed">
            {postedAt}
          </Text>
        </Group>
      </Group>
    </Paper>
  );
};
