import { useAuth0 } from "@auth0/auth0-react";
import { Tabs } from "@mantine/core";
import BookmarkedCommentListByUserId from "features/users/components/BookmarkedCommentListByUserId";
import BookmarkedHackListByUserId from "features/users/components/BookmarkedHackListByUserId";
import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { currentUserAtom } from "state/currentUser";
import { lastActiveSearchTabAtom } from "state/lastActiveTab";

import { getUserBookmark } from "../api/getUserBookmark";

const BookmarkTab = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [activeTab, setActiveTab] = useAtom(lastActiveSearchTabAtom);
  const [bookmarks, setBookmarks] = useState({ comments: [], hacks: [] });
  const currentUser = useAtomValue(currentUserAtom);
  const TAB_ITEMS = [
    { label: "対策", value: "hacks" },
    { label: "回答", value: "comments" },
  ];

  const getBookmarks = async (user_id: string) => {
    const accessToken = await getAccessTokenSilently();
    const res = await getUserBookmark({ accessToken, user_id });
    setBookmarks(res);
  };

  useEffect(() => {
    if (currentUser.id !== "") {
      getBookmarks(currentUser.id);
    }
  }, [currentUser]);

  return (
    <Tabs
      value={activeTab}
      onTabChange={(value: string) => setActiveTab(value)}
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
                  <BookmarkedHackListByUserId hacks={bookmarks.hacks} />
                ) : item.value === "comments" ? (
                  <BookmarkedCommentListByUserId
                    comments={bookmarks.comments}
                  />
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

export default BookmarkTab;
