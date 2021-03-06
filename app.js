require('dotenv').config();
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

var morgan = require('morgan');

app.use(morgan('dev'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + 'public/stylesheets/style.css'));
app.use(express.static(__dirname + 'public/javascripts/script.js'));

var mongoose = require('mongoose');

const url = //'mongodb://127.0.0.1:27017'
  process.env.MONGODB_URI || 'mongodb://localhost/Code-Quiz-Viola';
  
mongoose.Promise = global.Promise;
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) return console.error(err);
    console.log('Connected to Database');
  }
);

mongoose.connection.on("error", err => {
  console.log("err", err)
})

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!!!');
});

var resultsSchema = new mongoose.Schema({
  // initials: { type: String, default: '' },
  initials: { type: String, match:/^[A-Za-z]{2,3}$/}
});

var scoreSchema = new mongoose.Schema({
  finalScore: { type: Number, default: 0 },
})

//Model
var User = mongoose.model('User', resultsSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/test', (req, res) => {
  var myData = new User(req.body);
  myData
    .save()
    .then((item) => {
    res.redirect('/');
  
    })
    .catch((err) => {
      res.status(400).send('invalid' +
      '<br><a href = "/"><button>Back to Quiz</button></a>'
      )
    });
  });

var UserS = mongoose.model('UserS', scoreSchema);

app.post('/addScore', (req, res) => {
  var myData = new UserS(req.body);
  myData
    .save()
    .then((item) => {
      res.send(
        '<body style="background-color:rgba(140, 94, 75);font-family:sans-serif;"><div style="text-align:center;color:white;"><h2 style ="padding-top:30px;">Final Score Saved!</h2> ' +
          '<a href = "/"><button style="border-radius:15px;background-color:rgba(220, 53, 69);color:white;"><h2>Back to Quiz</h2></button></a></div></body>'
      );
      console.log(req.body);
    })
    .catch((err) => {
      res.status(400).send('unable to save to database');
    });
});

app.listen(port, () => console.log(`Listening port ${port}....`));
