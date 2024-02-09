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
import { useEffect, useState } from "react";
const imagePlaceholder =
  "https://covers.openlibrary.org/b/isbn/0261102214-M.jpg";

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

  useEffect(() => {
    console.log("author: " + JSON.stringify(result.author_name));
  }, []);

  return (
    <Card
      my={3}
      direction={{ base: "column", sm: "row" }}
      className="searchResultListItem"
      h={"250px"}
    >
      <Box
        className="searchResultListItem__imageContainer"
        width="200px"
        height="250px"
        overflow="hidden"
      >
        <Image
          src={
            `https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg` ||
            imagePlaceholder
          }
          width="100%"
          h="100%"
          objectFit="contain"
          alt={result.title}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" w="100%">
        <Stack spacing={1}>
          <CardBody>
            {result.title ? (
              <Text>
                <strong>Title:</strong> {result.title}
              </Text>
            ) : null}
            {result.author_name ? (
              <Text>
                <strong>Author:</strong> {result.author_name}
              </Text>
            ) : null}
            {result.first_publish_year ? (
              <Text>
                <strong>Year:</strong> {result.first_publish_year}
              </Text>
            ) : null}
            {result.number_of_pages_median ? (
              <Text>
                <strong>Pages:</strong> {result.number_of_pages_median}
              </Text>
            ) : null}
            <Divider my="0.5rem" />
            <Box>
              {result.excerpt ? (
                <Text noOfLines={4} fontSize="sm" as="cite">
                  {result.excerpt}
                </Text>
              ) : null}
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
