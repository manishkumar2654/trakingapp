import mongoose from "mongoose";

const attendanceSessionSchema = new mongoose.Schema(
  {
    officeName: {
      type: String,
      required: true,
      trim: true,
    },
    assignedEmployees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    notes: {
      type: String,
      default: "",
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "ended"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("AttendanceSession", attendanceSessionSchema);