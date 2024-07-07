import {
  Text,
  Box,
  Image,
  Card,
  CardBody,
  Stack,
  Button,
  Divider,
  useToast,
  TagLabel,
  Tag,
} from "@chakra-ui/react";
import { SearchResult } from "src/types/types";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import { getAuthors, getGenres } from "src/utils/helperFunctions";
import { serverURL } from "src/App";

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
        const resultToSend = filteredResultToSendToServer(result);
        const response = await fetch(`${serverURL}/books/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resultToSend),
          credentials: "include",
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
      const response = await fetch(`${serverURL}/books/isbns`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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

  const filteredResultToSendToServer = (result: SearchResult) => {
    const resultMap = {
      title: result?.title,
      author: result?.author_name?.join(', '),
      coverId: result?.cover_i,
      isbn: result?.isbn?.[0],
      pageCount: result?.number_of_pages_median,
      language: result?.language?.join(', '),
      genre: result?.subject?.slice(0, 10).join(', '),
      publisher: result?.publisher?.slice(0, 5).join(', '),
      yearPublished: result?.first_publish_year,
      firstSentence: result?.first_sentence?.[0],
      rating: Math.round(result?.ratings_average),
      ratingsCount: result?.ratings_count,
      amazonId: result?.id_amazon && result?.id_amazon.filter(item => item !== '').pop(),
      currentPage: 0,
      startDate: null,
      finishedDate: null,
      status: "To Read",
      readingDuration: 0,
      myRating: 0,
    };
    return resultMap;
  };

  return (
    <Card
      my={3}
      direction={{ base: "column", sm: "row" }}
      className="searchResultListItem"
    >
      <Box
        className="searchResultListItem__imageContainer"
        width="200px"
        height="250px"
        overflow="hidden"
      >
        <Image
          src={
            `https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`}
          width="100%"
          h="100%"
          loading='lazy'
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
                {getAuthors(result.author_name, 5)}
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
                getGenres(result.subject.join(', '), 5).map((subject: string, index) => (
                  <Tag key={index} size="md" variant="subtle" colorScheme="blue">
                    <TagLabel>{subject}</TagLabel>
                  </Tag>
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
