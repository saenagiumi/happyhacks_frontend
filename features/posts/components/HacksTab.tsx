import { ScrollArea, Tabs } from "@mantine/core";
import HacksItemList from "features/posts/components/HacksItemList";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import HacksCommunicationList from "./HacksCommunicationList";
import HacksHealthList from "./HacksHealthList";
import HacksJobList from "./HacksJobList";
import HacksLearningList from "./HacksLearningList";
import HacksLifeList from "./HacksLifeList";
import HacksTrendList from "./HacksTrendList";

export const HacksTabPanel = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string | null>("trend");
  const TAB_ITEMS = [
    { label: "トレンド", value: "trend" },
    { label: "健康", value: "health" },
    { label: "アイテム", value: "item" },
    { label: "学習", value: "learning" },
    { label: "生活", value: "life" },
    { label: "仕事", value: "job" },
    { label: "人間関係", value: "communication" },
  ];

  // ページのロード時にURLのクエリーパラメータを取得して、activeTabを設定する
  useEffect(() => {
    const { query } = router;
    const tab = query.tab as string;
    if (tab && TAB_ITEMS.some((item) => item.value === tab)) {
      setActiveTab(tab);
    }
  }, []);

  // activeTabが変更されるたびにURLのクエリーパラメータを更新する
  // useEffect(() => {
  //   const { pathname, query } = router;
  //   query.tab = activeTab;
  //   router.replace({ pathname, query });
  // }, [activeTab]);


  return (
    <>
      <Tabs.Panel value="hacks">
        <Tabs
          value={activeTab}
          onTabChange={setActiveTab}
          variant="pills"
          radius="xl"
        >
          <ScrollArea type="never">
            <div className="flex w-[670px] items-center xs:w-full">
              <Tabs.List className="my-3.5 pl-3 xs:my-0 xs:py-4 xs:pl-5">
                {TAB_ITEMS.map((item) => (
                  <Tabs.Tab
                    style={{
                      background: `${
                        activeTab !== item.value ? "#F7F7F7" : "#42ce9f"
                      }`,
                    }}
                    key={item.value}
                    value={item.value}
                    className="mr-0.5 h-[2rem] w-[5.3rem] xs:mr-2"
                  >
                    <span
                      className={`flex items-center font-sans text-[14px] xs:text-[15px] ${
                        activeTab !== item.value
                          ? "text-gray-500"
                          : "text-white"
                      } font-[600]`}
                    >
                      {item.label}
                    </span>
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </div>
          </ScrollArea>

          <>
            {TAB_ITEMS.map((item, index) => (
              <Tabs.Panel key={index} value={item.value}>
                <div>
                  {item.value === "trend" ? (
                    <HacksTrendList />
                  ) : item.value === "communication" ? (
                    <HacksCommunicationList />
                  ) : item.value === "life" ? (
                    <HacksLifeList />
                  ) : item.value === "learning" ? (
                    <HacksLearningList />
                  ) : item.value === "item" ? (
                    <HacksItemList />
                  ) : item.value === "job" ? (
                    <HacksJobList />
                  ) : item.value === "health" ? (
                    <HacksHealthList />
                  ) : (
                    <></>
                  )}
                </div>
              </Tabs.Panel>
            ))}
          </>
        </Tabs>
      </Tabs.Panel>
    </>
  );
};
