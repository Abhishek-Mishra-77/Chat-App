import mongoose from "mongoose";

const mongodb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("MongoDb Connected successfully. ");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export default mongodb;
