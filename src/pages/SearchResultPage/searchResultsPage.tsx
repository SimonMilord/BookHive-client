import {
  Box,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import SidebarContent from "../../components/SideBarContent/sideBarContent";
import PageHeader from "../../components/PageHeader/pageHeader";
import SearchResultList from "../../components/SearchResultList/searchResultList";

const SearchResultsPage: React.FC = () => {
  const { onOpen, onClose } = useDisclosure();

  return (
    <div className="searchResultsPage">
      <div className="content">
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
          <SidebarContent
            onClose={() => onClose}
            display={{ base: "none", md: "block" }}
          />
          <PageHeader onOpen={onOpen} />
          <Box ml={{ base: 0, md: 60 }} p="4">
            <SearchResultList />
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default SearchResultsPage;