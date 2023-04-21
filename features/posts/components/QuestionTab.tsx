import { Tabs } from "@mantine/core";
import { useEffect, useState } from "react";

import { PostListRecent } from "./PostListRecent";
import { PostListTrend } from "./PostListTrend";
import { PostListUnanswered } from "./PostListUnanswered";

export const QuestionTabPanel = () => {
  const [activeTab, setActiveTab] = useState<string | null>("trend");
  const TAB_ITEMS = [
    { label: "トレンド", value: "trend" },
    { label: "新着", value: "recent" },
    { label: "未回答", value: "unanswered" },
  ];

  useEffect(() => {
    // URLのクエリパラメータからactiveTabを復元
    const queryParams = new URLSearchParams(window.location.search);
    const activeTabParam = queryParams.get("activeTab");
    if (
      activeTabParam &&
      TAB_ITEMS.some((item) => item.value === activeTabParam)
    ) {
      setActiveTab(activeTabParam);
    }
  }, []);

  return (
    <>
      <Tabs.Panel value="question">
        <Tabs
          value={activeTab}
          onTabChange={setActiveTab}
          variant="pills"
          radius="xl"
        >
          <div className="flex items-center">
            <div>
              <Tabs.List className="sticky top-0 z-10 my-3.5 bg-white pl-3 xs:my-0 xs:py-4 xs:pl-5">
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
          </div>

          <>
            {TAB_ITEMS.map((item, index) => (
              <Tabs.Panel key={index} value={item.value}>
                {item.value === "trend" ? (
                  <PostListTrend />
                ) : item.value === "recent" ? (
                  <PostListRecent />
                ) : item.value === "unanswered" ? (
                  <PostListUnanswered />
                ) : (
                  <></>
                )}
              </Tabs.Panel>
            ))}
          </>
        </Tabs>
      </Tabs.Panel>
    </>
  );
};
