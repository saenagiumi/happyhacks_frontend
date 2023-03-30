import Image from "next/image";
import AboutButton from "./AboutButton";

const HeroAria = () => {
  return (
    <div className="flex justify-center items-center w-full mx-auto h-[135vw] xs:h-[70vh] md:h-[52vh] bg-main-green text-white">
      <div className="sm:flex flex-row max-w-[900px]">
        <div className="flex-col sm:w-[50%] flex justify-center items-center">
          <div className="flex-col justify-center items-center">
            <h1 className="font-sans inline-block font-[400] text-[7.3vw] xs:text-[2.1rem] md:text-[2.5rem] text-center leading-tight mb-5">
              <span className="inline-block font-sans">
                環境調整でハックする
              </span>
              <span className="inline-block font-sans">ADHDの日常生活</span>
            </h1>

            <AboutButton />
          </div>
        </div>
        <div className="sm:w-[50%] mb-[-50px] xs:mb-0">
          <div className="flex justify-center items-center sm:justify-center w-[80%] sm:w-[100%] h-[70%] sm:h-[100%]  m-0 mx-auto">
            <Image
              src={"/cup.png"}
              width={450}
              height={450}
              sizes="100vw"
              style={{
                maxWidth: "100%",
                height: "auto",
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
