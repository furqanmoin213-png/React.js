import ImageContainer from "../../Shared/ImageContainer";
import RightRegisterContent from "./RightRegisterContent";

export default function Register({ onNavigate }) {


  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 min-h-screen w-full place-items-center">
      <RightRegisterContent onNavigate={onNavigate} />
      <ImageContainer/>
    </div>
  );
}