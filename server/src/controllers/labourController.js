import LabourEntry from "../models/LabourEntry.js";

export const addLabour = async (req, res) => {
  try {
    const {
      project,
      labourCount,
      supervisorName,
      notes,
      labourName,
      phone,
      count,
      dailyWages,
      imageUrl,
      latitude,
      longitude,
      locationText,
    } = req.body;

    const labour = await LabourEntry.create({
      employeeId: req.user._id,
      project,
      labourCount: labourCount || count || 1,
      supervisorName: supervisorName || req.user.name || "",
      notes: notes || "",
      labourName: labourName || "",
      phone: phone || "",
      count: count || labourCount || 1,
      dailyWages: dailyWages || 0,
      imageUrl: imageUrl || "",
      latitude: latitude ?? null,
      longitude: longitude ?? null,
      locationText: locationText || "",
    });

    return res.status(201).json(labour);
  } catch (error) {
    return res.status(500).json({ message: "Failed to save labour entry" });
  }
};

export const myLabour = async (req, res) => {
  try {
    const entries = await LabourEntry.find({ employeeId: req.user._id }).sort({
      createdAt: -1,
    });

    return res.json(entries);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch my labour entries" });
  }
};

export const allLabour = async (req, res) => {
  try {
    const entries = await LabourEntry.find()
      .populate("employeeId", "name email employeeCode")
      .sort({ createdAt: -1 });

    return res.json(entries);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch labour entries" });
  }
};

export const updateLabour = async (req, res) => {
  try {
    const { id } = req.params;

    const labour = await LabourEntry.findById(id);
    if (!labour) {
      return res.status(404).json({ message: "Labour entry not found" });
    }

    Object.assign(labour, req.body);
    const updated = await labour.save();

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update labour entry" });
  }
};

export const deleteLabour = async (req, res) => {
  try {
    const { id } = req.params;

    const labour = await LabourEntry.findById(id);
    if (!labour) {
      return res.status(404).json({ message: "Labour entry not found" });
    }

    await labour.deleteOne();
    return res.json({ message: "Labour entry deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete labour entry" });
  }
};