import { Box, Text, Center, Button, HStack, Input, InputGroup, VStack } from '@chakra-ui/react'

const GetFaucets = () => {
    return (
        <Box textAlign='center'>
            <VStack spacing={'16'}>
                <Text fontSize={'4xl'} fontWeight={'bold'}>Get Faucets</Text>
                <Box >
                    <VStack spacing={'6'} align={'start'}>
                        <InputGroup w={['100%', '400px', '700px']}>
                            <Input
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
                        my={'8'}
                    >
                        Get Free Twin Tokens
                    </Button>
                </Box>
            </VStack>
        </Box>
    )
}

export default GetFaucets;

