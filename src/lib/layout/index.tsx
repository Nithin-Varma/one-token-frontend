import { Box, Flex,Text, Heading, useColorModeValue } from "@chakra-ui/react";
import type { ReactNode } from "react";

import Header from "./Header";
import Meta from "./Meta";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const topColor = '#9417E2'; // Starting color at the top
  const bottomColor = useColorModeValue('#FFFFFF', '#1A202C');
  return (
    <Box 
    minHeight="30vh" 
    margin={'6'}
    // textAlign={'start'}
    //  margin="0 auto" 
    //  transition="0.5s ease-out"
    //  position="fixed"
    //  top={0}
    //  left={0}
    //  right={0}
    //  bottom="30%"
    //  bgGradient={`linear(to bottom, ${topColor}, ${bottomColor})`}
     >
      <Meta />
      <Box  >
        <Header />
        <Box>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
{/* <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom="50%"
      bgGradient="linear(to bottom, #8B00FF, #FFFFFF)"
    /> */}