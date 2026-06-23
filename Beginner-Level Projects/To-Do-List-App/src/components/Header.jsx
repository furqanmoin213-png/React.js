import {format} from "date-fns"
const Header = () => {
  return (
    <header className="flex flex-col gap-2">

    <h1 className="text-4xl ">To-Do List</h1>
    <div className="text-blue-800">{
        format(new Date(), "do,MMMM,yyyy")
    }</div>
    </header>
  )
}

export default Header