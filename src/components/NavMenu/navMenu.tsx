import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Avatar
} from "@chakra-ui/react";
import { logout } from "../../utils/authRequests";
import AuthProfileContext from "src/context/AuthProfileContext";
import { useContext } from "react";

const NavMenu = (): JSX.Element => {
  const { authProfile } = useContext(AuthProfileContext);
  const avatarSrc = authProfile?.avatar || "";

  const handleLogout = async () => {
    await logout();
  };

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
              <Avatar name={authProfile.userName} src={avatarSrc}/>
              </VStack>
            </HStack>
          </MenuButton>
          <MenuList
            bg={useColorModeValue("white", "gray.900")}
            borderColor={useColorModeValue("gray.200", "gray.700")}
          >
            <MenuItem onClick={handleLogout}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
};

export default NavMenu;
