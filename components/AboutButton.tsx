import { UnstyledButton } from "@mantine/core";
import Link from "next/link";
import { RiSearch2Line } from "react-icons/ri";

const AboutButton = () => {
  return (
    <div className="flex">
      <Link href={"/about"} legacyBehavior>
        <UnstyledButton className="flex justify-end items-center group text-[1.1rem] xs:text-[1.1rem] md:text-[1.2rem] xs:w-[300px] h-[3.5rem] md:h-[3.5rem] text-gray-700 font-sans font-[600] border-2 border-solid border-amber-300 rounded-full bg-white hover:bg-amber-300 w-[73vw]  md:w-[300px] pl-5 md:pl-6 pr-1 md:pr-[5px] mx-auto">
          <RiSearch2Line />
          <p className="mx-auto text-[1.12rem] xs:pr-2">HappyHacksとは？</p>
          <span className="px-[10px] py-[8px] mr-1.5 rounded-full text-white bg-amber-400 group-hover:text-gray-700">
            →
          </span>
        </UnstyledButton>
      </Link>
    </div>
  );
};

export default AboutButton;
