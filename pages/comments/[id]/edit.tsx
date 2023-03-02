import { useAuth0 } from "@auth0/auth0-react";
import PostForm from "features/posts/components/PostForm";
import AuthGuard from "features/auth/components/AuthGuard";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";

type Comment = {
  title: string;
  body: string;
  user_id: string;
};

const EditComment = ({ comment }: any) => {
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
    <AuthGuard>
      <PostForm accessToken={accessToken} commentData={comment} />
    </AuthGuard>
  );
};

export const getServerSideProps: GetServerSideProps<{
  comment: Comment;
}> = async (context) => {
  const { id } = context.query;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/${id}`
  );
  const comment: Comment = await res.json();

  return { props: { comment } };
};

export default EditComment;
