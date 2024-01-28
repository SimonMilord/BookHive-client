import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  VStack,
  useColorModeValue,
  useDisclosure,
  Image,
  Text,
  Heading,
  Button,
  ButtonGroup,
  Link as ChakraLink,
  HStack,
  Icon,
} from "@chakra-ui/react";
import "./bookInfoPage.scss";
import { Link as ReactRouterLink } from "react-router-dom";
import MobileNav from "src/components/MobileNav/mobileNav";
import SidebarContent from "src/components/SideBarContent/sideBarContent";
import { Book } from "src/types/types";
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useState } from "react";
import NotesList from "src/components/NotesList/notesList";

interface BookInfoPageProps {
  book: Book;
}
// to change later and add to the book object
const currentPage = 420;

// need to get the book id from the params and then fetch the specific book data
// from server?
// check how to pass data from bookListItem to another page in react router
const BookInfoPage = ({ book }: BookInfoPageProps): JSX.Element => {
  const { onOpen, onClose } = useDisclosure();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // Possible values: To Read | Reading | Finished
  const [bookStatus, setBookStatus] = useState('To Read');
  const [bookStatusBtnLabel, setBookStatusBtnLabel] = useState('Start');


  const onStatusBtnClick = () => {
    switch (bookStatus) {
      case 'To Read':
        setBookStatus('Reading');
        setBookStatusBtnLabel('Finish');
        break;
      case 'Reading':
        setBookStatus('Finished');
        setBookStatusBtnLabel('Read again');
        break;
      default:
        setBookStatus('To Read');
        setBookStatusBtnLabel('Start');
        break;
    }
  };

  const onLogUpdate = () => {
    // will open a modal which will allow to update the reading log
    alert('Log updated + TODO :)');
  }

  const getBookReadingDuration = (book: Book) => {
    const today: Date = new Date();
    // where startDate is a string : '2024-01-01' book.startDate
    const startedDay: Date = new Date('2024-01-01');
    const timeDifference: number = today.getTime() - startedDay.getTime();
    const daysDifference: number = Math.floor(timeDifference/ (1000 * 60 * 60 * 24));
    return daysDifference > 0 ? daysDifference : 0;
  };

  const readingLogDuration = getBookReadingDuration(book);

  return (
    <div className="bookInfoPage">
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <MobileNav onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p="4">
          <VStack>
            <Container maxW="100%">
              <Box className="bookInfoPage__topSection">
                <Grid
                  templateRows="repeat(2, 1fr)"
                  templateColumns="repeat(5, 1fr)"
                  gap={3}
                >
                  <GridItem rowSpan={2} colSpan={1}>
                    <Image
                      src={book.image}
                      fit="contain"
                      minH={200}
                      maxH={250}
                      maxW="fit-content"
                      borderRadius="8px"
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Text>Title: {book.title}</Text>
                    <Text>Author: {book.author}</Text>
                    <Text>Pages: {book.pageCount}</Text>
                  </GridItem>
                  <GridItem
                    colSpan={2}
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <ButtonGroup gap="2">
                      <Button colorScheme="blue" className="bookInfoPage__changeStatusButton" onClick={onStatusBtnClick}>{bookStatusBtnLabel}</Button>
                      <ChakraLink
                        className="bookInfoPage__backButton"
                        as={ReactRouterLink}
                        to="/"
                        colorScheme="blue"
                      >
                        Back
                      </ChakraLink>
                    </ButtonGroup>
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Text noOfLines={4} as="cite">
                      {book.excerpt}
                    </Text>
                  </GridItem>
                </Grid>
              </Box>
            </Container>
            <Divider />
            <Container maxW="100%">
              <Box className="bookInfoPage__readingLog">
                <Heading size="md">Reading Log</Heading>
                <Grid templateColumns="repeat(6, 1fr)" gap={6} my={5}>
                  <GridItem>
                    <Heading size="sm">Status</Heading>
                    <Text>{bookStatus}</Text>
                  </GridItem>
                  <GridItem>
                    <Heading size="sm">{bookStatus === 'Finished' ? 'Finished' : 'Started'}</Heading>
                    <Text>{book.startDate ?? "Not started yet"}</Text>
                  </GridItem>
                  <GridItem>
                    <Heading size="sm">Read time</Heading>
                    <Text>{readingLogDuration} days</Text>
                  </GridItem>
                  <GridItem>
                    <Heading size="sm">Current page</Heading>
                    <Text>{currentPage}</Text>
                  </GridItem>
                  <GridItem>
                    <Heading size="sm">Progress</Heading>
                    <Text>{(currentPage/book.pageCount * 100).toFixed(2)}%</Text>
                  </GridItem>
                  <GridItem display="flex" justifyContent="flex-end">
                    <Button className="bookInfoPage__updateLogButton" onClick={onLogUpdate} colorScheme="blue">Update</Button>
                  </GridItem>
                </Grid>
              </Box>
            </Container>
            <Divider />
            <Container maxW="100%">
              <Box className="bookInfoPage__details">
                <Heading size="md">Details</Heading>
                <VStack>
                  <Text>Title: {book.title}</Text>
                </VStack>
              </Box>
            </Container>
            <Divider />
            <Container maxW="100%">
              <Box className="bookInfoPage__notes">
                <Heading size="md">Notes & Rating</Heading>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <Heading size="sm" my={4} mr={1}>
                      Rating:
                    </Heading>
                    <HStack>
                      {[1, 2, 3, 4, 5].map((index) => (
                        <Icon
                          key={index}
                          as={
                            hoveredIndex !== null && index <= hoveredIndex
                              ? FaStar
                              : FaRegStar
                          }
                          boxSize={6}
                          color={
                            hoveredIndex !== null && index <= hoveredIndex
                              ? "yellow.500"
                              : "gray.500"
                          }
                          cursor="pointer"
                          onMouseEnter={() => setHoveredIndex(null)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        />
                      ))}
                    </HStack>
                  </Box>
                </Box>
                {/* make component for notes list */}
                <NotesList bookNotes={book.notes}></NotesList>
              </Box>
            </Container>
          </VStack>
        </Box>
      </Box>
    </div>
  );
};

export default BookInfoPage;
