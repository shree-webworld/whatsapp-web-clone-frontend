import {Text, Box, Image} from "@chakra-ui/react";
import ChatBoxInputMessages from "./ChatBoxInputMessages";
import {useRecoilValue} from "recoil";
import {accountState} from "../utils/atom";
import {useState, useEffect, useRef} from "react";
import axios from "axios";
import {formatDate, downloadMedia} from "../utils/generalFunctions";
import {useSocketContext} from "../context/SocketProvider";




let TextMessage = ({message}) =>{

                return(<>
                          <Text color="gray.900" fontSize="lg" wordBreak="break-word">
                            {message.text}
                          </Text>

                          <Text color="gray.500" fontSize="sm" mt="0.5rem">
                            {formatDate(message.createdAt)}&nbsp;
                            <i className="bi bi-check2-all" style={{color:"#39B5E0", fontWeight:"bolder", fontSize:"1.3rem"}}>
                            </i>
                          </Text>
                      </>)
                }

let ImageMessage = ({message}) =>{

                return(
                        <Box>
                          {
                              message?.text?.includes('.pdf') ?
                              <Box display="flex">
                                <Image src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/27_Pdf_File_Type_Adobe_logo_logos-512.png"
                                       alt="pdf" boxSize="10rem" objectFit="contain" />
                                <Text fontSize="md" color="gray.900" wordBreak="break-word">
                                  {message.text.split("/").pop()}
                                </Text>
                              </Box>
                              :
                              <Image src={message.text} alt={message.text} boxSize="10rem" objectFit="contain" />
                          }
                          <Text color="gray.500" fontSize="sm">
                            {formatDate(message.createdAt)}&nbsp;
                            <i className="bi bi-check2-all" style={{color:"#39B5E0", fontWeight:"bolder", fontSize:"1.3rem"}}>
                            </i>
                            <i className="bi bi-arrow-down-circle" onClick={(e) => downloadMedia(e, message.text)}
                               style={{color:"#383838", fontWeight:"bolder", fontSize:"23px", marginLeft:"45%", cursor:"pointer"}}>
                            </i>
                          </Text>
                        </Box>
                      )
              }





export default function ChatBoxMessages({person, conversation})
{
  let account = useRecoilValue(accountState);
  let [value, setValue] = useState("");
  let base_url = import.meta.env.VITE_BASE_URL;
  let [messages, setMessages] = useState([]);
  let [newMessageFlag, setMessageFlag] = useState(false);
  let [file, setFile] = useState();
  let [image, setImage] = useState("");
  const scrollRef = useRef();
  const {socket} = useSocketContext();
  const [incomingMessage, setIncomingMessage] = useState(null);


  let sendText = async (e) =>{
                          // console.log(e);
                          let code = e.keyCode || e.which;
                          if(code === 13)
                          {
                            let message = {};
                            if(!file)
                            {
                               message = {
                                              senderId : account.sub,
                                              receiverId : person.sub,
                                              conversationId : conversation._id,
                                              type: "text",
                                              text: value
                                          }
                            }else
                             {
                               message = {
                                                   senderId: account.sub,
                                                   conversationId: conversation._id,
                                                   receiverId: person.sub,
                                                   type: 'file',
                                                   text: image
                                          };
                             }

                             socket.current.emit("sendMessage", message);

                              try
                              {
                                let res = await axios.post(`${base_url}/api/message`, message);
                                console.log("api message - ",res);
                              }catch (e)
                               {
                                  console.log(e);
                               }

                              setValue(""); //clear text on enter press
                              setFile("");
                              setImage("");
                              setMessageFlag(prev => !prev);
                          }
                      }



let getMessageDetails = async (id) =>{
                        try
                        {
                          let res = await axios.get(`${base_url}/api/message/${id}`);
                          // console.log("getMessageDetails - ",res);
                          setMessages(res.data);
                        }catch (e)
                        {
                          console.log("Error while calling api message ",e);
                        }
                  }

      useEffect(() => {
                        socket.current.on('getMessage', data => {
                                                                  setIncomingMessage({
                                                                      ...data,
                                                                      createdAt: Date.now()
                                                                })
                                                        })
                      }, []);

      useEffect(()=>{
                        getMessageDetails(conversation?._id);

                    },[conversation?._id, person._id, newMessageFlag]);


      useEffect( ()=>{
                      scrollRef.current?.scrollIntoView({ transition: "smooth" });
      },[messages]);


      useEffect(() => {
              incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
                  setMessages((prev) => [...prev, incomingMessage]);

          }, [incomingMessage, conversation]);



  return(<>
            <Box bgImage="url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')"
                  h="30rem" overflowY="scroll" fontSize="lg" px="2rem" ref={scrollRef}>
              <Text color="pink.100" fontSize="xs">..</Text>
              {
                messages?.map(message=>(<>
                                          {
                                            account.sub == message.senderId ?
                                            (<Box bg="green.300" my="0.5rem" key={message._id} ml="auto"
                                                  width="fit-content"
                                                  borderRadius="lg" px="1.5rem" py="0.3rem" maxW="60%"
                                              >
                                              {
                                                message.type === "file" ? <ImageMessage message={message} /> : <TextMessage message={message} />
                                              }
                                          </Box>):
                                            (<Box bg="white" my="0.5rem" key={message._id}
                                                  width="fit-content"
                                                  borderRadius="lg" px="1.5rem" py="0.3rem" maxW="60%"
                                             >
                                             {
                                               message.type === "file" ? <ImageMessage message={message} /> : <TextMessage message={message} />
                                             }
                                          </Box>)
                                        }
                                      </>)
                              )
              }

            </Box>

            <ChatBoxInputMessages sendText={sendText} setValue={setValue} value={value}
                                  file={file} setFile={setFile} setImage={setImage}
            />
        </>);
}
