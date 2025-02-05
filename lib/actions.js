"use server";

import { connectDB } from "./db"; // DB connection helper
import Task from "./models/task"; // Correct import for the Task model

export async function getTasks() {
  // Ensure a connection to the database
  await connectDB();

  // Retrieve tasks from MongoDB
  const tasks = await Task.find();

  // Convert Mongoose documents to plain JavaScript objects
  const plainTasks = tasks.map(task => {
    // Convert to plain object
    const taskObject = task.toObject();
    
    // Convert _id to a string to ensure it is serializable
    taskObject._id = taskObject._id.toString();

    return taskObject;  // Return the plain object
  });

  // Return the serialized plain object array
  return plainTasks;
}

export async function createTask({ title, description }) {
  await connectDB();
  const newTask = await Task.create({ title, description, completed: false });
  return newTask;  // This is returned as a Mongoose document (you may want to convert it to plain object as well)
}

export async function updateTask(id, updateData) {
  await connectDB();
  return await Task.findByIdAndUpdate(id, updateData, { new: true });
}

export async function deleteTask(id) {
  await connectDB();
  await Task.findByIdAndDelete(id);
}
