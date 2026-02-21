import { useState } from "react";
import { addTask } from "../firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function TaskForm() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSaving(true);
    try {
      await addTask({ title, uid: user.uid });
      setTitle("");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <h3>Add a task</h3>
      <div className="row">
        <input
          className="input"
          placeholder="Eg: Finish Task 5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn" disabled={saving}>
          {saving ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
}
