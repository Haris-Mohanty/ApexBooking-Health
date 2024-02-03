export const register = async (req, res, next) => {
  try {
    console.log("object")
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
