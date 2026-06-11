
import { useState } from 'react'
import Button from './Button.tsx'
type HabitFormProps={
    addHabit: (name:string)=>void
}
export default function HabitForm({addHabit}: HabitFormProps)
{
    const [name, setName] = useState("")
    function handleSubmit(e:SubmitEvent)
    {
        e.preventDefault();
        console.log(name)
        setName("")
        addHabit(name)

    }
    return(

        <form className='flex gap-2' onSubmit={handleSubmit}>
            <input 
                className='flex-1 bg-zinc-800 rounded px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500' 
                placeholder='New habit ....'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Button disabled = {name.trim() === ""}className="px-4 py-2 rounded-lg font-medium">Add Habit</Button>
        </form>
    )
}