import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
