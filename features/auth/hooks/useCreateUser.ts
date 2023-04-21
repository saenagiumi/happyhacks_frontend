import { useAuth0 } from "@auth0/auth0-react";
import { UserPostData } from "features/users/types";
import { useState } from "react";

import { postUser } from "../api/postUser";

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [isProcessing, setIsProcessing] = useState(false);

  const createUser = async (postUserData: UserPostData) => {
    if (isProcessing) {
      return;
    }

    try {
      setIsProcessing(true);
      const accessToken = await getAccessTokenSilently({});
      const response = await postUser({ accessToken, postUserData });

      return response.data;
    } catch (error) {
      console.error("Error in postUser:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return { createUser };
};
