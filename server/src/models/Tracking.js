import mongoose from "mongoose";

const trackingSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employeeName: {
      type: String,
      default: "",
    },
    employeeCode: {
      type: String,
      default: "",
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    accuracy: {
      type: Number,
      default: 0,
    },
    workLocation: {
      type: String,
      default: "Onsite",
    },
    projectName: {
      type: String,
      default: "",
    },
    deviceTime: {
      type: Date,
      default: null,
    },
    trackedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tracking", trackingSchema);