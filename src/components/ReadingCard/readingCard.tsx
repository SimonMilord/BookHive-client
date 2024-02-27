import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Progress,
  Link as ChakraLink,
  Heading,
} from "@chakra-ui/react";
import "./readingCard.scss";
import { Book } from "src/types/types";
import { Link as ReactRouterLink } from "react-router-dom";

export interface ReadingCardProps {
  book: Book;
}

const ReadingCard: React.FC<ReadingCardProps> = ({ book }): JSX.Element => {
  const currentProgress = parseFloat(((book.currentPage / book.pageCount) * 100).toFixed(2));
  const coverImage = `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`;
  const date = new Date(book.startDate);
  const startedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  return (
    // Should change the value 1 after bug fix for the key in the DB change!
    <ChakraLink
      as={ReactRouterLink}
      to={`bookinfo/${book.id}`}
      className="readingCard__link"
    >
      <Box
        className="readingCard__card"
        h="250px"
        p={3}
        borderRadius={10}
        width={{ base: "100%", md: "100%" }}
        my={3}
        backgroundColor={"gray.200"}
        _hover={{ bg: "gray.300" }}
        display="flex"
        flexDirection="column"
        justifyContent={"space-between"}
      >
        <Box className="readingCard__topSection" display="flex">
          <Box className="readingCard__cover">
            <Image
              boxSize="150px"
              objectFit="contain"
              src={coverImage}
              alt="Placeholder book cover"
            />
          </Box>
          <Grid templateColumns="repeat(2, 1fr)" width="100%">
            <GridItem className="readingCard__info">
              <Heading size="md">{"The lord of the rings"}</Heading>
              <h2>Author: {book.author}</h2>
              <h2>Year: {book.yearPublished}</h2>
              <h2>Pages: {book.pageCount}</h2>
            </GridItem>
            <GridItem
              className="readingCard__date"
              display="flex"
              justifyContent="flex-end"
            >
              <p>{startedDate}</p>
            </GridItem>
          </Grid>
        </Box>
        <Box className="readingCard__bottomSection">
          <Flex justifyContent="space-between">
            <h2>Progress:</h2>
            {`${currentProgress}%`}
          </Flex>
          <Progress value={currentProgress} size="md" min={0} max={100} />
        </Box>
      </Box>
    </ChakraLink>
  );
};

export default ReadingCard;
