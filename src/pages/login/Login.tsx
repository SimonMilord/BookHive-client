import {
  AbsoluteCenter,
  Box,
  Center,
  Heading,
  Text,
  Button,
  Container,
  Flex,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import "./Login.scss";
import { FcGoogle } from "react-icons/fc";
import { Spinner } from "@chakra-ui/react";
import { login } from "../../utils/authRequests";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function LoginPage({ isLoading }: { isLoading?: boolean }) {
  const onClick = async () => {
    await login();
  };

  return (
    <div className="login">
      <AbsoluteCenter className="login__card">
        <Heading mb={5}>BookHive</Heading>
        <Center>
          {isLoading ? (
            <Spinner size="lg" />
          ) : (
            <Center p={8}>
              <Button
                w={"full"}
                maxW={"md"}
                variant={"outline"}
                onClick={onClick}
                leftIcon={<FcGoogle />}
              >
                <Center>
                  <Text>Sign in with Google</Text>
                </Center>
              </Button>
            </Center>
          )}
        </Center>
      </AbsoluteCenter>
      <Box className="footer">
        <Container as="footer" role="contentinfo" maxW="100%" p={1}>
          <Flex alignItems="center" justifyContent="space-between">
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
      </Box>
    </div>
  );
}
