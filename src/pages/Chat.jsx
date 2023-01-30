import { Container, Box, Divider } from '@chakra-ui/react';
import {useTitle} from "../utils/generalFunctions";
import Menu from "../components/Menu";
import EmptyChat from "../components/EmptyChat";
import ChatBox from "../components/ChatBox";
import {personState} from "../utils/atom";
import {useRecoilValue} from "recoil";



export default function Chat()
{
  useTitle("Chat");

  let person = useRecoilValue(personState);


  return(<>
              <Container maxW="100%" bg="gray.400" h="91vh" py="1.5rem" style={{fontFamily: "'Sora', sans-serif"}}>
                <Box display="flex" bg="white" h="83vh" justifyContent="space-between">
                  <Menu/>
                  <Divider orientation='vertical' />
                  {
                    Object.keys(person).length ? <ChatBox /> : <EmptyChat />
                  }
                </Box>
              </Container>
        </>);
}
