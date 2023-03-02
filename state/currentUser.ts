import { User } from "features/users/types";
import { atom } from "jotai";

export const currentUserAtom = atom<User>({
  id: "",
  sub: "",
  name: "",
  email: "",
  picture: "",
  created_at: "",
  updated_at: "",
});