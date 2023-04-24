import { Avatar } from "@mantine/core";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

import { PostReturnType } from "../types";

const PostsLayout = ({ post }: { post: PostReturnType }) => {
  return (
    <div>
      <div className="px-5 pb-1 xs:px-1.5 xs:hover:bg-slate-100">
        <div className="pt-[18px] pb-2 xs:p-5 xs:pt-7">
          <div className="flex items-center justify-between font-bold text-main-black">
            <div className="text-[16px] leading-6 tracking-wide xs:text-[1.125rem] xs:tracking-wide">
              {post.title}
            </div>
          </div>

          <div className="pt-2 pb-3">
            <div className="w-full break-all text-[14px] leading-7 tracking-wide text-main-black xs:text-[1.125rem] xs:leading-8">
              {post.body}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar
                alt={`${post.name}のアイコン`}
                src={post.picture}
                className="mr-2"
                size={26}
                radius={50}
              />
              <div className="font-sans text-[14px]">{post.name}</div>
            </div>

            {post.comments_count !== 0 && (
              <div className="flex items-center text-[12.5px] text-gray-400">
                <HiOutlineChatBubbleOvalLeft className="mr-1 text-[16px] text-gray-500" />
                <div className="text-[14px] text-gray-500">
                  {post.comments_count}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsLayout;
