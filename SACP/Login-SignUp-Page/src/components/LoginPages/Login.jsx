 import LeftContent from "./LeftContent"
import RightContent from "./RightContent"
export default function Login() {
  return (
    // 'grid-cols-[auto_1fr]' means: 1st col fits content automatically, 2nd col takes 1 fraction of remaining space
    <div className="grid grid-cols-[50%_1fr] h-full">
       <LeftContent /> 
        <RightContent />
       </div>
    
  );
}