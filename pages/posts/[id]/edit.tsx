import { useAuth0 } from "@auth0/auth0-react";
import PostForm from "components/Post/PostForm";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";

type Post = {
  title: string;
  body: string;
  user_id: string;
};

const RedirectToLogin = () => {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect();
  return <></>;
};

const EditPost = ({ post }: any) => {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const [accessToken, setAccessToken] = useState("");

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

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <div>EditPost</div>
          <PostForm accessToken={accessToken} postData={post} />
        </div>
      ) : isLoading ? (
        <div>isLoading</div>
      ) : (
        //未認証時はAuth0のログイン画面にリダイレクト
        <RedirectToLogin />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  post: Post;
}> = async (context) => {
  const { id } = context.query;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}`
  );
  const post: Post = await res.json();

  return { props: { post } };
};

export default EditPost;
