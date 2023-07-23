import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

const SearchBar = (): JSX.Element => {
  // TODO: Write validation function / maybe create utils file
  const validateSearch = (value: string) => {};

  return (
    <InputGroup>
      <InputLeftElement>
        <SearchIcon />
      </InputLeftElement>
      <Input placeholder="Search..." size="md" width="xl" />
    </InputGroup>
  );
};

export default SearchBar;
