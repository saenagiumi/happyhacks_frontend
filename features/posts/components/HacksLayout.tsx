import { Avatar } from "@mantine/core";
import { FaRegBookmark } from "react-icons/fa";

import { Hack } from "../types";

const HacksLayout = ({ hack }: { hack: Hack }) => {
  return (
    <div>
      <div className="px-2 pr-3 pb-1 xs:px-1.5 xs:hover:bg-slate-100">
        <div className="pt-[18px] xs:pl-10 xs:pr-20 xs:pt-10 xs:pb-6">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <Avatar
                alt={`${hack.name}のアイコン`}
                src={hack.picture}
                className="mr-2.5"
                size={30}
                radius={50}
              />
              <div className="font-sans text-[12px] font-bold text-gray-700">
                {hack.name}
              </div>
            </div>

            {hack.bookmarks_count !== 0 && (
              <div className="flex items-center pr-2 text-[13px] font-bold text-gray-600 xs:text-[16px]">
                <FaRegBookmark className="mr-1" />
                <div className="text-[14px] text-gray-600 xs:text-[15px]">
                  {hack.bookmarks_count}
                </div>
              </div>
            )}
          </div>

          <div className="pl-[40px]">
            <div className="flex items-center justify-between font-bold text-main-black">
              <div className="text-[16px] leading-6 tracking-wide xs:text-[1.125rem] xs:tracking-wide">
                {hack.title}
              </div>
            </div>

            <div className="pt-2 pb-1">
              <div className="w-full break-all text-[14px] leading-7 tracking-wide text-main-black xs:text-[1.125rem] xs:leading-8">
                {hack.body}
              </div>
            </div>
            <div className="mt-1 mb-3">
              <div>
                <div className="font-sans text-[12px] text-main-black">
                  {hack.tags?.map((tag: string, index: number) => (
                    <span className="mr-1" key={index}>
                      {"#" + tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar
                alt={`${hack.name}のアイコン`}
                src={hack.picture}
                className="mr-2"
                size={26}
                radius={50}
              />
              <div className="font-sans text-[12px] font-bold text-gray-700">
                {hack.name}
              </div>
            </div>

            {hack.bookmarks_count !== 0 && (
              <div className="flex items-center text-[14px] text-gray-500">
                <FaRegBookmark className="mr-1" />
                <div className="text-[16px] text-gray-600">
                  {hack.bookmarks_count}
                </div>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HacksLayout;
