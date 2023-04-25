import Footer from "components/Layout/Footer";
import { NextSeo } from "next-seo";

type Props = {
  title: string;
};

const TermsPage = ({ title }: Props) => {
  return (
    <>
      <NextSeo
        title={title}
        openGraph={{
          title: title,
          url: "https://www.happyhacks.app/terms",
        }}
      />

      <div>
        <div className="mt-12 mb-20 max-w-screen-xs px-4 font-sans leading-8 text-main-black xs:mx-auto xs:text-[1.125rem] xs:leading-9 xs:tracking-wider">
          <h2 className="mb-5 text-center text-[1.4rem] xs:mb-10 xs:text-[1.75rem]">
            利用規約
          </h2>
          <p>
            本利用規約（以下、「本規約」といいます。）は、当方がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。登録利用者の皆さま（以下、「利用者」といいます。）には、本規約に従って、本サービスをご利用いただきます。
          </p>
          <h3 className="mt-5 mb-1 text-[1.125rem] font-[600] xs:text-[1.25rem]">
            第1条（適用）
          </h3>
          本規約は、利用者と当方との間の本サービスの利用に関わる一切の関係に適用されるものとします。
          <h3 className="mt-5 mb-1 text-[1.125rem] font-[600] xs:text-[1.25rem]">
            第2条（利用資格）
          </h3>
          <ol className="m-0 pl-7">
            <li className="list-decimal">
              本サービスは以下の条件をすべて満たす方に限り、ご利用いただくことができます。
            </li>

            <li>
              <ol className="m-0 pl-7">
                <li className="list-decimal">
                  ご自身でインターネットの利用環境、端末、ソフトウェアなどを用意することができる方
                </li>
                <li className="list-decimal">本規約に同意かつ遵守できる方</li>
                <li className="list-decimal">
                  過去に本規約に違反したことのない方
                </li>
              </ol>
            </li>
            <li className="list-decimal">
              無償で配信されるコンテンツの閲覧を超えた本サービスの利用を希望する者は、所定の方法により、当方が定める一定の情報を当方に提供することにより、本サービスのアカウント登録をすることができるものとします。ただし、登録希望者が以下の各号のいずれかに該当するものと当方が判断した場合、当方はアカウント登録を拒否することがあります。この場合、当方はその理由について登録希望者に開示する義務を負いません。
            </li>
            <li>
              <ol className="m-0 pl-7">
                <li className="list-decimal">
                  当方に提供した情報に虚偽や誤記もしくは記載漏れがあった場合
                </li>
                <li className="list-decimal">
                  登録希望者が本サービスを受ける目的以外の目的でアカウント登録を申し込むものであると当方が判断した場合
                </li>
                <li className="list-decimal">
                  登録希望者が反社会的勢力等に該当する者またはこれに関与する者であるおそれがある場合
                </li>
                <li className="list-decimal">
                  登録希望者が過去に本規約を含む当方との契約に違反した者またはその関係者である場合
                </li>
                <li className="list-decimal">
                  第4条第1項各号に掲げる行為を行ったことがあるか、または行う恐れがある場合
                </li>
                <li className="list-decimal">
                  その他、当方においてアカウント登録を適切ではないと判断した場合
                </li>
              </ol>
            </li>
            <li className="list-decimal">
              登録利用者は、アカウント登録した事項に変更がある場合には、その変更事項を速やかに当方の定める方法により通知するものとします。本項の通知を怠ったことにより利用者が被った損害その他の不利益について、当方はその責任を負いません。
            </li>
          </ol>
          <h3 className="mt-8 mb-1 text-[1.125rem] font-[600] xs:text-[1.25rem]">
            第3条（認証情報の管理）
          </h3>
          <ol className="m-0 pl-7">
            <li className="list-decimal">
              利用者は、自己の責任において、本サービスのアカウント登録にあたって登録するログインID、パスワードその他の認証情報（以下「認証情報」といい、本サービスと連携する当方以外の者が運営するサービスの認証情報を含みます。）を適切に管理するものとします。
            </li>
            <li className="list-decimal">
              利用者は、いかなる場合にも、認証情報を第三者に譲渡または貸与し、もしくは第三者と共用することはできません。当方は、認証情報が登録情報と一致してログインされた場合には、その利用者IDを登録している利用者自身による利用とみなします。
            </li>
            <li className="list-decimal">
              認証情報が第三者によって使用されたことによって生じた損害は、当方は一切の責任を負わないものとします。
            </li>
            <li className="list-decimal">
              利用者が本サービスのアカウント登録にあたって認証情報として利用する、当方以外の者が運営するサービス（以下「外部サービス」といいます。）の登録、利用については、当該外部サービスが規定する各規約の定めに従い利用者自身の責任で行うものとします。
            </li>
          </ol>
          <h3 className="mt-8 mb-1 text-[1.125rem] font-[600] xs:text-[1.25rem]">
            第4条（禁止事項）
          </h3>
          <ol className="m-0 pl-7">
            <li className="list-decimal">
              利用者は、本サービスの利用にあたり、以下の行為をしてはなりません。
            </li>
            <li>
              <ol className="m-0 pl-7">
                <li className="list-decimal">
                  法令または公序良俗に違反する行為 犯罪行為に関連する行為
                </li>
                <li className="list-decimal">
                  本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為
                </li>
                <li className="list-decimal">
                  当方、ほかの利用者、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
                </li>
                <li className="list-decimal">
                  本サービスによって得られた情報を商業的に利用する行為
                </li>
                <li className="list-decimal">
                  当方のサービスの運営を妨害するおそれのある行為
                </li>
                <li className="list-decimal">
                  不正アクセスをし、またはこれを試みる行為
                </li>
                <li className="list-decimal">
                  他の利用者に関する個人情報等を収集または蓄積する行為
                </li>
                <li className="list-decimal">
                  不正な目的を持って本サービスを利用する行為
                </li>
                <li className="list-decimal">
                  本サービスの他の利用者またはその他の第三者に不利益、損害、不快感を与える行為
                </li>
                <li className="list-decimal">他の利用者に成りすます行為</li>
                <li className="list-decimal">
                  当方が許諾しない本サービス上での宣伝、広告、勧誘、または営業行為
                </li>
                <li className="list-decimal">
                  当方のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
                </li>
                <li className="list-decimal">
                  スパムとみなされる行為（機械により自動生成された文章の投稿や同一内容の文章を繰り返し投稿する行為など）
                </li>
                <li className="list-decimal">
                  過度に暴力的な表現、露骨な性的表現、人種、国籍、信条、性別、社会的身分、門地等による差別につながる表現、自殺、自傷行為、薬物乱用を誘引または助長する表現、他人に不快感を与える表現等、不適切な内容を投稿する行為
                </li>
                <li className="list-decimal">
                  面識のない異性との出会いを目的とした行為
                </li>
                <li className="list-decimal">
                  性行為やわいせつな行為を目的とする行為、他者に対する嫌がらせや誹謗中傷
                </li>
                <li className="list-decimal">
                  宗教活動または宗教団体への勧誘行為
                </li>
                <li className="list-decimal">
                  その他、当方が不適切と判断する行為
                </li>
              </ol>
            </li>
            <li className="list-decimal">
              前項のいずれかの行為が発覚した場合、
              当該コンテンツの削除、あるいはその利用者のアカウントを停止・削除する場合があります
              。
            </li>
          </ol>
          <h3 className="mt-8 mb-1 text-[1.125rem] font-[600] xs:text-[1.25rem]">
            第5条（本サービスの提供の停止等）
          </h3>
          <ol className="m-0 pl-7">
            <li className="list-decimal">
              当方は、以下のいずれかの事由があると判断した場合、利用者に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
            </li>
            <li>
              <ol className="m-0 pl-7">
                <li className="list-decimal">
                  本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
                </li>
                <li className="list-decimal">
                  地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
                </li>
                <li className="list-decimal">
                  コンピュータまたは通信回線等が事故により停止した場合
                </li>
                <li className="list-decimal">
                  本サービスが利用しているクラウドサービスが停止した場合
                </li>
                <li className="list-decimal">
                  その他、当方が本サービスの提供が困難と判断した場合
                </li>
              </ol>
            </li>
            <li className="list-decimal">
              当方は、本サービスの提供の停止または中断により、利用者または第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
            </li>
          </ol>
          <h3 className="mt-8 mb-1 text-[1.125rem] font-[600] xs:text-[1.25rem]">
            第6条（著作権等）
          </h3>
          <ol className="m-0 pl-7">
            <li className="list-decimal">
              利用者は、自ら著作権等の必要な知的財産権を有するか、または権利者から必要な許諾を受けた文章等の著作物のみ、本サービスを利用して投稿できるものとします。
            </li>
            <li className="list-decimal">
              利用者が本サービスを利用して投稿または編集した文章、画像等のコンテンツ（以下「利用者コンテンツ」といいます。）につき生じる著作権については、当該利用者あるいはその権利者に留保されるものとします。
            </li>
            <li className="list-decimal">
              利用者または第三者は、利用者コンテンツについて、権利者の許可を得ることなく、無断で転載または二次配布等を行うことはできません。
            </li>
            <li className="list-decimal">
              利用者は、当方が利用者コンテンツを本ウェブサイトに掲載し、これを配信（公衆送信及び送信可能化することを含みます。）することを許諾するものとします。
            </li>
            <li className="list-decimal">
              本条により当方に許諾された利用者コンテンツに関する権利は、当方と利用者の間の契約が終了後も引き続きその効力を保持するものとします。
            </li>
          </ol>
          <h3 className="mt-8 mb-1 text-[1.125rem] font-[600] xs:text-[1.25rem]">
            第7条（利用制限および登録抹消）
          </h3>
          <ol className="m-0 pl-7">
            <li className="list-decimal">
              当方は、利用者が以下のいずれかに該当する場合には、事前の通知なく、利用者に対して、本サービスの全部もしくは一部の利用を制限し、または利用者としての登録を抹消することができるものとします。
            </li>
            <li>
              <ol className="m-0 pl-7">
                <li className="list-decimal">
                  本規約のいずれかの条項に違反した場合
                </li>
                <li className="list-decimal">
                  登録事項に虚偽の事実があることが判明した場合
                </li>
                <li className="list-decimal">
                  当方からの連絡に対し、一定期間返答がない場合
                </li>
                <li className="list-decimal">
                  本サービスについて、最終の利用から一定期間利用がない場合
                </li>
                <li className="list-decimal">
                  その他、当方が本サービスの利用を適当でないと判断した場合
                </li>
              </ol>
            </li>
            <li className="list-decimal">
              当方は、本条に基づき当方が行った行為により利用者に生じた損害について、一切の責任を負いません。
            </li>
          </ol>
          <h3 className="mt-8 mb-1 text-[1.125rem] font-[600] xs:text-[1.25rem]">
            第8条（保証の否認および免責事項）
          </h3>
          <ol className="m-0 pl-7">
            <li className="list-decimal">
              当方は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
            </li>
            <li className="list-decimal">
              当方は、本サービスに起因して利用者に生じたあらゆる損害について、一切の責任を負いません。
            </li>
            <li className="list-decimal">
              当方は、登録されたデータの消去、喪失等に関連して利用者が被った損害について、一切の責任を負いません。
            </li>
            <li className="list-decimal">
              当方は、本サービスに関して、利用者と他の利用者または第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
            </li>
          </ol>
          <h3 className="mt-8 mb-1 text-[1.125rem] font-[600] xs:text-[1.25rem]">
            第9条（サービス内容の変更等）
          </h3>
          <p>
            当方は、利用者に通知すること無く、本サービスの内容を変更、追加または廃止することができるものとし、これによって利用者に生じた損害または不利益について一切の責任を負いません。
          </p>
          <h3 className="mt-8 mb-1 text-[1.125rem] font-[600] xs:text-[1.25rem]">
            第10条（利用規約の変更）
          </h3>
          <p>
            当方は、必要と判断した場合には、利用者に通知することなくいつでも本規約を変更することができるものとします。
          </p>
          <h3 className="mt-8 mb-1 text-[1.125rem] font-[600] xs:text-[1.25rem]">
            第11条（個人情報の取扱い）
          </h3>
          <p>
            当方は、本サービスの利用によって取得する個人情報については、プライバシーポリシーに従い適切に取り扱うものとします。
          </p>
          <h3 className="mt-8 mb-1 text-[1.125rem] font-[600]">
            第12条（通知または連絡）
          </h3>
          利用者と当方との間の通知または連絡は、当方の定める方法によって行うものとします。
          <h3 className="mt-8 mb-1 text-[1.125rem] font-[600]">
            第13条（権利義務の譲渡の禁止）
          </h3>
          <p>
            利用者は、当方の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
          </p>
          <h3 className="mt-8 mb-1 text-[1.125rem] font-[600]">
            第14条（準拠法・裁判管轄）
          </h3>
          <p>
            本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当方の所在地を管轄する裁判所を専属的合意管轄とします。
          </p>
        </div>

        <Footer />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const title = "利用規約 | HappyHacks";

  return {
    props: {
      title,
    },
  };
}

export default TermsPage;
