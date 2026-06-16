import {ImageContainer2} from "../../../../shared/components/ImageContainer";
import RightRegisterContent from "./RightRegisterContent";

export default function Register({ onNavigate }) {


  return (
    <div className="grid grid-cols-1 lg:grid-cols-[60%_1fr] min-h-screen w-full place-items-center">
      <RightRegisterContent onNavigate={onNavigate} />
      <ImageContainer2/>
    </div>
  );
}