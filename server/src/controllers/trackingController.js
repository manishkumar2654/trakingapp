import Tracking from "../models/Tracking.js";
import AttendanceSession from "../models/AttendanceSession.js";

export const updateTracking = async (req, res) => {
  try {
    const {
      latitude,
      longitude,
      accuracy,
      workLocation,
      projectName,
      deviceTime,
    } = req.body;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ message: "Latitude and longitude are required" });
    }

    const activeSession = await AttendanceSession.findOne({ status: "active" });

    if (!activeSession) {
      return res.status(400).json({ message: "No active attendance session" });
    }

    const item = await Tracking.create({
      employeeId: req.user._id,
      employeeName: req.user.name || "",
      employeeCode: req.user.employeeCode || "",
      latitude,
      longitude,
      accuracy: accuracy || 0,
      workLocation: workLocation || "Onsite",
      projectName: projectName || "",
      deviceTime: deviceTime || null,
      trackedAt: new Date(),
    });

    return res.status(201).json({
      message: "Tracking updated successfully",
      data: item,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update tracking" });
  }
};

export const getAllTracking = async (req, res) => {
  try {
    const items = await Tracking.find()
      .populate("employeeId", "name email employeeCode")
      .sort({ trackedAt: -1 });

    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch tracking" });
  }
};

export const getLatestTrackingByEmployee = async (req, res) => {
  try {
    const latestItems = await Tracking.aggregate([
      { $sort: { trackedAt: -1 } },
      {
        $group: {
          _id: "$employeeId",
          doc: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$doc" },
      },
      {
        $sort: { trackedAt: -1 },
      },
    ]);

    const populated = await Tracking.populate(latestItems, {
      path: "employeeId",
      select: "name email employeeCode",
    });

    return res.json(populated);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch latest tracking" });
  }
};

export const getMyTracking = async (req, res) => {
  try {
    const items = await Tracking.find({ employeeId: req.user._id }).sort({
      trackedAt: -1,
    });

    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch my tracking" });
  }
};