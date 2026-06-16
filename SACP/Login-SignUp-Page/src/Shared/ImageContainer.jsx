import Login_Illustration from "../Assets/Login_Illustration.png"
const ImageContainer = () => {
  return (
    <div className="h-screen w-full hidden lg:block">
      <img src={Login_Illustration} alt="Login Illustration" className="  outline-none border-none h-full w-full " />
    </div>
  )
}


export default ImageContainer;