import LeftContent from "../../Shared/ImageContainer";
import RightLoginContent from "./RightLoginContent";

export default function Login({ onNavigate }) {
  
  return (
    
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 w-full">
      <LeftContent /> 
      <RightLoginContent onNavigate={onNavigate} />
    </div>
  );
}