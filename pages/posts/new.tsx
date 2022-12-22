import PostForm from "components/Post/PostForm";

const NewPost = () => {
  return (
    <div>
      <div className="mx-3">
        <h3 className="text-md text-gray-600">
          質問内容の入力
          <span className="text-xs text-red-400"> ＊は入力必須です</span>
        </h3>
        <p className="text-sm text-gray-600">気軽に質問してみましょう</p>
      </div>
      <PostForm />
    </div>
  );
};

export default NewPost;
