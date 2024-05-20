import {
  Badge,
  Box,
  Center,
  Heading,
  List,
  ListItem,
  Spinner,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import PageHeader from "src/components/PageHeader/pageHeader";
import SidebarContent from "src/components/SideBarContent/sideBarContent";
import "./HomePage.scss";
import BookList from "src/components/BookList/bookList";
import ReadingCard from "src/components/ReadingCard/readingCard";
import { useEffect, useState } from "react";
import { Book } from "src/types/types";
import { serverURL } from "src/App";

export default function HomePage() {
  const { onOpen, onClose } = useDisclosure();
  const [toReadBooks, setToReadBooks] = useState([]);
  const [readingBooks, setReadingBooks] = useState([]);
  const [finishedBooks, setFinishedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getToReadBooks();
  }, []);

  const getToReadBooks = async () => {
    setIsLoading(true);
    try {
      // will need to refactor how I want to make those calls and the path once deployed
      const response = await fetch(`${serverURL}/books/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unable to fetch books");
      }
      const fetchedToReadBooks = await response.json();

      setToReadBooks(fetchedToReadBooks.toReadBooks);
      setReadingBooks(fetchedToReadBooks.readingBooks);
      setFinishedBooks(fetchedToReadBooks.finishedBooks);
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to fetch books to read from the server.");
    }
    setIsLoading(false);
  };

  return (
    <div className="homepage">
      <div className="content">
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
          <SidebarContent
            onClose={() => onClose}
            display={{ base: "none", md: "block" }}
          />
          <PageHeader onOpen={onOpen} />
          <Box ml={{ base: 0, md: 60 }} p="4" className="homepage__content">
            <Box display="flex" flexDirection="column" h="100%">
              <Box flex={1}>
                <Heading>
                  Reading
                  <Badge
                    variant="subtle"
                    fontSize="1.5rem"
                    ml={2}
                    colorScheme="blue"
                  >
                    {readingBooks.length ?? 0}
                  </Badge>
                </Heading>
                <List>
                  {readingBooks.length > 0 &&
                    readingBooks.map((book: Book, index) => (
                      <ListItem key={index}>
                        <ReadingCard book={book} />
                      </ListItem>
                    ))}
                </List>
              </Box>
              <Box flex={1}>
                <Heading>
                  To Read
                  <Badge
                    variant="subtle"
                    fontSize="1.5rem"
                    ml={2}
                    colorScheme="blue"
                  >
                    {toReadBooks.length ?? 0}
                  </Badge>
                </Heading>
                {errorMessage ? <span>{errorMessage}</span> : <></>}
                {isLoading ? (
                  <Center>
                    <Spinner />
                  </Center>
                ) : (
                  <BookList booksArray={toReadBooks} />
                )}
              </Box>
              <Box flex={1}>
                <Heading>
                  Finished
                  <Badge
                    variant="subtle"
                    fontSize="1.5rem"
                    ml={2}
                    colorScheme="blue"
                  >
                    {finishedBooks.length ?? 0}
                  </Badge>
                </Heading>
                {errorMessage ? <span>{errorMessage}</span> : <></>}
                {isLoading ? (
                  <Center>
                    <Spinner />
                  </Center>
                ) : (
                  <BookList booksArray={finishedBooks} />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
}
