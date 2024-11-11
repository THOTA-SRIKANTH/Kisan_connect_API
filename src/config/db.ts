import { connect } from "mongoose";
// const { MONGODB_URI } = require("./serverConfig");
const MONGODB_URI="mongodb://localhost:27017/KisanConnect"
const connectDB = async () => {
  try {
    await connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;


// import { connect } from "mongoose";
// const { MONGODB_URI } = require("./serverConfig");

// // Replace <password> with your actual MongoDB password for the Revanth user

// const connectDB = async () => {
//   try {
//     await connect(MONGODB_URI);
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.error("MongoDB connection error:", err);
//   }
// };

// export default connectDB;

