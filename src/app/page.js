"use client";
import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../lib/actions"; // Import the action functions

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  // Fetch tasks when the component is first mounted
  useEffect(() => {
    async function fetchTasks() {
      const response = await getTasks();  // Ensure this returns plain objects
      if (response) setTasks(response);
    }
    fetchTasks();
  }, []);
  

  // Handle creating a new task
  async function handleCreateTask() {
    // Check if title and description are valid
    if (!newTask.title || !newTask.description) {
      alert("Title and description are required.");
      return;
    }
  
    const response = await createTask(newTask);
    setTasks([response, ...tasks]);
  }
  

  // Handle toggling a task's completion status
  async function handleToggleComplete(id, completed) {
    const response = await updateTask(id, { completed: !completed });
    setTasks(tasks.map((t) => (t._id === id ? response : t)));
  }

  // Handle deleting a task
  async function handleDelete(id) {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t._id !== id));
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      {/* Create Task Section */}
      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Description"
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
      />
      <button
        onClick={handleCreateTask}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>

      {/* Task List */}
      <ul className="mt-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex justify-between items-center p-2 border-b"
          >
            <span className={task.completed ? "line-through" : ""}>
              {task.title}
            </span>
            <div>
              <button
                onClick={() => handleToggleComplete(task._id, task.completed)}
                className="mr-2"
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
