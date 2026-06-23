import { useState, useEffect } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [error, setError] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // 1. Initialize state directly from localStorage if it exists
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("local_notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // 2. Watch the 'notes' state. Every time it changes, update localStorage automatically.
  useEffect(() => {
    localStorage.setItem("local_notes", JSON.stringify(notes));
    console.log("Notes synced to localStorage successfully.");
  }, [notes]);

  function HandleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !detail.trim()) {
      setError("Both Title and Detail fields must be filled out!");
      return;
    }

    setError("");

    const timestamp = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    if (editIndex !== null) {
      setNotes((prevNotes) =>
        prevNotes.map((note, index) =>
          index === editIndex ? { title, detail, date: timestamp } : note
        )
      );
      setEditIndex(null);
    } else {
      setNotes((prevNotes) => [...prevNotes, { title, detail, date: timestamp }]);
    }

    setTitle("");
    setDetail("");
  }

  function HandleDelete(idx) {
    setNotes((prevNotes) => prevNotes.filter((_, index) => index !== idx));
    
    if (editIndex === idx) {
      setEditIndex(null);
      setTitle("");
      setDetail("");
    }
  }

  function HandleEdit(idx) {
    const curr_note = notes[idx];
    if (!curr_note) return;

    setTitle(curr_note.title);
    setDetail(curr_note.detail);
    setEditIndex(idx);
  }

  return (
    <div className="min-h-screen bg-black text-white lg:flex overflow-hidden">
      <form onSubmit={HandleSubmit} className="flex flex-col lg:w-1/2 gap-4 p-15">
        <h1 className="text-4xl font-bold">
          {editIndex !== null ? "Edit Note" : "Add Note"}
        </h1>
        
        {error && (
          <div className="bg-red-500 text-white font-bold p-3 rounded border border-red-700 animate-pulse">
            {error}
          </div>
        )}
        
        <input
          type="text"
          placeholder="Enter Note Title"
          className="px-5 py-2 rounded border-2 w-full text-white outline-none"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
        />
        <textarea
          name="detail"
          id="detail"
          placeholder="Write Detail"
          className="px-5 py-2 w-full text-white rounded h-32 flex items-start border-2 outline-none font-medium"
          value={detail}
          onChange={(e) => {
            setDetail(e.target.value);
            setError("");
          }}
        />

        <button className="px-5 py-2 rounded bg-white outline-none font-bold text-black w-full active:bg-gray-200 text-xl active:scale-95 cursor-pointer">
          {editIndex !== null ? "Save Note" : "Add Note"}
        </button>
      </form>

      <div className="p-15 lg:border-l-2 lg:border-white lg:w-1/2 overflow-auto">
        <h1 className="text-4xl font-bold mb-10">Recent Notes</h1>
        <div className="flex flex-wrap gap-5">
          {notes.map(function (note, idx) {
            return (
              <div
                className="h-52 w-70 rounded-xl bg-white text-black p-4 flex flex-col justify-between"
                key={idx}
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h1 className="leading-tight font-bold text-xl truncate">{note.title}</h1>
                    <span className="text-xs text-gray-400 whitespace-nowrap mt-1">{note.date}</span>
                  </div>
                  <p className="leading-tight font-medium mt-4 text-gray-700  line-clamp-4">
                    {note.detail}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    className="justify-center items-center w-full bg-red-600 rounded py-2 font-bold text-white text-sm active:scale-95 outline-none border-none cursor-pointer"
                    onClick={() => HandleDelete(idx)}
                  >
                    Delete Note
                  </button>
                  <button
                    className="justify-center items-center w-full bg-blue-600 rounded py-2 font-bold text-white text-sm active:scale-95 outline-none border-none cursor-pointer"
                    onClick={() => HandleEdit(idx)}
                  >
                    Edit Note
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;