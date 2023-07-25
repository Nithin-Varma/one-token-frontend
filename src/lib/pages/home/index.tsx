import { Divider, Grid, Text, Center, Box, HStack, Stack, VStack, Code, AbsoluteCenter, Button, useToast, TabList, Tab, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import InputAndButtons from "./components/InputAndButtons";
import Transactions from "./components/PolygonTransactions";
import { ETH_CHAIN_ID, ETH_TOKEN_ADDRESS, POLY_CHAIN_ID, POLY_TOKEN_ADDRESS } from "../../../consts";
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { DragHandleIcon } from "@chakra-ui/icons"
import GetFaucets from "./components/GetFaucet";

const AddToken = () => {
  const { connector, isConnected, } = useAccount()
  const { connect } = useConnect()
  const { chains, error, isLoading: isSwitchingLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()
  const { chain } = useNetwork()
  const toast = useToast()
  const addToken = () => {
    console.log(connector?.name)
    if (connector?.name === 'MetaMask') {
      connector.getChainId().then((chainId) => {
        if (chainId === POLY_CHAIN_ID) {
          window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: POLY_TOKEN_ADDRESS,
                symbol: 'LLL',
                decimals: 18,
              }
            }
          })
        }
        else if (chainId === ETH_CHAIN_ID) {
          window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: ETH_TOKEN_ADDRESS,
                symbol: 'LLL',
                decimals: 18,
              }
            }
          })
        }
      })
    }
    else {
      toast({
        title: "Error Not metamask wallet",
        status: "error",
      })
    }
  }
  return (
    <>
      <Text>
        Add this Token address in your wallet to see your balance
      </Text>
      <Code colorScheme='purple'>Polygon Mumbai Testnet = {POLY_TOKEN_ADDRESS}</Code>
      <Code colorScheme='linkedin'>Eth Sepolia Testnet = {ETH_TOKEN_ADDRESS}</Code>

      <Center px='4' fontSize={'2xl'}>
        Or
      </Center>

      <Text textAlign={"center"} w={"70%"}>
        If you are using Metamask, you can add the token by clicking on the button below
      </Text>
      <Button colorScheme="cyan" onClick={addToken}>
        Add Token
      </Button>
      <Text>
        {`You are Currently Connected with`} <Code colorScheme={chain?.id === ETH_CHAIN_ID ? "linkedin" : "purple"}>{chain?.name} </Code>Network

      </Text>
      <Button colorScheme='teal' onClick={() => {
        switchNetwork?.(
          chain?.id === ETH_CHAIN_ID ? POLY_CHAIN_ID : ETH_CHAIN_ID
        )
      }} loadingText="Switching..." isLoading={isSwitchingLoading} leftIcon={<DragHandleIcon />} variant='link'>
        Switch Network
      </Button>
    </>)
}
const Home = () => {
  const { connector, isConnected } = useAccount()
  const { connect } = useConnect()
  const toast = useToast()

  const onConnect = (chain_id: number) => {
    connect({
      chainId: chain_id,
      connector: new MetaMaskConnector()
    })

  }
  return (
    <VStack spacing={'24'}>
      <VStack spacing={'8'}>
        {
          isConnected ? <AddToken /> : <>
            <Button colorScheme="green" onClick={() => onConnect(POLY_CHAIN_ID)}>
              Connect Wallet To Polyon Mumbai Testnet

            </Button>
            <Text> OR </Text>
            <Button colorScheme="green" onClick={() => onConnect(ETH_CHAIN_ID)}>
              Connect Wallet To Sepolia Eth Testnet

            </Button>

          </>
        }
      </VStack>
      <Tabs isFitted variant='enclosed'>
        <TabList mb='1em'>
          <Tab>Send </Tab>
          <Tab>Faucet</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <InputAndButtons />
          </TabPanel>
          <TabPanel>
            <GetFaucets />
          </TabPanel>
        </TabPanels>
      </Tabs>


      {/* <Stack >
        <EthTransactions  />
         <Divider />
        <PolygonTransactions />
      </Stack> */}
      <Transactions />

    </VStack >
  );
};

export default Home;
