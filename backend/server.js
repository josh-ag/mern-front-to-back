//IMPORTs
const express = require("express");
require("dotenv").config();
require("colors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const dbConn = require("./configs/db");
const PORT = process.env.PORT || 7000;
const path = require("path");

//CONN TO DB
dbConn();
//INIT EXPRESS
const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

//ROUTE
app.use("/api/goals", require("./routes/goalsRoute"));
app.use("/api/users", require("./routes/userRoute"));

//PRODUCTION ONLY
if (process.env.NODE_ENV === "production") {
  //set static asset
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    );
  });
} else {
  app.get("*", (req, res) => res.send("Please run app in production"));
}

//LISTEN TO SERVER
app.listen(PORT, () => console.log("Server Now Listening On Port ", PORT));
