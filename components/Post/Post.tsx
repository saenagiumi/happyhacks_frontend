import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
} from "@mantine/core";
import dayjs from "dayjs";

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
  title: string;
  body: string;
  name: string;
  postedAt: string;
}

export const Post = ({ title, body, name, postedAt }: PostProps) => {
  const { classes } = useStyles();
  return (
    <Paper
      shadow="sm"
      radius="xs"
      p="xs"
      withBorder
      className={classes.comment}
    >
      <Text className="pl-2 pt-1.5 text-gray-600 font-bold" size="lg">
        {title}
      </Text>

      <TypographyStylesProvider className={classes.body}>
        <div className="w-full break-all text-gray-500">{body} </div>
      </TypographyStylesProvider>
      <Group position="apart">
        <Group className="ml-0.5" spacing="xs">
          <Avatar alt={"author.name"} radius="xl" />
          <Text className="text-gray-600" size="sm">
            {name}
          </Text>
        </Group>
        <Group className="pr-2">
          <Text size="sm" color="dimmed">
            {dayjs(postedAt).format("MM/DD HH:mm")}
          </Text>
        </Group>
      </Group>
    </Paper>
  );
};
