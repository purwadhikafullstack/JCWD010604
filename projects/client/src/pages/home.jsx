import { Center, Flex, Box } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";

import CarouselBanner from "../components/carousel";
import Navbar5 from "../components/navbar2";
import FeatureBox from "../components/feature";
import Card from "../components/homeproduct";
import Footer from "../components/footer";
import Categories from "../components/Categories";
import { Link } from "react-router-dom";

export default function Home() {

  return (
    <>
      <Box bgColor={"#FAFAFA"} minW={821}>
        <Navbar />
        <Box>
          <Navbar5 />
        </Box>
        <Box>
          <Flex justify="center">
            <CarouselBanner />
          </Flex>
        </Box>
        <Center paddingLeft={"100px"} paddingRight={"100px"}>
          <FeatureBox />
        </Center>
        <Center fontSize={"40pt"} paddingTop={"40"}>
          TOP BRAND
        </Center>
        <Box paddingTop={"5"}>
          <Categories />
        </Box>
        <Center fontSize={"40pt"} paddingTop={"40"}>
          TOP PRODUCT
        </Center>
        <Flex
          dir="row"
          justifyContent="space-evenly"
          alignItems="center"
          paddingTop={"5"}
        >
          <Link to="/productdetail">
            <Card />
          </Link>
        </Flex>

        <Box paddingTop={"60pt"}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
