import { ScrollArea, Tabs } from "@mantine/core";
import { useState } from "react";
import HacksToolList from "features/posts/components/HacksToolList";
import HacksLifeList from "./HacksLifeList";

export const HacksTabPanel = () => {
  const [activeTab, setActiveTab] = useState<string | null>("trend");
  const TAB_ITEMS = [
    { value: "trend", label: "トレンド" },
    { value: "health", label: "健康" },
    { value: "tools", label: "ツール" },
    { value: "learning", label: "学習" },
    { value: "life", label: "生活" },
    { value: "job", label: "仕事" },
    { value: "communication", label: "対人関係" },
  ];

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
            <div className="top-0 sticky bg-white z-10 flex items-center w-[670px] xs:w-full">
              <Tabs.List className="my-3.5 xs:my-0 xs:py-4 pl-3 xs:pl-5">
                {TAB_ITEMS.map((item) => (
                  <Tabs.Tab
                    style={{
                      background: `${
                        activeTab !== item.value ? "#F7F7F7" : "#42ce9f"
                      }`,
                    }}
                    key={item.value}
                    value={item.value}
                    className="w-[5.3rem] h-[2rem] mr-0.5 xs:mr-2"
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
                    <>trend</>
                  ) : item.value === "communication" ? (
                    <>communication</>
                  ) : item.value === "life" ? (
                    <>
                      <HacksLifeList />
                    </>
                  ) : item.value === "learning" ? (
                    <>learning</>
                  ) : item.value === "tools" ? (
                    <HacksToolList />
                  ) : item.value === "job" ? (
                    <>job</>
                  ) : item.value === "health" ? (
                    <>health</>
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
