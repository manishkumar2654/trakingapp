import AttendanceSession from "../models/AttendanceSession.js";

export const getSessions = async (req, res) => {
  try {
    const sessions = await AttendanceSession.find()
      .populate("assignedEmployees", "name email employeeCode")
      .sort({ createdAt: -1 });

    return res.json(sessions);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch sessions" });
  }
};

export const getActiveSession = async (req, res) => {
  try {
    const session = await AttendanceSession.findOne({ status: "active" })
      .populate("assignedEmployees", "name email employeeCode")
      .sort({ createdAt: -1 });

    if (!session) {
      return res.json(null);
    }

    return res.json(session);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch active session" });
  }
};

export const createSession = async (req, res) => {
  try {
    const { officeName, assignedEmployees, notes } = req.body;

    const activeSession = await AttendanceSession.findOne({ status: "active" });

    if (activeSession) {
      return res.status(400).json({
        message: "An active session already exists. End it first.",
      });
    }

    const session = await AttendanceSession.create({
      officeName,
      assignedEmployees: assignedEmployees || [],
      notes: notes || "",
      startTime: new Date(),
      status: "active",
    });

    const populated = await AttendanceSession.findById(session._id).populate(
      "assignedEmployees",
      "name email employeeCode"
    );

    return res.status(201).json(populated);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create session" });
  }
};

export const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { officeName, assignedEmployees, notes, status, endTime } = req.body;

    const session = await AttendanceSession.findById(id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    session.officeName = officeName ?? session.officeName;
    session.assignedEmployees = assignedEmployees ?? session.assignedEmployees;
    session.notes = notes ?? session.notes;
    session.status = status ?? session.status;
    session.endTime = endTime ?? session.endTime;

    const updated = await session.save();
    const populated = await AttendanceSession.findById(updated._id).populate(
      "assignedEmployees",
      "name email employeeCode"
    );

    return res.json(populated);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update session" });
  }
};

export const endSession = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await AttendanceSession.findById(id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    session.status = "ended";
    session.endTime = new Date();

    const updated = await session.save();
    const populated = await AttendanceSession.findById(updated._id).populate(
      "assignedEmployees",
      "name email employeeCode"
    );

    return res.json(populated);
  } catch (error) {
    return res.status(500).json({ message: "Failed to end session" });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await AttendanceSession.findById(id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    await session.deleteOne();

    return res.json({ message: "Session deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete session" });
  }
};