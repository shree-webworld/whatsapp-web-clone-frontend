import {createContext, useContext, useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";


const SocketContext = createContext(null);



export const SocketProvider = ({children}) =>{

                const [activeUsers, setActiveUsers] = useState([]);
                let base_url = import.meta.env.VITE_BASE_URL;


                const socket = useRef();


                  return(
                            <SocketContext.Provider value={{socket, activeUsers, setActiveUsers}}>
                                {children}
                            </SocketContext.Provider>
                        )

}




export const useSocketContext = () =>{
                                      return useContext(SocketContext);
                                    }
