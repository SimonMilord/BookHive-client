import {
  FlexProps,
  Flex,
  useColorModeValue,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import NavMenu from "../NavMenu/navMenu";
import SearchBox from "../SearchBox/searchBox";

interface PageHeaderProps extends FlexProps {
  onOpen: () => void;
}
const PageHeader = ({ onOpen, ...rest }: PageHeaderProps): JSX.Element => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "space-between" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontWeight="bold"
      >
        BookHive
      </Text>
      <SearchBox />
      <NavMenu />
    </Flex>
  );
};

export default PageHeader;
