import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
type Variant = "primary" | "secondary" | "delete"
type ButtonProps = {
    variant?: Variant
} & ComponentProps<"button">

export default function Button({variant="primary",className,...props}: ButtonProps) {

 return (
        <button 
        {...props}
        className={twMerge( 
            "py-1 px-2 rounded transition-colors disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer",
            setVariant(variant),
            className,)} />
            
    )
}
function setVariant(variant:Variant)
{
    switch(variant)
    {
        case "primary":
            return "bg-violet-500 hover:bg-violet-400"
        case "secondary":
            return "bg-zinc-700 hover:bg-zinc-600 text-zinc-400" 
        case "delete":
            return "text-red-800 hover:text-red-200 hover:bg-red-800 "
        default:
            throw new Error(`Invalid variant, ${variant} satisfies never`)
    }
}