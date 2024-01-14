import {
  Text,
  Box,
  Image,
  Card,
  CardBody,
  Stack,
  Button,
  Divider,
} from "@chakra-ui/react";
import { SearchResult } from "src/types/types";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";

export interface SearchResultListItemProps {
  result: SearchResult;
}

const SearchResultListItem = ({ result }: SearchResultListItemProps) => {
  const [isAddActionLoading, setIsAddActionLoading] = useState(false);

  // Function to handle adding a book from the search results list to the to read list
  const handleAddBookToReadList = (result: SearchResult) => {
    // TO DO
    console.log("Book added: " + result.title);
  };

  return (
    <Card
      my={3}
      direction={{ base: "column", sm: "row" }}
      className="searchResultListItem"
      maxH={"250px"}
    >
      <Image
        src={result.image}
        fit="contain"
        maxH="250px"
        h="100%"
        alt={result.title}
      />
      <Box display="flex" justifyContent="space-between" w="100%">
        <Stack spacing={1}>
          <CardBody>
            <Text>
              <strong>Title:</strong> {result.title}
            </Text>
            <Text>
              <strong>Author:</strong> {result.author}
            </Text>
            <Text>
              <strong>Year:</strong> {result.year}
            </Text>
            <Text>
              <strong>Pages:</strong> {result.pages}
            </Text>
            <Divider my="0.5rem" />
            <Box>
              <Text noOfLines={4} fontSize="sm" as="cite">
                {result.excerpt}
              </Text>
            </Box>
          </CardBody>
        </Stack>
        <Box display="flex" alignItems="center" p="20px">
          <Button
            isLoading={isAddActionLoading}
            loadingText="Adding"
            leftIcon={<FiPlus />}
            variant="solid"
            onClick={() => handleAddBookToReadList(result)}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default SearchResultListItem;
