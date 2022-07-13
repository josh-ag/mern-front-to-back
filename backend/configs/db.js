const mongoose = require("mongoose");

//@desc - Connect To Mongodb Atlas
const dbConnection = async () => {
  let conn;
  try {
    conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `connected to MongoDB @${conn.connection.host}`.yellow.underline
    );
  } catch (mongoErr) {
    console.log(mongoErr);
  }
};

module.exports = dbConnection;
