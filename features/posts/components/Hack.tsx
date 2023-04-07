import Script from "next/script";
import { Tweet } from "components/Tweet";

import {
  Text,
  Avatar,
  Group,
  Menu,
  UnstyledButton,
  Modal,
  Button,
} from "@mantine/core";

// react-icons
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { showNotification } from "@mantine/notifications";
import { MdCheckCircle } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "state/currentUser";
import PostForm from "./PostForm";
import { useDestroyPost } from "../hooks/useDestroyPost";
import { TargetPost } from "../types";
import { User } from "features/users/types";

type Props = {
  id: string;
  userId: string;
  tweetId: string;
  title: string;
  body: string;
  categories: string[];
  name: string;
  iconSrc: string;
};

export const Hack = ({
  id,
  userId,
  tweetId,
  title,
  body,
  categories,
  name,
  iconSrc,
}: Props) => {
  const currentUser = useAtomValue<User>(currentUserAtom);
  const [opened, setOpened] = useState<boolean>(false);
  const [editOpened, setEditOpened] = useState<boolean>(false);
  const [targetPost, setTargetPost] = useState<TargetPost>({
    id: "",
    title: "",
    body: "",
  });
  // const { destroyPost } = useDestroyPost();
  const router = useRouter();

  // const handleDelete = async () => {
  //   const isSuccess = await destroyPost(id);

  //   if (isSuccess) {
  //     setOpened(false);
  //     showNotification({
  //       autoClose: 3000,
  //       title: "削除完了",
  //       message: "投稿を削除しました",
  //       color: "green.4",
  //       icon: <MdCheckCircle size={30} />,
  //     });
  //   }

  //   router.back();
  // };

  return (
    <div>
      <div className="pt-3.5 pb-2 xs:p-5 xs:pt-7">
        <div className="w-full">
          <div className="text-main-black font-bold">
            <div className="xs:tracking-wide text-[16px] xs:text-[1.125rem] leading-6 tracking-wide">
              {title}
            </div>
          </div>

          <div className="pt-2 pb-1">
            <div className="break-all text-[14px] xs:text-[1.125rem] leading-7 xs:leading-8 text-main-black tracking-wide">
              {body}
            </div>
            <div className="xs:mx-auto">
              <Tweet id={tweetId} />
            <Script
              src="https://platform.twitter.com/widgets.js"
              strategy="lazyOnload"
            />
            </div>
          </div>
          <div className="mt-1 mb-0.5">
            <div>
              <div className="font-sans text-main-black text-[12px]">
                {categories.map((category, index) => (
                  <span key={index}>{"#" + category + " "}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
