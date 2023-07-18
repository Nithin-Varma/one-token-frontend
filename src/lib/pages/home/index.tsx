import { Divider, Grid, HStack, Stack, VStack } from "@chakra-ui/react";
import InputAndButtons from "./components/InputAndButtons";
import Transactions from "./components/PolygonTransactions";


const Home = () => {
  return (
    <VStack spacing={'24'}>
      <InputAndButtons />
      {/* <Stack >
        <EthTransactions  />
         <Divider />
        <PolygonTransactions />
      </Stack> */}
      <Transactions />

    </VStack>
  );
};

export default Home;
