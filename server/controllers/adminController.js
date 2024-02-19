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
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
