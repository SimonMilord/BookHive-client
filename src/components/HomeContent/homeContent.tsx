import { useEffect, useState } from "react";
import { Badge, Box, Heading, VStack, Spinner, Center } from "@chakra-ui/react";
import ReadingCard from "../ReadingCard/readingCard";
import BookList from "../BookList/booklist";

const HomeContent = (): JSX.Element => {
  const [toReadBooks, setToReadBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getToReadBooks();
  }, []);

  // Should modify this method to filter the books are are being read to add them to the
  // reading list instead.
  const getToReadBooks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/books/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Unable to fetch books");
      }
      const fetchedToReadBooks = await response.json();
      setToReadBooks(fetchedToReadBooks);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to fetch books to read.");
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Box>
        <Heading>
          Reading
          <Badge variant="solid" fontSize="1rem" ml={2}>
            1
          </Badge>
        </Heading>
        <VStack>
          <ReadingCard />
        </VStack>
      </Box>
      <Box>
        <Heading>
          To Read
          <Badge variant="solid" fontSize="1rem" ml={2}>
            {toReadBooks.length}
          </Badge>
        </Heading>
        {errorMessage ? <span>{errorMessage}</span> : <></>}
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <BookList bookArray={toReadBooks} />
        )}
      </Box>
      <Box>
        <Heading>
          Finished
          <Badge variant="solid" fontSize="1rem" ml={2}>
            0
          </Badge>
        </Heading>
        {/* <BookList /> */}
      </Box>
    </Box>
  );
};

export default HomeContent;
