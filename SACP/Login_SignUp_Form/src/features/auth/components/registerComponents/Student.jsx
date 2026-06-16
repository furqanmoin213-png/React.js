import InputField from "../../../../shared/components/InputField"

const Student = ({register}) => {
  return (
    <div className="flex flex-col gap-5">
        <InputField
            label={"Username"}
            placeholder={"Name RollNo"}
            name={"username"}
            id={"username"}
            type={"text"}
            register={register}
        />
        <div className="flex flex-row gap-5 w-full ">
        <div className="w-full flex flex-col gap-3">

        <label for="department">Degree/Certificate</label>
  
    <select id="degree" name="degree"               className="w-full px-4 py-4 border border-input-border text-gray-900"
>
      <option value="" disabled selected>Select Degree/Certificate</option>
      <option value="BS"></option>
      <option value="engineering"></option>
      <option value="marketing"></option>
    </select>
    </div>
        <InputField
            label={"Registeration Number"}
            placeholder={"e.g. STU-2024-892"}
            name={"registeration number"}
            id={"registeration number"}
            type={"text"}
            register={register}
        />
        </div>
        <InputField
            label={"Institution Email"}
            placeholder={"student@university.edu"}
            name={"student email"}
            id={"student email"}
            type={"email"}
            register={register}
        />
        
        <div className="flex flex-row gap-5 w-full ">
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

export default Student