import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  
  // Pre-renderingに対応
  storage: typeof window === 'undefined' ? undefined : window.sessionStorage,
});

const tokenState = atom({
  key: "tokenState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export default tokenState;