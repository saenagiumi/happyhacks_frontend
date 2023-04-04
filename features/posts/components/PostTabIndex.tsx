import { Tabs } from "@mantine/core";
import { useState } from "react";
import { HacksTabPanel } from "./HacksTab";
import { QuestionTabPanel } from "./QuestionTab";

const PostTabIndex = () => {
  const [activeTab, setActiveTab] = useState<string | null>("hacks");
  const TAB_ITEMS = [
    { value: "hacks", label: "Hacks" },
    { value: "question", label: "質問" },
  ];

  return (
    <div>
      <Tabs
        value={activeTab}
        onTabChange={setActiveTab}
        color="green.4"
        radius="xs"
      >
        <Tabs.List className="pt-1 xs:pt-2.5">
          {TAB_ITEMS.map((item) => (
            <Tabs.Tab
              value={item.value}
              className="text-[15px] xs:text-[17px] pb-2 pl-4 xs:pl-5"
            >
              <span
                className={`font-sans ${
                  activeTab !== item.value ? "text-gray-400" : "text-gray-700"
                } font-[700]`}
              >
                {item.label}
              </span>
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <HacksTabPanel />
        <QuestionTabPanel />
      </Tabs>
    </div>
  );
};

export default PostTabIndex;
