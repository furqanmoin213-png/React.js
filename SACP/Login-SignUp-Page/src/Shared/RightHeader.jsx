import SACP_Logo from "../Assets/SACP_Logo.svg"  
const RightHeader = () => {
  return (
    <div className="w-full h-[10%] flex items-center justify-end px-10 gap-1">
       <img src={SACP_Logo} alt="SACP Logo" className=" h-7 w-auto md:h-10 md:w-auto"/>
       <p className="text-[1.2rem] font-login-page font-bold md:text-[1.5rem]">SACP</p>

    </div>
  )
}

export default RightHeader