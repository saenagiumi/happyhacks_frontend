import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";
import { currentUserAtom } from "state/currentUser";
import { useAtom } from "jotai";
import { patchUser } from "../api/patchUser";

export const useUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [isProcessing, setIsProcessing] = useState(false);

  const updateUser = async (userInputData: {
    userId: string;
    name: string;
    picture: string | undefined;
  }) => {
    if (isProcessing) {
      return;
    }

    try {
      setIsProcessing(true);
      const accessToken = await getAccessTokenSilently();
      const response = await patchUser({userInputData, accessToken})

      if (response.status === 200) {
        const updatedCurrentUser = {
          id: currentUser.id,
          sub: currentUser.sub,
          created_at: currentUser.created_at,
          updated_at: currentUser.updated_at,
          ...userInputData,
        };

        setCurrentUser(updatedCurrentUser);

        return response.data;
      }
    } catch (e: any) {
      // エラー発生の状況を特定できていないので、以下は暫定的な対応
      if (e.response.status === 401 || 403) {
        throw new Error("Unauthorized");
      }

      let message;
      if (axios.isAxiosError(e) && e.response) {
        console.error(e.response.data.message);
      } else {
        message = String(e);
        console.error(message);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return { updateUser, isProcessing };
};
