

function App() {
  return (
    <>
    <div className="max-w-4xl mx-auto p-4 flex flex-col gap-4">
    <Headers />

    </div>
   
    </>
  )
}

export default App
function Headers()
{
  return (
    <>
    <div className="flex justify-between p-4">
      <h1 className="text-3xl font-bold">Habit Tracker</h1>
      <span>8June - 14June</span>
    </div>
    </>
  )
}
