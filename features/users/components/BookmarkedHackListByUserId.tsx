import { Hack, PostType } from "features/posts/types";
import Link from "next/link";

const HackListByUserId = ({ hacks }: { hacks: Hack[] }) => {
  return (
    <div>
      {!hacks && (
        <div>
          <p className="mb-5 pl-3">まだブックマークがありません</p>
        </div>
      )}

      {hacks && (
        <ul className="mx-3">
          {hacks.map((hack: Hack) => (
            <Link
              className="no-underline"
              href={`/hacks/${hack.id}`}
              key={hack.id}
            >
              <li className="border-0 border-b-[1px] border-solid border-gray-200 py-2 pb-6  xs:px-7 xs:py-5 xs:hover:bg-slate-100">
                <div className="flex items-center justify-between pt-2 pb-3">
                  <h3 className="text-[16px] text-gray-800">{hack.title}</h3>
                </div>
                <p className="pb-3">{hack.body}</p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HackListByUserId;
