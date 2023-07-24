import { Box, Text, Center, Button, HStack, Input, InputGroup, VStack } from '@chakra-ui/react'
import { ETH_CHAIN_ID, ETH_TOKEN_ADDRESS, POLY_TOKEN_ADDRESS } from '../../../../consts';
import { set } from 'date-fns';
import useSendToken from 'lib/hooks/useSendToken';
import { useState } from 'react';
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi';
import { parseEther } from 'viem';
const abi = [
  {

    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    type: "function"
  },
] as const;

const InputAndButtons = () => {
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState(0)
  const { chain } = useNetwork()
  const [enabled, setEnabled] = useState(false);
  const { sendToken } = useSendToken(chain?.id || ETH_CHAIN_ID)
  const { config, } = usePrepareContractWrite({
    abi,
    address: chain && chain.id === ETH_CHAIN_ID ? ETH_TOKEN_ADDRESS : POLY_TOKEN_ADDRESS,
    functionName: "transfer",
    chainId: chain?.id || ETH_CHAIN_ID,
    enabled: enabled,
    args: [
      address,
      parseEther(amount.toString())
    ]
  })
  const { writeAsync, write, data, error, isLoading, isSuccess, isError } = useContractWrite(config)
  return (
    <Box textAlign='center'>
      <VStack spacing={'16'}>
        <Text fontSize={'4xl'} fontWeight={'bold'}>One-Token</Text>
        <Box >
          <VStack spacing={'6'} align={'start'}>
            <InputGroup w={['100%', '400px', '700px']}>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder='Enter Address Here...'
              />
            </InputGroup>
            <InputGroup paddingBottom={'8'} w={['100%', '200px', '300px']}>
              <Input
                value={amount}
                inputMode='decimal'
                type='number'
                onChange={(e) => setAmount(parseInt(e.target.value))}

                placeholder='Amount here'
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
            onClick={async () => {
              setEnabled(true)
              await writeAsync?.();
            }}
            isLoading={isLoading}
          >
            Send
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}

export default InputAndButtons;

