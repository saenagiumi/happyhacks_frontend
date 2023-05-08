import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full h-[300px] bg-main-green text-white flex justify-center items-center text-[0.85rem] xs:text-[1rem]">
      <div className="xs:mt-8">
        <div className="flex justify-center mb-3">
          <Link href={"/about"}>
            <span className="inline-block hover:underline decoration-white text-[1rem] xs:text-[18px]">
              HappyHacksについて
            </span>
          </Link>
        </div>
        <div className="flex justify-center mb-3">
          <Link href={"/terms"}>
            <span className="inline-block hover:underline decoration-white text-[1rem] xs:text-[18px]">
              利用規約
            </span>
          </Link>
        </div>
        <div className="flex justify-center mb-3 xs:mb-8">
          <Link href={"/privacy"}>
            <span className="inline-block hover:underline decoration-white text-[1rem] xs:text-[18px]">
              プライバシーポリシー
            </span>
          </Link>
        </div>
        <div className="flex justify-center">
          <span className="decoration-gray-500 text-[15px] font-sans">
            &copy;{" "}
            <a
              className="no-underline hover:underline"
              href="https://twitter.com/HappyHacks2023"
              target="_blank"
              rel="noopener noreferrer"
            >
              @HappyHacks2023
            </a>{" "}
            All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
