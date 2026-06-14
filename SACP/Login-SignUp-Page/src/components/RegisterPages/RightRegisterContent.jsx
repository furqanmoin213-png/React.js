import RightHeader from "../Shared/RightHeader";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";

// FUNCTION-RUN-GENERATED-CODE-START:RightRegisterContent
(async () => { console.log(await RightRegisterContent(/* OpenAI API key not provided */)); })();
// FUNCTION-RUN-GENERATED-CODE-END:RightRegisterContent

const RightRegisterContent = ({ onNavigate }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Registered with:", data);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <RightHeader />
      <div className="w-full flex-grow flex justify-center items-center px-6 py-10 font-login-page">
        <div className="w-full max-w-md">
          <h1 className="text-4xl md:text-[3.5rem] text-Login-Heading mb-2 font-bold leading-tight">
            Create Account
          </h1> 
          <p className="text-base md:text-[1.2rem] text-Login-Text mb-6 font-semibold">
            Get started with your academic profile
          </p>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name" className="text-sm text-Login-Text">Full Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="John Doe"
              {...register("name", { required: true })} 
              className="w-full px-4 py-3 border border-input-border text-[1.1rem] text-gray-900"
            />

            <label htmlFor="email" className="text-sm text-Login-Text">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="student@university.edu"
              {...register("email", { required: true })} 
              className="w-full px-4 py-3 border border-input-border text-[1.1rem] text-gray-900"
            />

            <label htmlFor="password" className="text-sm text-Login-Text">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="************" 
              {...register("password", { required: true })} 
              className="w-full px-4 py-3 border border-input-border text-[1.1rem] text-gray-900 font-[900]"
            />

            <button type="submit" className="bg-Login-Button text-white py-3 mt-4 text-[1.2rem] font-medium flex justify-center items-center gap-2 cursor-pointer">
              Register <ArrowRight strokeWidth={2.5} size={20} />
            </button>
          </form>

          <p className="text-center mt-10 text-Login-Text text-sm">
            Already have an account?
            <span onClick={onNavigate} className="text-Login-Register-Link font-semibold ml-1 cursor-pointer hover:underline">
              Log in here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightRegisterContent;