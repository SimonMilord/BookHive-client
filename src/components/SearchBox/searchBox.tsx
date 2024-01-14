import { SearchIcon } from "@chakra-ui/icons";
import React, { useRef, useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

interface SearchBoxProps {
  // To add later: props needed
}

const SearchBox: React.FC<SearchBoxProps> = () => {
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to handle the search query change
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userQuery = event.target.value;
    setQuery(userQuery);

    // Will add fetch from API HERE later -- TODO --
  };

  // Function to handle the submit / trigger search
  const handleSubmit = () => {
    console.log("Submitted query: " + query);
    // TODO with the API
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
            value={query}
            onChange={handleQueryChange}
            placeholder="Search..."
            size="md"
            width="xl"
            ref={inputRef}
          />
        </InputGroup>
      </form>
    </Box>
  );
};

export default SearchBox;
