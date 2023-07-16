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
              {/* NOT SURE IF I WANT TO ADD AVATAR YET (DEPENDS ON OAUTH) */}
              {/* <Avatar
                size={"sm"}
                src={}
              /> */}
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
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuDivider />
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
};

export default NavMenu;
