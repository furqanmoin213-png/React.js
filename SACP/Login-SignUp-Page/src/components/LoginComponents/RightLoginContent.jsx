import RightHeader from "../../Shared/RightHeader";
import { useForm } from "react-hook-form";
import InputFields from "../../Shared/InputFields";
import Button from "../../Shared/Button";

const RightLoginContent = ({ onNavigate }) => {
  const {register, handleSubmit } = useForm();
 
  const onSubmit = (data) => {
    console.log("Logged in with:", data);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <RightHeader />
      <div className="w-full flex flex-1 justify-center items-center px-6 py-10 font-login-page">
        <div className="w-full max-w-md">
          <h1 className="text-4xl md:text-[3.5rem] text-Login-Heading mb-2 font-bold leading-tight">
            Welcome
          </h1> 
          <p className="text-base md:text-[1.2rem] text-Login-Text mb-6 font-semibold">
            Log in to your academic workspace
          </p>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <InputFields label="Email Address" id="email" name="email" type="email" placeholder="student@university.edu" register={register}/>
            <InputFields label="Password" id="password" name="password" type="password" placeholder="************" register={register} />
            

            
          <Button label="Login"/>
            
          </form>

          <p className="text-center mt-10 text-Login-Text text-sm">
            Don't have an account?
            <span onClick={onNavigate} className="text-Login-Register-Link font-semibold ml-1 cursor-pointer hover:underline">
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightLoginContent;