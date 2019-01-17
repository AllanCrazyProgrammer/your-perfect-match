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
            "5",
            "5",
            "5",
            "5",
            "",
            "2",
            "3",
            "2",
            "5"
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
            "4",
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
    let scores = newPerson.scores.map(Number);
    var bestMatch = 50;

    for (let i = 0; i < person.length; i++) {
        var actualPerson = person[i].name;
        var actualPersonScore = person[i].scores.map(Number);
        //da la diferencia entre el score de usario x con la de usuario nuevo
        var difference = scores.map(function (item, index) {
            return Math.abs(item - actualPersonScore[index]);
        })

        const add = (a, b) =>
            a + b
        // use reduce to sum our array
        const totalDifference = difference.reduce(add)
        // get the current best match
        if (totalDifference < bestMatch) {
            bestMatch = totalDifference;
        }
    }
    console.log(bestMatch);
    console.log(actualPerson);

    person.push(newPerson);
    res.json(newPerson);
});

app.listen(PORT);
