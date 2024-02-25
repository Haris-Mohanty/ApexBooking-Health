import DoctorModel from "../Models/DoctorModel.js";

//************** GET DOCTOT INFO ***********/
export const getDoctorInfo = async (req, res) => {
  try {
    const doctor = await DoctorModel.findOne({ userId: req.body.userId });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor data fetched successfully!",
      data: doctor,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************** UPDATE DOCTOT PROFILE ***********/
export const updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await DoctorModel.findOneAndUpdate(
      {
        userId: req.body.userId,
      },
      req.body
    );
    //Validation
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    //Success res
    return res.status(201).json({
      success: true,
      message: "Doctor Profile Updated!",
      data: doctor,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
