import {Input, Box, Link} from "@chakra-ui/react";
import {useState, useEffect} from "react";
import axios from "axios";



export default function ChatBoxInputMessages({sendText, setValue, value, file, setFile, setImage, ...props})
{
  const base_url = import.meta.env.VITE_BASE_URL;


  let onFileChange = (e) =>{
                  setValue(e.target.files[0].name);
                  setFile(e.target.files[0]);
                }

  let getImage = async () => {
                            if (file)
                              {
                                let data = new FormData();
                                data.append("name", file.name);
                                data.append("file", file);

                               try
                               {
                                 let res = await axios.post(`${base_url}/file/upload`, data);
                                 console.log("upload file ", res);
                                 setImage(res.data);

                               }catch (e)
                                {
                                    console.log("Error while upload file api ",e);
                                }
                              }
                        }

  useEffect(() =>{
                    getImage();

                  },[file]);



  return(<>
            <Box mx="1rem" py={{md:"0.5rem"}}>
              <Link href="https://www.emojicopy.com/" target="_blank" _hover={{color:"yellow.400"}}>
                <i className="bi bi-emoji-smile" style={{fontSize:"1.6rem"}}></i>
              </Link>

            <label htmlFor="fileInput">
              <i className="bi bi-paperclip"
                  style={{fontSize:"1.6rem", margin:"0rem 0.5rem", transform:"rotate(40deg)", cursor:"pointer"}}>
              </i>
            </label>
            <Input type="file" display="none" id="fileInput"
                   onChange={(e)=> onFileChange(e)}
            />

            <Input type="text" size="md" w={{sm:"10rem", md:"55rem"}}
                   placeholder="Type a message" borderColor="gray.500" focusBorderColor='lime'
                   color="gray.900" fontWeight="semibold" bg="white" value={value} borderRadius="full"
                   onChange={(e) => setValue(e.target.value)}
                   onKeyPress={(e) => sendText(e)}
            />

            <i className="bi bi-mic-fill" style={{fontSize:"1.4rem", margin:"0rem 0.5rem"}}></i>
            </Box>
        </>);
}
