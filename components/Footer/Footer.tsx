import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full h-[25vh] bg-gray-50 flex justify-center items-center text-[0.85rem] xs:text-[1rem]">
      <div className="inline-block">
        <span className="inline-block decoration-gray-500 mr-3 xs:mr-12 md:mr-20">
          &copy; 2023{" "}
          <a
            className="no-underline hover:underline"
            href="https://twitter.com/takerudev"
            target="_blank"
            rel="noopener noreferrer"
          >
            @takerudev
          </a>
        </span>
        <Link href={"/privacy"}>
          <span className="inline-block hover:underline decoration-gray-500 mr-3 xs:mr-12 md:mr-20">
            プライバシーポリシー
          </span>
        </Link>
        <Link href={"/terms"}>
          <span className="inline-block hover:underline decoration-gray-500">
            利用規約
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
