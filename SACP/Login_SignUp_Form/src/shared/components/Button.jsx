import { ArrowRight } from "lucide-react";
const Button = (props) => {
  return (
    <button type="submit" className="bg-Login-Button text-white py-3 mt-4 text-[1.2rem] font-medium flex justify-center items-center gap-2 cursor-pointer">
              {props.label} <ArrowRight strokeWidth={2.5} size={20} />
            </button>
  )
}

export default Button