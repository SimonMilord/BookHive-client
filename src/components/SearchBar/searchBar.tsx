import { Input } from '@chakra-ui/react';

const SearchBar = (): JSX.Element => {
  // TODO: Write validation function / maybe create utils file
  const validateSearch = (value: string) => {};

  return (
    <div>
      <Input placeholder="Search" />
    </div>
  );
};

export default SearchBar;