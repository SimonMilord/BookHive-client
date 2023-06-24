import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
} from "@chakra-ui/react";

const NavMenu = (): JSX.Element => {
  return (
    <Menu>
      <MenuButton color="#FFF">Simon</MenuButton>
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuDivider />
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavMenu;
