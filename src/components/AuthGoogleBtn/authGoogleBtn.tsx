import { FcGoogle } from "react-icons/fc";
import { Button, Center, Text } from "@chakra-ui/react";

const GoogleButton = (): JSX.Element => {
  const onClick = () => {
    // to do later when implementing google auth
    console.log("logging in with google");
  };

  return (
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
  );
};

export default GoogleButton;
