// import Button from './Button'
import HabitItem from "./HabitItem"
export type Habits = {id:string, name:string}
type habitListProps={
    habits: Habits[]
}
export default function HabitList({habits}:habitListProps)
{
    
    if(habits.length == 0)
    {
        return(
            <p className="flex justify-center items-center text-zinc-400 py-12">No habits yet. Add one to get started!</p>
        )
    }
    return(
        
           <section className="flex flex-col gap-4">
  {habits.map(habit => (
    <HabitItem key={habit.id} habit={habit} />
  ))}
</section>
    )
}