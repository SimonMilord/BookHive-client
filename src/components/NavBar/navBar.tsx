import {
  Container,
  HStack,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

const Navbar = (): JSX.Element => {
  return (
    <Container as="header" role="navigation">
      <HStack justify="space-between">
        {/* this is a placeholder for a logo maybe */}
        <Heading color='#FFF'>BookHive</Heading>
        <Input placeholder="this is a placeholder for searchbar component"></Input>
        <Menu>
          <MenuButton color='#FFF'>Simon</MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuDivider />
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Container>
  );
};

export default Navbar;
