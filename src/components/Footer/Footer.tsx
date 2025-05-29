import { Instagram } from "../../../public/svg/instagram";
import { Telegram } from "../../../public/svg/telegram";
import { Viber } from "../../../public/svg/viber";

export default function Footer(){
    return (
        <div className="flex flex-col gap-5 justify-center bg-gray-800">
             <div className="">
        <ul className="flex gap-5 justify-center py-3">
        <li><a target='blank' href="https://t.me/VakansiiEtalones"><Telegram width={30} height={30} /></a></li>
        <li><a target='blank' href="https://invite.viber.com/?g2=AQAyInf%2Fn7gYIVEHhdr0DRiL0gFv%2BFU7%2BDoKEQWPv1MfWACpSMOQb%2Fb3UcXL4ZYh" ><Viber width={30} height={30} /></a></li>
        <li><a target='blank' href="https://www.instagram.com/etalones_s_b/" ><Instagram width={30} height={30} /></a></li>
        </ul>
      </div>
             <aside className="text-center text-sm text-gray-500 pb-3">
    <p className="font-bold">
      Etalones S&B <br/>
    </p> 
    <p>Copyright © 2025 - All right reserved</p>
  </aside> 
        </div>
    )
}