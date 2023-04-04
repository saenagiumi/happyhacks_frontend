import { Tabs } from "@mantine/core";
import { useState } from "react";
import { PostListTrend } from "./PostListTrend";
import { PostListUnanswered } from "./PostListUnanswered";

export const QuestionTabPanel = () => {
  const [activeTab, setActiveTab] = useState<string | null>("trend");
  const TAB_ITEMS = [
    { value: "trend", label: "トレンド" },
    { value: "unanswered", label: "未回答" },
  ];

  return (
    <>
      <Tabs.Panel value="question">
        <Tabs
          value={activeTab}
          onTabChange={setActiveTab}
          variant="pills"
          color="green.4"
          radius="xl"
        >
          <div className="top-0 sticky bg-white z-10 flex items-center">
            <Tabs.List className="py-2 xs:py-3 pl-1 xs:pl-5">
              {TAB_ITEMS.map((item) => (
                <div>
                  <Tabs.Tab
                    value={item.value}
                    className="w-[5rem] xs:w-[5.5rem] h-[1.8rem] xs:h-[2.2rem] xs:mr-2"
                  >
                    <span
                      className={`flex items-center font-sans text-[12px] xs:text-[15px] ${
                        activeTab !== item.value
                          ? "text-gray-400"
                          : "text-white"
                      } font-[600]`}
                    >
                      {item.label}
                    </span>
                  </Tabs.Tab>
                </div>
              ))}
            </Tabs.List>
          </div>

          <>
            {TAB_ITEMS.map((item) => (
              <Tabs.Panel value={item.value}>
                {item.value === "trend" ? (
                  <PostListTrend />
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