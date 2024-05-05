import { FcGoogle } from "react-icons/fc";
import { Button, Center, Text } from "@chakra-ui/react";
import { login } from "../../utils/authRequests";

const GoogleButton = (): JSX.Element => {
  const onClick = async () => {
    await login();
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
