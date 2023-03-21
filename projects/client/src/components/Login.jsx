import React from "react";
import { useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import Swal from "sweetalert2";
import {
  Button,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const url = process.env.REACT_APP_API_BASE_URL;

export default function Login() {
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();

  const dispatch = useDispatch();

  const inputEmail = useRef("");
  const inputPass = useRef("");

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const user = {
        email: inputEmail.current.value,
        password: inputPass.current.value,
      };

      const result = await axios.post(`${url}/user/login`, user);
      dispatch(
        login({
          id: result.data.id,
          email: result.data.email,
          name: result.data.name,
          isVerified: result.data.isVerified,
          role: result.data.role,
          picture: result.data.picture,
        })
      );

      if (
        result.data.isUserExist.role === 2 ||
        result.data.isUserExist.role === 3
      ) {
        window.location.replace("/admin");
      }

      localStorage.setItem("token", result.data.token);

      Swal.fire({
        icon: "success",
        title: "Login Success",
        text: `${result.data.message}`,

        customClass: {
          container: "my-swal",
        },
      });

      onCloseLogin();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed Attempt",
        text: err.response.data ? err.response.data : "Something Went Wrong !",

        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  return (
    <>
      <Button
        display={{ base: "solid", md: "inline-flex" }}
        fontSize={"sm"}
        fontWeight={600}
        colorScheme="teal"
        href={"#"}
        onClick={onOpenLogin}
        pt={{ base: "3", md: 0 }}
      >
        Sign In
      </Button>
      <Modal isOpen={isOpenLogin} onClose={onCloseLogin}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign In to your Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5}>
            <form onSubmit={onLogin}>
              <FormControl>
                <FormLabel mb={4}>Email</FormLabel>
                <Input id="email" type="email" ref={inputEmail} />
                <FormLabel mt={5}>Password</FormLabel>
                <Input id="password" type="password" ref={inputPass} />
              </FormControl>
              <ModalFooter>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  mr={5}
                  type="submit"
                >
                  Login
                </Button>
                <Button onClick={onCloseLogin}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
