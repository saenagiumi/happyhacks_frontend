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

  //   // 初回アクセスの場合は、新規作成のリクエストを投げる
  //   const token = await getAccessTokenSilently();

  //   try {
  //     const response = await axios.post(
  //       `${API_BASE_URL}/users`,
  //       { user: postUserData },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     if (response.status === 200) {
  //       router.push("/");
  //       showNotification({
  //         title: "登録完了",
  //         message: "ユーザー登録が完了しました",
  //         color: "green.4",
  //         icon: <MdCheckCircle size={30} />,
  //       });
  //       return response.data;
  //     }
  //   } catch (error) {
  //     let message;
  //     if (axios.isAxiosError(error) && error.response) {
  //       console.error(error.response.data.message);
  //     } else {
  //       message = String(error);
  //       console.error(message);
  //     }
  //   }
  // };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          classNames={{
            input: "pl-2.5 text-gray-600",
            label: "text-gray-500 font-bold mb-1",
          }}
          placeholder=""
          label="ニックネーム"
          radius="xs"
          size="md"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="text-xs font-bold text-red-400">
            ニックネームを入力してください
          </span>
        )}
        <div className="text-center">
          <UnstyledButton
            type="submit"
            className="w-[175px] h-[48px] rounded-[3px] text-center font-bold text-emerald-50 bg-main-green"
          >
            登録する
          </UnstyledButton>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
