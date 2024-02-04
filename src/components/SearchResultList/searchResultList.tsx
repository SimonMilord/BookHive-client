import { List, ListItem, Text, Box, Center } from "@chakra-ui/react";
import { SearchResult } from "src/types/types";
import SearchResultListItem from "../SearchResultListItem/searchResultListItem";
import { useContext } from "react";
import SearchContext from "src/context/SearchContext";

const SearchResultList: React.FC = () => {
  const {searchResults, searchTerm} = useContext(SearchContext);

  return (
    <Box className="searchResultList" h="80vh">
      <Box display='flex' justifyContent='space-between'>
        <Text fontSize="xl">Search results for: <Text as='b'>{searchTerm}</Text></Text>
        <Text as='b' fontSize="xl">{searchResults.length} results</Text>
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
        <Center display='flex' alignItems='center' h='100%'>
          <Text fontSize='xl'>No Results found 😔</Text>
        </Center>
      )}
    </Box>
  );
};

export default SearchResultList;
