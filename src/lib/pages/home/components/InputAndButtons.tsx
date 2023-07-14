import { Box, Button, HStack, Input, InputGroup, VStack } from '@chakra-ui/react'

function InputAndButtons() {
  return (
    <Box>
        <VStack spacing={'12'}>
            <InputGroup>
            <Input 
             placeholder='Enter Address Here...'
             />
            </InputGroup>
            <HStack spacing={'24'}>
                <Button 
                 bg={'#6C0BA9'}
                 color={'white'}
                 paddingX={'6'}
                 _hover={{
                    bg: '#51087E'
                 }} 
                 >Get Tokens</Button>
                <Button 
                 bg={'#6C0BA9'}
                 color={'white'}
                 paddingX={'10'}
                 _hover={{
                    bg: '#51087E'
                 }}
                 >Transfer</Button>
            </HStack>
        </VStack>
    </Box>
  )
}

export default InputAndButtons