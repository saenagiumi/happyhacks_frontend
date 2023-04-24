import { Avatar } from "@mantine/core";

type Props = {
  currentUser: {
    name: string | undefined;
    picture: string | undefined;
  };
  modalHandlers: {
    readonly close: () => void;
    readonly open: () => void;
    readonly toggle: () => void;
  };
};

const CommentFormButton = (props: Props) => {
  return (
    <div className="flex mx-3 mt-2.5 mb-5 h-[38px]">
      <Avatar alt={`${props.currentUser?.name}のアイコン`} src={props.currentUser?.picture} radius={50} size={38} />
      <div
        onClick={() => props.modalHandlers.open()}
        className="w-full box-border ml-2 pl-3.5 pt-1.5 border-solid border border-gray-300 rounded-full  text-gray-400"
      >
        回答する
      </div>
    </div>
  );
};

export default CommentFormButton;
