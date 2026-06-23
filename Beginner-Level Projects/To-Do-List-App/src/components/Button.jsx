
const Button = ({title="Add Task", style="", AnyFunction}) => {
  return (
     <button
      className={`bg-blue-700 box-border text-white font-medium outline-none active:scale-95 rounded-md border-0 hover:cursor-pointer hover:font-bold ${style}`}
      onClick={AnyFunction}
      >{title}</button>
  )
}

export default Button