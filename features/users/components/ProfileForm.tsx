import { useAuth0 } from "@auth0/auth0-react";
import {
  Avatar,
  Button,
  Divider,
  Modal,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { currentUserAtom } from "state/currentUser";
import { TbCameraPlus } from "react-icons/tb";
import { showNotification } from "@mantine/notifications";
import { MdCheckCircle } from "react-icons/md";
import { useUser } from "../hooks/useUser";
import { UserFormValue } from "../types";
import { ANIMALS } from "const/const";

const ProfileForm = () => {
  const { user } = useAuth0();
  const currentUser = useAtomValue(currentUserAtom);
  const [opened, setOpened] = useState(false);
  const { updateUser } = useUser();
  const [targetSrc, setTargetSrc] = useState<string | undefined>(
    currentUser.picture
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormValue>({ defaultValues: { name: currentUser.name } });

  useEffect(() => {
    setTargetSrc(currentUser.picture);
  }, [currentUser]);

  // defaultValuesに非同期の初期値を適用し直す
  useEffect(() => {
    reset({
      ...currentUser,
      name: currentUser?.name.toString(),
    });
  }, [currentUser, reset]);

  const onSubmit: SubmitHandler<UserFormValue> = async (InputData) => {
    const patchUserData = {
      userId: currentUser.id,
      ...InputData,
      picture: targetSrc,
    };

    const isSuccess = await updateUser(patchUserData);

    if (isSuccess) {
      showNotification({
        autoClose: 3000,
        title: "更新完了",
        message: "プロフィールを更新しました",
        color: "green.4",
        icon: <MdCheckCircle size={30} />,
      });
    }

    setOpened(false);
  };

  return (
    <div>
      <h2 className="mt-20 mb-3 text-[1.1rem] text-gray-800">プロフィール</h2>
      <UnstyledButton
        onClick={() => setOpened(true)}
        className="flex relative mb-5"
      >
        <div className="absolute bg-gray-900/[.3] w-[96px] h-[96px] rounded-full z-10"></div>
        <div className="absolute top-9 left-9">
          <div className="flex">
            <TbCameraPlus className="text-white z-20 text-[1.5rem]" />
          </div>
        </div>
        <Avatar src={currentUser.picture} radius={50} size={96} />
      </UnstyledButton>

      <Modal
        radius="xs"
        centered
        overlayOpacity={0.35}
        withCloseButton={false}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <div className="flex-col justify-center">
          <h3 className="flex justify-center text-base font-normal mb-4">
            プロフィール画像の変更
          </h3>
          <Divider className="mx-2 mb-3"></Divider>
          <p className="flex justify-center mx-3 mb-6">
            自分のアイコンを使用するか、一覧からアイコンを選んで変更することができます。
          </p>
          <div className="flex justify-center mb-8">
            <Avatar src={targetSrc} radius={50} size={80} />
          </div>
          <div className="flex-col">
            <div className="flex justify-evenly mb-4">
              <ul className="grid grid-cols-4 gap-4">
                <li className="flex items-center justify-center bg-gray-800/[.3] w-[56px] h-[56px] rounded-full">
                  <UnstyledButton onClick={() => setTargetSrc(user?.picture)}>
                    <Avatar src={user?.picture} radius={50} size={56} />
                  </UnstyledButton>
                </li>
                {ANIMALS.map((animal) => {
                  return (
                    <li key={animal}>
                      <UnstyledButton
                        onClick={() =>
                          setTargetSrc(`/userAvatar/${animal}.svg`)
                        }
                      >
                        <Avatar
                          src={`/userAvatar/${animal}.svg`}
                          radius={50}
                          size={56}
                        />
                      </UnstyledButton>
                    </li>
                  );
                })}
              </ul>
            </div>
            <Divider className="mx-2 mb-5"></Divider>
            <div className="flex justify-end mr-2">
              <Button
                onClick={() => setOpened(false)}
                className="mr-2"
                size="xs"
                radius="xs"
                variant="light"
                color="gray"
              >
                キャンセル
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                size="xs"
                radius="xs"
                color="green.4"
              >
                更新
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <TextInput
            classNames={{
              input: "pl-3 text-gray-600 text-[16px]",
              label: "text-gray-800 ml-0.5 text-[14px] font-bold mb-1.5",
            }}
            label="表示名 (最長12文字)"
            radius="xs"
            size="md"
            maxLength={12}
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
            更新する
          </UnstyledButton>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
