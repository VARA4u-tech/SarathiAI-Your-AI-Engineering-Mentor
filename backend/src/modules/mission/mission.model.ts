import mongoose, { Schema, Document } from "mongoose";

export interface IMission extends Document {
  projectId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "review_required" | "approved" | "rejected" | "completed";
  score: number;
  categoryScores: {
    Architecture: number;
    Security: number;
    Performance: number;
    Testing: number;
    Scalability: number;
    Maintainability: number;
  };
  suggestions: {
    category: "System Design & Architecture" | "Full Stack Implementation" | "Vulnerability & Compliance" | "Testing & Validation";
    title: string;
    description: string;
    impact: "High" | "Medium" | "Low";
    why: string;
    recommendation: string;
    difficulty: "Easy" | "Medium" | "Hard";
    estimatedTime: string;
  }[];
  roadmap: {
    week: string;
    title: string;
    description: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const MissionSchema: Schema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "in_progress", "review_required", "approved", "rejected", "completed"],
      default: "pending",
    },
    score: { type: Number, default: 0 },
    categoryScores: {
      Architecture: { type: Number, default: 0 },
      Security: { type: Number, default: 0 },
      Performance: { type: Number, default: 0 },
      Testing: { type: Number, default: 0 },
      Scalability: { type: Number, default: 0 },
      Maintainability: { type: Number, default: 0 },
    },
    suggestions: [
      {
        category: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        impact: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
        why: { type: String },
        recommendation: { type: String },
        difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Medium" },
        estimatedTime: { type: String },
      },
    ],
    roadmap: [
      {
        week: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Mission = mongoose.model<IMission>("Mission", MissionSchema);
