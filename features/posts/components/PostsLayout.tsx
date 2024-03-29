import { Avatar } from "@mantine/core";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

import { PostReturnType } from "../types";

const PostsLayout = ({ post }: { post: PostReturnType }) => {
  return (
    <div>
      <div className="px-2 pr-3 pb-1 xs:px-1.5 xs:hover:bg-slate-100">
        <div className="pt-[18px] xs:pl-10 xs:pr-20 xs:pt-10 xs:pb-6">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <Avatar
                alt={`${post.name}のアイコン`}
                src={post.picture}
                className="mr-2.5"
                size={30}
                radius={50}
              />
              <div className="font-sans text-[12px] font-bold text-gray-700">
                {post.name}
              </div>
            </div>

            {post.comments_count !== 0 && (
              <div className="flex items-center pr-2 font-bold text-gray-700 xs:text-[16px]">
                <HiOutlineChatBubbleOvalLeft className="mr-[3px] mb-[1px] text-[16px]" />
                <div className="text-[14px] text-gray-600 xs:text-[15px]">
                  {post.comments_count}
                </div>
              </div>
            )}
          </div>
          <div className="pl-[40px]">
            <div className="flex items-center justify-between font-bold text-main-black">
              <div className="text-[16px] leading-6 tracking-wide xs:text-[1.125rem] xs:tracking-wide">
                {post.title}
              </div>
            </div>

            <div className="pt-2 pb-1">
              <div className="w-full break-all text-[14px] leading-7 tracking-wide text-main-black xs:text-[1.125rem] xs:leading-8">
                {post.body.length > 100 ? (
                  <span>
                    {`${post.body.slice(0, 100)} `}
                    <span className="text-[14px] font-bold text-blue-400 group-hover:underline">
                      ...もっと読む
                    </span>
                  </span>
                ) : (
                  post.body
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsLayout;
