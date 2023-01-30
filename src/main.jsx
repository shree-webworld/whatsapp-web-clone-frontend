import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {RecoilRoot} from "recoil";
import {SocketProvider} from "./context/SocketProvider";


let clientId = import.meta.env.VITE_CLIENT_ID;



ReactDOM.createRoot(document.getElementById('root')).render(

  <GoogleOAuthProvider clientId={clientId}>
    <SocketProvider>
    <RecoilRoot>

      <ChakraProvider>
        <App />
      </ChakraProvider>

    </RecoilRoot>
    </SocketProvider>
  </GoogleOAuthProvider>

)
