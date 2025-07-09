import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

function Welcome() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<{ id: string; content: string }[]>([]);
  const [newNote, setNewNote] = useState("");
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("token");

  const fetchNotes = async () => {
    try {
      const res = await axios.get("https://full-stack-assignment-2-2.onrender.com/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data.map((n: any) => ({ id: n.id, content: n.content })));
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get("https://full-stack-assignment-2-2.onrender.com/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmail(res.data.email); // Assuming backend sends { email, name, etc. }
    } catch (err) {
      console.error("Failed to fetch user info", err);
    }
  };

  const createNote = async () => {
    if (!newNote.trim()) return;
    try {
      const res = await axios.post(
        "https://full-stack-assignment-2-2.onrender.com/api/notes",
        { content: newNote },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes((prev) => [...prev, res.data]);
      setNewNote("");
    } catch (err) {
      console.error("Failed to create note", err);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await axios.delete(`https://full-stack-assignment-2-2.onrender.com/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Failed to delete note", err);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin"); // or "/login" depending on your route
  };

  useEffect(() => {
    if (!token) {
      navigate("/signin"); // Redirect if not logged in
      return;
    }
    fetchNotes();
    fetchUser();
  }, []);

  return (
    <div className="max-w-sm mx-auto px-4 py-6 text-center">
      {/* Top Nav */}
      <div className="flex items-center justify-between mb-6">
        <img src="/assets/HDLogo.png" alt="Logo" className="h-10" />
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            navigate("/");
          }}
          className="text-sm text-red-500 underline mt-4"
        >
          Sign Out
        </button>

      </div>

      {/* Welcome Card */}
      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome 🎉</h1>
        <p className="text-gray-600 mb-4">{localStorage.getItem("email")}</p>

      </div>

      {/* Add Note */}
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 w-full rounded-md"
          placeholder="New note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-md hover:bg-blue-600"
          onClick={createNote}
        >
          Add
        </button>
      </div>

      {/* Notes */}
      <h3 className="text-left text-sm font-semibold mb-2">Notes</h3>
      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex items-center justify-between bg-white border rounded-lg px-4 py-2 shadow-sm"
          >
            <span className="text-left">{note.content}</span>
            <Trash2
              className="text-gray-500 hover:text-red-500 cursor-pointer"
              size={18}
              onClick={() => deleteNote(note.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Welcome;
