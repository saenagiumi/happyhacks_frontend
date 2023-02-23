import axios from 'axios';
import { User } from 'features/users/types';
import { API_URL } from 'utils/const';

export const getPostUser = async (postId: string) => {
  try {
    const res = await axios.get<User>(
      `${API_URL}/posts/${postId}/user`
    );
    return res.data;
  } catch (error) {
    throw new Error('ユーザーを取得できませんでした。');
  }
};