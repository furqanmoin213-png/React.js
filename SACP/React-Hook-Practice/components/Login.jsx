import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form"

const Login = () => {
    const form = useForm()
    const {register, control, handleSubmit} = form;
    //register is a useForm method which is used to register the input fields in the form and it returns an object which contains the name of the input field and the value of the input field.it works like a onChange event listener which listens to the changes in the input field and updates the value of the input field in the form state.
    //control is a useForm method which is used to control the form state and it returns an object which contains the form state and the methods to update the form state.
    const onSubmit =(data)=>{
        console.log("Submitted Data", data)
    }
  return (
    <div className="h-[500px] w-full flex justify-center items-center">
        <form className="bg-gray-100 w-full max-w-[300px] overflow-hidden p-10 rounded-3xl" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="example@gmail.com" {...register("email")} className="border border-gray-600 rounded-md px-1 py-1 w-full mt-2 mb-2"/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" {...register("password")} className="border border-gray-600 rounded-md px-1 py-1 w-full mt-2 mb-2 focus:outline-teal-600"/>
            <button className="bg-gray-500 text-center w-full rounded-3xl py-1 mt-3">Submit</button>
        </form >
        <DevTool control={control}/>
    </div>
  )
}

export default Login