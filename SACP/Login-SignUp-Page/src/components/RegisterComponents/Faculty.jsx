import InputFields from "../../Shared/InputFields"

const Faculty = ({register}) => {
  return (
    <div className="flex flex-col gap-5">
     <div className="flex flex-row gap-5 w-full ">

        <InputFields
            label={"Username"}
            placeholder={"e.g. admin_name"}
            name={"username"}
            id={"username"}
            type={"text"}
            register={register}
        />
        <InputFields
            label={"Email Address"}
            placeholder={"academic@university.edu"}
            name={"admin email"}
            id={"admin-email"}
            type={"email"}
            register={register}
        />
        </div>
        
        <div className="flex flex-row gap-5 w-full ">
       <div className="w-full flex flex-col gap-3">

        <label for="department">Department</label>
  
    <select id="department" name="department"               className="w-full px-4 py-4 border border-input-border text-gray-900"
>
      <option value="" disabled selected>Select Department</option>
      <option value="hr">Human Resources</option>
      <option value="engineering">Engineering</option>
      <option value="marketing">Marketing</option>
    </select>
    </div>
        <InputFields
            label={"Role Title"}
            placeholder={"e.g. Associate Professor"}
            name={"role-title"}
            id={"role-title"}
            type={"text"}
            text={"(Optional)"}
            register={register}
        />
        </div>
        <InputFields
            label={"Access Code"}
            placeholder={"Enter alphanumeric code"}
            name={"access code"}
            id={"access-code"}
            type={"text"}
            text={"(Given by Admin)"}
            register={register}
        />
        
        <div className="flex flex-row gap-5 w-full ">
        <InputFields
            label={"Password"}
            placeholder={"**********"}
            name={"password"}
            id={"password"}
            type={"password"}
            register={register}
        />
        <InputFields
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