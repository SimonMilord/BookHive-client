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
  Tag,
  Link,
} from "@chakra-ui/react";
import "./bookInfoPage.scss";
import { Link as ReactRouterLink } from "react-router-dom";
import PageHeader from "src/components/PageHeader/pageHeader";
import SidebarContent from "src/components/SideBarContent/sideBarContent";
import { Book } from "src/types/types";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useState } from "react";
import NotesList from "src/components/NotesList/notesList";
import UpdateLogModal from "src/components/UpdateLogModal/updateLogModal";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface BookInfoPageProps {
  book: Book;
}

const temporaryBook = {
  title: 'The Lord Of The Rings',
  author_name: 'J.R.R. Tolkien',
  first_publish_year: 1937,
  number_of_pages_median: 312,
  ratings_average: 4.5,
  ratings_count: 100,
  isbn: ['123456789'],
  id_amazon: ['B00J7WYXQO'],
  edition: 'Penguin', // to change to proper accessor
  subject: ['fantasy', 'adventure', 'dragons'],
};

// need to get the book id from the params and then fetch the specific book data
// from server?
// check how to pass data from bookListItem to another page in react router
const BookInfoPage = ({ book }: BookInfoPageProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // Possible values: To Read | Reading | Finished
  const [bookStatus, setBookStatus] = useState<string>("To Read");
  const [bookStatusBtnLabel, setBookStatusBtnLabel] = useState<string>("Start");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const onStatusBtnClick = () => {
    switch (bookStatus) {
      case "To Read":
        setBookStatus("Reading");
        setBookStatusBtnLabel("Finish");
        break;
      case "Reading":
        setBookStatus("Finished");
        setBookStatusBtnLabel("Read again");
        break;
      default:
        setBookStatus("To Read");
        setBookStatusBtnLabel("Start");
        break;
    }
  };

  const getBookReadingDuration = (book: Book) => {
    const today: Date = new Date();
    // where startDate is a string : '2024-01-01' book.startDate
    const startedDay: Date = new Date("2024-01-01");
    const timeDifference: number = today.getTime() - startedDay.getTime();
    const daysDifference: number = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    );
    return daysDifference > 0 ? daysDifference : 0;
  };

  const readingLogDuration = getBookReadingDuration(book);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogUpdate = (value: number) => {
    setCurrentPage(value);
    setIsModalOpen(false);
  }

  return (
    <div className="bookInfoPage">
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <PageHeader onOpen={onOpen} />
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
                      src={
                        `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
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
                      <Button
                        colorScheme="blue"
                        className="bookInfoPage__changeStatusButton"
                        onClick={onStatusBtnClick}
                      >
                        {bookStatusBtnLabel}
                      </Button>
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
                      {book.firstSentence}
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
                    <Heading size="sm">
                      {bookStatus === "Finished" ? "Finished" : "Started"}
                    </Heading>
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
                    <Text>
                      {((currentPage / book.pageCount) * 100).toFixed(2)}%
                    </Text>
                  </GridItem>
                  <GridItem display="flex" justifyContent="flex-end">
                    <Button
                      className="bookInfoPage__updateLogButton"
                      onClick={handleOpenModal}
                      colorScheme="blue"
                    >
                      Update
                    </Button>
                    <UpdateLogModal isOpen={isModalOpen} onClose={handleCloseModal} onLogUpdate={handleLogUpdate} currentPage={currentPage}/>
                  </GridItem>
                </Grid>
              </Box>
            </Container>
            <Divider />
            <Container maxW="100%">
              <Box className="bookInfoPage__details">
                <Heading size="md">Details</Heading>
                <VStack display='flex' alignItems='flex-start' my={3}>
                  <Text><strong>Title: </strong>{temporaryBook.title}</Text>
                  <Text><strong>Author: </strong>{temporaryBook.author_name}</Text>
                  <Text><strong>Year: </strong>{temporaryBook.first_publish_year}</Text>
                  <Text><strong>Pages: </strong>{temporaryBook.number_of_pages_median}</Text>
                  <Text><strong>Rating: </strong>{temporaryBook.ratings_average}/5 ({temporaryBook.ratings_count} ratings)</Text>
                  <Text><strong>Edition: </strong>{temporaryBook.edition}</Text>
                  <Text><strong>ISBN #: </strong>{temporaryBook.isbn}</Text>
                  <Text><strong>Find:</strong><Link href={`https://www.amazon.ca/dp/${temporaryBook.id_amazon}`} textDecoration='underline'>{`${temporaryBook.title} on Amazon`}<ExternalLinkIcon mx='2px'/></Link></Text>
                  <Text><strong>Subjects: </strong>
                    <HStack spacing={3} my={1}>
                      {temporaryBook.subject.map((subject, index) => (
                        <Tag key={index} size="md" variant='subtle' colorScheme="blue">{subject}</Tag>
                      ))}
                    </HStack>
                  </Text>
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
                      My rating:
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
