import { API_BASE_URL } from "const/const";
import { useFetchArray } from "hooks/useFetchArray";
import Link from "next/link";
import React from "react";
import { Hack } from "./Hack";
import { Post } from "./Post";

const HacksLifeList = () => {
  const { data } = useFetchArray(`${API_BASE_URL}/hacks`);
  console.log({ data });

  return (
    <div>
      <ol className="m-0 p-0">
        {data?.map((hack: any) => {
          console.log({hack});
          
          return (
            <li
              key={hack.id}
              className="border-0 border-t-[0.5px] border-gray-200 border-solid"
            >
              <Link href={`/hacks/${hack.id}`} className="no-underline pb-1.5">
                <div className="px-5 pb-1 xs:px-1.5 xs:hover:bg-slate-100">
                  <Hack
                    title={hack.title}
                    body={hack.body}
                    iconSrc={hack.picture}
                    name={hack.name}
                    id={""}
                    userId={""}
                  />
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
