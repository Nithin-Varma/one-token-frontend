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
     margin="0 auto" 
     transition="0.5s ease-out"
     position="fixed"
     top={0}
     left={0}
     right={0}
     bottom="30%"
     bgGradient={`linear(to bottom, ${topColor}, ${bottomColor})`}
     >
      <Meta />
      <Flex wrap={'wrap'} margin="4" align={'center'} minHeight="60vh" justifyContent={'center'}>
        <Header />
        <Heading textAlign={'center'}>
          One - Token
        </Heading>
        <Box width="full" as="main" marginY={22}>
          {children}
        </Box>
      </Flex>
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