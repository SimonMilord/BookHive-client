import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import React, { useContext, useRef, useState } from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import SearchContext from "src/context/SearchContext";
import { useNavigate } from "react-router-dom";
import { SearchResult } from "src/types/types";
import { serverURL } from "src/App";
const SearchBox: React.FC<{}> = () => {
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setSearchResults, setSearchTerm } = useContext(SearchContext);
  const navigate = useNavigate();

  // Function to handle the search query change
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userQuery = event.target.value;
    setQuery(userQuery);
  };

  // Function to handle the submit / trigger search
  const handleSubmit = async () => {
    if (query.length === 0) {
      return;
    }
    await triggerSearch(query);
    navigate("/searchresults");
  };

  const triggerSearch = async (query: string) => {
    handleClearInput();
    setSearchTerm(query);
    setIsLoading(true);
    try {
      const response = await fetch(
        `${serverURL}/search/${query}&limit=50&offset=${0}&lang=en`, // to change later when adding pagination
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
         }
      );
      if (!response.ok) {
        throw new Error(
          `Unable to fetch books for query: ${query} from server`
        );
      }
      const data = await response.json();
      const rawSearchResults = data.docs ?? data.docs;
      // Parses the raw search results to filter out the ones without a cover_i
      const parsedSearchResults = rawSearchResults.filter((result: SearchResult) => result.cover_i !== undefined);
      setSearchResults(parsedSearchResults);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleClearInput = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <Box>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <InputGroup>
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input
            className="search-input"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search..."
            size="md"
            width="xl"
            ref={inputRef}
          />
          <InputRightElement>
            {query && query.length > 0 ? (
              <Button variant="unstyled" size="xs" onClick={handleClearInput}>
                <CloseIcon />
              </Button>
            ) : null}
            {isLoading ? <Spinner /> : null}
          </InputRightElement>
        </InputGroup>
      </form>
    </Box>
  );
};

export default SearchBox;
