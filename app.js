var express = require("express");
var mongoose = require("mongoose");
var app = express();
var port = process.env.PORT || 5000;

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
var morgan = require("morgan");

app.use(morgan("dev"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));
app.use(express.static(__dirname + "public/stylesheets/style.css"));
app.use(express.static(__dirname + "public/javascripts/script.js"));
const { validationResult } = require("express-validator");

//"mongodb://localhost/Code-Quiz-Viola"; //'mongodb://127.0.0.1:27017'

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!");
});

const resultsSchema = new mongoose.Schema({
  // initials: { type: String, default: '' },
  initials: String,
});

const scoreSchema = new mongoose.Schema({
  finalScore: Number,
});

//Model
const Users = mongoose.model("initials", resultsSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/initials", (req, res) => {
  let initials = req.body;
  const user = new Users(initials);

  user.save().then((item) => {
    res.send("posted!");
    console.log(user);
  });
});
var Users1 = mongoose.model("finalScore", scoreSchema);

app.post("/finalScore", (req, res) => {
  const myData = new Users1(req.body);
  myData
    .save()
    .then((item) => {
      res.send(
        `<body style="background-color:rgba(140, 94, 75);font-family:sans-serif;"><div style="text-align:center;color:white;"><h2 style ="padding-top:30px;">Final Score Saved!</h2> 
          <a href = "/"><button style="border-radius:15px;background-color:rgba(220, 53, 69);color:white;"><h2>Back to Quiz</h2></button></a></div></body>')`
      );
      console.log(item);
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});

app.listen(port, () => console.log(`Listening port ${port}....`));
