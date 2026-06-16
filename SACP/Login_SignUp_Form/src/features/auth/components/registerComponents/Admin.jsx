import InputField from "../../../../shared/components/InputField"

const Admin = ({register}) => {
  return (
    <div className="flex flex-col gap-5">
        <InputField
            label={"Username"}
            placeholder={"e.g. admin_name"}
            name={"username"}
            id={"username"}
            type={"text"}
            register={register}
        />
        <InputField
            label={"Organization Name"}
            placeholder={"e.g. Univarsity of Punjab "}
            name={"organization name"}
            id={"organization name"}
            type={"text"}
            register={register}
        />
        
        <InputField
            label={"Email Address"}
            placeholder={"admin@university.edu"}
            name={"admin email"}
            id={"admin email"}
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

export default Admin;