import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
} from "@mantine/core";

// react-icons
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

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
  iconSrc: string;
  postedAt: string;
  comments_count: number;
}

export const Post = ({
  title,
  body,
  name,
  iconSrc,
  postedAt,
  comments_count,
}: PostProps) => {
  const { classes } = useStyles();
  return (
    <div className="pt-1.5">
      <Text className="pl-2 pt-1.5 text-gray-600 font-bold" size="lg">
        {title}
      </Text>

      <TypographyStylesProvider className={classes.body}>
        <div className="w-full break-all text-gray-500">{body} </div>
      </TypographyStylesProvider>
      <Group position="apart">
        <Group className="ml-1.5" spacing="xs">
          <Avatar src={iconSrc} alt={"author.name"} radius="xl" size="sm" />
          <Text className="text-gray-600" size="sm">
            {name}
          </Text>
        </Group>
        <Group className="pr-2">
          {/* <Text size="sm" color="dimmed">
            {dayjs(postedAt).format("MM/DD HH:mm")}
          </Text> */}
          {comments_count && (
            // コメントがあればアイコンと件数を表示
            <div className=" text-gray-500 flex items-center">
              <HiOutlineChatBubbleOvalLeft className="mr-0.5" />
              <div className="text-sm">{comments_count}</div>
            </div>
          )}
        </Group>
      </Group>
    </div>
  );
};
