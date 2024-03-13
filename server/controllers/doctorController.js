import BookingModel from "../Models/BookingModel.js";
import DoctorModel from "../Models/DoctorModel.js";
import UserModel from "../Models/UserModel.js";

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
    })
      .populate("doctorInfo")
      .populate("userInfo");
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

// ******** UPDATE APPOINTMENT STATUS *****************/
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await BookingModel.findByIdAndUpdate(appointmentsId, {
      status,
    });
    if (!appointments) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    //Push Notification to user (appointment approved ya reject)
    const user = await UserModel.findOne({ _id: appointments.userId });
    const unSeenNotifications = user.unSeenNotifications;
    unSeenNotifications.push({
      type: "status-updated",
      message: `Your Appointment has been ${status}`,
      onClickPath: "doctor-appointments",
    });
    await user.save();

    //Success
    return res.status(200).json({
      success: true,
      message: "Appointment status updated!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
