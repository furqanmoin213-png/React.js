
import Login_Illustration from "../../assets/Login_Illustration.png";
import image from "../../assets/SignUp_Illustration.png";
const ImageContainer = () => {
  return (
    <div className="h-full w-full hidden lg:block bg-Page-background">
      <img src={Login_Illustration} alt="Login Illustration" className="  outline-none border-none w-full" />
    </div>
  )
}
export const ImageContainer2=()=>{
  return (
    <div className="h-full w-full hidden lg:block bg-Page-background">
      <img src={image} alt="Login Illustration" className="  outline-none border-none h-full w-full" />
    </div>
  )
}

export default ImageContainer;
