import { ScrollArea, Tabs } from "@mantine/core";
import { useState } from "react";

export const HacksTabPanel = () => {
  const [activeTab, setActiveTab] = useState<string | null>("trend");
  const TAB_ITEMS = [
    { value: "trend", label: "トレンド" },
    { value: "tools", label: "ツール" },
    { value: "life", label: "生活" },
    { value: "job", label: "仕事" },
    { value: "communication", label: "対人関係" },
    { value: "learning", label: "学習" },
    { value: "health", label: "健康" },
  ];

  return (
    <>
      <Tabs.Panel value="hacks">
        <Tabs
          value={activeTab}
          onTabChange={setActiveTab}
          variant="pills"
          color="green.4"
          radius="xl"
        >
          <ScrollArea type="never">
            <div className="top-0 sticky bg-white border-0 border-b-[0.5px] border-gray-200 border-solid z-10 flex items-center w-[640px] xs:w-full">
              <Tabs.List className="my-2 xs:my-0 xs:py-4 pl-3 xs:pl-5">
                {TAB_ITEMS.map((item) => (
                  <Tabs.Tab
                    key={item.value}
                    value={item.value}
                    className="w-[5.5rem] h-[2.2rem] mr-[-6px] xs:mr-2"
                  >
                    <span
                      className={`flex items-center font-sans text-[14px] xs:text-[15px] ${
                        activeTab !== item.value
                          ? "text-gray-400"
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
                {item.label}
              </Tabs.Panel>
            ))}
          </>
        </Tabs>
      </Tabs.Panel>
    </>
  );
};
