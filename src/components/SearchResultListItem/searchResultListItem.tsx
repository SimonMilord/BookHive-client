import {
  Text,
  Box,
  Image,
  Card,
  CardBody,
  Stack,
  Button,
  Divider,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { SearchResult } from "src/types/types";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
const imagePlaceholder =
  "https://covers.openlibrary.org/b/isbn/0261102214-M.jpg"; // to replace later for proper placeholder

export interface SearchResultListItemProps {
  result: SearchResult;
}

const SearchResultListItem = ({ result }: SearchResultListItemProps) => {
  const [isAddActionLoading, setIsAddActionLoading] = useState(false);
  const toast = useToast();

  // Function to handle adding a book from the search results list to the to read list
  const handleAddBookToReadList = async (result: SearchResult) => {
    setIsAddActionLoading(true);
    const isAlreadyInLibrary = await checkIfBookIsInLibrary(result);

    if (!isAlreadyInLibrary) {
      try {
        // Will need to refactor this to use the server once deployed
        const response = await fetch("http://localhost:8000/books/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result),
        });

        if (!response.ok) {
          throw new Error("Unable to add book to the to read list.");
        };

        toast({
          title: `${result.title} added to your library.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      } catch (error) {
        console.log(error);
      }
    } else {
      toast({
        title: `${result.title} is already in your library.`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
    }
    setIsAddActionLoading(false);
  };

  // Function to check if a search result is already in the to read list
  const checkIfBookIsInLibrary = async (result: SearchResult) => {
    const newBookIsbnCode = result.isbn[0];
    const currentLibraryIsbnCodes: string[] = await fetchCurrentIsbnCodes();
    const isAlreadyInLibrary = currentLibraryIsbnCodes.includes(newBookIsbnCode) ? true : false;
    return isAlreadyInLibrary;
  };

  // Function to fetch all the ISBNs of the books in the library
  const fetchCurrentIsbnCodes = async (): Promise<string[]> => {
    try {
      const response = await fetch("http://localhost:8000/books/isbns", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Unable to fetch ISBNs from the library.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

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
                <strong>Author:</strong>{" "}
                {result.author_name &&
                  result.author_name.map((author: string) => author).join(", ")}
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
              {result.first_sentence ? (
                <Text noOfLines={3} fontSize="sm" as="cite">
                  {result.first_sentence}
                </Text>
              ) : null}
            </Box>
            <Stack direction="row" wrap="wrap" mt={2}>
              {result.subject &&
                result.subject.slice(0, 5).map((subject: string, index) => (
                  <Badge key={index} colorScheme="blue" variant="subtle">
                    {subject}
                  </Badge>
                ))}
            </Stack>
          </CardBody>
        </Stack>
        <Box display="flex" alignItems="center" p="20px">
          <Button
            className="searchResultListItem__addButton"
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
