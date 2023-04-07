import { Group } from "@mantine/core";
import { API_BASE_URL } from "const/const";
import { useFetchArray } from "hooks/useFetchArray";
import Link from "next/link";
import React from "react";
import { Hack } from "./Hack";
import { Post } from "./Post";

const HacksLifeList = () => {
  const { data } = useFetchArray(`${API_BASE_URL}/hacks`);
  const filteredData = data?.filter((hack: any) =>
  hack.categories.includes("生活")
);
  return (
    <div>
      <ol className="m-0 p-0">
        {filteredData?.map((hack: any) => {
          console.log({ hack });

          return (
            <li
              key={hack.id}
              className="border-0 border-t-[0.5px] border-gray-200 border-solid"
            >
              <Link href={`/hacks/${hack.id}`} className="no-underline pb-1.5">
                <div className="px-5 pb-1 xs:px-1.5 xs:hover:bg-slate-100">
                  <div className="pt-3.5 pb-2 xs:p-5 xs:pt-7">
                    <div className="flex justify-between items-center text-main-black font-bold">
                      <div className="xs:tracking-wide text-[16px] xs:text-[1.125rem] leading-6 tracking-wide">
                        {hack.title}
                      </div>
                    </div>

                    <div className="pt-2 pb-1">
                      <div className="w-full break-all text-[14px] xs:text-[1.125rem] leading-7 xs:leading-8 text-main-black tracking-wide">
                        {hack.body}
                      </div>
                    </div>
                    <div className="mt-1 mb-0.5">
                      <div>
                        <div className="font-sans text-main-black text-[14px]">
                          {hack.categories.map((category: any, index: any) => (
                            <span key={index}>{"#" + category + " "}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default HacksLifeList;
