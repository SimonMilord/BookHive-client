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

interface BookInfoPageProps {
  book: Book;
}

// need to get the book id from the params and then fetch the specific book data
// from server?
// check how to pass data from bookListItem to another page in react router
const BookInfoPage = ({ book }: BookInfoPageProps): JSX.Element => {
  const { onOpen, onClose } = useDisclosure();
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
                      <Button colorScheme="blue">Start</Button>
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
                    <Text>{book.status}</Text>
                  </GridItem>
                  <GridItem>
                    <Heading size="sm">Started</Heading>
                    <Text>{book.startDate ?? "Not started yet"}</Text>
                  </GridItem>
                  <GridItem>
                    <Heading size="sm">Read time</Heading>
                    <Text>0 days</Text>
                  </GridItem>
                  <GridItem>
                    <Heading size="sm">Current page</Heading>
                    <Text>8</Text>
                  </GridItem>
                  <GridItem>
                    <Heading size="sm">Progress</Heading>
                    <Text>0%</Text>
                  </GridItem>
                  <GridItem display="flex" justifyContent="flex-end">
                    <Button colorScheme="blue">Update</Button>
                  </GridItem>
                </Grid>
              </Box>
            </Container>
            <Divider />
            <Container maxW="100%">
              <Box className="bookInfoPage__details">
                <Heading size="md">Details Section</Heading>
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
                    <Heading size="sm" my={2.5} mr={1}>
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
                  <Button colorScheme="blue">Add Note</Button>
                </Box>
                {/* make component for notes list */}
                <Text>{book.notes[0].content}</Text>
              </Box>
            </Container>
          </VStack>
        </Box>
      </Box>
    </div>
  );
};

export default BookInfoPage;
