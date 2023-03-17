import { Box, SimpleGrid, Icon, Text, Stack, Flex } from "@chakra-ui/react";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";

const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

export default function FeatureBox() {
  return (
    <Box p={4} >
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature 
          icon={<Icon as={FcAssistant} w={10} h={10} alignContent={"center"}/>}
          title={"24/7 Support"}
          text={
            "Kita siap membantu 24/7 dengan customer service kita"
          }
        />
        <Feature
          icon={<Icon as={FcDonate} w={10} h={10} />}
          title={"Ongkir Murah"}
          text={
            "Ongkir termurah dengan sistem mullti-warehouse"
          }
        />
        <Feature
          icon={<Icon as={FcInTransit} w={10} h={10} />}
          title={"Instant Delivery"}
          text={
            "Pengiriman langsung dari warehouse terdekat dari Anda"
          }
        />
      </SimpleGrid>
    </Box>
  );
}
