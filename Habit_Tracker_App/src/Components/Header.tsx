import {startOfWeek, endOfWeek, format} from "date-fns"
import Button from './Button.tsx'
function Header()
{
   
            const start= startOfWeek(new Date(), {weekStartsOn : 1})
            const end= endOfWeek(new Date(), {weekStartsOn: 1})

    
  return <header className="flex items-center justify-between ">
    <div className="flex flex-col gap-1">
      <h1 className="text-3xl font-bold ">Habit Tracker</h1>
      <span className="text-zinc-400 text-sm">1 / 1 Done today</span>
    </div>
    <div className='flex flex-col gap-1 items-end'>
      <span className="text-zinc-400 text-sm">
        {
            <span className="text-zinc-400 text-sm">
  {format(start, "MMM d")} - {format(end, "MMM d")}
</span>
              
        }
      </span>
      <div className="flex items-center gap-3">
  <Button >Prev</Button>
  <Button >Next</Button>

      </div>
      
    </div>
  </header>
}
export default Header;