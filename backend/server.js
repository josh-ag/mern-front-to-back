//IMPORTs
const express = require("express");
require("dotenv").config();
require("colors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const dbConn = require("./configs/db");
const PORT = process.env.PORT || 7000;

//CONN TO DB
dbConn();
//INIT EXPRESS
const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ROUTE
app.use("/api/goals", require("./routes/goalsRoute"));
app.use(errorHandler);

//LISTEN TO SERVER
app.listen(PORT, () => console.log("Server Now Listening On Port ", PORT));
