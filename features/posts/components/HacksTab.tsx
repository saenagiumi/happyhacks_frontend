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
            <div className="top-0 sticky bg-white z-10 flex items-center w-[700px] xs:w-full">
              <Tabs.List className="my-3.5 xs:my-0 xs:py-5 pl-4 xs:pl-5">
                {TAB_ITEMS.map((item) => (
                  <div>
                    <Tabs.Tab
                      value={item.value}
                      className="w-[5.5rem] h-[2.2rem] xs:mr-2"
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
                  </div>
                ))}
              </Tabs.List>
            </div>
          </ScrollArea>

          <>
            {TAB_ITEMS.map((item) => (
              <Tabs.Panel value={item.value}>{item.label}</Tabs.Panel>
            ))}
          </>
        </Tabs>
      </Tabs.Panel>
    </>
  );
};
