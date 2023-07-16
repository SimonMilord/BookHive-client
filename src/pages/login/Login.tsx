import { Center, Heading, VStack } from "@chakra-ui/react";
import "./Login.scss";
import GoogleButton from "../../components/AuthGoogleBtn/authGoogleBtn";
import Footer from "../../components/Footer/footer";

export default function LoginPage() {
  return (
    <div className="login">
      <Center>
        <VStack>
          <Heading>LOGIN PAGE</Heading>
          <GoogleButton />
        </VStack>
      </Center>
      <Footer />
    </div>
  );
}
