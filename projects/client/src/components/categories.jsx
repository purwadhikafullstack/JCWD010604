import {
  Box,
  Container,
  Flex,
  Image,
  Stack,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import samsungLogo from "../assets/samsung.png";
import appleLogo from "../assets/apple.png";
import xiaomiLogo from "../assets/xiaomi.png";
import vivoLogo from "../assets/vivo.png";
import oppoLogo from "../assets/oppo.png";

const Card = ({ imageSrc, bgColor = "#E4F9FC", size = "240px" }) => {
  return (
    <Box
      w={size}
      h={size}
      borderWidth="2px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      borderColor={"black"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgColor={bgColor}
    >
      <Image src={imageSrc} alt={imageSrc} maxW={"120px"} />
    </Box>
  );
};

export default function Categories() {
  return (
    <Box p={4}>
      <Container maxW={"5xl"} mt={12}>
        <Flex flexWrap="wrap" gridGap={10} justify="center">
          <Link>
            <Card imageSrc={samsungLogo} />
          </Link>
          <Link>
            <Card imageSrc={appleLogo} />
          </Link>
          <Link>
            <Card imageSrc={xiaomiLogo} />
          </Link>
          <Link>
            <Card imageSrc={vivoLogo} size="240px" />
          </Link>
          <Link>
            <Card imageSrc={oppoLogo} size="240px" />
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}
