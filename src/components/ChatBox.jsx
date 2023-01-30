import {Box} from "@chakra-ui/react";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatBoxMessages from "./ChatBoxMessages";
import {personState, accountState} from "../utils/atom";
import {useRecoilValue} from "recoil";
import {useEffect, useState} from "react";
import axios from "axios";


export default function ChatBox()
{
  let person = useRecoilValue(personState);
  let account = useRecoilValue(accountState);
  const base_url = import.meta.env.VITE_BASE_URL;

  let [conversation, setConversation] = useState({});


  let getConversationDetails = async () =>{
                            try
                            {
                                let res = await axios.post(`${base_url}/api/conversations/get`,{ senderId: account.sub, receiverId: person.sub });
                                console.log("getConversationDetails - ",res);

                                setConversation(res.data);
                            }catch (e)
                             {
                                console.log(e);
                             }
                }

  useEffect(() =>{
                    getConversationDetails();
                 },[person.sub]);

  return(<>
    <Box w="70%" bg="gray.200" minW={{sm:"19rem"}}>
      <ChatBoxHeader person={person}/>
      <ChatBoxMessages person={person} conversation={conversation}/>
    </Box>
        </>);
}
