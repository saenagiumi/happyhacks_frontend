import { Comment } from "components/Comment/Comment";
import { PostDetail } from "components/Post/PostDetail";

const PostsId = () => {
  return (
    <div className="mx-2">
      <PostDetail />
      <h2 className="font-medium text-gray-600 my-4 ml-1">２件の提案</h2>
      <Comment title={"次の日の持ち物をメモした紙を次の日履く靴の中に入れておく"}
          body={"タイトルの通りです。持ち物リストを自分の生活動線の中で必ず目に触れるところに置いておくと、嫌でも忘れなくなります。ただ、そのまま紙だと気づかずに靴を履いてしまう恐れがあるので、小さめのメモが書けるホワイトボードなどそういうものを置いてもいいかもしれませんね！一太郎スマイルさんの生活がより良くなることをお祈りしています！！ファイト！"}
          author={"花咲か爺さん"}
          postedAt={"2022/12/09 22:56"} />
      <div className="my-10"></div>
      <Comment title={"次の日の持ち物をメモした紙を次の日履く靴の中に入れておく"}
          body={"タイトルの通りです。持ち物リストを自分の生活動線の中で必ず目に触れるところに置いておくと、嫌でも忘れなくなります。ただ、そのまま紙だと気づかずに靴を履いてしまう恐れがあるので、小さめのメモが書けるホワイトボードなどそういうものを置いてもいいかもしれませんね！一太郎スマイルさんの生活がより良くなることをお祈りしています！！ファイト！"}
          author={"花咲か爺さん"}
          postedAt={"2022/12/09 22:56"} />
    </div>
  );
};

export default PostsId;