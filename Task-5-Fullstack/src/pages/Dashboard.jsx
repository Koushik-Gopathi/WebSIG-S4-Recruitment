import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import { useAuth } from "../context/AuthContext";
import { listenToTasks } from "../firebase/firestore";

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // all | todo | done

  useEffect(() => {
    if (!user?.uid) return;
    const unsub = listenToTasks(user.uid, setTasks);
    return () => unsub();
  }, [user]);

  const filtered = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((t) => t.status === filter);
  }, [tasks, filter]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === "done").length;
    return { total, done };
  }, [tasks]);

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="topRow">
          <div>
            <h2>Dashboard</h2>
            <p className="muted">Total: {stats.total} | Done: {stats.done}</p>
          </div>

          <div className="filter">
            <button className={filter==="all" ? "chip active" : "chip"} onClick={()=>setFilter("all")}>All</button>
            <button className={filter==="todo" ? "chip active" : "chip"} onClick={()=>setFilter("todo")}>Todo</button>
            <button className={filter==="done" ? "chip active" : "chip"} onClick={()=>setFilter("done")}>Done</button>
          </div>
        </div>

        <TaskForm />

        <div className="card mt">
          <h3>Your tasks</h3>
          {filtered.length === 0 ? (
            <p className="muted">No tasks yet. Add one above 👆</p>
          ) : (
            <div className="stack">
              {filtered.map((t) => (
                <TaskItem key={t.id} task={t} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
