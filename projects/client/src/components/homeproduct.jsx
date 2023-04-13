import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import ProductDetail from "./productdetail";

const IMAGE =
  "https://www.mytrendyphone.co.uk/images/iPhone-11-Pro-Max-512GB-Midnight-Green-0190199385337-18092019-03-p.jpg";
export default function Card() {
  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        borderWidth={"2px"}
        borderColor="black"
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            height={"100%"}
            width={"100%"}
            objectFit={"cover"}
            src={IMAGE}
            boxShadow={"none"}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            Brand
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            iPhone 14 Pro Max
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
              Rp.28.999.999
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
