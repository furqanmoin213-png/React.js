import SACP_Logo from "../Assets/SACP_Logo.svg"  
const RightHeader = () => {
  return (
    
    <div className="w-full p-6 flex gap-2 relative">
       <img src={SACP_Logo} alt="SACP Logo" className="h-10 "/>
       <p className="text-3xl font-login-page font-bold absolute left-21 top-7">SACP</p>

    </div>
  )
}

export default RightHeader