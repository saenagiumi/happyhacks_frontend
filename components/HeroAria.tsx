import Image from "next/image";

import AboutButton from "./AboutButton";

const HeroAria = () => {
  return (
    <div className="mx-auto flex h-[135vw] w-full items-center justify-center bg-main-green text-white xs:h-[400px] xl:h-[52vh]">
      <div className="max-w-[900px] flex-row sm:flex">
        <div className="flex flex-col items-center justify-center sm:w-[50%]">
          <div className="flex-col items-center justify-center">
            <h1 className="mb-5 inline-block text-center font-sans text-[7.3vw] font-[400] leading-tight xs:text-[2.2rem] xl:text-[2.5rem]">
              <span className="inline-block font-sans">環境調整で対策する</span>
              <span className="inline-block font-sans">ADHDの日常生活</span>
            </h1>

            <AboutButton />
          </div>
        </div>
        <div className="mb-[-50px] xs:mb-0 sm:w-[50%]">
          <div className="m-0 mx-auto flex h-[70%] w-[80%] items-center justify-center sm:h-[100%]  sm:w-[100%] sm:justify-center">
            <Image
              className="xl:h-[550px] xl:w-[550px] xs:ml-[-50px] xl:ml-0"
              src={"/cup.png"}
              width={350}
              height={350}
              sizes="100vw"
              style={{
                height: "auto",
                maxWidth: "100%",
              }}
              priority={true}
              alt="heroエリアの画像"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroAria;
