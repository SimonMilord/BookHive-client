import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  Text,
  Container,
  HStack,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";

const Footer = (): JSX.Element => {
  return (
    <Container as="footer" role="contentinfo" maxW="100%" px={10}>
      <HStack justify="space-between">
        <Text fontSize="sm" color="#FFFFFF">
          &copy; {new Date().getFullYear()} SimonMilord
        </Text>
        <ButtonGroup variant="tertiary">
          <IconButton
            as="a"
            href="https://www.linkedin.com/in/simonmilord/"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
            color="#FFFFFF"
          />
          <IconButton
            as="a"
            href="https://github.com/SimonMilord"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
            color="#FFFFFF"
          />
        </ButtonGroup>
      </HStack>
    </Container>
  );
};

export default Footer;
