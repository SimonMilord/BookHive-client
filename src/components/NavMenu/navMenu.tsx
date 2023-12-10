import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";

const NavMenu = (): JSX.Element => {
  return (
    <HStack spacing={{ base: "0", md: "6" }}>
      <Flex alignItems={"center"}>
        <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: "none" }}
          >
            <HStack>
              <VStack
                display={{ base: "none", md: "flex" }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                {/* TO CHANGE LATER TO DYNAMIC USERNAME */}
                <Text fontSize="sm">Simon Milord</Text>
              </VStack>
              <Box display={{ base: "none", md: "flex" }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList
            bg={useColorModeValue("white", "gray.900")}
            borderColor={useColorModeValue("gray.200", "gray.700")}
          >
            <Link to="/profile">
              <MenuItem>Profile</MenuItem>
            </Link>
            <Link to="/settings">
              <MenuItem>Settings</MenuItem>
            </Link>
            <MenuDivider />
            <Link to="/login">
              <MenuItem>Sign out</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
};

export default NavMenu;
