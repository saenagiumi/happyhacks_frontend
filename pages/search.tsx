import { Input } from "@mantine/core";
import { API_BASE_URL } from "const/const";
import SearchResultTab from "features/posts/components/SearchResultTab";
import { useAtom } from "jotai";
import React, { useRef, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { searchResultAtom } from "state/searchResult";

const SearchPage = () => {
  const queryRef = useRef("");
  const [searchResults, setSearchResults] = useAtom(searchResultAtom);
  const [showNoResultMessage, setShowNoResultMessage] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    queryRef.current = event.target.value;
  };

  const handleSearch = async () => {
    const query = queryRef.current;

    if (!query) {
      return;
    }

    try {
      const postsResponse = await fetch(
        `${API_BASE_URL}/posts?search=${query}`
      );
      const postsData = await postsResponse.json();

      const hacksResponse = await fetch(
        `${API_BASE_URL}/hacks?search=${query}`
      );
      const hacksData = await hacksResponse.json();

      setSearchResults({
        hacksResults: hacksData,
        postsResults: postsData,
      });
      setShowNoResultMessage(!(hacksData.length || postsData.length));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-screen-sm">
      <div className="mx-4">
        <Input
          type="search"
          autoFocus={true}
          styles={{
            input: {
              "&:focus": {
                borderColor: "#84DBBB",
                boxShadow: "0 0 0 1.5px #CEF1E4",
              },
              border: "1px solid",
              borderColor: "#d3d3d3",
            },
          }}
          className="mt-8 mb-4 font-sans text-gray-400"
          icon={<RiSearch2Line size={20} />}
          placeholder="検索ワードを入力..."
          size="lg"
          radius={50}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />

        {searchResults.hacksResults.length > 0 ||
        searchResults.postsResults.length > 0 ? (
          <SearchResultTab
            hacksResults={searchResults.hacksResults}
            postsResults={searchResults.postsResults}
          />
        ) : null}

        {showNoResultMessage ? (
          <p className="my-5 text-center font-sans text-gray-700">
            キーワードに該当する投稿がありません
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default SearchPage;
