const mongoose = require("mongoose");

//@desc - Connect To Mongodb Atlas
const dbConnection = async () => {
  const mongoLocal = "mongodb://127.0.0.1:27017/goalsetter";
  let conn;
  try {
    conn = await mongoose.connect(/*process.env.MONGO_URI*/ mongoLocal);

    console.log(
      `connected to MongoDB @${conn.connection.host}`.yellow.underline
    );
  } catch (mongoErr) {
    console.log(mongoErr);
  }
};

module.exports = dbConnection;
