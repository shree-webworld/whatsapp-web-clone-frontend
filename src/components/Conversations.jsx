import {Text, Box, Avatar} from "@chakra-ui/react";
import {useEffect, useState, useRef} from "react";
import axios from "axios";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {accountState, personState} from "../utils/atom";
import {useSocketContext} from "../context/SocketProvider";
import {io} from "socket.io-client";



export default function Conversations({text})
{
  let base_url = import.meta.env.VITE_BASE_URL;

  let account = useRecoilValue(accountState);
  let [users, setUsers] = useState([]);
  const {setActiveUsers, socket} = useSocketContext();


  let fetchUsers = async () =>{
                        try
                        {
                            let res = await axios.get(`${base_url}/api/user`);
                            console.log("Conversations - ",res);

                            let filteredData = res.data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
                            setUsers(filteredData);
                        }catch (e)
                         {
                            console.log(e);
                         }
                    }


    let setPerson = useSetRecoilState(personState);
    let getUser = async (user) =>{
                            try
                            {
                              console.log(user);
                              setPerson(user);
                              let res = await axios.post(`${base_url}/api/conversations`,{ senderId: account.sub, receiverId: user.sub});
                              console.log("getUser -", res);

                            }catch (e)
                              {
                                  console.log(e);
                              }
                            }

  useEffect(()=>{
                    fetchUsers();

                },[text]);




  useEffect( ()=>{
                      if(account)
                      {
                          socket.current = io(`${base_url}`);
                          socket.current.emit("addUsers", account);
                          socket.current.on("getUsers", users =>{
                                                                  setActiveUsers(users);
                                                                });
                      }
              },[account]);



  return(<>

              <Box display="flex" bg="gray.200" cursor="pointer" py="0.5rem" pl="0.5rem" my="0.2rem">
                {
                  users.map(user =>(
                                      user.sub !== account.sub && (<Box display="flex" key={user._id} onClick={()=>getUser(user)}>
                                      <Avatar src={user.picture} name={user.name} size="md" />
                                      <Text fontSize="lg" ml="1rem" textTransform="capitalize">{user.name}</Text>
                                      </Box>)
                                    )
                            )
                }
              </Box>

        </>);
}
