import { Box, Text, Center, Button, HStack, Input, InputGroup, VStack } from '@chakra-ui/react'

const InputAndButtons = () => {
  return (
    <Box textAlign='center'>
      <VStack spacing={'16'}>
        <Text fontSize={'4xl'} fontWeight={'bold'}>One-Token</Text>
        <Box >
          <VStack spacing={'6'} align={'start'}>
            <InputGroup w={['100%', '400px', '700px']}>
              <Input 
                placeholder='Enter Address Here...'
              />
            </InputGroup>
            <InputGroup paddingBottom={'8'} w={['100%', '200px', '300px']}>
              <Input 
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
              >
                Send
              </Button>
        </Box>
      </VStack>
    </Box>
  )
}

export default InputAndButtons;

