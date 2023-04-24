import {
  Button,
  MultiSelect,
  Paper,
  Select,
  Textarea,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdCheckCircle } from "react-icons/md";

import { usePost } from "../hooks/usePost";
import { Hack, HackFormData } from "../types";

type Props = {
  readonly close: () => void;
  hackData?: HackFormData;
};

const HackForm = ({ close, hackData }: Props) => {
  const [tweetIdFormVisible, setTweetIdFormVisible] = useState(false);

  const submitMode = {
    data: hackData || null,
    mode: hackData ? "hackEditMode" : "createMode",
  };

  const { createHack, updateHack } = usePost();
  const router = useRouter();

  const [data, setData] = useState([
    { label: "tweet", value: "tweet" },
    { label: "コミュニケーション", value: "コミュニケーション" },
    { label: "セルフCBT", value: "セルフCBT" },
    { label: "拡大解釈", value: "拡大解釈" },
    { label: "対策", value: "対策" },
    { label: "トレーニング", value: "トレーニング" },
    { label: "マインドフルネス", value: "マインドフルネス" },
  ]);

  // tweet_idの値を最後の数字のみに変換
  const extractTweetId = (url: string) => {
    const regex = /^https:\/\/twitter\.com\/[^\/]+\/status\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const hackForm = useForm<HackFormData>({
    initialValues: {
      title: hackData ? hackData.title || "" : "",
      body: hackData ? hackData.body || "" : "",
      category: hackData ? hackData.category || "" : "",
      tags: hackData ? hackData.tags || [] : [],
      tweet_id: hackData ? hackData.tweet_id || "" : "",
    },

    validate: {
      title: (value) =>
        value.length <= 0 ? "タイトルを入力してください" : null,
      body: (value) => (value.length <= 0 ? "本文を入力してください" : null),
      category: (value) =>
        value.length <= 0 ? "投稿するカテゴリを選択してください" : null,
      tags: (value) =>
        value.length <= 0 ? "投稿に関連するタグを入力してください" : null,
      tweet_id: (value) => {
        const tweetId = extractTweetId(value);
        return tweetId.length > 0 && !/^\d+$/.test(tweetId)
          ? "ツイートのURLのみ入力してください"
          : null;
      },
    },
  });

  const onSubmit = async (inputData: HackFormData) => {
    switch (submitMode?.mode) {
      case "hackEditMode": {
        if (hackData) {
          const isSuccess = await updateHack(
            hackData.id?.toString(),
            inputData
          );
          if (isSuccess) {
            showNotification({
              title: "編集完了",
              autoClose: 3000,
              color: "green.4",
              icon: <MdCheckCircle size={30} />,
              message: "投稿を編集しました",
            });

            close();
            router.replace(router.asPath);
          }
          break;
        }
      }

      default: {
        const isSuccess = await createHack(inputData);
        if (isSuccess) {
          showNotification({
            title: "投稿完了",
            autoClose: 3000,
            color: "green.4",
            icon: <MdCheckCircle size={30} />,
            message: "投稿が完了しました",
          });

          close();
          router.push(`/hacks/${isSuccess.id}`);
        }
        break;
      }
    }
  };

  return (
    <div className="mx-auto max-w-screen-sm">
      <Paper p="0" radius="xs">
        <form onSubmit={hackForm.onSubmit((values) => onSubmit(values))}>
          <div className="mb-5">
            <div className="flex items-center justify-between">
              <UnstyledButton
                className=" text-gray-600 underline"
                onClick={close}
              >
                キャンセル
              </UnstyledButton>
              <div>
                <Button
                  radius="xl"
                  size="sm"
                  type="submit"
                  color="green.4"
                  className="w-full bg-main-green text-center text-[0.9rem] font-bold text-emerald-50"
                >
                  {hackData ? "編集完了" : "投稿する"}
                </Button>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="text-md text-gray-600">投稿内容の入力</h3>
              {/* <p className="text-sm text-gray-600">
                Help Your Neighbor
              </p> */}
            </div>
          </div>

          <div className="mb-7">
            <TextInput
              classNames={{
                input: "pl-2.5 text-gray-600",
                label: "text-gray-500 font-bold mb-1",
              }}
              withAsterisk={false}
              placeholder="電車に傘を置いてきてしまう人を支える技術"
              label="タイトル"
              radius="xs"
              size="md"
              {...hackForm.getInputProps("title")}
            />
          </div>

          <div className="mb-7">
            <Select
              label="投稿するカテゴリ"
              placeholder="カテゴリを選択"
              classNames={{
                input: "pl-2.5 text-gray-600",
                label: "text-gray-600 font-bold mb-1",
              }}
              {...hackForm.getInputProps("category")}
              size="md"
              radius="xs"
              data={[
                {
                  label: "対人関係",
                  value: "communication",
                },
                {
                  label: "アイテム",
                  value: "item",
                },
                {
                  label: "健康",
                  value: "health",
                },
                {
                  label: "生活",
                  value: "life",
                },
                {
                  label: "学習",
                  value: "learning",
                },
                {
                  label: "仕事",
                  value: "job",
                },
              ]}
            />
          </div>

          <div className="mb-7">
            <MultiSelect
              label="関連タグ"
              data={data}
              size="md"
              radius="xs"
              placeholder="入力するか候補から選択"
              classNames={{
                input: "pl-2.5 text-gray-600",
                label: "text-gray-600 font-bold mb-1",
              }}
              searchable
              creatable
              maxSelectedValues={3}
              {...hackForm.getInputProps("tags")}
              getCreateLabel={(query) => `+ 追加 ${query}`}
              onCreate={(query) => {
                const item = { label: query, value: query };
                setData((current) => [...current, item]);
                return item;
              }}
            ></MultiSelect>
          </div>

          <div className="mb-5">
            <Textarea
              classNames={{
                input: "pl-2.5 px-2 text-gray-600",
                label: "text-gray-500 font-bold mb-1",
              }}
              placeholder="折り畳み傘しか買わない。電車の手すりに傘をかけない。足元に置かない。荷物棚に置かない。"
              label="本文の内容"
              size="md"
              radius="xs"
              autosize
              minRows={8}
              {...hackForm.getInputProps("body")}
            />
          </div>
          <div className="my-5">
            {!tweetIdFormVisible && (
              <UnstyledButton
                onClick={() => setTweetIdFormVisible(true)}
                className="rounded-full bg-blue-400 py-2 px-2.5"
              >
                <span className="flex items-center justify-center">
                  <AiOutlinePlus className="mr-1 font-bold text-white" />
                  <span className="pr-1 font-[600] text-white">
                    ツイートを埋め込む
                  </span>
                </span>
              </UnstyledButton>
            )}
            {tweetIdFormVisible && (
              <div>
                <UnstyledButton
                  onClick={() => setTweetIdFormVisible(false)}
                  className="mb-1.5 rounded-full bg-slate-200 py-2 px-2.5 text-[12px]"
                >
                  <span className="font-sans font-bold text-gray-500">
                    キャンセル
                  </span>
                </UnstyledButton>
                <TextInput
                  classNames={{
                    input: "pl-2.5 text-gray-600",
                    label: "text-gray-500 font-bold mb-1",
                  }}
                  withAsterisk={false}
                  placeholder="https://twitter.com/happyhacks/status/000000000000000"
                  radius="xs"
                  size="md"
                  {...hackForm.getInputProps("tweet_id")}
                  onBlur={(e) => {
                    const tweetId = extractTweetId(e.target.value);
                    hackForm.setFieldValue("tweet_id", tweetId);
                  }}
                />
              </div>
            )}
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default HackForm;
