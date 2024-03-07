import BookingModel from "../Models/BookingModel.js";
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

//************** GET DOCTOR BY ID *************/
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await DoctorModel.findOne({ _id: req.body.doctorId });
    //Validation
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    //success
    return res.status(200).json({
      success: true,
      message: "Doctor get by id successfully!",
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

// ******** GET DOCTOR APPOINTMENTS *****************/
export const getDoctorAppointments = async (req, res) => {
  try {
    //Get doctor
    const doctor = await DoctorModel.findOne({ userId: req.body.userId });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found!",
      });
    }

    //Get appointments
    const doctorAppointments = await BookingModel.find({
      doctorId: doctor._id,
    });
    if (!doctorAppointments || doctorAppointments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No appointments found!",
      });
    }

    //Success
    return res.status(200).json({
      success: true,
      message: "Doctor Appointments Fetched Successfully!",
      data: doctorAppointments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
