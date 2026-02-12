import { User } from "../models/userModel.js";

export const acceptTerms = async (req, res) => {
  try {
    const userId = req.userId;

    await User.findByIdAndUpdate(userId, {
      termsAccepted: true,
    });

    return res.status(200).json({
      success: true,
      message: "Terms accepted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
