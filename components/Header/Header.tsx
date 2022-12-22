import Logo from "../../public/logo.svg";
import Link from "next/link";
import { Button } from "@mantine/core";

export const Header = () => {
  return (
    <div className="h-[100px] flex justify-between items-center pr-5">
        <Logo className="w-[200px] h-full" />
      <div>
        <ul>
          <Link href="/posts/create">
            <Button color="yellow" size="xs">
              質問する
            </Button>
          </Link>
        </ul>
      </div>
    </div>
  );
};
