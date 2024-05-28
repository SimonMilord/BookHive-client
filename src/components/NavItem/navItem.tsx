import { FlexProps, Flex, Icon, Link as ChakraLink } from "@chakra-ui/react";
import { useLocation, Link as ReactRouterLink, } from "react-router-dom";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
  icon: IconType;
  target: string;
  children: string;
}
const NavItem = ({ icon, children, target, ...rest }: NavItemProps): JSX.Element => {
  const currentPage = useLocation().pathname;
  const linkHref = currentPage === target ? undefined : target;

  return (
    <ChakraLink
      as={ReactRouterLink}
      to={linkHref}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </ChakraLink>
  );
};

export default NavItem;