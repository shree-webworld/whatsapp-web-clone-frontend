import { Box, Text, Heading, Avatar} from '@chakra-ui/react';
import Logo from "../assets/Whatsapp_logo.png";


export default function Navbar()
{
  return(<>
      <Box display="flex" bg="#019F7D" h="9vh" pl={{md:"15rem", sm:"5rem"}} py="0.5rem"
        style={{fontFamily: "'Inter', sans-serif"}}>

        <Avatar name='WhatsApp Web' src={Logo} size="md"/>&nbsp;&nbsp;
        <Text color="white" fontSize="lg" mt="0.6rem" fontWeight="semibold">
           WHATSAPP WEB
         </Text>

      </Box>
        </>);
}
