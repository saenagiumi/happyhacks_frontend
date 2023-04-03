import Footer from "components/Footer/Footer";
import { NextSeo } from "next-seo";
import Image from "next/image";

const AboutPage = () => {
  return (
    <>
      <NextSeo
        title={`HappyHacksについて | HappyHacks`}
        description={`HappyHacksは、大人のADHDや、グレーゾーンと呼ばれる方々が生活環境を工夫するアイデアを共有して、ユーザー同士がQOLを高め合うことを主な目的としたサービスですが、症状の程度や診断の有無を問わず、「ADHD」をきっかけにした困りごとを抱えている方であれば、どなたでもご活用いただけます。`}
        openGraph={{
          url: `https://www.happyhacks.app/about`,
          title: `HappyHacksについて | HappyHacks`,
          description: `HappyHacksは、大人のADHDや、グレーゾーンと呼ばれる方々が生活環境を工夫するアイデアを共有して、ユーザー同士がQOLを高め合うことを主な目的としたサービスですが、症状の程度や診断の有無を問わず、「ADHD」をきっかけにした困りごとを抱えている方であれば、どなたでもご活用いただけます。`,
        }}
      />

      <div className="font-sans text-main-black">
        <div className="h-[135vw] xs:h-[52vh] md:h-[52vh] w-full bg-amber-300 mb-10 xs:mb-20">
          <div className="flex-col flex justify-center items-center">
            <div>
              <h1 className="text-[7.3vw] font-body tracking-tight xs:mb-5 xs:text-[2.1rem] md:text-[2.5rem] font-[500]">
                What&apos;s HappyHacks?
              </h1>
            </div>

            <div className="mb-[-590px] xs:mt-[-40px] xs:mb-[-580px]">
              <Image
                className="flex mx-auto"
                src="/alcohol.png"
                width={500}
                height={500}
                sizes="100vw"
                style={{
                  maxWidth: "80%",
                  height: "100%",
                }}
                priority={true}
                alt="alcoholを持った女の子"
              ></Image>
            </div>
          </div>
        </div>
        <div className="max-w-screen-sm p-4 mx-auto xs:my-[30px] leading-[1.9rem] xs:leading-9 tracking-wide xs:tracking-wider">
          <h2 className="font-[600] text-[1.25rem] xs:text-[1.75rem]">
            サービスの目的
          </h2>
          <div className="mt-4 text-[1rem] xs:text-[1.125rem]">
            <p>
              HappyHacksは、大人のADHDや、グレーゾーンと呼ばれる方々が生活環境を工夫するアイデアを共有して、ユーザー同士がQOLを高め合うことを主な目的としたサービスですが、症状の程度や診断の有無を問わず、「ADHD」をきっかけにした困りごとを抱えている方であれば、どなたでもご活用いただけます。
            </p>
          </div>
          <div>
            <div className="my-[30px] xs:my-12">
              <h2 className="font-[600] text-[1.25rem] xs:text-[1.75rem]">
                課題と手段について
              </h2>
              <h3 className="font-[600] mt-4 xs:text-[1.25rem]">
                ADHDグレーゾーンとは？
              </h3>
              <div className="mt-2 xs:text-[1.125rem]">
                <p>
                  ADHDとしての発達障害の特性がいくらか見受けられるけれども、診断基準を全て満たしているわけではなく、確定診断を得ていない状態の人のことをいいます。ここ数年ではメディアの情報などを元にして、自分もADHDなのではないか？と自認する人が増加しています。
                </p>
              </div>

              <h3 className="mt-6 font-[600] xs:text-[1.25rem]">社会的支援</h3>
              <div className="mt-2 xs:text-[1.125rem]">
                <p>
                  昨今、厚生労働省はニューロダイバーシティへの取り組みとして企業などに働きかけ、発達障害のある方が活躍できる社会を標榜していくと発信していますが、制度上の取り決めとなると、今後実際に支援を受けるには発達障害としての確定診断が求められると予想されます。その際、いわゆるグレーゾーンと呼ばれている方々にはフォーカスがあたっておらず、生活上や仕事上の支障があるにも関わらず公的な支援を得ることができず、自助努力が求められているというのが現状です。
                </p>
              </div>
              <h3 className="mt-6 font-[600] xs:text-[1.25rem]">環境調整</h3>
              <div className="mt-2 xs:text-[1.125rem]">
                <p>
                  ADHDは個人によって症状の程度が異なり、医師の診察を受けた上で薬物療法、心理療法、その他に環境調整などのアプローチを組み合わせて治療が行われるのが一般的ですが、ADHDと診断されなかった方や、様々な事情で診察を受けていない方もたくさんいると思います。
                  薬物療法以外のアプローチとして、以下はADHD対策の環境調整の例ですが、症状の程度に関わらず試すことができる環境調整には、まだ私たちが気がついていない方法がたくさんあります。
                </p>
                <div className="mt-4 xs:mt-8">
                  <h4>ITを活用した例</h4>
                  <ul className="pl-5 xs:pl-6">
                    <li className="mb-2 list-disc">
                      定時になると自動でカーテンを開けてくれるデジタルデバイスを利用して、陽の光で目を覚ますことによって睡眠障害を軽減させる
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
                  「自分は〇〇を工夫したら□□についての悩みがなくなった。軽減した」という例は、まだ悩みを抱え続けている人にとっては、人生が変わるほど有益な情報かもしれません。ぜひその素晴らしいアイデアを共有して、悩んでいる方を助けてあげてほしいと思います。
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-main-black font-[600] text-[1.25rem] xs:text-[1.75rem]">
              HappyHacksの使い方
            </h2>
            <div className="xs:text-[1.125rem]">
              <ul className="mt-[15px] pl-5 xs:pl-6">
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
              <div className="my-5">
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

export default AboutPage;
