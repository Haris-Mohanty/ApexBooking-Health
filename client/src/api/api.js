import axios from "axios";

// ************* REGISTER USER **************/
export const registerUser = async (data) => {
  try {
    const response = await axios.post("/auth/register", data);

    if (response.status === 201) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ************* LOGIN USER **************/
export const loginUser = async (data) => {
  try {
    const response = await axios.post("/auth/login", data);

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ************* GET USER INFO **************/
export const getUserInfo = async () => {
  try {
    const response = await axios.post(
      "/auth/get-user-info",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ************* APPLY DOCTOR ACCOUNT ******************/
export const applyDoctorAccount = async (data) => {
  try {
    const response = await axios.post("/auth/apply-doctor", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 201) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ********** MARK ALL NOTIFICATIONS AS SEEN **************/
export const markAllNotificationsAsSeen = async (userId) => {
  try {
    const response = await axios.post("/auth/mark-all-notifications-as-seen", {
      userId,
    });

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ********** DELETE ALL SEEN NOTIFICATIONS **************/
export const deleteAllSeenNotifications = async (userId) => {
  try {
    const response = await axios.post("/auth/delete-all-seen-notifications", {
      userId,
    });

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ********** GET ALL USERS ***********/
export const getAllUser = async () => {
  try {
    const response = await axios.get("/admin/getAllUser", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ********** GET ALL DOCTORS ***********/
export const getAllDoctor = async () => {
  try {
    const response = await axios.get("/admin/getAllDoctors", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ********** CHANGE DOCTOR ACCOUNT STATUS ***********/
export const changeAccountStatus = async (data) => {
  try {
    const response = await axios.post("/admin/changeAccountStatus", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 201) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};
