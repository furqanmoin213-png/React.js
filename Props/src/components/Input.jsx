import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const Input = (props) => {
  const [hide, setHide]=useState(true);
  function hidePassword()
  {
     setHide(!hide);
  }
  return (
    <div className="flex bg-zinc-100 relative justify-center items-center h-screen ">

    <div className="flex items-center border-2 p-2">
    <input type={hide? "password" : "text"} placeholder="Enter Password" className={`relative text-xl  outline-none border-none ${props.className}`}/>
    <i className="relative hover:cursor-pointer " onClick={hidePassword}>{
      hide ? <EyeClosed size={20}/> : <Eye size={20}/>
      }</i> 
    </div>
    </div>
  )
}

export default Input;