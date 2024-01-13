import {
  Box,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import SidebarContent from "src/components/SideBarContent/sideBarContent";
import MobileNav from "src/components/MobileNav/mobileNav";
import { SearchResult } from "src/types/types";
import SearchResultList from "src/components/SearchResultList/searchResultList";

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

const SearchResultsPage = ({results, query}: SearchResultsProps) => {
  const { onOpen, onClose } = useDisclosure();

  return (
    <div className="searchResultsPage">
      <div className="content">
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
          <SidebarContent
            onClose={() => onClose}
            display={{ base: "none", md: "block" }}
          />
          <MobileNav onOpen={onOpen} />
          <Box ml={{ base: 0, md: 60 }} p="4">
            <SearchResultList results={results} query={query}/>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default SearchResultsPage;