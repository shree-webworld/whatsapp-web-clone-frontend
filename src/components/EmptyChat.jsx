import { Text, Box, Container, Image, Badge, Divider } from '@chakra-ui/react';


export default function EmptyChat()
{

  return(<>
            <Container maxW="70%" bg="#f8f9fa" minW={{sm:"19rem"}} centerContent>
              <Image src="https://i.gadgets360cdn.com/large/whatsapp_multi_device_support_update_image_1636207150180.jpg"
                      alt="EmptyChat" boxSize="22rem" objectFit="contain"/>

              <Text fontSize="2.5rem" color="gray.500" mb="1.5rem">
                WhatsApp Web <Badge color="gray.600">New</Badge>
              </Text>
              <Text fontSize="1rem" color="#667781">Now send and receive messages without keeping your phone online.</Text>
              <Text fontSize="1rem" color="#667781">Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</Text>
              <Divider orientation='horizontal' mt="3rem"/>
            </Container>
        </>)
}
