var express = require('express');
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var person = [
    {
        "name": "Ahmed",
        "photo": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
        "scores": [
            "5",
            "1",
            "4",
            "4",
            "5",
            "1",
            "2",
            "5",
            "4",
            "1"
        ]
    },

    {
        "name": "nadia",
        "photo": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
        "scores": [
            "1",
            "2",
            "5",
            "2",
            "3",
            "2",
            "5",
            "2",
            "5",
            "5"
        ]
    }
];


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
    let scores = newPerson.scores;
    person.push(newPerson);


    for (let i = 0; i < person.length; i++) {
        console.log(person[i].scores);
    }

    res.json(newPerson);
});

app.listen(PORT);
