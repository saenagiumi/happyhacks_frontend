import Footer from "components/Footer/Footer";
import { NextSeo } from "next-seo";
import React from "react";

const PrivacyPage = () => {
  return (
    <>
      <NextSeo
        title={`${"プライバシーポリシー"} | HappyHacks`}
        description={`${"プライバシーポリシー"} | HappyHacks`}
        openGraph={{
          url: `https://www.happyhacks.app/privacy`,
          title: `${"プライバシーポリシー"} | HappyHacks`,
          description: `${"プライバシーポリシー"} | HappyHacks`,
        }}
      />

      <div>
        <div>
          <div className="max-w-screen-sm px-4 xs:mx-auto mt-12 mb-20 font-sans text-main-black xs:text-[1.125rem] leading-[1.9rem] xs:leading-9 xs:tracking-wider">
            <h2 className="text-[1.4rem] xs:text-[1.75rem] text-center mb-5 xs:mb-10">
              プライバシーポリシー
            </h2>
            <p>
              Takeru
              (以下、「当方」といいます。)は、本ウェブサイト上で提供するサービス(以下、「本サービス」といいます。)におけるユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー(以下、「本ポリシー」といいます。)を定めます。{" "}
            </p>

            <h3 className="text-[1.125rem] xs:text-[1.25rem] font-[600] mt-5 mb-1">
              お客様から取得する情報
            </h3>
            <p>当方は、お客様から以下の情報を取得します。</p>
            <ul className="pl-7 m-0">
              <li className="list-disc">
                氏名(ニックネームやペンネームも含む)
              </li>
              <li className="list-disc">
                外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報
              </li>
              <li className="list-disc">
                Cookie(クッキー)を用いて生成された識別情報
              </li>
              <li className="list-disc">
                OSが生成するID、端末の種類、端末識別子等のお客様が利用するOSや端末に関する情報
              </li>
              <li className="list-disc">
                当方ウェブサイトの滞在時間、入力履歴、購買履歴等の当方ウェブサイトにおけるお客様の行動履歴
              </li>
            </ul>
            <h3 className="text-[1.125rem] xs:text-[1.25rem] font-[600] mt-5 mb-1">
              お客様の情報を利用する目的
            </h3>
            <p>
              当方は、お客様から取得した情報を、以下の目的のために利用します。
            </p>
            <ul className="pl-7 m-0">
              <li className="list-disc">
                本サービスに関する登録の受付、お客様の本人確認、認証のため
              </li>
              <li className="list-disc">
                お客様の本サービスの利用履歴を管理するため
              </li>
              <li className="list-disc">
                本サービスにおけるお客様の行動履歴を分析し、本サービスの維持改善に役立てるため
              </li>
              <li className="list-disc">
                当方のサービスに関するご案内をするため
              </li>
              <li className="list-disc">
                お客様からのお問い合わせに対応するため
              </li>
              <li className="list-disc">
                当方の規約や法令に違反する行為に対応するため
              </li>
              <li className="list-disc">
                本サービスの変更、提供中止、終了、契約解除をご連絡するため
              </li>
              <li className="list-disc">当方規約の変更等を通知するため</li>
              <li className="list-disc">
                以上の他、本サービスの提供、維持、保護及び改善のため
              </li>
            </ul>
            <h3 className="text-[1.125rem] xs:text-[1.25rem] font-[600] mt-5 mb-1">
              安全管理のために講じた措置
            </h3>
            <p>
              当方が、お客様から取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡をいただきましたら、法令の定めに従い個別にご回答させていただきます。
            </p>
            <h3 className="text-[1.125rem] xs:text-[1.25rem] font-[600] mt-5 mb-1">
              第三者提供
            </h3>
            <p>
              当方は、お客様から取得する情報のうち、個人データ(個人情報保護法第2条第6項)に該当するものついては、あらかじめお客様の同意を得ずに、第三者(日本国外にある者を含みます。)に提供しません。但し、次の場合は除きます。
            </p>
            <ul className="pl-7 m-0">
              <li className="list-disc">
                個人データの取扱いを外部に委託する場合
              </li>
              <li className="list-disc">当方や本サービスが買収された場合</li>
              <li className="list-disc">
                事業パートナーと共同利用する場合(具体的な共同利用がある場合は、その内容を別途公表します。)
              </li>
              <li className="list-disc">
                その他、法律によって合法的に第三者提供が許されている場合
              </li>
            </ul>
            <h3 className="text-[1.125rem] xs:text-[1.25rem] font-[600] mt-5 mb-1">
              アクセス解析ツール
            </h3>
            <p>
              当方は、お客様のアクセス解析のために「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくは以下からご確認ください。
              <a
                className="list-disc"
                href={
                  "https://marketingplatform.google.com/about/analytics/terms/jp/"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Googleアナリティクス利用規約
              </a>
            </p>
            <h3 className="text-[1.125rem] xs:text-[1.25rem] font-[600] mt-5 mb-1">
              プライバシーポリシーの変更
            </h3>
            <p>
              当方は、必要に応じて、本ポリシーの内容を変更します。本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、お客様に通知することなく、変更することができるものとします。当方が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
            </p>
            <h3 className="text-[1.125rem] xs:text-[1.25rem] font-[600] mt-5 mb-1">
              お問い合わせ
            </h3>
            <p>
              お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、以下のTwitterアカウントまでご連絡ください。
            </p>
            <div className="mt-3">
              @takerudev：
              <a
                href="https://twitter.com/takerudev"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://twitter.com/takerudev
              </a>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;
