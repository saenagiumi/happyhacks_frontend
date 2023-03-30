import { useAuth0 } from "@auth0/auth0-react";
import { TextInput, UnstyledButton } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { UserPostData } from "features/auth/types";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserPostData>();

  const onSubmit: SubmitHandler<UserPostData> = async (inputData) => {
    const postData: UserPostData = {
      name: inputData.name,
      sub: user?.sub,
      picture: user?.picture,
    };

    const isSuccess = await createUser(postData);

    if (isSuccess) {
      showNotification({
        autoClose: 3000,
        title: "登録完了",
        message: "ユーザー登録が完了しました",
        color: "green.4",
        icon: <MdCheckCircle size={30} />,
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <TextInput
              classNames={{
                input: "pl-2.5 text-gray-600 text-[16px]",
                label: "text-gray-800 font-bold mb-1",
              }}
              placeholder=""
              label="ニックネーム (最長12文字)"
              radius="xs"
              size="sm"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-[0.7rem] font-bold text-red-500">
                ニックネームを入力してください
              </span>
            )}
          </div>
          <div className="text-center">
            <UnstyledButton
              type="submit"
              className="w-full h-[40px] rounded-[3px] text-[0.9rem] text-center font-bold text-emerald-50 bg-main-green"
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
