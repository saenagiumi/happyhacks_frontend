import { useAuth0 } from "@auth0/auth0-react";
import { TextInput, UnstyledButton } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { User, UserPostData } from "features/users/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdCheckCircle } from "react-icons/md";
import postUser from "../api/postUser";

const RegistrationForm = ({ user }: any) => {
  const { getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const router = useRouter();

  // アクセストークン取得
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAccessTokenSilently({});
        setAccessToken(token);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getToken();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<UserPostData> = async (inputData) => {
    const postData = {
      sub: user.sub,
      name: inputData.name,
      email: user.email,
      picture: user.picture,
    };
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const created = await postUser(postData, config);
    if (created) {
      router.push("/");
      showNotification({
        title: "登録完了",
        message: "ユーザー登録が完了しました",
        color: "green.4",
        icon: <MdCheckCircle size={30} />,
      });
    }
  };

  return (
    <div>
      <h2 className="mx-4 mt-20 mb-5 px-5 text-[1.1rem] text-gray-800">
        Webサイトで表示されるあなたの名前を入力してください
      </h2>
      <div className="mx-4 px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <TextInput
              classNames={{
                input: "pl-2.5 text-gray-600",
                label: "text-gray-800 font-bold mb-1",
              }}
              placeholder=""
              label="ニックネーム"
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
