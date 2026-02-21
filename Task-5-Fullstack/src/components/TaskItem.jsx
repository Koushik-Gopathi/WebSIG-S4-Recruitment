import { deleteTask, updateTask } from "../firebase/firestore";

export default function TaskItem({ task }) {
  const toggleDone = async () => {
    await updateTask(task.id, { status: task.status === "done" ? "todo" : "done" });
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
  };

  return (
    <div className="task">
      <div className="taskLeft">
        <input
          type="checkbox"
          checked={task.status === "done"}
          onChange={toggleDone}
        />
        <div>
          <div className={task.status === "done" ? "taskTitle done" : "taskTitle"}>
            {task.title}
          </div>
          <div className="pill">{task.status}</div>
        </div>
      </div>

      <button className="btn btnDanger" onClick={handleDelete}>Delete</button>
    </div>
  );
}
