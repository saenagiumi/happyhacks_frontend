import { Tabs } from "@mantine/core";
import { useState } from "react";

export const HacksTabPanel = () => {
  const [activeTab, setActiveTab] = useState<string | null>("item");
  const TAB_ITEMS = [
    { value: "item", label: "アイテム" },
    { value: "life", label: "生活" },
    { value: "job", label: "仕事" },
    { value: "learning", label: "学習" },
    { value: "communication", label: "対人関係" },
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
          <div className="top-0 sticky bg-white z-10 flex items-center">
            <Tabs.List pl="xs" py={8}>
              {TAB_ITEMS.map((item) => (
                <div>
                  <Tabs.Tab value={item.value} className="w-[5rem] h-[1.8rem]">
                    <span
                      className={`flex items-center font-sans text-[12px] ${
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
              <Tabs.Panel value={item.value}>{item.label}</Tabs.Panel>
            ))}
          </>
        </Tabs>
      </Tabs.Panel>
    </>
  );
};
