import SACP_Logo from "../../Assets/SACP_Logo.svg"  
const RightHeader = () => {
  return (
    <div className="w-full h-[10%] flex items-center justify-end px-10 gap-2">
       <img src={SACP_Logo} alt="SACP Logo" className=" h-10 w-auto"/>
       <p className="text-[24px] font-login-page font-bold ">SACP</p>

    </div>
  )
}

export default RightHeader