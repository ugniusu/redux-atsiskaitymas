require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler.js");
const connectToDB = require("./config/db.js");

connectToDB();

const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes.js"));
app.use("/api/goals", require("./routes/goalRoutes.js"));

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);
