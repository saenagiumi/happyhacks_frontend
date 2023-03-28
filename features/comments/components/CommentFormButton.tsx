import { Avatar } from "@mantine/core";

type Props = {
  currentUser: {
    picture: string;
  };
  modalHandlers: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  };
};

const CommentFormButton = (props: Props) => {
  return (
    <div className="flex mx-3 mt-2.5 mb-5 h-[38px]">
      <Avatar src={props.currentUser?.picture} radius={50} size={38} />
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
