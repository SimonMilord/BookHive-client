import {
  BoxProps,
  useColorModeValue,
  Flex,
  CloseButton,
  Box,
  Text,
} from "@chakra-ui/react";
import NavItem from "../NavItem/navItem";
import { IconType } from "react-icons";
import { FiHome, FiTrendingUp, FiCompass, FiStar } from "react-icons/fi";
import Footer from "../Footer/footer";

interface LinkItemProps {
  name: string;
  target: string;
  icon: IconType;
}
// to change later: destinations for links
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", target: "#", icon: FiHome },
  { name: "Trending", target: "#", icon: FiTrendingUp },
  { name: "Explore", target: "#", icon: FiCompass },
  { name: "Favourites", target: "#", icon: FiStar },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps): JSX.Element => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          BookHive
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        h="calc(100% - 80px)"
      >
        <Box>
          {LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} target={link.target}>
              {link.name}
            </NavItem>
          ))}
        </Box>
        <Footer />
      </Flex>
    </Box>
  );
};

export default SidebarContent;
