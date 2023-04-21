import { useAuth0 } from "@auth0/auth0-react";
import {
  Avatar,
  Button,
  Divider,
  Modal,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { ANIMALS } from "const/const";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { TbCameraPlus } from "react-icons/tb";
import { currentUserAtom } from "state/currentUser";

import { useUser } from "../hooks/useUser";

type InputData = {
  name: string;
};

const ProfileForm = () => {
  const { user } = useAuth0();
  const currentUser = useAtomValue(currentUserAtom);
  const [opened, setOpened] = useState(false);
  const { updateUser } = useUser();
  const [targetSrc, setTargetSrc] = useState<string | undefined>(
    currentUser.picture
  );

  const profileForm = useForm<InputData>({
    initialValues: {
      name: currentUser.name,
    },
    validate: {
      name: (value) =>
        value.length <= 0 ? "ニックネームを入力してください" : null,
    },
  });

  const handleSubmit = () => {
    if (profileForm.values.name === "") {
      return;
    }

    onSubmit(profileForm.values);
  };

  useEffect(() => {
    setTargetSrc(currentUser.picture);
    profileForm.setValues({
      name: currentUser.name,
    });
  }, [currentUser]);

  const onSubmit = async (inputData: InputData) => {
    const patchUserData = {
      name: inputData.name,
      picture: targetSrc,
      userId: currentUser.id,
    };

    const isSuccess = await updateUser(patchUserData);

    if (isSuccess) {
      showNotification({
        title: "更新完了",
        autoClose: 3000,
        color: "green.4",
        icon: <MdCheckCircle size={30} />,
        message: "プロフィールを更新しました",
      });
    }

    setOpened(false);
  };

  return (
    <div>
      <h2 className="mt-20 mb-3 text-[1.1rem] text-gray-800">プロフィール</h2>
      <UnstyledButton
        onClick={() => setOpened(true)}
        className="relative mb-5 flex"
      >
        <div className="absolute z-10 h-[96px] w-[96px] rounded-full bg-gray-900/[.3]"></div>
        <div className="absolute top-9 left-9">
          <div className="flex">
            <TbCameraPlus className="z-20 text-[1.5rem] text-white" />
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
          <h3 className="mb-4 flex justify-center text-base font-normal">
            プロフィール画像の変更
          </h3>
          <Divider className="mx-2 mb-3"></Divider>
          <p className="mx-3 mb-6 flex justify-center">
            自分のアイコンを使用するか、一覧からアイコンを選んで変更することができます。
          </p>
          <div className="mb-8 flex justify-center">
            <Avatar src={targetSrc} radius={50} size={80} />
          </div>
          <div className="flex-col">
            <div className="mb-4 flex justify-evenly">
              <ul className="grid grid-cols-4 gap-4">
                <li className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-gray-800/[.3]">
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
            <div className="mr-2 flex justify-end">
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
                onClick={handleSubmit}
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

      <form onSubmit={profileForm.onSubmit((values) => onSubmit(values))}>
        <div className="mb-3">
          <TextInput
            classNames={{
              input: "pl-3 text-gray-600 text-[16px]",
              label: "text-gray-800 ml-0.5 text-[14px] font-bold mb-1.5",
            }}
            label="表示名"
            placeholder="12文字以内で入力してください"
            radius="xs"
            size="md"
            maxLength={12}
            {...profileForm.getInputProps("name")}
          />
        </div>
        <div className="text-center">
          <UnstyledButton
            type="submit"
            className="h-[40px] w-full rounded-[3px] bg-main-green text-center text-[0.9rem] font-bold text-emerald-50"
          >
            更新する
          </UnstyledButton>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
