import { Container, HStack, Heading } from "@chakra-ui/react";
import NavMenu from "../NavMenu/navMenu";
import SearchBar from "../SearchBar/searchBar";
import { Link } from "react-router-dom";

const Navbar = (): JSX.Element => {
  return (
    <Container as="header" role="navigation" maxW="100%" px={10}>
      <HStack justify="space-between">
        {/* this is a placeholder for a logo maybe */}
        <Link to="/">
          <Heading color="#FFF">BookHive</Heading>
        </Link>
        <SearchBar />
        <NavMenu />
      </HStack>
    </Container>
  );
};

export default Navbar;
