import { Heading } from "@chakra-ui/react";
import "./Login.scss";
import Footer from '../../components/Footer/footer';
import Navbar from "../../components/NavBar/navBar";

export default function LoginPage() {
  return (
    <div className='login'>
      <Navbar />
      <Heading>LOGIN PAGE</Heading>
      <Footer />
    </div>
  );
}
