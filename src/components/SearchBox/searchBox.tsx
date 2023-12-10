import { SearchIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import {
  Box,
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

  // TODO: Write validation function / maybe create utils file?
  const validateSearch = (value: string) => {};

  useEffect(() => {
    console.log('SUGGESTIONS: ' + suggestions);
  }, [suggestions]);

  // Function to handle the search query change
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userQuery = e.target.value;
    setQuery(userQuery);
    const mockSuggestions: Array<string> = [
      "Harry Potter and the Chamber of secrets",
      "The intelligent investor",
      "The Raven",
    ];
    // Will add fetch from API here later -- TODO --
    setSuggestions(
      mockSuggestions.filter((suggestion) => {
        suggestion.toLowerCase().includes(userQuery.toLowerCase());
      })
    );
  };

  // Function to handle the selection from dropdown
  const handleSelectSuggestion = (selectedSuggestion: string) => {
    setQuery(selectedSuggestion);
  };

  // Function to handle the submit / trigger search
  const handleSubmit = (query: string) => {};

  return (
      <Box>
      {/* <InputLeftElement>
        <SearchIcon />
      </InputLeftElement> */}
      <Input
        value={query}
        onChange={handleQueryChange}
        placeholder="Search..."
        size="md"
        width="xl"
        />
      {suggestions.length > 0 && (
        <Menu>
          <MenuButton />
          <MenuList>
            {suggestions.map((suggestion: string, index: number) => (
              <MenuItem
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
              >
                {suggestion}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      )}
    </Box>
  );
};

export default SearchBox;
