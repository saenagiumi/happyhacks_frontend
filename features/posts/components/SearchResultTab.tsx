import { Tabs } from "@mantine/core";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect } from "react";
import { lastActiveSearchTabAtom } from "state/lastActiveTab";

import { Hack, PostReturnType } from "../types";
import HacksLayout from "./HacksLayout";
import PostsLayout from "./PostsLayout";

type Props = {
  hacksResults: Hack[];
  postsResults: PostReturnType[];
};

const SearchResultTab = ({ hacksResults, postsResults }: Props) => {
  const [activeTab, setActiveTab] = useAtom(lastActiveSearchTabAtom);

  // タブの復元
  useEffect(() => {
    setActiveTab(activeTab);
  }, []);

  const TAB_ITEMS = [
    { label: `対策 ${hacksResults?.length}`, value: "hacks" },
    { label: `質問 ${postsResults?.length}`, value: "question" },
  ];

  return (
    <div>
      <Tabs
        value={activeTab}
        onTabChange={(value: string) => setActiveTab(value)}
        color="green.4"
        radius="xs"
      >
        <Tabs.List className="pt-1 xs:pt-2.5">
          {TAB_ITEMS.map((item) => (
            <Tabs.Tab
              key={item.value}
              value={item.value}
              className="px-5 pb-3 text-[16px] xs:pl-5 xs:text-[17px]"
            >
              <span
                className={`font-sans font-[700] ${
                  activeTab !== item.value ? "text-gray-400" : "text-gray-700"
                } `}
              >
                {item.label}
              </span>
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <Tabs.Panel value="hacks">
          <ol className="m-0 p-0">
            {hacksResults?.map((hack: Hack) => {
              return (
                <li key={hack.id}>
                  <Link
                    href={`/hacks/${hack.id}`}
                    className="pb-1.5 no-underline"
                  >
                    <HacksLayout hack={hack} />
                  </Link>
                </li>
              );
            })}
          </ol>
        </Tabs.Panel>

        <Tabs.Panel value="question">
          <ol className="m-0 p-0">
            {postsResults?.map((post: PostReturnType) => {
              return (
                <li key={post.id}>
                  <Link
                    href={`/posts/${post.id}`}
                    className="pb-1.5 no-underline"
                  >
                    <PostsLayout post={post} />
                  </Link>
                </li>
              );
            })}
          </ol>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default SearchResultTab;
