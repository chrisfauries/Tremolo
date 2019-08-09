const app = require('express')();
const cors = require('cors');
const bp = require('body-parser');
const uuid = require('uuid/v4');
var cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
mongoose.connect('mongodb+srv://cjfizzle:cjf114078145@lowez-zporx.mongodb.net/practice?retryWrites=true&w=majority', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('db connected')
});

const personSchema = new Schema({}, { strict: false });

var Person = mongoose.model('Person', personSchema);

app.listen(3001, function(port) {console.log('listening on 3001')})

app.use(cors())
app.use(bp())
app.use(cookieParser('PracticePerfect'));

app.get('/', (req,res) =>  {
    console.log(req.signedCookies.ID)
    if(!req.signedCookies.ID) {
        let ID = uuid()
        res.cookie('ID', ID, {signed: true})
    } else {
        Person.find({ID : req.signedCookies.ID}).exec((err,results) => {
            console.log(err, results)
            res.send(results);
        })
    }
})


app.post('/api/practice/', (req, res) => {
    console.log(req.body);
    if(!req.signedCookies.ID) {
        let ID = uuid()
        res.cookie('ID', ID, {signed: true})
    } else {
        let person = new Person({ID : req.signedCookies.ID, session : req.body, date : moment().format('MM-DD-YYYY') })
        person.save();
    }
    console.log('saved!')
    res.end('done')
})