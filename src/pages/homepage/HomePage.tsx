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
import MobileNav from "src/components/MobileNav/mobileNav";
import SidebarContent from "src/components/SideBarContent/sideBarContent";
import "./HomePage.scss";
import BookList from "src/components/BookList/bookList";
import ReadingCard from "src/components/ReadingCard/readingCard";
import { useEffect, useState } from "react";
import { Book } from "src/types/types";

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

  // Should modify this method to filter the books are are being read to add them to the reading list instead.
  const getToReadBooks = async () => {
    setIsLoading(true);
    try {
      // will need to refactor how I want to make those calls and the path once deployed
      const response = await fetch("http://localhost:8000/books/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Unable to fetch books");
      }
      const fetchedToReadBooks = await response.json();
      setToReadBooks(fetchedToReadBooks);
      setReadingBooks(fetchedToReadBooks); // TO CHANGE LATER WHEN ADDING STATUS IN DB
      setFinishedBooks(fetchedToReadBooks); // TO CHANGE LATER WHEN ADDING STATUS IN DB
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to fetch books to read from the server.");
      setIsLoading(false);
    }
  };
  return (
    <div className="homepage">
      <div className="content">
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
          <SidebarContent
            onClose={() => onClose}
            display={{ base: "none", md: "block" }}
          />
          <MobileNav onOpen={onOpen} />
          <Box ml={{ base: 0, md: 60 }} p="4">
            <Box>
              <Box>
                <Heading>
                  Reading
                  <Badge variant="solid" fontSize="1rem" ml={2}>
                    {readingBooks.length ?? 0}
                  </Badge>
                </Heading>
                <List>
                  {readingBooks &&
                    readingBooks.map((book: Book, index) => (
                      <ListItem key={index}>
                        <ReadingCard book={book} />
                      </ListItem>
                    ))}
                </List>
              </Box>
              <Box>
                <Heading>
                  To Read
                  <Badge variant="solid" fontSize="1rem" ml={2}>
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
              <Box>
                <Heading>
                  Finished
                  <Badge variant="solid" fontSize="1rem" ml={2}>
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
