import { User } from "features/users/types";
import { atom } from "jotai";

export const currentUserAtom = atom<User>({
  id: "",
  name: "",
  created_at: "",
  picture: "",
  sub: "",
  updated_at: "",
});
