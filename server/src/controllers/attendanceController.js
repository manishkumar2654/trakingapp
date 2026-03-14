import Attendance from "../models/Attendance.js";
import AttendanceSession from "../models/AttendanceSession.js";

export const markAttendance = async (req, res) => {
  try {
    const { type, workLocation, latitude, longitude } = req.body;

    const attendance = await Attendance.create({
      employeeId: req.user._id,
      type,
      workLocation,
      latitude,
      longitude,
    });

    return res.status(201).json(attendance);
  } catch (error) {
    return res.status(500).json({ message: "Failed to mark attendance" });
  }
};

export const getAttendanceLogs = async (req, res) => {
  try {
    const logs = await Attendance.find()
      .populate("employeeId", "name email employeeCode")
      .sort({ createdAt: -1 });

    return res.json(logs);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch attendance logs" });
  }
};

export const getActiveSession = async (req, res) => {
  try {
    const session = await AttendanceSession.findOne({ status: "active" })
      .populate("assignedEmployees", "name email employeeCode")
      .sort({ createdAt: -1 });

    return res.json(session || null);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch active session" });
  }
};

export const getMyAttendance = async (req, res) => {
  try {
    const logs = await Attendance.find({ employeeId: req.user._id }).sort({
      createdAt: -1,
    });

    return res.json(logs);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch my attendance" });
  }
};