import { Tabs } from "@mantine/core";
import HacksByUserId from "features/posts/components/HacksByUserId";
import PostsByUserId from "features/posts/components/PostsByUserId";
import React, { useState } from "react";

const PostTab = () => {
  const [activeTab, setActiveTab] = useState<string | null>("hacks");
  const TAB_ITEMS = [
    { label: "対策", value: "hacks" },
    { label: "質問", value: "posts" },
  ];

  return (
    <Tabs
      value={activeTab}
      onTabChange={setActiveTab}
      variant="pills"
      radius="xl"
    >
      <div className="mx-auto max-w-screen-md">
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
                    activeTab !== item.value ? "text-gray-500" : "text-white"
                  } font-[600]`}
                >
                  {item.label}
                </span>
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </div>

        <>
          {TAB_ITEMS.map((item, index) => (
            <Tabs.Panel key={index} value={item.value}>
              <div>
                {item.value === "hacks" ? (
                  <HacksByUserId />
                ) : item.value === "posts" ? (
                  <PostsByUserId />
                ) : (
                  <></>
                )}
              </div>
            </Tabs.Panel>
          ))}
        </>
      </div>
    </Tabs>
  );
};

export default PostTab;
