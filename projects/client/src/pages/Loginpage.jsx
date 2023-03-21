import Login from "../components/Login"
import {
    Stack,
  } from '@chakra-ui/react';

export const LoginPage = () => {
    return(
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Login/>
    </Stack>
    )
}