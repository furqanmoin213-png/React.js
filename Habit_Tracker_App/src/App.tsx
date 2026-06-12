
import { useState } from 'react'
import Header from './Components/Header.tsx'
import HabitForm from './Components/HabitForm.tsx'
import HabitList, { type Habits } from './Components/HabitList.tsx'
export default function App()
{
  const [habits, setHabits] = useState<Habits[]>([])
  function addHabit(name:string)
  {
    setHabits(curr => [...curr, {id: crypto.randomUUID(), name}]);
  }
  return (
  <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4 ">
    <Header />
    <HabitForm addHabit={addHabit}/>
    <HabitList habits={habits} />
   

  </div>
  )
}

