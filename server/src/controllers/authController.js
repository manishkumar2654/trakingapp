import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email?.toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password && password && user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json({
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        adminName: user.adminName,
        role: user.role,
        employeeCode: user.employeeCode,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed" });
  }
};

export const getMe = async (req, res) => {
  return res.json(req.user);
};

export const seedDefaultUsers = async (req, res) => {
  try {
    const count = await User.countDocuments();

    if (count === 0) {
      await User.create([
        {
          name: "Aman Raj",
          email: "admin1@gmail.com",
          password: "Password@123",
          role: "admin",
          adminName: "Aman Raj",
        },
        {
          name: "Shivam Kumar",
          email: "webdev.aman03@gmail.com",
          password: "123456",
          role: "employee",
          adminName: "Aman Raj",
          employeeCode: "EMP001",
          department: "Testing",
          designation: "Tester",
        },
      ]);
    }

    return res.json({ message: "Seed completed" });
  } catch (error) {
    return res.status(500).json({ message: "Seed failed" });
  }
};