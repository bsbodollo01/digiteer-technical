import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask, createTask } from "../src/api/tasksApi";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      const sanitized = data.map(t => ({
        id: t.id,
        title: t.title || "Untitled Task",
        isDone: t.isDone ?? false,
      }));
      setTasks(sanitized);
    } catch (err) {
      console.error("Error loading tasks:", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const created = await createTask({
        title: newTaskTitle,
        isDone: false,
        userId: 1,
      });
      setTasks(prev => [...prev, created]);
      setNewTaskTitle("");
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task.");
    }
  };

  const handleToggle = async (task) => {
    try {
      const updated = await updateTask(task.id, {
        ...task,
        isDone: !task.isDone,
      });
      setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task.");
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!tasks.length) return <p>No tasks found. Add one below!</p>;

  return (
    <div>
      <h2>Tasks</h2>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.isDone ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => handleToggle(task)}
            >
              {task.title} {task.isDone ? "✅" : "❌"}
            </span>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleCreate} style={{ marginTop: "1rem" }}>
        <input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title"
          required
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default Tasks;
