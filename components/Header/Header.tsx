import Logo from "../../public/logo.svg";

export const Header = () => {
  return (
    <div className="h-[100px] flex justify-between items-center pr-5">
      <Logo className="w-[200px] h-full" />
      <div>
        <ul>
          <li className="px-3 py-2 bg-yellow-400 rounded">ログイン</li>
        </ul>
      </div>
    </div>
  );
};
