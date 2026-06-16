import ImageContainer from "../../../../shared/components/ImageContainer"
import RightLoginContent from "./RightLoginContent"

const Login = ({onNavigate}) => {
  return (
    <div>
         <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] w-full min-h-screen">
      <ImageContainer /> 
      <RightLoginContent onNavigate={onNavigate} />
    </div>
    </div>
  )
}

export default Login