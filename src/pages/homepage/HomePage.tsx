import {
  Badge,
  Box,
  Center,
  Heading,
  Spinner,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import MobileNav from "src/components/MobileNav/mobileNav";
import SidebarContent from "src/components/SideBarContent/sideBarContent";
import "./HomePage.scss";
import BookList from "src/components/BookList/booklist";
import ReadingCard from "src/components/ReadingCard/readingCard";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { onOpen, onClose } = useDisclosure();
  const [toReadBooks, setToReadBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getToReadBooks();
  }, []);

  // Should modify this method to filter the books are are being read to add them to the reading list instead.
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
                  <BookList booksArray={toReadBooks} />
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
          </Box>
        </Box>
      </div>
    </div>
  );
}
