import {
  List,
  ListItem,
  Text,
  Box,
  Center,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { SearchResult } from "src/types/types";
import SearchResultListItem from "c/SearchResultListItem/searchResultListItem";
import { useContext } from "react";
import SearchContext from "src/context/SearchContext";

const SearchResultList: React.FC = () => {
  const { searchResults, searchTerm } = useContext(SearchContext);
  const boldedSearchTerm: JSX.Element = <Text as="b">"{searchTerm}"</Text>;

  return (
    <Box className="searchResultList" h="80vh">
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="xl">Search results for: {boldedSearchTerm}</Text>
        <Text as="b" fontSize="xl">
          {searchResults.length} results
        </Text>
      </Box>
      {searchResults.length !== 0 ? (
        <List mt={4}>
          {searchResults &&
            searchResults.map((result: SearchResult, index: number) => {
              return (
                <ListItem key={index}>
                  <SearchResultListItem result={result} />
                </ListItem>
              );
            })}
        </List>
      ) : (
        <Center
          display="flex"
          alignItems="center"
          flexDirection="column"
          h="100%"
        >
          <Text fontSize="xl" mb={5}>
            No Results found for: {boldedSearchTerm}
          </Text>
          <ChakraLink
            className="bookInfoPage__backButton"
            as={ReactRouterLink}
            to="/home"
            colorScheme="blue"
          >
            Go back
          </ChakraLink>
        </Center>
      )}
    </Box>
  );
};

export default SearchResultList;
