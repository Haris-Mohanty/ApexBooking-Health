import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL);

  console.log(
    `Connected to MongoDb Database ${mongoose.connection.host}.`.bgBrightGreen
      .black
  );

  try {
  } catch (err) {
    console.log(`MongoDb Database Error ${err}.`.bgBrightRed.white);
    process.exit(1);
  }
};

export default connectDB;
