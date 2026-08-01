import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  githubUrl: string;
  language: string;
  framework: string;
  status: "indexing" | "ready" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    githubUrl: { type: String, required: true, unique: true },
    language: { type: String, default: "TypeScript" },
    framework: { type: String, default: "Unknown" },
    status: { 
      type: String, 
      enum: ["indexing", "ready", "failed"], 
      default: "indexing" 
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", ProjectSchema);
