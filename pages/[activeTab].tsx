import { useRouter } from "next/router";

// Mantine
import { Tabs } from "@mantine/core";

// ソート済みのpost一覧
import { PostsOrderByCreatedSequence } from "components/Post/PostsOrderByCreatedSequence";
import { PostsOrderByCommentsLength } from "components/Post/PostsOrderByCommentsLength";

const ActiveTab = () => {
  const router = useRouter();

  return (
    <Tabs
      value={router.query.activeTab as string}
      defaultValue="/"
      color="green.4"
      radius="xs"
      onTabChange={(value) => router.push(`${value}`)}
    >
      <Tabs.List>
        <Tabs.Tab value="/">トレンド</Tabs.Tab>
        <Tabs.Tab value="new">新着</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="/" pt="xs">
        <PostsOrderByCommentsLength />
      </Tabs.Panel>

      <Tabs.Panel value="new" pt="xs">
        <PostsOrderByCreatedSequence />
      </Tabs.Panel>
    </Tabs>
  );
};

export default ActiveTab;
