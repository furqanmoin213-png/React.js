import Button from "./Button"
import { useEffect, useState } from "react"
import Card from "./Card";
import { format } from "date-fns";

const HeroSection = () => {
    const [task, setTask] = useState("");
    // Changed to reflect it's a due date/time
    const [taskDueDate, setTaskDueDate] = useState(""); 
    const [edit, setEdit] = useState(null);
    
    const [taskList, setTaskList] = useState(() => {
        const savedTasks = localStorage.getItem("taskList");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem("taskList", JSON.stringify(taskList));
    }, [taskList]);

    // Helper to get current local date-time string in YYYY-MM-DDTHH:MM format for the 'min' attribute
    const getCurrentLocalDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    function HandleSubmit(e) {
        e.preventDefault();
        if (!task.trim()) return;

        // 1. Always capture the actual creation timestamp
        const createdDateFormatted = format(new Date(), "dd/MMMM/yyyy p");

        // 2. Format the user-selected due date, or fallback if they didn't pick one
        const dueDateFormatted = taskDueDate 
            ? format(new Date(taskDueDate), "dd/MMMM/yyyy p") 
            : "No expiration set";

        if (edit === null) {
            // --- ADD MODE ---
            const newTaskItem = {
                id: Date.now(),
                text: task,
                createdAt: createdDateFormatted,
                dueDate: dueDateFormatted, // Stores the deadline
                rawDueDate: taskDueDate // Kept to easily populate input on edit
            };
            setTaskList([...taskList, newTaskItem]);
        } else {
            // --- EDIT MODE ---
            const updatedList = taskList.map(item => {
                if (item.id === edit) {
                    return { 
                        ...item, 
                        text: task, 
                        dueDate: dueDateFormatted,
                        rawDueDate: taskDueDate
                        // Keep original item.createdAt untouched
                    }; 
                }
                return item;
            });
            
            setTaskList(updatedList);
            setEdit(null);
        }

        setTask("");
        setTaskDueDate(""); 
    }

    function HandleDelete(id) {
        const updatedList = taskList.filter(item => item.id !== id);
        setTaskList(updatedList);
    }

    function HandleEdit(id) {
        const itemToEdit = taskList.find(item => item.id === id);
        if (!itemToEdit) return;

        setEdit(itemToEdit.id);
        setTask(itemToEdit.text);
        setTaskDueDate(itemToEdit.rawDueDate || ""); 
    }

    return (
        <div className="flex flex-col gap-4 h-full w-full">
            <section>
                <form onSubmit={HandleSubmit} className="flex flex-col">
                    <input 
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="mb-4 h-full w-full border-b-2 border-blue-700 text-blue-500 p-2 font-medium outline-none"
                        type="text" 
                        placeholder="Enter Your Task" 
                        id="Task" 
                        name="task"
                    />
                    <div className="flex flex-col sm:flex-row gap-2 items-end">
                        <div className="flex flex-col w-full">
                            <label htmlFor="date" className="text-xs text-blue-700 font-semibold mb-1">Set Due Date & Time:</label>
                            {/* Changed type to datetime-local and added min validation */}
                            <input 
                                type="datetime-local" 
                                name="date" 
                                id="date" 
                                value={taskDueDate}
                                min={getCurrentLocalDateTime()} 
                                onChange={(e) => setTaskDueDate(e.target.value)}
                                className="grow mb-4 h-full w-full border-b-2 border-blue-700 text-blue-500 p-2 font-medium outline-none"
                            />
                        </div>
                        <Button 
                            type="submit" 
                            title={edit !== null ? "Update Task" : "Add Task"} 
                            style={"px-4 py-3 mb-4 shrink-0"}
                        />
                    </div>
                </form>
            </section>

            <section className="flex flex-col h-full w-full gap-4 mt-5">
                {
                    taskList.map((item) => (
                        <Card 
                            key={item.id} 
                            task={item.text} 
                            createdAt={item.createdAt} 
                            dueDate={item.dueDate} 
                            rawDueDate={item.rawDueDate} // <-- Pass this down
                            onDelete={() => HandleDelete(item.id)}
                            onEdit={() => HandleEdit(item.id)}
                        />
                    ))
                }
            </section>
        </div>
    )
}

export default HeroSection;