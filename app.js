const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");

const { PORT = 3001 } = process.env;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.error(err));

app.use(helmet());

app.use((req, res, next) => {
  req.user = {
    _id: "65a8ca5ae1fd5f77394447fe",
  };
  next();
});

const routes = require("./routes");

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
