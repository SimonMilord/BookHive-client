import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Spacer,
  Progress,
} from "@chakra-ui/react";

const ReadingCard = (): JSX.Element => {
  return (
    <Grid
      h="250px"
      p={3}
      borderRadius={10}
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(4, 1fr)"
      gap={3}
      width={{ base: "100%", md: "100%" }}
      m={5}
      backgroundColor={"gray.200"}
      _hover={{ bg: "gray.300" }}
    >
      <GridItem rowSpan={2} colSpan={1}>
        <Box>
          <Image
            boxSize="150px"
            objectFit="contain"
            src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg"
            alt="Placeholder book cover"
          />
        </Box>
      </GridItem>
      <GridItem colSpan={2}>
        <Flex>
          <h1>Title: {"The lord of the rings"}</h1>
          <Spacer />
          <p>{"July 23"}</p>
        </Flex>
      </GridItem>
      <GridItem colSpan={2}>
        <h2>Author: {"J.R.R. Tolkien"}</h2>
        <h2>Year: {"1954"}</h2>
        <h2>Pages: {"1178"}</h2>
      </GridItem>
      <GridItem colSpan={4}>
        <Flex justifyContent="space-between">
          <h2>Progress:</h2>
          {"30%"}
        </Flex>
        {/* to fix later */}
        <Progress value={30} size="md" min={0} max={100} />
      </GridItem>
    </Grid>
  );
};

export default ReadingCard;
