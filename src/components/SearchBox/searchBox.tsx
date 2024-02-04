import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";

const SearchBox: React.FC<{}> = () => {
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchresults, setSearchResults] = useState<any[]>([]);

  // Function to handle the search query change
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userQuery = event.target.value;
    setQuery(userQuery);
  };

  // Function to handle the submit / trigger search
  const handleSubmit = () => {
    if (query.length === 0) {
      return;
    }
    triggerSearch(query);
    handleClearInput();
  };

  const triggerSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/books/search/${query}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Unable to fetch books for query: ${query} from server`
        );
      }
      const data = await response.json();
      const searchResults = data.docs ?? data.docs;
      setSearchResults(searchResults);
      console.log("Search results: ", searchResults); // to remove later
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
