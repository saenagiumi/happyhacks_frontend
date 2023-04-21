import { useAuth0 } from "@auth0/auth0-react";
import { useAtom } from "jotai";
import { useState } from "react";
import { currentUserAtom } from "state/currentUser";

import { patchUser } from "../api/patchUser";

export const useUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [isProcessing, setIsProcessing] = useState(false);

  const updateUser = async (userInputData: {
    name: string;
    picture: string | undefined;
    userId: string;
  }) => {
    if (isProcessing) {
      return;
    }

    try {
      setIsProcessing(true);
      const accessToken = await getAccessTokenSilently();
      const response = await patchUser({ accessToken, userInputData });

      if (response.status === 200) {
        const updatedCurrentUser = {
          id: currentUser.id,
          created_at: currentUser.created_at,
          sub: currentUser.sub,
          updated_at: currentUser.updated_at,
          ...userInputData,
        };

        setCurrentUser(updatedCurrentUser);

        return response.data;
      }
    } catch (error) {
      console.error("Error in patchUser:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return { isProcessing, updateUser };
};
