import InputField from "../../../../shared/components/InputField"

const Faculty = ({register}) => {
  return (
    <div className="flex flex-col gap-5">
     <div className="flex flex-col gap-5 w-full ">

        <InputField
            label={"Username"}
            placeholder={"e.g. admin_name"}
            name={"username"}
            id={"username"}
            type={"text"}
            register={register}
        />
        <InputField
            label={"Email Address"}
            placeholder={"academic@university.edu"}
            name={"admin email"}
            id={"admin-email"}
            type={"email"}
            register={register}
        />
        </div>
        
        <div className="flex flex-col gap-5 w-full ">
       <div className="w-full flex flex-col gap-3">

        <label for="department">Department</label>
  
    <select id="department" name="department"               className=" px-4 py-4 border border-input-border text-gray-400 "

>
      <option value="" disabled selected>Select Department</option>
      <option value="hr" className="selection:bg-gray-100 hover:cursor-pointer ">Human Resources</option>
      <option value="engineering">Engineering</option>
      <option value="marketing">Marketing</option>
    </select>
    </div>
        <InputField
            label={"Role Title"}
            placeholder={"e.g. Associate Professor"}
            name={"role-title"}
            id={"role-title"}
            type={"text"}
            text={"(Optional)"}
            register={register}
        />
        </div>
        <InputField
            label={"Access Code"}
            placeholder={"Enter alphanumeric code"}
            name={"access code"}
            id={"access-code"}
            type={"text"}
            text={"(Given by Admin)"}
            register={register}
        />
        
        <div className="flex flex-col gap-5 w-full ">
        <InputField
            label={"Password"}
            placeholder={"**********"}
            name={"password"}
            id={"password"}
            type={"password"}
            register={register}
        />
        <InputField
            label={"Confirm Password"}
            placeholder={"**********"}
            name={"password"}
            id={"password"}
            type={"password"}
            register={register}
        />
        </div>
    </div>
    
  )
}

export default Faculty;