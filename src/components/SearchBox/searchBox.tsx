import { SearchIcon } from "@chakra-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

interface SearchBoxProps {
  // To add later: props needed
}

const SearchBox: React.FC<SearchBoxProps> = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to handle the search query change
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userQuery = event.target.value;
    setQuery(userQuery);

    const mockSuggestions: Array<string> = [
      "The old man and the sea",
      "The intelligent investor",
      "The Raven",
      "The signal and the noise",
      "The Lord of the Rings",
    ];

    // Will add fetch from API HERE later -- TODO --

    const filteredSuggestions = mockSuggestions.filter((suggestion: string) =>
      suggestion.toLowerCase().includes(userQuery.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
    setIsSuggestionsOpen(filteredSuggestions.length > 0);
  };

  // Function to handle the selection from dropdown
  const handleSelectSuggestion = (selectedSuggestion: string) => {
    setQuery(selectedSuggestion);
    setSuggestions([]);
    setIsSuggestionsOpen(false);

    if (inputRef.current) {
      inputRef.current.focus();
    }
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
          {suggestions.length > 0 && (
            <Menu
              isOpen={isSuggestionsOpen}
              closeOnSelect={true}
              closeOnBlur={true}
            >
              <MenuButton
                as={Box}
                cursor="pointer"
                position="absolute"
                left="0"
                top="100%"
              ></MenuButton>
              <MenuList>
                {suggestions.map((suggestion: string, index: number) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    <Text>{suggestion}</Text>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          )}
        </InputGroup>
      </form>
    </Box>
  );
};

export default SearchBox;
