import {Box, Avatar, Text, Spacer} from "@chakra-ui/react";
import {useSocketContext} from "../context/SocketProvider";


export default function ChatBoxHeader({person})
{
  let {activeUsers} = useSocketContext();

  return(<>
              <Box display="flex" bg="#ededed" w="100%" h="4rem">
                <Avatar src={person.picture} name={person.name} size="md" my="0.5rem" mx="0.5rem"/>
                <Box my="0.5rem" mx="0.5rem">
                  <Text fontSize="lg" fontWeight="semibold" textTransform="capitalize">
                    {person.name}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {activeUsers?.find(user => user.sub === person.sub)? "Online" : "Offline"}
                  </Text>
                </Box>

                <Box  ml="auto" my="1rem" fontSize="lg" mr="1rem" >
                  <i className="bi bi-search" ></i>
                  <i className="bi bi-three-dots-vertical" style={{margin: "0px 15px"}}></i>
                </Box>
              </Box>
        </>);
}
