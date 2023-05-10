// caraousel
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

// chakra
import { Box, Grid, GridItem, Image, Center, Flex } from "@chakra-ui/react";

// picture
import banner1 from "../assets/1.png";
import banner11 from "../assets/2.png";
import banner12 from "../assets/3.png";
import banner13 from "../assets/5.png";
import banner14 from "../assets/4.png";

import { useNavigate } from "react-router-dom";

export default function CarouselBanner() {
  const navigate = useNavigate();
  const PicBanner = [banner11, banner12, banner13, banner14, banner1];

  return (
    <Center>
      <Box w={"1440px"} h="700">
        <Grid paddingY={"40px"} gap={{ base: "5px", md: "15px" }} h={"800px"}>
          <GridItem
          // bg="black"
          // h={{ base: "200px", md: "350px" }}
          >
            <Box
              as={Carousel}
              h={{ base: "200px", md: "350px" }}
              autoPlay={true}
              infiniteLoop={true}
              showThumbs={false}
              showArrows={false}
              showStatus={false}
              renderIndicator={(onClickHandler, isSelected, index, label) => {
                const defStyle = {
                  marginLeft: 10,
                  cursor: "fixed",
                  display: "inline-block",
                  background: "black",
                  height: "5px",
                  width: "30px",
                };
                const style = isSelected
                  ? {
                      ...defStyle,
                      background: "orange",
                      height: "8px",
                      width: "35px",
                    }
                  : { ...defStyle };
                return (
                  <Box
                    style={style}
                    onClick={onClickHandler}
                    onKeyDown={onClickHandler}
                    display={"inline"}
                    key={index}
                    role="button"
                    aria-label={`Selected: ${label} ${index + 1}`}
                    title={`Selected: ${label} ${index + 1}`}
                  />
                );
              }}
            >
              {PicBanner.map((pic, index) => {
                return (
                  <Center key={index}>
                    <Image h={"600"} src={pic} alt="" />
                  </Center>
                );
              })}
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Center>
  );
}
