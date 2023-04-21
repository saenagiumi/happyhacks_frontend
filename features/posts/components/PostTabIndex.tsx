import { ScrollArea, Tabs } from "@mantine/core";
import { useAtom } from "jotai";
import { useEffect } from "react";
import {
  lastActiveHacksTabAtom,
  lastActiveQuestionTabAtom,
  lastActiveTabAtom,
} from "state/lastActiveTab";

import HacksCommunicationList from "./HacksCommunicationList";
import HacksHealthList from "./HacksHealthList";
import HacksItemList from "./HacksItemList";
import HacksJobList from "./HacksJobList";
import HacksLearningList from "./HacksLearningList";
import HacksLifeList from "./HacksLifeList";
import HacksTrendList from "./HacksTrendList";
import { PostListRecent } from "./PostListRecent";
import { PostListTrend } from "./PostListTrend";
import { PostListUnanswered } from "./PostListUnanswered";

const PostTabIndex = () => {
  const [activeTab, setActiveTab] = useAtom(lastActiveTabAtom);
  const [activeHacksTab, setActiveHacksTab] = useAtom(lastActiveHacksTabAtom);
  const [activeQuestionTab, setActiveQuestionTab] = useAtom(
    lastActiveQuestionTabAtom
  );

  // タブの復元
  useEffect(() => {
    setActiveTab(activeTab);
    setActiveHacksTab(activeHacksTab);
    setActiveQuestionTab(activeQuestionTab);
  }, []);

  const TAB_ITEMS = [
    { label: "対策", value: "hacks" },
    { label: "質問", value: "question" },
  ];

  const HACKS_TAB_ITEMS = [
    { label: "トレンド", value: "trend" },
    { label: "健康", value: "health" },
    { label: "アイテム", value: "item" },
    { label: "学習", value: "learning" },
    { label: "生活", value: "life" },
    { label: "仕事", value: "job" },
    { label: "人間関係", value: "communication" },
  ];

  const QUESTION_TAB_ITEMS = [
    { label: "トレンド", value: "trend" },
    { label: "新着", value: "recent" },
    { label: "未回答", value: "unanswered" },
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

        {/* <HacksTabPanel /> */}
        <Tabs.Panel value="hacks">
          <Tabs
            value={activeHacksTab}
            onTabChange={(value: string) => setActiveHacksTab(value)}
            variant="pills"
            radius="xl"
          >
            <ScrollArea
              style={{
                background: "white",
                position: "sticky",
                top: 0,
                zIndex: 10,
              }}
              className="sticky top-0 z-10 bg-white"
              type="never"
            >
              <div className="flex w-[670px] items-center xs:w-full">
                <Tabs.List className="my-3.5 pl-3 xs:my-0 xs:py-4 xs:pl-5">
                  {HACKS_TAB_ITEMS.map((item) => (
                    <Tabs.Tab
                      style={{
                        background: `${
                          activeHacksTab !== item.value ? "#F7F7F7" : "#42ce9f"
                        }`,
                      }}
                      key={item.value}
                      value={item.value}
                      className="mr-0.5 h-[2rem] w-[5.3rem] xs:mr-2"
                    >
                      <span
                        className={`flex items-center font-sans text-[14px] font-[600] xs:text-[15px] ${
                          activeHacksTab !== item?.value
                            ? "text-gray-500"
                            : "text-white"
                        } `}
                      >
                        {item.label}
                      </span>
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
              </div>
            </ScrollArea>

            <>
              {HACKS_TAB_ITEMS.map((item, index) => (
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

        {""}
        <Tabs.Panel value="question">
          <Tabs
            value={activeQuestionTab}
            onTabChange={(value: string) => setActiveQuestionTab(value)}
            variant="pills"
            radius="xl"
          >
            <div className="sticky top-0 z-10 flex items-center bg-white">
              <Tabs.List className="my-3.5 pl-3 xs:my-0 xs:py-4 xs:pl-5">
                {QUESTION_TAB_ITEMS.map((item) => (
                  <Tabs.Tab
                    style={{
                      background: `${
                        activeQuestionTab !== item.value ? "#F7F7F7" : "#42ce9f"
                      }`,
                    }}
                    key={item.value}
                    value={item.value}
                    className="mr-0.5 h-[2rem] w-[5.3rem] xs:mr-2"
                  >
                    <span
                      className={`flex items-center font-sans text-[14px] xs:text-[15px] ${
                        activeQuestionTab !== item.value
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

            <>
              {QUESTION_TAB_ITEMS.map((item, index) => (
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

        {/* <QuestionTabPanel /> */}
      </Tabs>
    </div>
  );
};

export default PostTabIndex;
