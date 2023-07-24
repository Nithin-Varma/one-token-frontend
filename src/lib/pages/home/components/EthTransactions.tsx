import { VStack, Heading, Box, HStack, Text } from "@chakra-ui/react"
import { ETH_CHAIN_ID, ETH_TOKEN_ADDRESS } from "consts"
import { useEffect, useState } from "react"
import { usePublicClient } from "wagmi"

const EthTransactions = () => {
    const [ethSenderAddress, setEthSenderAddress] = useState("sbvouqhouhqffvbkveuebvisnvoewh")
    const [ethReceiverAddress, setEthReceiverArddress] = useState("njsnvoq;;ff;n;qgqkjnvobegb")
    const ethClient = usePublicClient({ chainId: ETH_CHAIN_ID });

    const [logs, setLogs] = useState([])



    const [value, setValue] = useState(0.00001)
    return (
        <Box display={'flex'} alignContent={'flex-start'} justifyContent={'start'}>
            <VStack>
                <Text fontWeight={'bold'} fontSize={'3xl'}>Eth-Transactions</Text>
                <Box>
                    <HStack>
                        <HStack>
                            <Text>From:</Text>
                            <Box maxW={'150px'}>
                                <Text>{ethSenderAddress}</Text>
                            </Box>
                        </HStack>
                        <HStack>
                            <Text>To: </Text>
                            <Box maxW={'150px'}>
                                <Text>{ethReceiverAddress}</Text>
                            </Box>
                        </HStack>
                        <HStack>
                            <Text>Value: </Text>
                            <Box maxW={'150px'}>
                                <Text>{value}</Text>
                            </Box>
                        </HStack>
                    </HStack>
                </Box>
            </VStack>
        </Box>
    )
}

export default EthTransactions;