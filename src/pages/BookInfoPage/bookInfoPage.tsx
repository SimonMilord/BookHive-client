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
  useToast,
} from "@chakra-ui/react";
import "./bookInfoPage.scss";
import { Link as ReactRouterLink, useNavigate, useParams } from "react-router-dom";
import PageHeader from "src/components/PageHeader/pageHeader";
import SidebarContent from "src/components/SideBarContent/sideBarContent";
import { Book } from "src/types/types";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import NotesList from "src/components/NotesList/notesList";
import UpdateLogModal from "src/components/UpdateLogModal/updateLogModal";
import { ExternalLinkIcon, DeleteIcon } from "@chakra-ui/icons";
import { IoArrowBack } from "react-icons/io5";

const BookInfoPage = (): JSX.Element => {
  const { onOpen, onClose } = useDisclosure();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // Possible values: To Read | Reading | Finished
  const [bookStatus, setBookStatus] = useState<string>("To Read");
  const [bookStatusBtnLabel, setBookStatusBtnLabel] = useState<string>("Start");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bookData, setBookData] = useState<Book>();
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();

  useEffect(() => {
    fetchBookData();
  }, []);

  const onStatusBtnClick = async () => {
    getStatusBtnLabel(bookData?.status || 'Start');
    try {
      const response = await fetch(`http://localhost:8000/books/${bookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPage: bookData?.currentPage,
          status: bookStatus,
          startedDate: bookData?.startDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to update status of the book");
      };
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusBtnLabel = (bookStatus: string) => {
    switch (bookStatus) {
      case "To Read":
        setBookStatus("Started");
        setBookStatusBtnLabel("Finish");
        break;
      case "Started":
        setBookStatus("Finished");
        setBookStatusBtnLabel("Read again");
        break;
      default:
        setBookStatus("To Read");
        setBookStatusBtnLabel("Start");
        break;
    }
  };

  // Fetch the book data from the server given the id
  const fetchBookData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/books/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Unable to fetch book with id: " + id + " data from the server.");
      }
      const bookDataResponse = await response.json();
      await setBookData(bookDataResponse);
    } catch (error) {
      console.error("Error fetching book data: " + error);
    }

  };

  // Given a book id, delete it from the database
  const handleDeleteBook = async (title: string) => {
    try {
      const response = await fetch(`http://localhost:8000/books/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) {
        throw new Error("Unable to delete book from the library.");
      }

      toast({
        title: `${title} successfully removed from your library.`,
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error deleting book: " + error);
    }
  };

  const getBookReadingDuration = (book?: Book) => {
    const today: Date = new Date();
    const startedDay: Date = new Date(book?.startDate ?? today.toISOString());
    const timeDifference: number = today.getTime() - startedDay.getTime();
    const daysDifference: number = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    );
    return daysDifference > 0 ? daysDifference : 0;
  };

  const getBookDate = (book?: Book) => {
    const startDate = book?.startDate ? new Date(book?.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Not started yet';
    const finishedDate = book?.finishedDate ? new Date(book?.finishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : null;
    const bookStatus = book?.status ?? 'To Read';

    if (bookStatus === "Finished" && finishedDate) {
      return finishedDate;
    } else if (bookStatus === "Started" && startDate) {
      return startDate;
    } else {
      return 'Not started yet';
    }
  };

  const readingLogDuration = getBookReadingDuration(bookData);
  const readingLogDate = getBookDate(bookData);
  const currentPage = bookData?.currentPage ?? 0;
  const bookReadingStatus = bookData?.status ?? 'To Read';
  const pageCount = bookData?.pageCount ?? 0;
  const genre = bookData?.genre?.split(', ');
  const bookId = id ?? '';

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = async () => {
    await fetchBookData();
    setIsModalOpen(false);
  };

  const handleLogUpdate = (value: number) => {
    // Call the server to update the current page
    setIsModalOpen(false);
    fetchBookData();
  };

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
              <Box
                className="bookInfoPage__buttonSection"
                display="flex"
                justifyContent="space-between"
                mb={3}
              >
                <ChakraLink
                  className="bookInfoPage__backButton"
                  as={ReactRouterLink}
                  to="/"
                  colorScheme="blue"
                >
                  <IoArrowBack />
                </ChakraLink>
                <Box>
                  <ButtonGroup gap="2">
                    <Button
                      colorScheme="blue"
                      className="bookInfoPage__changeStatusButton"
                      onClick={onStatusBtnClick}
                    >
                      {bookStatusBtnLabel}
                    </Button>
                    <Button
                      colorScheme="blue"
                      className="bookInfoPage__deleteBookButton"
                      onClick={() => handleDeleteBook(bookData?.title || '')}
                    >
                      <DeleteIcon />
                    </Button>
                  </ButtonGroup>
                </Box>
              </Box>

              <Box className="bookInfoPage__topSection">
                <Grid
                  templateRows="repeat(2, 1fr)"
                  templateColumns="repeat(5, 1fr)"
                  gap={3}
                >
                  <GridItem rowSpan={2} colSpan={1}>
                    <Image
                      src={`https://covers.openlibrary.org/b/id/${bookData?.coverId}-M.jpg`}
                      fit="contain"
                      minH={200}
                      maxH={250}
                      maxW="fit-content"
                      borderRadius="8px"
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text><strong>Title:</strong> {bookData?.title}</Text>
                    <Text><strong>Author:</strong> {bookData?.author}</Text>
                    <Text><strong>Pages:</strong> {bookData?.pageCount}</Text>
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Text noOfLines={4} as="cite">
                      {bookData?.firstSentence}
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
                    <Text>{bookReadingStatus}</Text>
                  </GridItem>
                  <GridItem>
                    <Heading size="sm">
                      {bookReadingStatus === "Finished" ? "Finished" : "Started"}
                    </Heading>
                    <Text>{readingLogDate}</Text>
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
                      {((currentPage / (bookData?.pageCount ?? 0)) * 100).toFixed(2)}%
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
                    <UpdateLogModal
                      isOpen={isModalOpen}
                      onClose={handleCloseModal}
                      onLogUpdate={handleLogUpdate}
                      currentPage={currentPage}
                      status={bookReadingStatus}
                      startedDate={readingLogDate}
                      bookId={bookId}
                      pageCount={pageCount}
                    />
                  </GridItem>
                </Grid>
              </Box>
            </Container>
            <Divider />
            <Container maxW="100%">
              <Box className="bookInfoPage__details">
                <Heading size="md">Details</Heading>
                <VStack display="flex" alignItems="flex-start" my={3}>
                  <Text>
                    <strong>Title: </strong>
                    {bookData?.title}
                  </Text>
                  <Text>
                    <strong>Author: </strong>
                    {bookData?.author}
                  </Text>
                  <Text>
                    <strong>Year: </strong>
                    {bookData?.yearPublished}
                  </Text>
                  <Text>
                    <strong>Pages: </strong>
                    {bookData?.pageCount}
                  </Text>
                  <Text>
                    <strong>Rating: </strong>
                    {bookData?.rating ?? "?"}/5 (
                    {bookData?.ratingsCount} ratings)
                  </Text>
                  <Text>
                    <strong>Publisher: </strong>
                    {bookData?.publisher}
                  </Text>
                  <Text>
                    <strong>ISBN #: </strong>
                    {bookData?.isbn}
                  </Text>
                  <Text>
                    <strong>Find:</strong>
                    <Link
                      href={`https://www.amazon.ca/dp/${bookData?.id}`}
                      textDecoration="underline"
                    >
                      {`${bookData?.title} on Amazon`}
                      <ExternalLinkIcon mx="2px" />
                    </Link>
                  </Text>
                  <Text>
                    <strong>Subjects: </strong>
                    <HStack spacing={3} my={1}>
                      {genre?.map((subject, index) => (
                        <Tag
                          key={index}
                          size="md"
                          variant="subtle"
                          colorScheme="blue"
                        >
                          {subject}
                        </Tag>
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
                <NotesList bookId={bookData?.id ?? ''}></NotesList>
              </Box>
            </Container>
          </VStack>
        </Box>
      </Box>
    </div>
  );
};

export default BookInfoPage;
