
import { VStack, Stack, Heading, Box, HStack, Text } from "@chakra-ui/react"
import { useState } from "react"

const Transactions = () => {
    const [polygonSenderAddress, setPolygonSenderAddress] = useState("0xCE0BaBc8398144Aa98D9210d595E3A9714910748")
    const [polygonReceiverAddress, setPolygonReceiverAddress] = useState("0xCE0BaBc8398144Aa98D9210d595E3A9714910748")
    const [ethSenderAddress, setEthSenderAddress] = useState("0xCE0BaBc8398144Aa98D9210d595E3A9714910748")
    const [ethReceiverAddress, setEthReceiverAddress] = useState("0xCE0BaBc8398144Aa98D9210d595E3A9714910748")

    const [value, setValue] = useState(0.000001)

    return (
        <Stack paddingX={["0", "24"]} spacing={["8", "4", "24"]} direction={{base:"column", xl:"row", lg:"column", md:"column"}}>
            <Box >
                <VStack spacing={"8"} align="center">
                  <Heading textAlign="center">Eth Transactions</Heading>
                   <Box>
                     <HStack>
                      <HStack>
                        <Text>From:</Text>
                        <Box padding={2} bgColor={'gray.700'}   isTruncated border={'1px solid gray'} borderRadius={'20px'} maxW={{base:"120px", lg:"300px", xl:"220px", md:"250px"}} overflow="hidden" textOverflow="ellipsis">
                            <Text noOfLines={1}>{ethSenderAddress}</Text>
                        </Box>
                      </HStack>
                      <HStack>
                        <Text>To:</Text>
                        <Box padding={2} bgColor={'gray.700'}   isTruncated border={'1px solid gray'} borderRadius={'20px'} maxW={{base:"120px", lg:"300px", xl:"220px", md:"250px"}} overflow="hidden" textOverflow="ellipsis">
                            <Text noOfLines={1}>{ethReceiverAddress}</Text>
                        </Box>
                      </HStack>
                      <HStack>
                        <Text>Value:</Text>
                        <Box padding={2} bgColor={'gray.700'}   isTruncated border={'1px solid gray'} borderRadius={'20px'} maxW={{base:"120px", lg:"300px", xl:"220px", md:"250px"}} overflow="hidden" textOverflow="ellipsis">
                            <Text noOfLines={1}>{value}</Text>
                        </Box>
                      </HStack>
                     </HStack>
                 </Box>
                </VStack>
            </Box>

            <Box>
                <VStack spacing={"8"} align="center">
                    <Heading>Polygon Transactions</Heading>
                     <Box>
                     <HStack>
                         <HStack>
                          <Text>From:</Text>
                          <Box padding={2} bgColor={'gray.700'}   isTruncated border={'1px solid gray'} borderRadius={'20px'} maxW={{base:"120px", lg:"300px", xl:"220px", md:"250px"}} overflow="hidden" textOverflow="ellipsis">
                            <Text noOfLines={1}>{polygonSenderAddress}</Text>
                          </Box>
                         </HStack>
                         <HStack>
                           <Text>To:</Text>
                           <Box padding={2} bgColor={'gray.700'}   isTruncated border={'1px solid gray'} borderRadius={'20px'} maxW={{base:"120px", lg:"300px", xl:"220px", md:"250px"}} overflow="hidden" textOverflow="ellipsis">
                            <Text noOfLines={1}>{polygonReceiverAddress}</Text>
                           </Box>
                         </HStack>
                         <HStack>
                          <Text>Value:</Text>
                          <Box padding={2} bgColor={'gray.700'}   isTruncated border={'1px solid gray'} borderRadius={'20px'} maxW={{base:"120px", lg:"300px", xl:"220px", md:"250px"}} overflow="hidden" textOverflow="ellipsis">
                            <Text noOfLines={1}>{value}</Text>
                          </Box>
                        </HStack>
                    </HStack>
                 </Box>
                </VStack>
            </Box>
    </Stack>
    )
}

export default Transactions;
