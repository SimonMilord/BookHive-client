import { List, ListItem, Text, Box, Center } from "@chakra-ui/react";
import { SearchResult } from "src/types/types";
import SearchResultListItem from "../SearchResultListItem/searchResultListItem";

interface SearchResultListProps {
  results: SearchResult[];
  query: string;
}

const SearchResultList = ({ results, query }: SearchResultListProps) => {
  return (
    <Box className="searchResultList" h="80vh">
      <Text fontSize="xl">Search results for: <Text as='b'>{query}</Text></Text>
      {results.length !== 0 ? (
        <List>
          {results &&
            results.map((result: SearchResult, index: number) => {
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
