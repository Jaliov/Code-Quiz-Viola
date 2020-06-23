var express = require('express');
var app = express();
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + 'public/stylesheets/style.css'));
app.use(express.static(__dirname + 'public/javascripts/script.js'));

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);

const startQuiz = () => {
  alert('test');
};

var resultsSchema = new mongoose.Schema({
  initials: String,
  result2: Number,
});

var User = mongoose.model('User', resultsSchema);
mongoose.connect('mongodb://localhost:27017/Initials', {
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/addinitials', (req, res) => {
  var myData = new User(req.body);
  myData
    .save()
    .then((item) => {
      res.send('Saved! ' + '<h2><a href = "/" >Back to Quiz </a></h2>');
    })
    .catch((err) => {
      res.status(400).send('unable to save to database');
    });
});

app.listen(port, () => console.log(`Listen port ${port}....`));
