import mongoose, { Schema, Document } from "mongoose";

export interface IMission extends Document {
  projectId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "review_required" | "approved" | "rejected" | "completed";
  suggestions: {
    category: "Security" | "Performance" | "Architecture" | "Best Practices";
    title: string;
    description: string;
    impact: "High" | "Medium" | "Low";
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
    suggestions: [
      {
        category: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        impact: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
      },
    ],
  },
  { timestamps: true }
);

export const Mission = mongoose.model<IMission>("Mission", MissionSchema);
