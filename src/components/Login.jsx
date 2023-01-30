import { Box, Container, Center, Text, Heading, OrderedList, ListItem, List, Image} from '@chakra-ui/react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import {useRecoilState, useSetRecoilState} from "recoil";
import {accountState} from "../utils/atom";
import axios from "axios";
import Footer from "./Footer.jsx";

export default function Login()
{

  let setAccount = useSetRecoilState(accountState);
  let base_url = import.meta.env.VITE_BASE_URL;

  let onLoginSuccess = async (res) => {
                            try
                            {
                              let decoded = jwt_decode(res.credential);
                              setAccount(decoded);
                              let response = await axios.post(`${base_url}/api/user`,decoded);
                              console.log(response);
                            }catch (e)
                              {
                                console.log(e);
                              }
                      }

  let onLoginError = (res) => {
                                  console.log("Login failed ",res);
                              }



  return(<>
    <Container bg="#F0F2F5" h={{md:"100vh", sm:"130vh"}} maxW="100%" centerContent style={{fontFamily: "'Sora', sans-serif"}}>
      <Box display={{md:"flex"}} bg="white" w={{md:"55rem", sm:"25rem"}} mt="4rem" justifyContent="space-between">
        <Box pl="1rem">
          <Text py="3rem" fontSize="3xl" color="gray.400">
            To use WhatsApp on your computer:
          </Text>

          <OrderedList fontSize="xl">
            <ListItem>Open WhatsApp on your phone</ListItem>
            <ListItem my="1rem"> Tap Menu Settings and select WhatsApp Web</ListItem>
            <ListItem>Tap on Link a Device</ListItem>
            <ListItem my="1rem">Tap Menu Settings and select WhatsApp Web</ListItem>
          </OrderedList>
        </Box>

          <Box bgImage="url('https://www.ginifab.com/feeds/qr_code/img/qrcode.jpg')"
                bgRepeat="no-repeat" boxSize="19.7rem" m={{sm:"1.5rem", md:"1rem"}}
                display="flex" alignItems="center" justifyContent="center"
          >
              <GoogleLogin
                  onSuccess={onLoginSuccess}
                  onError={onLoginError}
                />
          </Box>

      </Box>
    </Container>
    <Footer/>

        </>);
}
