import { Text, Box, Avatar, Divider } from '@chakra-ui/react';
import {useRecoilValue} from "recoil";
import {accountState} from "../utils/atom";
import MenuHeader from "./MenuHeader";
import MenuSearch from "./MenuSearch";
import Conversations from "./Conversations";
import {useState} from "react";

export default function Menu()
{
  let account = useRecoilValue(accountState);
  let [text, setText] = useState("");

  return(<>
            <Box w="30%"  minW={{sm:"15rem"}}>
              <MenuHeader />
              <MenuSearch setText={setText}/>
              <Box h={{md:"30.6rem", sm:"29.8rem"}} overflowY="scroll">
                <Conversations text={text}/>
                <Divider orientation='horizontal' />
              </Box>
            </Box>
        </>)
}
