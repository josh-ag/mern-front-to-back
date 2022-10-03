const mongoose = require("mongoose");

//@desc - Connect To Mongodb Atlas
const dbConnection = async () => {
  const connString =
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_URI
      : process.env.MONGO_LOCAL;
  let conn;
  try {
    conn = await mongoose.connect(connString);

    console.log(
      `connected to MongoDB @${conn.connection.host}`.yellow.underline
    );
  } catch (mongoErr) {
    console.log(mongoErr);
  }
};

module.exports = dbConnection;
