import RightHeader from "./RightHeader"
import {useForm} from "react-hook-form"
import { ArrowRight } from "lucide-react";
const RightContent = () => {
  const form = useForm();
  const {register, handleSubmit} = form
  return (
<div className="w-full h-screen ">
<RightHeader/>

<div className="w-full  h-[90%] flex justify-center items-center font-login-page">
  <div className="min-w-[27rem]">
    <h1 className="text-[4rem] text-Login-Heading mb-1 ml-[-5px] font-bold">Welcome </h1>  
    <p className="text-[1.3rem] text-Login-Text mb-4 font-semibold">Log in to your academic workspace</p>
    <form className="flex flex-col gap-1" onSubmit={handleSubmit("")}>

      <label htmlFor="email" className="text-[1rem] text-Login-Text mb-1">
        Email Address
      </label>

      <input type="email" name="email" id="email" placeholder="student@university.edu"
      {...register("email")} className="w-full px-4 py-4 mb-3 border-1 border-input-border"/>

    <label htmlFor="password" className="text-[1rem] text-Login-Text mb-1">
      Password
    </label>
    
    <input type="password" name="password" id="password" {...register("password")} placeholder="........" className=" w-full px-4 py-4  mb-5 border-1 border-input-border font-[900] text-[1rem] "/>

    <button className="bg-Login-Button text-white py-3 px-3 text-[1.4rem] hover:cursor-pointer flex justify-center items-center gap-2">
      Login<ArrowRight strokeWidth={2.5} />
    </button>
  </form>
      <p className="text-center mt-15 text-Login-Text">Don`t have an account? <span className="text-Login-Register-Link font-semibold ml-1 text-[0.9rem]">Register here</span></p>

      </div>

        </div>
    </div>
  )
}

export default RightContent