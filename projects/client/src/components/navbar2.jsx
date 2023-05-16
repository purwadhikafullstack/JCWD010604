import React, { ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import FeatureBox from "../components/feature";
import Card from "../components/homeproduct";
import Footer from "../components/footer";
import { Categories } from "./Categories";
const Links = [
  { label: "Home", component: FeatureBox },
  { label: "Promo", component: Categories },
  { label: "Top Brands", component: Card },
  { label: "Top Products", component: Categories },
  { label: "About Us", component: Footer },
];

const NavLink = ({ children, onClick }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default function Navbar2() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeComponent, setActiveComponent] = React.useState(FeatureBox);

  const handleLinkClick = (component) => {
    setActiveComponent(component);
    onClose();
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              fontSize={"25"}
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map(({ label, component }) => (
                <NavLink key={label} onClick={() => handleLinkClick(component)}>
                  {label}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map(({ label, component }) => (
                <NavLink key={label} onClick={() => handleLinkClick(component)}>
                  {label}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box mt={8}>
        <activeComponent />
      </Box>
    </>
  );
}
