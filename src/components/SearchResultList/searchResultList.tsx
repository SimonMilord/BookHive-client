import { List, ListItem } from "@chakra-ui/react";
import { SearchResult } from "src/types/types";
import SearchResultListItem from "../SearchResultListItem/searchResultListItem";

interface SearchResultListProps {
  results: SearchResult[];
}

const SearchResultList = ({results}: SearchResultListProps) => {

  return (
    <List>
      {results &&
        results.map((result: SearchResult, index: number) => {
          return (
            <ListItem key={index}>
              <SearchResultListItem result={result}/>
            </ListItem>
          );
        })}
    </List>
  );
}

export default SearchResultList;