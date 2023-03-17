import {
  Box,
  Flex,
  Spacer,
  Link,
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaShoppingCart } from "react-icons/fa";
import Phonehub_logo from "../assets/Phonehub_logo.png";
import React from "react";

export default function Navbar() {
  return (
    <Box bg="black" px={4} py={5} minH={"150"}>
      <Flex
        alignItems="center"
        justifyContent="space-evenly"
        placeItems={"baseline"}
        flexWrap="wrap"
      >
        <Flex
          flexWrap="wrap"
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          <Link color="white" fontWeight="bold" href="#" marginLeft={"50px"}>
            <Image
              src={Phonehub_logo}
              maxH={{ base: "100px", md: "180px" }}
              maxW={{ base: "250px", md: "300px" }}
              margin={{ base: "0 0 20px 0", md: "0 20px 0 0" }}
            />
          </Link>
          <Spacer />
        </Flex>
        <Flex
          justifyContent={{ base: "center", md: "flex-start" }}
          margin={{ base: "20px 0", md: "0" }}
          width={{ base: "100%", md: "auto" }}
        >
          <InputGroup
            minW={{ base: "auto", md: "750px" }}
            width={{ base: "100%", md: "auto" }}
            marginRight="8"
          >
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              type="text"
              textColor={"white"}
              placeholder="Cari produk"
              height={{ base: "50px", md: "60px" }}
              fontSize={{ base: "sm", md: "xl" }}
            />
            <Flex alignItems="center" justifyContent="flex-end">
              <Button
                display="flex"
                alignItems="center"
                variant={"outline"}
                height={{ base: "50px", md: "60px" }}
              >
                <FaShoppingCart size={20} color="white" />
              </Button>
            </Flex>
          </InputGroup>
        </Flex>
        <Flex justifyContent={{ base: "center", md: "flex-end" }}>
          <Button
            colorScheme="black"
            backgroundColor={"orange"}
            variant="outline"
            mr={{ base: "2", md: "8" }}
            fontSize={{ base: "sm", md: "xl" }}
            display={{ base: "none", md: "inline-flex" }}
            height={{ base: "50px", md: "60px" }}
          >
            Masuk
          </Button>
          <Button
            colorScheme="orange"
            textColor={"orange"}
            variant="outline"
            backgroundColor={"black"}
            fontSize={{ base: "sm", md: "xl" }}
            display={{ base: "none", md: "inline-flex" }}
            height={{ base: "50px", md: "60px" }}
          >
            Daftar
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
