import InputFields from "../../Shared/InputFields"

const Student = ({register}) => {
  return (
    <div className="flex flex-col gap-5">
        <InputFields
            label={"Username"}
            placeholder={"Name RollNo"}
            name={"username"}
            id={"username"}
            type={"text"}
            register={register}
        />
        <div className="flex flex-row gap-5 w-full ">
        <InputFields
            label={"Degree/Certificate"}
            placeholder={"Select program"}
            name={"username"}
            id={"username"}
            type={"text"}
            register={register}
        />
        <InputFields
            label={"Registeration Number"}
            placeholder={"e.g. STU-2024-892"}
            name={"registeration number"}
            id={"registeration number"}
            type={"text"}
            register={register}
        />
        </div>
        <InputFields
            label={"Institution Email"}
            placeholder={"student@university.edu"}
            name={"student email"}
            id={"student email"}
            type={"email"}
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

export default Student