import LeftContent from "../Shared/LeftContent";
import RightRegisterContent from "./RightRegisterContent";

export default function Register({ onNavigate }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] min-h-screen w-full">
      <LeftContent /> 
      <RightRegisterContent onNavigate={onNavigate} />
    </div>
  );
}