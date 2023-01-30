import {useTitle} from "../utils/generalFunctions";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import {useRecoilValue} from "recoil";
import {accountState} from "../utils/atom";
import Chat from "./Chat";




export default function Home()
{
  useTitle("WhatsApp");
  let account = useRecoilValue(accountState);
  console.log("account -", account);


  return(<>
            <Navbar />
            {
              account ? <Chat /> : <Login />
            }
        </>);
}
