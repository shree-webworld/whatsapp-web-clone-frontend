import { Input, InputGroup, InputLeftElement, Box} from '@chakra-ui/react';



export default function MenuSearch({setText})
{
  return(<>
    <Box bg="white">
    <InputGroup py="0.5rem" mx="0.5rem">
        <InputLeftElement
          pointerEvents='none' mt="0.2rem"
          children={<i className="bi bi-search"></i>}
        />
      <Input type='text' placeholder='Search or start new chat' borderRadius="0.5rem" focusBorderColor='green.500'
              bg="#ededed" w={{md:"27.2rem"}} size="sm"
              onChange={(e) => setText(e.target.value)}
      />
      </InputGroup>
    </Box>
        </>)
}
