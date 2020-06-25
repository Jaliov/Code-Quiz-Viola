require('dotenv').config();
var express = require('express');
var app = express();
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + 'public/stylesheets/style.css'));
app.use(express.static(__dirname + 'public/javascripts/script.js'));

var url =
  'mongodb+srv://Vlanut:Funkle3258@jarcluster-bjsom.mongodb.net/JARCluster?retryWrites=true&w=majority';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(url || 'mongodb://localhost/Code-Quiz-Viola', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!!!');
});

var resultsSchema = new mongoose.Schema({
  initials: { type: String, default: '' },
  result2: { type: Number, default: 0 },
});

var User = mongoose.model('User', resultsSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/addInitials', (req, res) => {
  console.log(req.body);
  var myData = new User(req.body);
  myData
    .save()
    .then((item) => {
      res.send(
        'Saved! ' +
          '<h2 ><a href = "/" style="color:red;text-decoration: none">Back to Quiz </a></h2>'
      );
      res.send(console.log('Saved'));
    })
    .catch((err) => {
      res.status(400).send('unable to save to database');
    });
});

app.listen(port, () => console.log(`Listening port ${port}....`));

module.exports = app;
