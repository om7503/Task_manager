"use client";
import { useState } from "react";
import { createTask } from "../lib/actions";

export default function TaskForm({ setTasks }) {
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  async function handleSubmit() {
    const response = await createTask(newTask);
    setTasks((prev) => [response, ...prev]);
    setNewTask({ title: "", description: "" });
  }

  return (
    <div>
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
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </div>
  );
}
