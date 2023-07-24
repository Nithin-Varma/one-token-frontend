
import { VStack, Stack, Heading, Box, HStack, Text, Spinner, Link, Center } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { ETH_CHAIN_ID, ETH_TOKEN_ADDRESS, POLY_CHAIN_ID, POLY_TOKEN_ADDRESS } from "../../../../consts"
import { useEffect, useState } from "react"
import { useContractEvent, usePublicClient } from "wagmi"
import tokenAbi from "../../../../tokenAbi.json"
import { useTransactionsHistory } from "../../../hooks/useTransactionsHistory"

const Transactions = () => {
  const [polygonSenderAddress, setPolygonSenderAddress] = useState("0xCE0BaBc8398144Aa98D9210d595E3A9714910748")
  const [polygonReceiverAddress, setPolygonReceiverAddress] = useState("0xCE0BaBc8398144Aa98D9210d595E3A9714910748")
  const [ethSenderAddress, setEthSenderAddress] = useState("0xCE0BaBc8398144Aa98D9210d595E3A9714910748")
  const [ethReceiverAddress, setEthReceiverAddress] = useState("0xCE0BaBc8398144Aa98D9210d595E3A9714910748")

  const [value, setValue] = useState(0.000001)
  const { ethTransactions, polygonTransactions, loading, refresh } = useTransactionsHistory()


  if (loading) {
    return <Spinner size={"xl"} />
  }





  return (
    <Stack paddingX={{
      base: "20",
      lg: "auto",
      xl: "auto",
      md: "auto"
    }}
      overflowX={"auto"} spacing={["8", "4", "24"]} direction={{ base: "column", xl: "row", lg: "column", md: "column" }}>

      <Box minW={{ xl: "50%", base: "100%" }}>
        <Heading textAlign="center">Eth Transactions</Heading>  <Link color='teal.500' href={`https://sepolia.etherscan.io/address/${ETH_TOKEN_ADDRESS}`} isExternal>
          <Center>View On EtherScan <ExternalLinkIcon mx='2px' /></Center>
        </Link>
        <VStack spacing={"8"} alignItems={"center"} >

          {ethTransactions.length > 0 ? ethTransactions.map((transaction) => (
            <Box key={transaction.hash} width={"100%"}>
              <HStack alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                <HStack>
                  <Box padding={2} bgColor={'gray.700'} isTruncated border={'1px solid gray'} borderRadius={'20px'} maxWidth={"100px"} overflow="auto" textOverflow="ellipsis">
                    <Text noOfLines={1} fontSize={"smaller"} >{transaction.from}</Text>
                  </Box>
                </HStack>
                <HStack>
                  <Text>To:</Text>
                  <Box padding={2} bgColor={'gray.700'} isTruncated border={'1px solid gray'} borderRadius={'20px'} maxWidth={"100px"} overflow="hidden" textOverflow="ellipsis">
                    <Text noOfLines={1}>{transaction.to}</Text>
                  </Box>
                </HStack>
                <HStack>
                  <Text>Value:</Text>
                  <Text noOfLines={1} color={"white"} fontWeight={"bold"}>{transaction.amount}</Text>
                </HStack>
                <HStack>
                  <Text>Time:</Text>
                  <Box padding={2} bgColor={'gray.700'} isTruncated border={'1px solid gray'} borderRadius={'20px'} maxW={{ base: "120px", lg: "300px", xl: "220px", md: "250px" }} overflow="hidden" textOverflow="ellipsis">
                    <Text noOfLines={1} fontSize={"xx-small"}>{transaction.timeAgo}</Text>
                  </Box>
                  <Link href={`https://sepolia.etherscan.io/tx/${transaction.hash}`} color={"teal.500"} isExternal fontSize={"xx-small"}>
                    Explorer <ExternalLinkIcon mx='2px' />
                  </Link>
                </HStack>
              </HStack>
            </Box>)) : <h1>{ethTransactions.toString()}</h1>}
        </VStack>
      </Box>

      <Box>
        <Heading>Polygon Transactions</Heading>
        <Link color='teal.500' href={`https://mumbai.polygonscan.com/address/${POLY_TOKEN_ADDRESS}`} isExternal>
          <Center>View On PolygonScan <ExternalLinkIcon mx='2px' /></Center>
        </Link>
        <VStack spacing={"8"} align="center">
          {polygonTransactions.map((transaction) => (
            <Box key={transaction.hash} width={"100%"}>
              <HStack alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                <HStack>
                  <Box padding={2} bgColor={'gray.700'} isTruncated border={'1px solid gray'} borderRadius={'20px'} maxWidth={"100px"} overflow="auto" textOverflow="ellipsis">
                    <Text noOfLines={1} fontSize={"smaller"} >{transaction.from}</Text>
                  </Box>
                </HStack>
                <HStack>
                  <Text>To:</Text>
                  <Box padding={2} bgColor={'gray.700'} isTruncated border={'1px solid gray'} borderRadius={'20px'} maxWidth={"100px"} overflow="hidden" textOverflow="ellipsis">
                    <Text noOfLines={1}>{transaction.to}</Text>
                  </Box>
                </HStack>
                <HStack>
                  <Text>Value:</Text>
                  <Text noOfLines={1} color={"white"} fontWeight={"bold"}>{transaction.amount}</Text>
                </HStack>
                <HStack>
                  <Text>Time:</Text>
                  <Box padding={2} bgColor={'gray.700'} isTruncated border={'1px solid gray'} borderRadius={'20px'} maxW={{ base: "120px", lg: "300px", xl: "220px", md: "250px" }} overflow="hidden" textOverflow="ellipsis">
                    <Text noOfLines={1} fontSize={"xx-small"}>{transaction.timeAgo}</Text>
                  </Box>
                  <Link href={`https://mumbai.polygonscan.com/tx/${transaction.hash}`} color={"teal.500"} isExternal fontSize={"xx-small"}>
                    Explorer <ExternalLinkIcon mx='2px' />
                  </Link>
                </HStack>
              </HStack>
            </Box>))
          }
        </VStack>
      </Box>
    </Stack>
  )
}

export default Transactions;
