require('dotenv').config();
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

var morgan = require('morgan');

app.use(morgan('dev'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + 'public/stylesheets/style.css'));
app.use(express.static(__dirname + 'public/javascripts/script.js'));

var mongoose = require('mongoose');

const url =
  process.env.MONGOLAB_NAVY_URI || 'mongodb://localhost/Code-Quiz-Viola';

// var MONGODB_URI =
//   'mongodb+srv://TestViola:Flunky5832@cluster0-sils7.mongodb.net/test?retryWrites=true&w=majority';

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

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!!!');
});

var resultsSchema = new mongoose.Schema({
  initials: { type: String, default: '' },
  result2: { type: Number, default: 0 },
});

//Model
var User = mongoose.model('User', resultsSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/addInits', (req, res) => {
  var myData = new User(req.body);
  myData
    .save()
    .then((item) => {
      res.send('initials saved to database');
    })
    .catch((err) => {
      res.status(400).send('unable to save to database');
    });
});

app.post('/addScore', (req, res) => {
  var myData = new User(req.body);
  myData
    .save()
    .then((item) => {
      res.send('score saved to database');
    })
    .catch((err) => {
      res.status(400).send('unable to save to database');
    });
});

app.listen(port, () => console.log(`Listening port ${port}....`));

// module.exports = app;
