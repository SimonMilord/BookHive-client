import { AbsoluteCenter, Box, Center, Heading } from "@chakra-ui/react";
import "./Login.scss";
import GoogleButton from "../../components/AuthGoogleBtn/authGoogleBtn";
import Footer from "../../components/Footer/footer";
import { Spinner } from '@chakra-ui/react';

export default function LoginPage({ isLoading }: { isLoading?: boolean }) {
  return (
    <div className="login">
      <AbsoluteCenter className='login__card'>
        <Heading mb={5}>
          BookHive
        </Heading>
        <Center>
          {isLoading ? <Spinner size="lg"/> : <GoogleButton />}
        </Center>
      </AbsoluteCenter>
      <Box className='footer'>
        <Footer />
      </Box>
    </div>
  );
}
