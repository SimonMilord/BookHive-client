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
import { FiHome, FiCompass, FiList, FiAward, FiActivity } from "react-icons/fi";

interface LinkItemProps {
  name: string;
  target: string;
  icon: IconType;
  color: string;
}

// to change later: destinations for links for whatever sections we want
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", target: "/home", icon: FiHome, color: 'black' },
  { name: "Reading Stats", target: "#", icon: FiActivity, color: 'grayText' },
  { name: "Discover Books", target: "#", icon: FiCompass, color: 'grayText' },
  { name: "Custom Lists", target: "#", icon: FiList, color: 'grayText' },
  { name: "Achievements", target: "#", icon: FiAward, color: 'grayText'},
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
            <NavItem key={link.name} icon={link.icon} target={link.target} color={link.color}>
              {link.name}
            </NavItem>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default SidebarContent;
