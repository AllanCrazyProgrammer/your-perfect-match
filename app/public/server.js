var express = require('express');
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var person = [];


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
})
app.get('/survey', function (req, res) {
    res.sendFile(path.join(__dirname, "survey.html"));
})

app.get("/api/friends", function (req, res) {
    return res.json(person);
});

//Recibe datos del survey y los agrega al ojeto de person.
app.post("/api/friends", function (req, res) {

    let newPerson = req.body;

    console.log(newPerson);

    person.push(newPerson);

    res.json(newPerson);
});

app.listen(PORT);
