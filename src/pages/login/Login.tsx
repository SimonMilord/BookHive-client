import { AbsoluteCenter, Box, Heading } from "@chakra-ui/react";
import "./Login.scss";
import GoogleButton from "../../components/AuthGoogleBtn/authGoogleBtn";
import Footer from "../../components/Footer/footer";

export default function LoginPage() {
  // add props for when not authorized to view page and then show a toast or something
  return (
    <div className="login">
      <AbsoluteCenter className='login__card'>
        <Heading>
          BookHive
        </Heading>
        <GoogleButton />
      </AbsoluteCenter>
      <Box className='footer'>
        <Footer />
      </Box>
    </div>
  );
}
