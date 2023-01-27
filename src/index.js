const express = require("express");
const route = require("./routes/route.js");
const { default: mongoose } = require("mongoose");
const  multer = require("multer");
const app = express();

mongoose.set("strictQuery", false);

app.use(multer().any());

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://vishalsharma:8423354673@vishal-db.bpwswlx.mongodb.net/group21Database",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDB is connected..."))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(3001, function () {
  console.log("Express app running on port" + 3001);
});
