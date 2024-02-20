import DoctorModel from "../Models/DoctorModel.js";
import UserModel from "../Models/UserModel.js";

//************* GET ALL USER **********/
export const getAllUser = async (req, res, next) => {
  try {
    const users = await UserModel.find({}, { password: 0 }); //Hide password field

    //Success res
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//**************** GET ALL DOCTORS *************/
export const getAllDoctor = async (req, res, next) => {
  try {
    const doctors = await DoctorModel.find({});

    //Success Res
    return res.status(200).json({
      success: true,
      data: doctors,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//********* CHANGE ACCOUNT STATUS (DOCTOR ACCOUNT) ********/
export const changeAccountStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;

    const doctor = await DoctorModel.findByIdAndUpdate(doctorId, { status });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const user = await UserModel.findOne({ _id: doctor.userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const unSeenNotifications = user.unSeenNotifications;

    //Push notification
    unSeenNotifications.push({
      type: "doctor-account-request-updated",
      message: `Your doctor account request has ${status}.`,
      onclickPath: "/notifications",
    });
    user.isDoctor = status === "approved" ? true : false;
    user.save();

    //Success res
    return res.status(201).json({
      success: true,
      message: "Account status updated!",
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
