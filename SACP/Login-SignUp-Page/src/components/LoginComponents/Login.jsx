import LeftContent from "../../Shared/ImageContainer";
import RightLoginContent from "./RightLoginContent";

export default function Login({ onNavigate }) {
  
  return (
    
    <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] h-screen w-full">
      <LeftContent /> 
      <RightLoginContent onNavigate={onNavigate} />
    </div>
  );
}