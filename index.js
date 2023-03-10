const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");

//express initialization
const app = express();
app.use(express.json());

//database connection with mongoose
mongoose.set("strictQuery", false);
// nstead of http://localhost you have to wite http://0.0.0.0 to
// connect the database (connection string)
mongoose
  .connect("mongodb://0.0.0.0/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(err));

//application routes
app.use("/todo", todoHandler);

//default error handler
function errorHandler(err, req, res, next) {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(3000, () => {
  console.log("app listening at port 3000");
});
