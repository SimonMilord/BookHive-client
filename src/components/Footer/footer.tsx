import { FaGithub, FaLinkedin } from 'react-icons/fa';
import {
  Text,
  Container,
  Stack,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";

const Footer = (): JSX.Element => {
  return (
    <Container as="footer" role="contentinfo" py={{ base: "12", md: "16" }}>
        <Stack justify="space-between" direction="row" align="center">
          <Text fontSize="sm" color="fg.subtle">
            &copy; {new Date().getFullYear()} SimonMilord
          </Text>
          <ButtonGroup variant="tertiary">
            <IconButton
              as="a"
              href="https://www.linkedin.com/in/simonmilord/"
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="https://github.com/SimonMilord"
              aria-label="GitHub"
              icon={<FaGithub fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </Stack>
    </Container>
  );
};

export default Footer;
