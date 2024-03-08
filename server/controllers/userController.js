import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DoctorModel from "../Models/DoctorModel.js";
import BookingModel from "../Models/BookingModel.js";
import moment from "moment";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //Validation
    if (!name || !email || !password) {
      return res.status(422).json({
        message: "Please provide all fields!",
        success: false,
      });
    }
    //Password validation
    if (password.length < 6) {
      return res.status(422).json({
        message: "Password length should be greater than 6 character",
        success: false,
      });
    }

    //Check existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User Already Exists!",
        success: false,
      });
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //Register user
    const user = new UserModel(req.body);
    await user.save();
    return res.status(201).json({
      user,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

//*************** USER LOGIN **********/
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Validation
    if (!email || !password) {
      return res.status(422).json({
        message: "Please provide all fields!",
        success: false,
      });
    }

    //Password Validation
    if (password.length < 6) {
      return res.status(422).json({
        message: "Password length should be greater than 6 character",
        success: false,
      });
    }

    //Check user is exist or not
    const getUser = await UserModel.findOne({ email });
    if (!getUser) {
      return res.status(404).json({
        message: "Invalid Credentials!",
        success: false,
      });
    }

    //Password match
    const comparePassword = await bcrypt.compare(password, getUser.password);
    if (!comparePassword) {
      return res.status(400).json({
        message: "Incorrect Password, Please check again...",
        success: false,
      });
    }

    //Generate token
    const token = jwt.sign({ id: getUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //Login success
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

//********* GET USER INFO (FOR PROTECTED ROUTES) ******/
export const getUserInfo = async (req, res, next) => {
  try {
    //Get user
    const user = await UserModel.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(404).json({
        message: "User doesn't exists!",
        success: false,
      });
    }

    //Success response
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

//************* APPLY DOCTOR ACCOUNT **************/
export const applyDoctor = async (req, res, next) => {
  try {
    //Add doctor
    const newDoctor = new DoctorModel(req.body);
    await newDoctor.save();

    //Get user (Admin)
    const getAdmin = await UserModel.findOne({ isAdmin: true });

    //Push notification to admin
    const unSeenNotifications = getAdmin.unSeenNotifications;
    unSeenNotifications.push({
      type: "new-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account!`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
      },
      onClickPath: "/admin/doctors",
    });
    await UserModel.findByIdAndUpdate(getAdmin._id, { unSeenNotifications });

    //Response
    return res.status(201).json({
      message: "Doctor Account Applied Successfully!",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

//************ MARK ALL NOTIFICATIONS AS SEEN *******************/
export const markAllNotificationsAsSeen = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    const unSeenNotifications = user.unSeenNotifications;

    //Append unSeenNotifications to seenNotifications array
    user.seenNotifications.push(...unSeenNotifications);

    //Clear unSeenNotifications array
    user.unSeenNotifications = [];

    //Save the Updated user
    const updatedUser = await user.save();
    updatedUser.password = undefined; //Password hide
    return res.status(200).json({
      success: true,
      message: "All notifications marked as seen!",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

//************ DELETE ALL SEEN NOTIFICATIONS *******************/
export const deleteAllSeenNotifications = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });

    //Clear the seenNotifications array
    user.seenNotifications = [];

    //Save the updated user
    const updatedUser = await user.save();
    updatedUser.password = undefined;

    return res.status(200).json({
      success: true,
      message: "All seen notifications deleted!",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************** GET ALL APPROVED DOCTORS ***********/
export const getAllApprovedDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.find({ status: "approved" });
    if (!doctors) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    //success res
    return res.status(200).json({
      success: true,
      message: "Doctor list fetched successfully!",
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

//************** BOOK APPOINTMENTS ***********/
export const bookingAppointment = async (req, res) => {
  try {
    //Get data
    let { doctorId, userId, doctorInfo, userInfo, date, time, status } =
      req.body;
    if (!date || !time) {
      return res.status(422).json({
        success: false,
        message: "Please select date and time!",
      });
    }

    //Change date and time to ISO String (Used for convert date object to string obj) for check availability
    date = moment(date, "DD-MM-YYYY").toISOString();
    time = moment(time, "HH:mm").toISOString();
    status = "pending";

    //Add bookings
    const newBookings = new BookingModel({
      doctorId,
      userId,
      doctorInfo,
      userInfo,
      date,
      time,
      status,
    });
    await newBookings.save();

    //Push notification to user
    const user = await UserModel.findOne({ _id: req.body.doctorInfo.userId });
    user.unSeenNotifications.push({
      type: "New-Booking-Request",
      message: `A new appointment booking request from ${req.body.userInfo.name}`,
      onClickPath: "/user/appointments",
    });
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Appointment booking successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************** BOOK AVAILABILITY ***********/
export const bookingAvailability = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const isoDate = moment(date, "DD-MM-YYYY").toISOString();
    const isoTime = moment(time, "HH:mm").toISOString();
    const fromTime = moment(isoTime).subtract(1, "hours").toISOString();
    const toTime = moment(isoTime).add(1, "hours").toISOString();

    const bookings = await BookingModel.find({
      doctorId,
      date: isoDate,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });

    if (bookings.length > 0) {
      return res.status(200).json({
        success: false,
        message: "Appointment not available at this time",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Appointment available, you can book now!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************** GET USER APPOINTMENTS ***********/
export const userAppointments = async (req, res) => {
  try {
    const appointments = await BookingModel.find({ userId: req.body.userId })
      .populate("userInfo")
      .populate("doctorInfo");
    if (!appointments) {
      return res.status(404).json({
        success: false,
        message: "No appointments found!",
      });
    }

    //Success res
    return res.status(200).json({
      success: true,
      message: "User Appointments Fetched Successfully!",
      data: appointments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
