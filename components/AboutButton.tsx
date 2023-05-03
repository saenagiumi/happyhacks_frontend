import { UnstyledButton } from "@mantine/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiArrowSmRight } from "react-icons/hi";
import { RiSearch2Line } from "react-icons/ri";

const AboutButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return isVisible ? (
    <div className="flex">
      <Link href={"/about"} legacyBehavior>
        <UnstyledButton className="group mx-auto flex h-[3.5rem] w-[73vw] items-center justify-end rounded-full border-2 border-solid border-amber-300 bg-white pl-5 pr-1 text-[1.1rem] font-[600] text-gray-700 hover:bg-amber-300 xs:h-[3.2rem] xs:w-[250px] xl:h-[3.5rem] xl:w-[300px]">
          <RiSearch2Line />
          <p className="mx-auto text-[1.125rem] xs:text-[1rem] xl:text-[1.125rem]">
            HappyHacksとは？
          </p>
          <span className="mr-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-white group-hover:text-gray-700 xs:mr-1 xl:mr-1.5">
            <HiArrowSmRight
              size={22}
              className="flex items-center justify-center"
            />
          </span>
        </UnstyledButton>
      </Link>
    </div>
  ) : (
    <div className="h-[3.5rem] w-[73vw] xs:w-[300px]  xs:text-[1.1rem] xl:h-[3.5rem] xl:w-[300px] xl:pl-6 xl:pr-[5px] xl:text-[1.2rem]"></div>
  );
};

export default AboutButton;
