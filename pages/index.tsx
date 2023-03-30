import { API_BASE_URL } from "const/const";
import ActiveTab from "pages/[activeTab]";
import { SWRConfig } from "swr";

// export const getServerSideProps = async () => {
//   const posts = await fetch(`${API_BASE_URL}/posts_with_comments_count`);
//   const postsData = await posts.json();

//   return {
//     props: {
//       fallback: {
//         [`${API_BASE_URL}/posts_with_comments_count`]: postsData,
//       },
//     },
//   };
// };

export default function Home(
  // props: any
  ) {
  // const { fallback } = props;

  return (
    <>
      {/* <SWRConfig value={{ fallback }}> */}
        <div>{<ActiveTab />}</div>
      {/* </SWRConfig> */}
    </>
  );
}
