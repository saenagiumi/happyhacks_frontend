import { M_PLUS_1p } from "@next/font/google";
import Footer from "components/Layout/Footer";
import Image from "next/image";
import { NextSeo } from "next-seo";

type Props = {
  title: string;
  description: string;
};

const mplus1 = M_PLUS_1p({
  display: "swap",
  subsets: ["latin"],
  weight: "500",
});

const AboutPage = ({ title, description }: Props) => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title: title,
          description,
          images: [
            {
              alt: "Og Image Alt",
              height: 541,
              url: "https://www.happyhacks.app/ogp.webp",
              width: 1031,
            },
          ],
          url: "https://www.happyhacks.app/about",
        }}
        twitter={{
          cardType: "summary_large_image",
          handle: "@handle",
          site: "@site",
        }}
      />

      <div className="font-sans text-main-black">
        <div className="mb-10 flex h-[135vw] w-full items-center justify-center bg-amber-300 xs:mb-20 xs:h-[400px] xl:h-[45vh]">
          <div className="flex flex-col items-center justify-center">
            <div className="mt-10">
              <h2
                className={`${mplus1.className} flex items-center justify-center font-sans text-[6vw] xs:mb-[-20px] xs:text-[1.7rem] xl:text-[1.9rem]`}
              >
                What&apos;s HappyHacks?
              </h2>
              <Image
                className="mx-auto flex xl:h-[350px] xl:w-[350px]"
                src="/alcohol.png"
                width={300}
                height={300}
                sizes="100vw"
                style={{
                  height: "100%",
                  maxWidth: "100%",
                }}
                priority={true}
                alt="alcoholを持った女の子"
              ></Image>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-screen-xs p-4 leading-8 tracking-wide xs:my-[30px] xs:p-0 xs:leading-9 xs:tracking-wider">
          <h2 className="text-[1.25rem] font-bold xs:text-[1.75rem]">
            サービスの目的
          </h2>
          <div className="mt-4 text-[1rem] xs:text-[1.125rem]">
            <p>
              HappyHacksは、ADHDや、ASDなどの発達障害（神経発達症）の当事者（グレーゾーン含む）や支援者の方々が生活環境を工夫するアイデアや困りごとへの対策を共有し、日常に取り入れられる「カジュアルな手段」を検討して、この領域に関わる方の生活の質を向上させることを目的としたサービスです。症状の程度や診断の有無を問わず、困りごとへの対策に関心がある方はどなたでもご利用いただけます。
            </p>
          </div>
          <div>
            <div className="mt-10 xs:my-12">
              <h2 className="text-[1.25rem] font-bold xs:text-[1.75rem]">
                課題や手段について
              </h2>
              <h3 className="mt-8 font-bold xs:text-[1.25rem]">
                発達障害（神経発達症）とは
              </h3>
              <div className="mt-2 xs:text-[1.125rem]">
                <p>
                  発達障害とは、行動やコミュニケーションの障害であり、主にADHDやASDの他にLD（学習障害）や発達性強調運動障害などがあり、そのうち複数が同時に起きていることも多いとされています。発達障害とされる人は社会生活に問題を抱えていることが多く、医療、福祉や社会の支援が不可欠です。本サービスはあくまでも補助的なものと考え、ご自身や支援者の方が発達障害を疑い、相談されたい場合は、お住まいの近くの「発達障害者支援センター」にご相談ください。
                </p>
              </div>

              <h3 className="mt-8 font-bold xs:text-[1.25rem]">
                多様性と社会的支援
              </h3>
              <div className="mt-2 xs:text-[1.125rem]">
                <p>
                  過去には障害とされてきた特性も、定型発達（発達障害がない人）の人々が定めた社会的基準によるものであるという考え方が認知され、発達障害を特性と捉えて社会に包摂するニューロダイバーシティの考え方が広まっています。最近では、厚生労働省はニューロダイバーシティへの取り組みとして企業などに働きかけ、発達障害のある方が活躍できる社会を標榜すると発信しています。しかし、実際に支援を受けるには法整備や、発達障害としての確定診断が求められると予想されます。現在でも、確定診断されない基準値付近の方々にはフォーカスが当たっておらず、生活上や仕事上の支障があるにも関わらず公的な支援を得ることができず、自助努力が求められているというのが現状であり、今後の支援についても懸念があります。{" "}
                </p>
              </div>
              <h3 className="mt-8 font-bold xs:text-[1.25rem]">環境調整</h3>
              <div className="mt-2 xs:text-[1.125rem]">
                <p>
                  ADHDやASDは個人により程度が異なりますが、それぞれが独立した症状というよりは、症状が合併しているケースも多いと言われています。ASDの症状にはソーシャルスキルトレーニング（SST）や認知行動療法（CBT）などが有効だとされていますが、対処方法は個人によって異なりますので、まずは専門医の診断を受けて、最適な対処方法を見つけるのが良いでしょう。ADHDの治療には薬物療法や心理療法、環境調整などがありますが、診断されなかった方や診察を受けていない方でも、簡単な環境調整で生活の質を向上できる場合があります。以下はその例です。
                </p>
                <div className="mt-4 xs:mt-8">
                  <h4>ITを活用した例</h4>
                  <ul className="pl-5 xs:pl-6">
                    <li className="mb-2 list-disc">
                      定時になると自動でカーテンを開けてくれるデジタルデバイスを利用して、陽の光で目を覚ますことによって睡眠を改善する
                    </li>
                    <li className="list-disc">
                      仕事上での集中力に問題がある人が、ポモドーロテクニックのタイマーアプリを利用して、時間を区切ってタスクを進める
                    </li>
                  </ul>
                </div>

                <div className="mt-4 xs:mt-8">
                  <h4>物理的な環境調整を行った例</h4>
                  <ul className="pl-5 xs:pl-6">
                    <li className="mb-2 list-disc">
                      普段使うカバンを一つだけにすることで、突発的な忘れ物をする可能性を減らす
                    </li>
                    <li className="list-disc">
                      持ち物のチェックリストを記載したホワイトボードを玄関に吊るして、毎日外出前に確認する動線を作る
                    </li>
                  </ul>
                </div>
                <p className="mt-4 xs:mt-8">
                  「自分は〇〇を工夫したら□□についての問題がなくなった。軽減した」という実際の例は、同じく悩みを抱え続けている人にとって大変有益な情報です。あなたの画期的なアイデアを共有して、悩んでいる方を助けてあげましょう。
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="mt-6 text-[1.25rem] font-bold text-main-black xs:text-[1.75rem]">
              HappyHacksの使い方
            </h2>
            <div className="xs:text-[1.125rem]">
              <ul className="mt-4 pl-5 xs:pl-6">
                <li className="mb-2 list-disc">
                  生活や仕事上の悩みを質問として投稿する
                </li>
                <li className="mb-2 list-disc">
                  自分が講じている対策や、困難を乗り越えた方法を他の人に共有する
                </li>
                <li className="list-disc">
                  気になるアイデアをブックマークして、後で確認する
                </li>
              </ul>
              <p className="mt-6">
                現在は最低限の機能しか提供していませんが、利用者からの要望を随時受け付けており、新しい機能の開発にも取り組んでいきます。以下のアンケートフォームからのご意見をお待ちしています。
              </p>
              <div className="mt-4 mb-10">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScwDydKCzK9mBGLMCPpA3VyOx8-3yApIfIoaoFh67wGikBrTQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  アンケートフォーム
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const title = "HappyHacksについて | HappyHacks";
  const description =
    "HappyHacksは、大人のADHDや、グレーゾーンと呼ばれる方々が生活環境を工夫するアイデアや困りごとへの対策を共有して、ユーザー同士がQOLを高め合うことを主な目的としたサービスですが、症状の程度や診断の有無を問わず、「ADHD」をきっかけにした困りごとを抱えている方であれば、どなたでもご活用いただけます。";

  return {
    props: {
      title,
      description,
    },
  };
}

export default AboutPage;
