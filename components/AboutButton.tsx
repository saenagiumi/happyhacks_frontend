import { UnstyledButton } from "@mantine/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";

const AboutButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return isVisible ? (
    <div className="flex">
      <Link href={"/about"} legacyBehavior>
        <UnstyledButton className="group mx-auto flex h-[3.5rem] w-[73vw] items-center justify-end rounded-full border-2 border-solid border-amber-300 bg-white pl-5 pr-1 font-sans text-[1.1rem] font-[600] text-gray-700 hover:bg-amber-300 xs:w-[300px]  xs:text-[1.1rem] md:h-[3.5rem] md:w-[300px] md:pl-6 md:pr-[5px] md:text-[1.2rem]">
          <RiSearch2Line />
          <p className="mx-auto text-[1.12rem] xs:pr-2">HappyHacksとは？</p>
          <span className="mr-1.5 rounded-full bg-amber-400 px-[10px] py-[8px] text-white group-hover:text-gray-700">
            →
          </span>
        </UnstyledButton>
      </Link>
    </div>
  ) : (
    <div className="h-[3.5rem] w-[73vw] xs:w-[300px]  xs:text-[1.1rem] md:h-[3.5rem] md:w-[300px] md:pl-6 md:pr-[5px] md:text-[1.2rem]"></div>
  );
};

export default AboutButton;
