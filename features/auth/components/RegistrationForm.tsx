import { useAuth0 } from "@auth0/auth0-react";
import { TextInput, UnstyledButton } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { UserPostData } from "features/auth/types";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { MdCheckCircle } from "react-icons/md";
import { currentUserAtom } from "state/currentUser";

import { useCreateUser } from "../hooks/useCreateUser";

const RegistrationForm = () => {
  const { user } = useAuth0();
  const currentUser = useAtomValue(currentUserAtom);
  const { createUser } = useCreateUser();
  const router = useRouter();

  if (currentUser.name !== "") {
    router.push("/");
  }

  const registrationForm = useForm<UserPostData>({
    initialValues: {
      name: "",
      picture: "",
      sub: "",
    },
    validate: {
      name: (value) =>
        value.length <= 0 ? "ニックネームを入力してください" : null,
    },
  });

  const onSubmit = async (inputData: UserPostData) => {
    const postData = {
      name: inputData.name,
      picture: user?.picture,
      sub: user?.sub,
    };

    const isSuccess = await createUser(postData);

    if (isSuccess) {
      showNotification({
        title: "登録完了",
        autoClose: 3000,
        color: "green.4",
        icon: <MdCheckCircle size={30} />,
        message: "ユーザー登録が完了しました",
      });

      router.push("/");
    }
  };

  return (
    <div>
      <h2 className="mt-20 text-[1.1rem] text-gray-800">
        はじめに、ニックネームを入力してください
      </h2>
      <p className="mb-5">※プロフィール編集ページから変更可能です</p>
      <div>
        <form
          onSubmit={registrationForm.onSubmit((values) => onSubmit(values))}
        >
          <div className="mb-4">
            <TextInput
              classNames={{
                input: "pl-3 text-gray-600 text-[16px]",
                label: "text-gray-800 ml-0.5 text-[14px] font-bold mb-1.5",
              }}
              placeholder="15文字以内で入力してください"
              label="ニックネーム"
              radius="xs"
              size="md"
              maxLength={15}
              {...registrationForm.getInputProps("name")}
            />
          </div>
          <div className="text-center">
            <UnstyledButton
              type="submit"
              className="h-[40px] w-full rounded-[3px] bg-main-green text-center text-[0.9rem] font-bold text-emerald-50"
            >
              登録する
            </UnstyledButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
