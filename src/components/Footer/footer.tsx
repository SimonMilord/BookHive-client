import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  Text,
  Container,
  ButtonGroup,
  IconButton,
  Flex,
} from "@chakra-ui/react";

const Footer = (): JSX.Element => {
  return (
    <Container as="footer" role="contentinfo" maxW="100%" p={1}>
      <Flex alignItems='center' justifyContent='space-between'>
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} SimonMilord
        </Text>
        <ButtonGroup variant="tertiary">
          <IconButton
            as="a"
            href="https://www.linkedin.com/in/simonmilord/"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1rem" />}
            m={0}
            target="_blank"
          />
          <IconButton
            as="a"
            href="https://github.com/SimonMilord"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1rem" />}
            m={0}
            target="_blank"
          />
        </ButtonGroup>
      </Flex>
    </Container>
  );
};

export default Footer;
