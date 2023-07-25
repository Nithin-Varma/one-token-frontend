import { Box, Text, Center, Button, HStack, Input, InputGroup, VStack, useToast, ToastId } from '@chakra-ui/react'
import { ETH_CHAIN_ID } from '../../../../consts';
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';

const GetFaucets = () => {
    const { chain } = useNetwork()

    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");
    const toast = useToast();
    const [toastId, setToastId] = useState<ToastId>(0)
    useEffect(() => {
        if (loading) {
            const id = toast({
                status: "loading",
                title: "Getting Facuets Will Take soon time Don't Refresh"

            });
            setToastId(id)
        }
        else {
            if (toastId || toastId !== 0) {
                toast.close(toastId);

            }
        }
    }, [loading])

    const getFaucets = async () => {

        if (!chain) {
            toast({
                status: "error",
                title: "Error No Wallet Connected",
                description: "Please Connect Wallet First"
            })
            return;
        }
        setLoading(true)
        try {
            const resJson = await (await fetch(
                "https://ill-rose-cuttlefish-sock.cyclic.app/faucets",
                {
                    body: JSON.stringify({
                        address,
                        chainId: chain?.id
                    }),
                    method: "POST",
                    headers: {
                        "Accept": "*/*",

                        "Content-Type": "application/json"
                    }
                }
            )).json()
            const link = chain.id === ETH_CHAIN_ID ? `https://sepolia.etherscan.io/tx/${resJson.transactionHash}` : `https://mumbai.polygonscan.com/tx/${resJson.transactionHash}`
            toast({
                status: "success",
                title: "Faucets Gotten of 1 Twin Token",
                description: `Go to ${link}`,
                duration: 10000,
                isClosable: true
            })


        } catch (error) {
            toast({
                status: "error",
                title: "Error from faucets",
                //@ts-ignore
                description: error?.message || error?.data?.message || error?.data?.error?.message || error?.data?.error?.data?.message
            })

        }
        finally {
            setLoading(false)
        }

    }

    return (
        <Box textAlign='center'>
            <VStack spacing={'16'}>
                <Text fontSize={'4xl'} fontWeight={'bold'}>Get Faucets</Text>
                <Box >
                    <VStack spacing={'6'} align={'start'}>
                        <InputGroup w={['100%', '400px', '700px']}>
                            <Input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder='Enter Address Here...'
                            />
                        </InputGroup>

                    </VStack>
                    <Button
                        bg={'#6C0BA9'}
                        color={'white'}
                        paddingX={['6', '10']}
                        _hover={{
                            bg: '#51087E'
                        }}
                        onClick={getFaucets}
                        my={'8'}
                        isLoading={loading}
                    >

                        Get Free Twin Tokens
                    </Button>
                </Box>
            </VStack>
        </Box>
    )
}

export default GetFaucets;

