import Office from "../models/Office.js";

export const getOffices = async (req, res) => {
  try {
    const offices = await Office.find().sort({ createdAt: -1 });
    return res.json(offices);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch offices" });
  }
};

export const createOffice = async (req, res) => {
  try {
    const { name, address, latitude, longitude, radius, status } = req.body;

    const office = await Office.create({
      name,
      address,
      latitude,
      longitude,
      radius: radius || 100,
      status: status || "active",
    });

    return res.status(201).json(office);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create office" });
  }
};

export const updateOffice = async (req, res) => {
  try {
    const { id } = req.params;

    const office = await Office.findById(id);
    if (!office) {
      return res.status(404).json({ message: "Office not found" });
    }

    Object.assign(office, req.body);
    const updated = await office.save();

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update office" });
  }
};

export const deleteOffice = async (req, res) => {
  try {
    const { id } = req.params;

    const office = await Office.findById(id);
    if (!office) {
      return res.status(404).json({ message: "Office not found" });
    }

    await office.deleteOne();
    return res.json({ message: "Office deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete office" });
  }
};