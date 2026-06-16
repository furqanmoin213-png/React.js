
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../shared/components/Button";
import Student from "./Student";
import Faculty from "./Faculty";
import FormHeader from "../../../../shared/components/FormHeader";
import Admin from "./Admin"; 



const RightRegisterContent = ({ onNavigate }) => {
  const [activeRole, setActiveRole] = useState("Student"); 
  
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      role: "Student",
    }
  });

  useEffect(() => {
    setValue("role", activeRole);
  }, [activeRole, setValue]);

  const onSubmit = (data) => {
    // This will now catch all fields from whichever sub-component is rendered!
    console.log("Registered Form Data:", data); 
  };

  const getButtonClass = (role) => {
    const baseClass = "min-w-[100%] md:px-17 rounded-sm transition-all duration-200 text-sm font-medium text-center p-2";
    const activeClass = "bg-white border border-role-box-border shadow-md text-black p-2";
    const inactiveClass = "text-gray-500 hover:text-gray-800 hover:font-bold text-center shrink-1 p-2";
    
    return `${baseClass} ${activeRole === role ? activeClass : inactiveClass}`;
  };

  // Helper render function to handle all 3 roles cleanly
  const renderRoleFields = () => {
    switch (activeRole) {
      case "Student":
        return <Student register={register} />;
      case "Faculty":
        return <Faculty register={register} />;
      case "Admin":
        // If you don't have an Admin component yet, you can render fields directly:
        return <Admin register={register}/>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:w-full">
<FormHeader/>  
      <div className="h-screen w-full flex-1 flex justify-center items-center font-login-page">
        <div className="w-full max-w-150 p-5">
          <h1 className="text-3xl md:text-4xl text-Login-Heading mb-2 font-bold leading-tight">
            Create an Account
          </h1> 
          
          <p className="text-sm md:text-xl text-Login-Text mb-6 font-semibold">
            Join the Smart Academic Communication Platform workspace.
          </p>

          <form className="flex flex-col gap-1 w-full" onSubmit={handleSubmit(onSubmit)}>

            {/* Role Selection Tabs */}
            <div className="grid grid-cols-3 place-items-center bg-role-box border p-2 border-role-box-border rounded-md mb-1 ">
              <button 
                type="button" 
                className={getButtonClass("Admin")} 
                onClick={() => setActiveRole("Admin")}
              >
                Admin
              </button>
              <button 
                type="button" 
                className={getButtonClass("Faculty")} 
                onClick={() => setActiveRole("Faculty")}
              >
                Faculty
              </button>
              <button 
                type="button" 
                className={getButtonClass("Student")} 
                onClick={() => setActiveRole("Student")}
              >
                Student
              </button>
            </div>

            {/* Render fields dynamically based on active tab */}
            {renderRoleFields()}
  
            <Button label={`Create ${activeRole} Account`}/>
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

