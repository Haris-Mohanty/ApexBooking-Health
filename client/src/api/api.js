import axios from "axios";

// ************* REGISTER USER **************/
export const registerUser = async (data) => {
  try {
    const response = await axios.post("/auth/register", data);

    if (response.status === 201) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occured!");
    }
  } catch (err) {
    throw err;
  }
};

// ************* REGISTER USER **************/
export const loginUser = async (data) => {
  try {
    const response = await axios.post("/auth/login", data);

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occured!");
    }
  } catch (err) {
    throw err;
  }
};
