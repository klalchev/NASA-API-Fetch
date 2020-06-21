/* Empty JS object to act as endpoint for all routes */
projectData = {};

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('Test'));

const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };



// Dummy API Endpoint
/*
const fakeData = {
    animal: 'lion',
    fact: 'lions are fun'
}
*/

/*
app.get('/fakePictureData', getFakeData) // GET retrieves data from the server. POST sends data to the server

function getFakeData(req, res) {
    res.send(fakeData)
}
*/

const pictureData = [];

app.get('/all', getData)

function getData(req, res){
    res.send(pictureData)
    console.log(pictureData)
}

// POST Route

app.post('/addPicture', addPicture);

function addPicture(req, res){

    newEntry = { //what do I need to enter here to fetch the NASA data and also the image of the day?
        date: req.body.date,
        explanation: req.body.explanation,
        title: req.body.title,
        hdurl: req.body.hdurl,
        fav: req.body.fav
    }

pictureData.push(newEntry)
res.send(pictureData)
console.log(pictureData)
}
