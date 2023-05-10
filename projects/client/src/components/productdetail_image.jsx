// import { useState } from "react";
// import { Flex, Box, Image, Button } from "@chakra-ui/react";
// import img1 from "..assets/iphone14.png";
// import img2 from "..assets/iphone14-2.png";
// import img3 from "..assets/iphone14-3.png";

// const images = [img1, img2, img3];

// function ProductDetailImage() {
//   const [currentImage, setCurrentImage] = useState(0);

//   const nextImage = () => {
//     const nextIndex = (currentImage + 1) % images.length;
//     setCurrentImage(nextIndex);
//   };

//   const prevImage = () => {
//     const prevIndex = (currentImage + images.length - 1) % images.length;
//     setCurrentImage(prevIndex);
//   };

//   return (
//     <Flex alignItems="center" justifyContent="center" height="400px">
//       <Box position="relative" width="600px" height="400px" overflow="hidden">
//         <Image
//           src={images[currentImage]}
//           position="absolute"
//           top={0}
//           left={0}
//           width="100%"
//           height="100%"
//         />
//         <Button
//           position="absolute"
//           top="50%"
//           left={0}
//           transform="translateY(-50%)"
//           onClick={prevImage}
//         >
//           Prev
//         </Button>
//         <Button
//           position="absolute"
//           top="50%"
//           right={0}
//           transform="translateY(-50%)"
//           onClick={nextImage}
//         >
//           Next
//         </Button>
//       </Box>
//     </Flex>
//   );
// }

// export default ProductDetailImage;
