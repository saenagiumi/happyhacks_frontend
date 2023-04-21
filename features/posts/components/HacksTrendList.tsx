import { API_BASE_URL } from "const/const";
import { useFetchArray } from "hooks/useFetchArray";
import Link from "next/link";
import React from "react";

import { Hack } from "../types";
import HacksLayout from "./HacksLayout";

const HacksTrendList = () => {
  const { data } = useFetchArray(`${API_BASE_URL}/hacks`);

  return (
    <div>
      <ol className="m-0 p-0">
        {data?.map((hack: Hack) => {
          return (
            <li
              key={hack.id}
              className="border-0 border-t-[0.5px] border-solid border-gray-200"
            >
              <Link href={`/hacks/${hack.id}`} className="pb-1.5 no-underline">
                <HacksLayout hack={hack} />
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default HacksTrendList;
