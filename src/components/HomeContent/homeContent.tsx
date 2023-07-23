import { Badge, Box, Heading, VStack } from "@chakra-ui/react";
import ReadingCard from "../ReadingCard/readingCard";

const HomeContent = (): JSX.Element => {
  return (
    <Box>
      <Heading>
        Reading
        <Badge variant="solid" fontSize="1rem" ml={2}>
          2
        </Badge>
      </Heading>
      <VStack>
        <ReadingCard />
      </VStack>
      <Heading>
        To Read
        <Badge variant="solid" fontSize="1rem" ml={2}>
          4
        </Badge>
      </Heading>
      <Heading>
        Finished
        <Badge variant="solid" fontSize="1rem" ml={2}>
          0
        </Badge>
      </Heading>
    </Box>
  );
};

export default HomeContent;
