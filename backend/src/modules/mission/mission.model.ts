import mongoose, { Schema, Document } from "mongoose";

export interface IMission extends Document {
  projectId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "review_required" | "approved" | "rejected" | "completed";
  changes: {
    file: string;
    diff: string;
    additions: number;
    deletions: number;
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
    changes: [
      {
        file: { type: String, required: true },
        diff: { type: String, required: true },
        additions: { type: Number, default: 0 },
        deletions: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

export const Mission = mongoose.model<IMission>("Mission", MissionSchema);
