import {isFuture} from 'date-fns'
import Button from "./Button";
import {startOfWeek, endOfWeek, eachDayOfInterval, format} from 'date-fns'
type HabitListProp = {
    habit: {
        id: string
        name: string
    }
}
function HabitItem({habit} : HabitListProp){
    const visibleDates = eachDayOfInterval(
        {
            start: startOfWeek(new Date(), {weekStartsOn: 1}),
            end: endOfWeek(new Date(), {weekStartsOn: 1})
        }
    )
    
  return(
    <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-5">
        <div className="flex items-center justify-between gap-4">
            <span className="flex gap-3">

            <span className="font-medium">{habit.name}</span>
            <span className="text-sm text-amber-400">🔥 3</span>
            </span>
            <Button variant="delete">Delete</Button>
        </div>
        
        <div className="flex gap-1.5">
            {
                visibleDates.map(date=>(
                    <Button key={date.toISOString()} disabled={isFuture(date)} className="flex flex-1 flex-col gap-1.5">
                    <span className="font-medium">{format(date, "EEE")}</span>
                    <span className="font-medium">{format(date, "d")}</span>

                    </Button>
                ))
            }
        </div>
        

    </div>
  )
}

export default HabitItem;