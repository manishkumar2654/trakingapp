import mongoose from "mongoose";

const labourEntrySchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: String,
      required: true,
    },
    labourName: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    count: {
      type: Number,
      default: 1,
    },
    labourCount: {
      type: Number,
      default: 1,
    },
    dailyWages: {
      type: Number,
      default: 0,
    },
    supervisorName: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    latitude: {
      type: Number,
      default: null,
    },
    longitude: {
      type: Number,
      default: null,
    },
    locationText: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("LabourEntry", labourEntrySchema);