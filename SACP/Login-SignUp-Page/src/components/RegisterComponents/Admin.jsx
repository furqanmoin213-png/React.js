import InputFields from "../../Shared/InputFields"

const Admin = ({register}) => {
  return (
    <div className="flex flex-col gap-5">
        <InputFields
            label={"Username"}
            placeholder={"e.g. admin_name"}
            name={"username"}
            id={"username"}
            type={"text"}
            register={register}
        />
        <InputFields
            label={"Organization Name"}
            placeholder={"e.g. Univarsity of Punjab "}
            name={"organization name"}
            id={"organization name"}
            type={"text"}
            register={register}
        />
        
        <InputFields
            label={"Email Address"}
            placeholder={"admin@university.edu"}
            name={"admin email"}
            id={"admin email"}
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

export default Admin;