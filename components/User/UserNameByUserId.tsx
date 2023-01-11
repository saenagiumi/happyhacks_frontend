import { API_URL } from "utils/const";
import { useFetch } from "hooks/useFetch";

export const UserNameByUserId = (props: { id: string }) => {
  const { data, error, isLoading } = useFetch(
    props.id ? `${API_URL}/users/${props.id}` : null
  );

  if (isLoading) {
    return <div>ローディング中</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return <div>{data.name}</div>;
};
